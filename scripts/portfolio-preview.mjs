import { createServer } from 'node:http'
import { readFile, realpath } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { parseEnv } from 'node:util'
import { createDecisionService, DecisionError } from './portfolio-decisions.mjs'

const directoryArg = process.argv.indexOf('--design-dir')
if (directoryArg < 0 || !process.argv[directoryArg + 1]) throw new Error('Pass --design-dir with the OpenDesign project directory.')
const directory = await realpath(resolve(process.argv[directoryArg + 1]))
const entryArg = process.argv.indexOf('--entry')
const entry = entryArg < 0 ? 'jerome-portfolio-v5.html' : process.argv[entryArg + 1]
if (!/^jerome-portfolio-v\d+\.html$/.test(entry || '')) throw new Error('Pass a portfolio HTML filename for --entry.')
// Deliberately read the newly provisioned key, not a different inherited process key.
const env = parseEnv(await readFile(new URL('../.env.local', import.meta.url), 'utf8'))
const decide = createDecisionService({ apiKey: env.OPENAI_API_KEY })
const port = 43117
const origins = new Set(['null', 'http://127.0.0.1:52047', 'http://localhost:52047', `http://127.0.0.1:${port}`])
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }
const server = createServer(async (req, res) => {
  const json = (status, data) => { res.writeHead(status, {'Content-Type': 'application/json', 'Cache-Control': 'no-store'}); res.end(JSON.stringify(data)) }
  try {
    const url = new URL(req.url, `http://127.0.0.1:${port}`)
    if (req.headers.host !== `127.0.0.1:${port}`) return json(403, { error: 'Local preview only.' })
    if (url.pathname === '/api/decision') {
      if (req.headers.origin && !origins.has(req.headers.origin)) return json(403, { error: 'This origin is not allowed.' })
      if (req.headers.origin) { res.setHeader('Access-Control-Allow-Origin', req.headers.origin); res.setHeader('Vary', 'Origin') }
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      if (req.method === 'OPTIONS') { res.writeHead(204); return res.end() }
      if (req.method !== 'POST') return json(405, { error: 'Use POST.' })
      if (!req.headers['content-type']?.startsWith('application/json')) return json(415, { error: 'Use application/json.' })
      const chunks = []
      let size = 0
      for await (const chunk of req) {
        size += chunk.length
        if (size > 8192) return json(413, { error: 'Request too large.' })
        chunks.push(chunk)
      }
      const body = Buffer.concat(chunks).toString('utf8')
      let input
      try { input = JSON.parse(body) } catch { return json(400, { error: 'Invalid JSON.' }) }
      return json(200, await decide(input))
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') return json(405, { error: 'Use GET.' })
    const pathname = decodeURIComponent(url.pathname)
    // Serve only the prototype and its assets, never workspace files or env files.
    if (pathname !== '/' && !/^\/jerome-portfolio-v\d+\.html$/.test(pathname) && !pathname.startsWith('/assets/')) return json(404, { error: 'Not found.' })
    const file = await realpath(resolve(directory, pathname === '/' ? entry : '.' + pathname))
    if (!file.startsWith(directory + sep)) return json(403, { error: 'Not found.' })
    if (pathname.startsWith('/assets/') && (!file.startsWith(directory + sep + 'assets' + sep) || pathname.split('/').some(part => part.startsWith('.')))) return json(403, { error: 'Not found.' })
    const content = await readFile(file)
    res.writeHead(200, {'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'})
    res.end(req.method === 'HEAD' ? undefined : content)
  } catch (error) {
    json(error instanceof DecisionError ? error.status : 500, { error: error instanceof DecisionError ? error.message : 'The preview could not complete this request.' })
  }
})
server.listen(port, '127.0.0.1', () => console.log(`Portfolio preview: http://127.0.0.1:${port}/#playground`))
