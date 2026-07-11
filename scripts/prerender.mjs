import { readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve('.')
const htmlPath = resolve(root, 'dist', 'index.html')
const serverEntryPath = resolve(root, 'dist-ssr', 'entry-server.js')
const { render } = await import(pathToFileURL(serverEntryPath).href)
const html = await readFile(htmlPath, 'utf8')
const marker = '<div id="root"></div>'

if (!html.includes(marker)) {
  throw new Error('Kunde inte hitta appens rot-element i dist/index.html.')
}

const prerendered = html.replace(marker, `<div id="root">${render()}</div>`)
await writeFile(htmlPath, prerendered, 'utf8')
await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true })
