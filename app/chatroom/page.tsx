import type { Metadata } from 'next'
import Link from 'next/link'
import SiteShell from '@/components/site-shell'
import ChatroomBrowser from '@/components/chatroom-browser'
import { OnlineNow, UpdatedAt } from '@/components/live-widgets'
import { LINKS } from '@/lib/site'

export const metadata: Metadata = {
  title: '聊天室列表｜新版・舊版聊天室',
  description: '尋夢園聊天室列表：新版聊天室點擊直接進入，舊版聊天室沿用原登入頁。即時顯示每間聊天室在線人數。',
  alternates: { canonical: '/chatroom/' },
}

export default function ChatroomPage() {
  return (
    <SiteShell>
      <section className="container-x pb-8 pt-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted" aria-label="麵包屑">
          <Link href="/" className="hover:text-white">首頁</Link>
          <span>/</span>
          <span className="text-white">聊天室列表</span>
        </nav>
        <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-black sm:text-5xl">選擇喜歡的聊天室</h1>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-muted">
              <span className="live-dot" />
              現在有 <OnlineNow className="font-black text-live" /> 人在線上等你聊天
              <span className="text-xs text-muted/70">（<UpdatedAt />）</span>
            </p>
          </div>
          <div className="flex gap-3">
            <a href={LINKS.member} target="_blank" rel="noopener noreferrer" className="btn-outline px-5 py-2.5 text-sm">註冊／登入</a>
            <Link href="/rent/" className="btn-primary px-5 py-2.5 text-sm">我要當站長</Link>
          </div>
        </div>
        <ChatroomBrowser />
      </section>
    </SiteShell>
  )
}
