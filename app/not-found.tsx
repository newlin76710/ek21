import Link from 'next/link'
import SiteShell from '@/components/site-shell'

export default function NotFound() {
  return (
    <SiteShell>
      <div className="min-h-[70vh] flex items-center justify-center text-center px-4">
        <div>
          <div className="text-8xl font-bold gradient-text mb-4">404</div>
          <h1 className="text-2xl font-bold text-white mb-3">找不到頁面</h1>
          <p className="text-muted mb-8">你迷路了嗎？讓我們帶你回到夢的起點</p>
          <Link href="/" className="btn-primary">
            回到首頁
          </Link>
        </div>
      </div>
    </SiteShell>
  )
}
