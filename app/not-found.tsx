import Link from 'next/link'
import SiteShell from '@/components/site-shell'

export default function NotFound() {
  return (
    <SiteShell>
      <div className="flex min-h-[70vh] items-center justify-center px-4 text-center">
        <div>
          <div className="gradient-text mb-4 text-8xl font-black">404</div>
          <h1 className="mb-3 text-2xl font-black">找不到這個頁面</h1>
          <p className="mb-8 text-muted">你迷路了嗎？讓我們帶你回到夢的起點。</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-primary">回到首頁</Link>
            <Link href="/#rooms" className="btn-outline">前往聊天室</Link>
          </div>
        </div>
      </div>
    </SiteShell>
  )
}
