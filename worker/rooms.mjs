// 聊天室即時人數：Cloudflare Worker（worker/index.js）與 Docker 版 Node 伺服器（server/index.mjs）共用
import rooms from '../lib/rooms.json' with { type: 'json' };

const FETCH_TIMEOUT_MS = 6000;
const UA = 'Mozilla/5.0 (compatible; ek21-room-counter/1.0)';

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

export async function collectRooms() {
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

// 舊網址轉址
export const REDIRECTS = {
  '/blog/rent/': '/rent/',
  '/blog/rent': '/rent/',
  '/home/': '/',
  '/index.html': '/',
};
