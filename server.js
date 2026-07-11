import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { extname, join, normalize, resolve } from 'node:path'

const PORT = Number(process.env.PORT ?? 4173)
const HOST = process.env.HOST ?? '127.0.0.1'
const ROOT = resolve('.')
const DIST_DIR = resolve(ROOT, 'dist')
const FEEDBACK_DIR = resolve(ROOT, 'feedback-data')
const MAX_BODY_BYTES = 16 * 1024
const feedbackConfig = JSON.parse(
  await readFile(new URL('./src/data/feedbackConfig.json', import.meta.url), 'utf8'),
)
const feedbackReasonsById = new Map(feedbackConfig.reasons.map((reason) => [reason.id, reason]))
const feedbackReasonsByLabel = new Map(feedbackConfig.reasons.map((reason) => [reason.label, reason]))
const legacyReasonIds = new Map([
  ['Jag tror att ett partis position i koordinatsystemet är felaktigt', 'party-position-incorrect'],
])
const partyIds = new Set(['v', 's', 'mp', 'c', 'l', 'm', 'kd', 'sd'])
const topicIds = new Set([
  'ekonomi',
  'valfard',
  'arbete',
  'bostad',
  'forsvar',
  'energi',
  'klimat',
  'lagordning',
  'migration',
  'frihet',
  'demokrati',
  'euvarld',
])

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.webp': 'image/webp',
}

