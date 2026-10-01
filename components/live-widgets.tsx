'use client'
import { useEffect, useRef, useState } from 'react'
import RoomCard from './room-card'
import { ROOMS, type Room } from '@/lib/site'
import { onlineCount, roomCount, useLiveRooms } from '@/lib/use-live-rooms'

// 數字變動時平滑滾動
export function AnimatedNumber({ value, className = '' }: { value: number; className?: string }) {
  const [shown, setShown] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    const start = from.current
    const diff = value - start
    if (diff === 0) return
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 900)
      const eased = 1 - Math.pow(1 - p, 3)
      setShown(Math.round(start + diff * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
      else from.current = value
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); from.current = value }
  }, [value])
  return <span className={`tabular-nums ${className}`}>{shown.toLocaleString()}</span>
}

export function OnlineNow({ className = '' }: { className?: string }) {
  const live = useLiveRooms()
  const n = onlineCount(live)
  if (n == null) return <span className={`skeleton inline-block h-[1em] w-[3ch] rounded align-middle ${className}`} />
  return <AnimatedNumber value={n} className={className} />
}

export function UpdatedAt() {
  const live = useLiveRooms()
  if (!live.data) return <span>{live.status === 'error' ? '暫時無法取得人數' : '人數讀取中…'}</span>
  const t = new Date(live.data.updatedAt)
  return <span>{t.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })} 更新・每 30 秒自動刷新</span>
}

function sortByLive(rooms: Room[], live: ReturnType<typeof useLiveRooms>) {
  return [...rooms].sort((a, b) => (roomCount(live, b.id) ?? -1) - (roomCount(live, a.id) ?? -1))
}

// 首頁右側：即時熱度排行
export function HotBoard({ limit = 5 }: { limit?: number }) {
  const live = useLiveRooms()
  const ranked = sortByLive(ROOMS, live).slice(0, limit)
  const max = Math.max(1, ...ranked.map(r => roomCount(live, r.id) ?? 0))
  return (
    <div className="glass-card relative overflow-hidden p-5 shadow-card sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="eyebrow"><span className="live-dot" /> LIVE</p>
          <h2 className="mt-1 text-lg font-black">現在最熱鬧的聊天室</h2>
        </div>
        <a href="/chatroom/" className="text-xs text-muted hover:text-white">全部 →</a>
      </div>
      <ol className="space-y-2.5">
        {ranked.map((r, i) => {
          const n = roomCount(live, r.id)
          return (
            <li key={r.id}>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5">
                <span className={`w-5 text-center text-sm font-black ${i === 0 ? 'text-gold' : i < 3 ? 'text-dream' : 'text-muted'}`}>{i + 1}</span>
                <img src={r.image} alt="" className="h-11 w-11 shrink-0 rounded-xl object-cover" loading="lazy" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold group-hover:text-white">{r.name}</span>
                    {r.version === 'new' ? <span className="badge-new">新版</span> : <span className="badge-legacy">舊版</span>}
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-dream-gradient transition-[width] duration-700" style={{ width: `${n ? Math.max(6, (n / max) * 100) : 0}%` }} />
                  </div>
                </div>
                <span className="w-14 text-right text-sm font-bold tabular-nums text-live">
                  {live.status === 'loading' ? <span className="skeleton inline-block h-4 w-8 rounded" /> : n == null ? '—' : n.toLocaleString()}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
      <p className="mt-4 text-[11px] text-muted"><UpdatedAt /></p>
    </div>
  )
}

export function LiveRoomGrid({ rooms, size, sort = false }: { rooms: Room[]; size?: 'lg' | 'md'; sort?: boolean }) {
  const live = useLiveRooms()
  const list = sort ? sortByLive(rooms, live) : rooms
  return (
    <>
      {list.map(r => (
        <RoomCard key={r.id} room={r} size={size} count={roomCount(live, r.id)} loading={live.status === 'loading'} />
      ))}
    </>
  )
}

export function VersionTotal({ rooms }: { rooms: Room[] }) {
  const live = useLiveRooms()
  if (!live.data) return <span className="skeleton inline-block h-4 w-10 rounded align-middle" />
  const sum = rooms.reduce((a, r) => a + (roomCount(live, r.id) ?? 0), 0)
  return <AnimatedNumber value={sum} />
}
