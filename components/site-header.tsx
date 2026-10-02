'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LINKS, NEW_TAB, SISTER_SITES } from '@/lib/site'

// internal: 本站頁面（Next 路由）；其餘（姊妹站）另開新分頁
const navLinks = [
  { href: '/#rooms', label: '聊天室', internal: true },
  { href: '/rent/', label: '承租聊天室', internal: true },
  { href: LINKS.news, label: '尋夢新聞', internal: false },
  { href: LINKS.dating, label: '交友聯誼', internal: false },
  { href: '/stored/', label: '儲值尋夢幣', internal: true },
  { href: '/about/', label: '關於尋夢園', internal: true },
]

function NavLink({ href, internal, className, children, onClick }: {
  href: string
  internal: boolean
  className: string
  children: React.ReactNode
  onClick?: () => void
}) {
  if (internal) return <Link href={href} className={className} onClick={onClick}>{children}</Link>
  return <a href={href} {...NEW_TAB} className={className} onClick={onClick}>{children}</a>
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname() || '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => href !== '/' && pathname.startsWith(href.replace(/\/$/, ''))

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* 尋夢園家族：姊妹站之間互相切換 */}
      <div className="bg-black/60 backdrop-blur border-b border-white/5 text-[12px]">
        <div className="container-x flex h-8 items-center justify-between gap-4">
          <nav aria-label="尋夢園家族" className="flex min-w-0 items-center gap-4 overflow-x-auto whitespace-nowrap [scrollbar-width:none]">
            {SISTER_SITES.map(s => (
              <a
                key={s.key}
                href={s.href}
                {...(s.key === 'home' ? {} : NEW_TAB)}
                className={s.key === 'home' ? 'font-bold text-white' : 'text-muted transition-colors hover:text-white'}
                aria-current={s.key === 'home' ? 'page' : undefined}
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="hidden shrink-0 items-center gap-4 sm:flex">
            <a href={LINKS.member} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white">會員中心<span className="ml-1 text-gold/80">舊版</span></a>
            <a href={LINKS.avatar} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white">頭像商城</a>
            <a href={LINKS.board} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white">留言板</a>
          </div>
        </div>
      </div>

      <div className={`border-b transition-colors duration-300 ${scrolled || open ? 'border-white/10 bg-night/85 backdrop-blur-xl' : 'border-transparent bg-transparent'}`}>
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3" aria-label="尋夢園聊天室 首頁">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-dream-gradient text-lg font-black shadow-glow transition-transform group-hover:rotate-6">夢</span>
            <span className="leading-tight">
              <span className="block text-lg font-black tracking-wide">尋夢園</span>
              <span className="block text-[11px] text-muted">全台最大匿名聊天室</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="主選單">
            {navLinks.map(l => (
              <NavLink
                key={l.href}
                href={l.href}
                internal={l.internal}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(l.href) ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={LINKS.login} target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2 text-sm font-semibold text-gray-200 transition-colors hover:bg-white/10 hover:text-white">登入</a>
            <a href={LINKS.register} target="_blank" rel="noopener noreferrer" className="btn-outline px-4 py-2 text-sm">註冊</a>
            <Link href="/#rooms" className="btn-primary px-5 py-2 text-sm">進入聊天室</Link>
          </div>

          <button
            className="rounded-xl p-2 text-white hover:bg-white/10 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? '關閉選單' : '開啟選單'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <div className="w-5 space-y-1.5">
              <span className={`block h-0.5 rounded bg-white transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 rounded bg-white transition-all duration-300 ${open ? 'scale-x-0 opacity-0' : ''}`} />
              <span className={`block h-0.5 rounded bg-white transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>

        <div id="mobile-nav" className={`overflow-hidden transition-[max-height] duration-300 lg:hidden ${open ? 'max-h-[560px]' : 'max-h-0'}`}>
          <div className="container-x space-y-1 border-t border-white/10 pb-5 pt-3">
            {navLinks.map(l => (
              <NavLink
                key={l.href}
                href={l.href}
                internal={l.internal}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm ${isActive(l.href) ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5'}`}
              >
                {l.label}
              </NavLink>
            ))}
            <div className="grid grid-cols-2 gap-2 px-1 pt-1 text-sm">
              <a href={LINKS.member} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white/5 px-4 py-3 text-gray-300">會員中心 <span className="text-gold/80">舊版</span></a>
              <a href={LINKS.avatar} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white/5 px-4 py-3 text-gray-300">頭像商城</a>
              <a href={LINKS.board} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white/5 px-4 py-3 text-gray-300">留言板</a>
            </div>
            <div className="flex gap-2 px-1 pt-3">
              <a href={LINKS.login} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 py-2.5 text-sm">登入</a>
              <a href={LINKS.register} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 py-2.5 text-sm">註冊</a>
              <Link href="/#rooms" onClick={() => setOpen(false)} className="btn-primary flex-1 py-2.5 text-sm">進入聊天室</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