function getPublicOrigin(request) {
  const configuredOrigin = process.env.SITE_URL?.trim()
  if (configuredOrigin) {
    try {
      const url = new URL(configuredOrigin)
      if (url.protocol === 'http:' || url.protocol === 'https:') return url.origin
    } catch {
      // Fall through to the request origin when SITE_URL is malformed.
    }
  }

  const forwardedProtocol = String(request.headers['x-forwarded-proto'] ?? '').split(',')[0].trim()
  const forwardedHost = String(request.headers['x-forwarded-host'] ?? '').split(',')[0].trim()
  const protocol = forwardedProtocol === 'https' ? 'https' : 'http'
  const host = forwardedHost || request.headers.host || `${HOST}:${PORT}`

  try {
    return new URL(`${protocol}://${host}`).origin
  } catch {
    return `http://${HOST}:${PORT}`
  }
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function addAbsoluteSeoUrls(html, origin) {
  const homeUrl = `${origin}/`
  const imageUrl = `${origin}/social-preview.png`

  return html
    .replaceAll('href="/" data-seo-origin', `href="${homeUrl}" data-seo-origin`)
    .replaceAll('content="/" data-seo-origin', `content="${homeUrl}" data-seo-origin`)
    .replaceAll('content="/social-preview.png" data-seo-origin', `content="${imageUrl}" data-seo-origin`)
    .replaceAll('"@id": "/#', `"@id": "${homeUrl}#`)
    .replaceAll('"url": "/"', `"url": "${homeUrl}"`)
    .replaceAll('"image": "/social-preview.png"', `"image": "${imageUrl}"`)
}

function sendRobots(request, response) {
  const origin = getPublicOrigin(request)
  const body = `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
  response.writeHead(200, {
    'content-type': mimeTypes['.txt'],
    'cache-control': 'public, max-age=3600',
  })
  response.end(body)
}

function sendSitemap(request, response) {
  const homeUrl = escapeXml(`${getPublicOrigin(request)}/`)
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${homeUrl}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
  response.writeHead(200, {
    'content-type': 'application/xml; charset=utf-8',
    'cache-control': 'public, max-age=3600',
  })
  response.end(body)
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

function isKnownQuestionId(value) {
  const match = /^([sv])(\d{2})$/.exec(value)
  if (!match) return false

  const number = Number(match[2])
  return match[1] === 's' ? number >= 1 && number <= 51 : number >= 1 && number <= 23
}

function validateFieldValue(field, value) {
  if (field.kind === 'party' && !partyIds.has(value)) return false
  if (field.kind === 'topic' && !topicIds.has(value)) return false
  if (field.kind === 'question' && !isKnownQuestionId(value)) return false
  if (field.kind === 'select' && !field.options?.some((option) => option.value === value)) return false
  return true
}

function validateDetails(reason, rawDetails) {
  if (!rawDetails || typeof rawDetails !== 'object' || Array.isArray(rawDetails)) {
    throw new Error('Feedbackens fält saknas eller har fel format.')
  }

  return reason.fields.map((field) => {
    const value = String(rawDetails[field.id] ?? '').trim()
    const minLength = Number(field.minLength ?? 1)
    const maxLength = Number(field.maxLength ?? 500)

    if (field.required && value.length === 0) {
      throw new Error(`Fyll i ”${field.label}”.`)
    }

    if (value && value.length < minLength) {
      throw new Error(`Skriv minst ${minLength} tecken i ”${field.label}”.`)
    }

    if (value.length > maxLength) {
      throw new Error(`”${field.label}” är för långt.`)
    }

    if (value && !validateFieldValue(field, value)) {
      throw new Error(`Välj ett giltigt alternativ i ”${field.label}”.`)
    }

    return { label: field.label, value: value || 'Ej angivet' }
  })
}

async function handleFeedback(request, response) {
  if (request.method !== 'POST') {
    sendJson(response, 405, { ok: false, error: 'Metoden stöds inte.' })
    return
  }

  try {
    const body = await readBody(request)
    const parsed = JSON.parse(body)
    const reasonInput = String(parsed.reason ?? '')
    const page = String(parsed.page ?? '').slice(0, 500)
    const legacyReasonId = legacyReasonIds.get(reasonInput)
    const reason = feedbackReasonsById.get(reasonInput)
      ?? feedbackReasonsByLabel.get(reasonInput)
      ?? (legacyReasonId ? feedbackReasonsById.get(legacyReasonId) : undefined)

    if (!reason) {
      sendJson(response, 400, { ok: false, error: 'Välj en giltig anledning.' })
      return
    }

    let detailEntries
    if (parsed.details) {
      detailEntries = validateDetails(reason, parsed.details)
    } else {
      const legacyMessage = String(parsed.message ?? '').trim()
      if (legacyMessage.length < 12) {
        sendJson(response, 400, { ok: false, error: 'Skriv gärna minst 12 tecken så att feedbacken går att förstå.' })
        return
      }
      detailEntries = [{ label: 'Meddelande', value: legacyMessage }]
    }

    await mkdir(FEEDBACK_DIR, { recursive: true })
    const receivedAt = new Date().toISOString()
    const fileStem = `${receivedAt.replace(/[:.]/g, '-')}-${sanitizeForFilename(reason.label)}-${randomUUID().slice(0, 8)}`
    const filePath = join(FEEDBACK_DIR, `${fileStem}.txt`)
    const detailLines = detailEntries.flatMap((entry) => [
      `${entry.label}:`,
      entry.value,
      '',
    ])
    const content = [
      'Partikartan feedback',
      `Received: ${receivedAt}`,
      `Reason: ${reason.label}`,
      `Reason ID: ${reason.id}`,
      `Page: ${page || 'Ej angiven'}`,
      '',
      'Details:',
      ...detailLines,
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
    const isHtml = extname(filePath) === '.html'
    const rawContent = await readFile(filePath, isHtml ? 'utf8' : undefined)
    const content = isHtml ? addAbsoluteSeoUrls(rawContent, getPublicOrigin(request)) : rawContent
    const isHashedAsset = requestedPath.startsWith('/assets/')
    response.writeHead(200, {
      'content-type': mimeTypes[extname(filePath)] ?? 'application/octet-stream',
      'cache-control': isHtml
        ? 'no-cache'
        : isHashedAsset
          ? 'public, max-age=31536000, immutable'
          : 'public, max-age=604800',
    })
    response.end(content)
  } catch {
    const fallback = await readFile(join(DIST_DIR, 'index.html'), 'utf8')
    response.writeHead(200, {
      'content-type': mimeTypes['.html'],
      'cache-control': 'no-cache',
    })
    response.end(addAbsoluteSeoUrls(fallback, getPublicOrigin(request)))
  }
}

const server = createServer(async (request, response) => {
  if (request.url?.startsWith('/api/feedback')) {
    await handleFeedback(request, response)
    return
  }

  if (request.url?.startsWith('/robots.txt')) {
    sendRobots(request, response)
    return
  }

  if (request.url?.startsWith('/sitemap.xml')) {
    sendSitemap(request, response)
    return
  }

  await serveStatic(request, response)
})

server.listen(PORT, HOST, () => {
  console.log(`Partikartan server listening at http://${HOST}:${PORT}/`)
})
