// Docker 版伺服器：取代 Cloudflare Workers，自己提供靜態網站與 /api/rooms。
// - 靜態檔案：next build 輸出的 out/（行為對齊 Workers Static Assets 的 auto-trailing-slash）
// - /api/rooms：與 Worker 共用 worker/rooms.mjs；記憶體快取 60 秒、同時只抓一次，來源失敗時沿用上一次的資料
// - HTTP_PORT（預設 80）與 HTTPS_PORT（預設 443，需要 TLS_CERT / TLS_KEY）
// - LEGACY_ORIGIN（選填）：本站沒有的路徑轉給舊站主機，例如 http://1.2.3.4
// 只用 Node 內建模組，執行時不需要 npm install。
import http from 'node:http'
import https from 'node:https'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'
import { collectRooms, REDIRECTS } from '../worker/rooms.mjs'

const ROOT = path.resolve(process.env.STATIC_DIR || path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'out'))
const HTTP_PORT = Number(process.env.HTTP_PORT || 80)
const HTTPS_PORT = Number(process.env.HTTPS_PORT || 443)
const TLS_CERT = process.env.TLS_CERT || '/certs/cert.pem'
const TLS_KEY = process.env.TLS_KEY || '/certs/key.pem'
const LEGACY_ORIGIN = (process.env.LEGACY_ORIGIN || '').replace(/\/$/, '')
const ROOMS_TTL_MS = 60_000

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
}
const COMPRESSIBLE = new Set(['.html', '.txt', '.js', '.css', '.json', '.xml', '.svg'])

const log = (...a) => console.log(new Date().toISOString(), ...a)

// ── /api/rooms ────────────────────────────────────────────────
let roomsCache = null // { body, at }
let roomsInflight = null

async function getRooms() {
  if (roomsCache && Date.now() - roomsCache.at < ROOMS_TTL_MS) return roomsCache.body
  if (!roomsInflight) {
    roomsInflight = collectRooms()
      .then(data => {
        // 這次全部抓失敗就沿用上一次成功的資料
        if (data.online == null && roomsCache) return roomsCache.body
        const body = JSON.stringify(data)
        roomsCache = { body, at: Date.now() }
        return body
      })
      .finally(() => { roomsInflight = null })
  }
  return roomsInflight
}

async function roomsApi(req, res) {
  try {
    send(req, res, 200, await getRooms(), {
      'content-type': TYPES['.json'],
      'cache-control': 'public, max-age=30',
      'access-control-allow-origin': '*',
    }, '.json')
  } catch (e) {
    log('rooms error', e?.message)
    send(req, res, 503, JSON.stringify({ error: 'unavailable' }), { 'content-type': TYPES['.json'], 'cache-control': 'no-store' })
  }
}

// ── 回應工具 ──────────────────────────────────────────────────
function send(req, res, status, body, headers = {}, ext = '') {
  const buf = Buffer.isBuffer(body) ? body : Buffer.from(body)
  const accept = String(req.headers['accept-encoding'] || '')
  if (COMPRESSIBLE.has(ext) && buf.length > 1024 && /\bgzip\b/.test(accept)) {
    const gz = zlib.gzipSync(buf)
    res.writeHead(status, { ...headers, 'content-encoding': 'gzip', vary: 'Accept-Encoding', 'content-length': gz.length })
    return res.end(req.method === 'HEAD' ? undefined : gz)
  }
  res.writeHead(status, { ...headers, 'content-length': buf.length })
  res.end(req.method === 'HEAD' ? undefined : buf)
}

function redirect(res, status, location) {
  res.writeHead(status, { location, 'cache-control': 'no-cache' })
  res.end()
}

function cacheControl(urlPath, ext) {
  if (urlPath.startsWith('/_next/static/')) return 'public, max-age=31536000, immutable'
  if (urlPath.startsWith('/img/')) return 'public, max-age=604800'
  if (ext === '.html' || ext === '.txt') return 'public, max-age=0, must-revalidate'
  return 'public, max-age=3600'
}

async function fileAt(p) {
  try {
    const st = await fsp.stat(p)
    return st.isFile() ? p : null
  } catch {
    return null
  }
}

