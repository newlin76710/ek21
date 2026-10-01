// 網站本體是純靜態檔案（next build 的 output: 'export'，輸出在 out/），由 Workers Static Assets 直接回應。
// 這支程式只在兩種情況執行：
// 1. /api/*（wrangler.toml 的 run_worker_first）→ /api/rooms 回傳各聊天室即時人數，其他 /api/* 交給舊主機
// 2. 找不到對應靜態檔案 → 舊網址轉址；ek21.com 上的舊路徑（/login/、/blog/、/home/images/…）交給舊主機；其餘回 404 頁
//
// /dating*、/news* 由姊妹站 dating、ek21news 各自的 Worker Route 處理（路由較長者優先），不會進到這裡。
// Docker 版（server/index.mjs）使用同一份 rooms.mjs。
import { collectRooms, REDIRECTS } from './rooms.mjs';

const CACHE_SECONDS = 60;

// 這些網域背後還有舊站主機，靜態檔案沒有的路徑就轉給舊主機（舊版聊天室登入頁會引用 ek21.com/login/ 的檔案）
const LEGACY_ORIGIN_HOSTS = new Set(['ek21.com', 'www.ek21.com']);

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
