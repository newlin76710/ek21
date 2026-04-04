'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/chatroom', label: '聊天室' },
  { href: '/dating', label: '交友聯誼' },
  { href: '/rent', label: '承租聊天室' },
  { href: '/stored', label: '儲值尋夢幣' },
  { href: '/news', label: '尋夢新聞' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-dream-gradient flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all">
              <Image
                src="https://www.ek21.com/images/logo/logo_w.png"
                alt="尋夢園"
                width={28}
                height={28}
                className="object-contain"
                unoptimized
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <div>
              <span className="text-white font-bold text-lg leading-none">尋夢園</span>
              <span className="text-glow/70 text-xs block leading-none">聊天室</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(l.href)
                    ? 'text-white bg-dream/20 border border-dream/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="http://member.ek21.com/" className="btn-outline text-sm py-2">
              登入 / 註冊
            </Link>
            <Link href="/chatroom" className="btn-primary text-sm py-2">
              立即進入聊天室
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label={open ? '關閉選單' : '開啟選單'}
            aria-expanded={open}
          >
            <div className="w-5 space-y-1.5">
              <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-4' : 'max-h-0'}`}>
          <div className="border-t border-white/10 pt-4 space-y-1">
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive(l.href) ? 'text-white bg-dream/20' : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2 px-4">
              <Link href="http://member.ek21.com/" className="btn-outline text-sm py-2 flex-1 text-center">
                登入 / 註冊
              </Link>
              <Link href="/chatroom" className="btn-primary text-sm py-2 flex-1 text-center">
                進入聊天室
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
