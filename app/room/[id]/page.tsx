import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteShell from '@/components/site-shell'
import LegacyLoginForm from '@/components/legacy-login-form'
import { RoomLiveCount } from '@/components/live-widgets'
import { LEGACY_ROOMS, LINKS } from '@/lib/site'

// 舊版聊天室登入頁（取代 ipXX.ek21.com/<房號>/?ot=1 那頁），每間舊版聊天室各產生一頁
export const dynamicParams = false

export function generateStaticParams() {
  return LEGACY_ROOMS.map(r => ({ id: r.id }))
}

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const room = LEGACY_ROOMS.find(r => r.id === id)
  if (!room) return {}
  return {
    title: `${room.name}｜舊版聊天室`,
    description: `進入尋夢園舊版聊天室「${room.name}」，會員輸入密碼、非會員輸入暱稱即可聊天。`,
    alternates: { canonical: `/room/${room.id}/` },
  }
}

export default async function RoomLoginPage({ params }: Props) {
  const { id } = await params
  const room = LEGACY_ROOMS.find(r => r.id === id)
  if (!room) notFound()

  return (
    <SiteShell>
      <section className="container-x max-w-4xl py-10">
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted" aria-label="麵包屑">
          <Link href="/" className="hover:text-white">首頁</Link>
          <span>/</span>
          <Link href="/#legacy" className="hover:text-white">舊版聊天室</Link>
          <span>/</span>
          <span className="text-white">{room.name}</span>
        </nav>

        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-deep md:grid-cols-2">
          <div className="relative">
            <img src={room.image} alt={room.name} className="aspect-square h-full w-full object-cover" />
            <span className="badge-legacy absolute left-4 top-4">舊版</span>
          </div>
          <div className="flex flex-col p-6 sm:p-8">
            <h1 className="text-2xl font-black sm:text-3xl">{room.name}</h1>
            <p className="mt-1 text-sm text-muted">站長 {room.host}</p>
            <p className="mt-3 text-sm"><RoomLiveCount id={room.id} /></p>
            <div className="mt-6">
              <LegacyLoginForm room={room} />
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          第一次來？看看<a href={LINKS.legacyGuide} target="_blank" rel="noopener noreferrer" className="text-glow hover:underline">舊版聊天室教學</a>
        </p>
      </section>
    </SiteShell>
  )
}
