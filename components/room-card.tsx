import type { Room } from '@/lib/site'

interface RoomCardProps {
  room: Room
  count: number | null
  loading?: boolean
  size?: 'lg' | 'md'
}

export function CountPill({ count, loading }: { count: number | null; loading?: boolean }) {
  if (loading) return <span className="skeleton inline-block h-6 w-16 rounded-full" />
  // 拿不到這間的人數（整個 API 失敗或該來源逾時）就不顯示，避免一直停在「更新中」
  if (count == null) return null
  const active = count > 0
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold backdrop-blur ${
      active ? 'bg-black/55 text-live' : 'bg-black/55 text-white/70'
    }`}>
      {active ? <span className="live-dot" /> : <span className="h-2 w-2 rounded-full bg-white/40" />}
      {active ? `${count.toLocaleString()} 人在線` : '等你來開聊'}
    </span>
  )
}

export default function RoomCard({ room, count, loading, size = 'md' }: RoomCardProps) {
  const isNew = room.version === 'new'
  return (
    <a
      href={room.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-deep transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-glow-lg"
      aria-label={`進入${room.name}（${isNew ? '新版' : '舊版'}聊天室）`}
    >
      {/* 圖片完整顯示（方形），文字放在圖片下方，不疊在圖上 */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={room.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute left-3 top-3">
          {isNew ? <span className="badge-new">新版</span> : <span className="badge-legacy">舊版</span>}
        </div>
        <div className="absolute right-3 top-3">
          <CountPill count={count} loading={loading} />
        </div>
      </div>
      <div className="relative p-4">
        <span className="mb-1 inline-block rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/80">{room.tag}</span>
        <h3 className={`truncate font-bold text-white ${size === 'lg' ? 'text-xl' : 'text-base'}`}>{room.name}</h3>
        <p className="mt-0.5 truncate text-xs text-muted">站長 {room.host}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-dream transition-all group-hover:gap-2">
          立即進入 <span aria-hidden>→</span>
        </span>
      </div>
    </a>
  )
}
