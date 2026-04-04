import Link from 'next/link'

interface RoomCardProps {
  name: string
  category: string
  users: number
  description?: string
}

export default function RoomCard({ name, category, users }: RoomCardProps) {
  const isActive = users > 0
  return (
    <Link href="/chatroom" className="glass-card p-4 hover:border-dream/40 hover:shadow-glow transition-all duration-300 block group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-dream-gradient flex items-center justify-center text-white font-bold text-sm group-hover:shadow-glow transition-all">
          {name.charAt(0)}
        </div>
        <div className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
          isActive ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-muted'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-muted'}`} />
          {isActive ? `${users} 人在線` : '等待中'}
        </div>
      </div>
      <h3 className="text-white font-semibold text-sm mb-1 truncate">{name}</h3>
      <span className="text-xs text-dream/80 bg-dream/10 px-2 py-0.5 rounded-full">{category}</span>
    </Link>
  )
}
