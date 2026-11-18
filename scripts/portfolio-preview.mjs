import { createServer } from 'node:http'
import { readFile, realpath } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'

const directoryArg = process.argv.indexOf('--design-dir')
if (directoryArg < 0 || !process.argv[directoryArg + 1]) throw new Error('Pass --design-dir with the OpenDesign project directory.')
const directory = await realpath(resolve(process.argv[directoryArg + 1]))
const entryArg = process.argv.indexOf('--entry')
const entry = entryArg < 0 ? 'jerome-portfolio-v5.html' : process.argv[entryArg + 1]
if (!/^jerome-portfolio-v\d+\.html$/.test(entry || '')) throw new Error('Pass a portfolio HTML filename for --entry.')
const port = 43117
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }
const server = createServer(async (req, res) => {
  const json = (status, data) => { res.writeHead(status, {'Content-Type': 'application/json', 'Cache-Control': 'no-store'}); res.end(JSON.stringify(data)) }
  try {
    const url = new URL(req.url, `http://127.0.0.1:${port}`)
    if (req.headers.host !== `127.0.0.1:${port}`) return json(403, { error: 'Local preview only.' })
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
  } catch {
    json(500, { error: 'The preview could not complete this request.' })
  }
})
server.listen(port, '127.0.0.1', () => console.log(`Portfolio preview: http://127.0.0.1:${port}/`))
