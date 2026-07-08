import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { extname, join, normalize, resolve } from 'node:path'

const PORT = Number(process.env.PORT ?? 4173)
const ROOT = resolve('.')
const DIST_DIR = resolve(ROOT, 'dist')
const FEEDBACK_DIR = resolve(ROOT, 'feedback-data')
const MAX_BODY_BYTES = 16 * 1024
const VALID_REASONS = new Set([
  'Jag hittade bias i koden',
  'Jag tror att mitt resultat är fel',
  'Jag tycker att en fråga är vinklat formulerad',
  'Annat',
])

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  })
  response.end(JSON.stringify(payload))
}

function readBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let body = ''
    request.setEncoding('utf8')
    request.on('data', (chunk) => {
      body += chunk
      if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) {
        rejectBody(new Error('Feedbacken är för lång.'))
        request.destroy()
      }
    })
    request.on('end', () => resolveBody(body))
    request.on('error', rejectBody)
  })
}

function sanitizeForFilename(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 46)
}

async function handleFeedback(request, response) {
  if (request.method !== 'POST') {
    sendJson(response, 405, { ok: false, error: 'Metoden stöds inte.' })
    return
  }

  try {
    const body = await readBody(request)
    const parsed = JSON.parse(body)
    const reason = String(parsed.reason ?? '')
    const message = String(parsed.message ?? '').trim()
    const page = String(parsed.page ?? '').slice(0, 500)

    if (!VALID_REASONS.has(reason)) {
      sendJson(response, 400, { ok: false, error: 'Välj en giltig anledning.' })
      return
    }

    if (message.length < 12) {
      sendJson(response, 400, { ok: false, error: 'Skriv gärna minst 12 tecken så att feedbacken går att förstå.' })
      return
    }

    await mkdir(FEEDBACK_DIR, { recursive: true })
    const receivedAt = new Date().toISOString()
    const fileStem = `${receivedAt.replace(/[:.]/g, '-')}-${sanitizeForFilename(reason)}-${randomUUID().slice(0, 8)}`
    const filePath = join(FEEDBACK_DIR, `${fileStem}.txt`)
    const content = [
      'Partikartan feedback',
      `Received: ${receivedAt}`,
      `Reason: ${reason}`,
      `Page: ${page || 'Ej angiven'}`,
      '',
      'Message:',
      message,
      '',
    ].join('\n')

    await writeFile(filePath, content, 'utf8')
    sendJson(response, 201, { ok: true, file: `feedback-data/${fileStem}.txt` })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Feedbacken kunde inte sparas.'
    sendJson(response, 400, { ok: false, error: message })
  }
}

async function serveStatic(request, response) {
  const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`)
  const requestedPath = decodeURIComponent(url.pathname)
  const relativePath = requestedPath === '/' ? 'index.html' : requestedPath.slice(1)
  const normalizedPath = normalize(relativePath)
  const candidate = resolve(DIST_DIR, normalizedPath)

  if (!candidate.startsWith(DIST_DIR)) {
    response.writeHead(403)
    response.end('Forbidden')
    return
  }

  try {
    const stats = await stat(candidate)
    const filePath = stats.isDirectory() ? join(candidate, 'index.html') : candidate
    const content = await readFile(filePath)
    response.writeHead(200, {
      'content-type': mimeTypes[extname(filePath)] ?? 'application/octet-stream',
    })
    response.end(content)
  } catch {
    const fallback = await readFile(join(DIST_DIR, 'index.html'))
    response.writeHead(200, { 'content-type': mimeTypes['.html'] })
    response.end(fallback)
  }
}

const server = createServer(async (request, response) => {
  if (request.url?.startsWith('/api/feedback')) {
    await handleFeedback(request, response)
    return
  }

  await serveStatic(request, response)
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Partikartan server listening at http://127.0.0.1:${PORT}/`)
})