// 找對應的靜態檔：/a/ → a/index.html；/a → 轉址到 /a/；/a.html 也可直接讀
async function resolveStatic(urlPath) {
  const rel = path.normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, '')
  const abs = path.join(ROOT, rel)
  if (!abs.startsWith(ROOT)) return { file: null }
  if (urlPath.endsWith('/')) return { file: await fileAt(path.join(abs, 'index.html')) }
  const direct = await fileAt(abs)
  if (direct) return { file: direct }
  if (await fileAt(path.join(abs, 'index.html'))) return { redirectTo: urlPath + '/' }
  return { file: await fileAt(abs + '.html') }
}

async function serveFile(req, res, file, urlPath, status = 200) {
  const ext = path.extname(file).toLowerCase()
  const body = await fsp.readFile(file)
  send(req, res, status, body, {
    'content-type': TYPES[ext] || 'application/octet-stream',
    'cache-control': status === 200 ? cacheControl(urlPath, ext) : 'no-cache',
    'x-content-type-options': 'nosniff',
  }, ext)
}

// 本站沒有的路徑轉給舊站主機（保留原本的 Host）
function proxyLegacy(req, res) {
  return new Promise(resolve => {
    const target = new URL(req.url, LEGACY_ORIGIN)
    const client = target.protocol === 'https:' ? https : http
    const up = client.request(target, {
      method: req.method,
      headers: { ...req.headers, 'x-forwarded-for': clientIp(req) },
      timeout: 8000,
    }, upRes => {
      if ((upRes.statusCode || 500) >= 500 || upRes.statusCode === 404) {
        upRes.resume()
        return resolve(false)
      }
      res.writeHead(upRes.statusCode || 200, upRes.headers)
      upRes.pipe(res)
      upRes.on('end', () => resolve(true))
    })
    up.on('timeout', () => up.destroy())
    up.on('error', () => resolve(false))
    req.pipe(up)
  })
}

const clientIp = req =>
  String(req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim()

async function notFound(req, res) {
  const page = path.join(ROOT, '404.html')
  if (await fileAt(page)) return serveFile(req, res, page, '/404.html', 404)
  send(req, res, 404, 'Not Found', { 'content-type': TYPES['.txt'] })
}

// ── 主路由 ────────────────────────────────────────────────────
async function handle(req, res) {
  const url = new URL(req.url || '/', 'http://localhost')
  const p = url.pathname

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (LEGACY_ORIGIN && (await proxyLegacy(req, res))) return
    res.writeHead(405, { allow: 'GET, HEAD' })
    return res.end()
  }

  if (p === '/healthz') return send(req, res, 200, 'ok', { 'content-type': TYPES['.txt'], 'cache-control': 'no-store' })
  if (p === '/api/rooms') return roomsApi(req, res)

  const to = REDIRECTS[p]
  if (to) return redirect(res, 301, to + url.search)

  const found = await resolveStatic(p)
  if (found.redirectTo) return redirect(res, 308, found.redirectTo + url.search)
  if (found.file) return serveFile(req, res, found.file, p)

  if (LEGACY_ORIGIN && (await proxyLegacy(req, res))) return
  if (p.startsWith('/api/')) return send(req, res, 404, JSON.stringify({ error: 'not found' }), { 'content-type': TYPES['.json'] })
  return notFound(req, res)
}

function listener(req, res) {
  handle(req, res).catch(e => {
    log('error', req.url, e?.stack || e)
    if (!res.headersSent) send(req, res, 500, 'Internal Server Error', { 'content-type': TYPES['.txt'] })
    else res.destroy()
  })
}

http.createServer(listener).listen(HTTP_PORT, () => log(`http  :${HTTP_PORT}  root=${ROOT}${LEGACY_ORIGIN ? `  legacy=${LEGACY_ORIGIN}` : ''}`))

if (HTTPS_PORT && fs.existsSync(TLS_CERT) && fs.existsSync(TLS_KEY)) {
  https
    .createServer({ cert: fs.readFileSync(TLS_CERT), key: fs.readFileSync(TLS_KEY) }, listener)
    .listen(HTTPS_PORT, () => log(`https :${HTTPS_PORT}  cert=${TLS_CERT}`))
} else {
  log(`https disabled (no ${TLS_CERT} / ${TLS_KEY})`)
}

// 開機先抓一次人數，第一位訪客不用等
getRooms().catch(() => {})

for (const sig of ['SIGTERM', 'SIGINT']) process.on(sig, () => process.exit(0))
