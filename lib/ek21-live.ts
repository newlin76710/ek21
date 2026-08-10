// Mirrors how ek21.com's own chatroom page sources its numbers:
// - total online: /api/online_chat.js -> `var online_chat = N;`
// - most rooms: /api/online_ekc.js -> `oekc['<code>'] = N;` (internal room codes)
// - a handful of "新版" rooms: chatroom-backend.ek21.com/getRoomUsers?room=<slug> -> { users: [...] }
// Room names with no known code/slug on the live site have no real source and resolve to null.

const LEGACY_ROOM_CODES: Record<string, string> = {
  '海神~': 'ofi_11',
  '幻紫霓蹤': 'age_15',
  '水浮萍': 'oaca_2',
  '魔力學園': 'ofi_6',
  '你依然在我心深處': 'oaca_16',
  '幸福海洋': 'oeb_10',
  '淡泊': 'sun_8',
  '貓遇上魚': 'oeb_16',
  '忘塵谷': 'vi_25',
}

const LIVE_ROOM_SLUGS: Record<string, string> = {
  '平風造雨四無君': 'boygirl',
  '聽風的歌': 'windsong',
  '神樂天心': 'starnight',
}

async function fetchTotalOnline(): Promise<number | null> {
  try {
    const res = await fetch('https://www.ek21.com/api/online_chat.js')
    const text = await res.text()
    const match = text.match(/online_chat\s*=\s*(\d+)/)
    return match ? Number(match[1]) : null
  } catch {
    return null
  }
}

async function fetchLegacyCounts(): Promise<Record<string, number>> {
  try {
    const res = await fetch('https://www.ek21.com/api/online_ekc.js')
    const text = await res.text()
    const counts: Record<string, number> = {}
    for (const m of text.matchAll(/oekc\['(\w+)'\]\s*=\s*(\d+)/g)) {
      counts[m[1]] = Number(m[2])
    }
    return counts
  } catch {
    return {}
  }
}

async function fetchLiveRoomCount(slug: string): Promise<number | null> {
  try {
    const res = await fetch(`https://chatroom-backend.ek21.com/getRoomUsers?room=${encodeURIComponent(slug)}`)
    const data = await res.json()
    return Array.isArray(data.users) ? data.users.length : null
  } catch {
    return null
  }
}

export interface LiveRoomData {
  total: number | null
  rooms: Record<string, number | null>
}

export async function getLiveRoomData(roomNames: string[]): Promise<LiveRoomData> {
  const liveNames = roomNames.filter(n => LIVE_ROOM_SLUGS[n])

  const [total, legacy, liveResults] = await Promise.all([
    fetchTotalOnline(),
    fetchLegacyCounts(),
    Promise.all(liveNames.map(n => fetchLiveRoomCount(LIVE_ROOM_SLUGS[n]))),
  ])

  const rooms: Record<string, number | null> = {}
  liveNames.forEach((name, i) => { rooms[name] = liveResults[i] })

  for (const name of roomNames) {
    if (name in rooms) continue
    const code = LEGACY_ROOM_CODES[name]
    rooms[name] = code ? legacy[code] ?? 0 : null
  }

  return { total, rooms }
}
