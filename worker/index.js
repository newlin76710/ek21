// 網站本體是純靜態檔案（next build 的 output: 'export'，輸出在 out/），由 Workers Static Assets 直接回應。
// 這支程式只在兩種情況執行：
// 1. /api/*（wrangler.toml 的 run_worker_first）→ /api/rooms 回傳各聊天室即時人數，其他 /api/* 交給舊主機
// 2. 找不到對應靜態檔案 → 舊網址轉址；ek21.com 上的舊路徑（/login/、/blog/、/home/images/…）交給舊主機；其餘回 404 頁
//
// /dating*、/news* 由姊妹站 dating、ek21news 各自的 Worker Route 處理（路由較長者優先），不會進到這裡。
import rooms from '../lib/rooms.json';

const CACHE_SECONDS = 30;
const FETCH_TIMEOUT_MS = 6000;
const UA = 'Mozilla/5.0 (compatible; ek21-room-counter/1.0)';

// 這些網域背後還有舊站主機，靜態檔案沒有的路徑就轉給舊主機（舊版聊天室登入頁會引用 ek21.com/login/ 的檔案）
const LEGACY_ORIGIN_HOSTS = new Set(['ek21.com', 'www.ek21.com']);

const REDIRECTS = {
  '/blog/rent/': '/rent/',
  '/blog/rent': '/rent/',
  '/home/': '/',
  '/index.html': '/',
};

// 舊版聊天室：登入頁上的「目前人數 N 人」。頁面是 Big5，數字與標籤都是 ASCII，直接以位元組比對即可，不必解碼。
async function legacyCount(room) {
  const res = await fetch(`http://${room.server}/${room.id}/?ot=1`, {
    headers: { 'user-agent': UA },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) return null;
  const bytes = new Uint8Array(await res.arrayBuffer());
  let text = '';
  for (let i = 0; i < bytes.length; i += 8192) text += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192));
  const m = text.match(/class="roomnum">\s*[^0-9<]*([0-9]+)/);
  return m ? Number(m[1]) : null;
}

// 新版聊天室：chatroom-backend 的線上名單
async function modernCount(room) {
  const res = await fetch(`https://chatroom-backend.ek21.com/getRoomUsers?room=${encodeURIComponent(room.id)}`, {
    headers: { 'user-agent': UA, accept: 'application/json' },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data.users) ? data.users.length : null;
}

const safe = (p) => p.then((v) => v, () => null);

async function collectRooms() {
  const counts = await Promise.all(rooms.map((r) => safe(r.version === 'legacy' ? legacyCount(r) : modernCount(r))));
  const data = { updatedAt: new Date().toISOString(), online: 0, rooms: {} };
  rooms.forEach((r, i) => {
    data.rooms[r.id] = counts[i];
    data.online += counts[i] ?? 0;
  });
  // 舊站的 /api/online_chat.js 被 CDN 快取 4 小時，數字不即時，所以在線人數改用各聊天室加總
  if (counts.every((n) => n == null)) data.online = null;
  return data;
}

async function roomsApi(request, ctx) {
  const cache = caches.default;
  const key = new Request(new URL('/api/rooms', request.url).toString());
  const hit = await cache.match(key);
  if (hit) return hit;

  const res = new Response(JSON.stringify(await collectRooms()), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': `public, max-age=${CACHE_SECONDS}`,
      'access-control-allow-origin': '*',
    },
  });
  ctx.waitUntil(cache.put(key, res.clone()));
  return res;
}

async function notFound(env, url) {
  const page = await env.ASSETS.fetch(new URL('/404.html', url));
  return new Response(page.body, { status: 404, headers: page.headers });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/rooms') return roomsApi(request, ctx);

    const to = REDIRECTS[url.pathname];
    if (to) return Response.redirect(new URL(to + url.search, url).toString(), 301);

    if (LEGACY_ORIGIN_HOSTS.has(url.hostname)) {
      // 同一個 zone 的子請求會直接送到舊主機，不會再進這支 Worker
      const legacy = await fetch(request).catch(() => null);
      if (legacy && legacy.status < 500 && legacy.status !== 404) return legacy;
    }

    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'not found' }), { status: 404, headers: { 'content-type': 'application/json' } });
    }
    return notFound(env, url);
  },
};
