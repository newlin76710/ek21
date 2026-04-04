import Link from 'next/link'

const footerLinks = [
  { href: '/about', label: '關於我們' },
  { href: '/about/privacy', label: '隱私權條款' },
  { href: '/blog/problem', label: '常見問題' },
  { href: '/blog/advertisement', label: '廣告合作' },
  { href: '/blog/opinion', label: '意見反應' },
]

export default function SiteFooter() {
  return (
    <footer className="bg-deep border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-dream-gradient flex items-center justify-center">
                <span className="text-white font-bold text-lg">夢</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg leading-none">尋夢園聊天室</span>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              台灣最大匿名聊天室<br />
              超過 312 萬名會員<br />
              免費交友・聊天・KTV歌唱
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速連結</h3>
            <ul className="space-y-2">
              {footerLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">聯絡我們</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>Email: <a href="mailto:mkt@ek21.com" className="hover:text-white transition-colors">mkt@ek21.com</a></li>
              <li>
                <a
                  href="https://line.me/R/ti/p/%40fip4700n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LINE 官方帳號
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://line.me/R/ti/p/%40fip4700n" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-xs hover:bg-white/20 transition-colors">
                LINE
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-xs hover:bg-white/20 transition-colors">
                FB
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} 昱科網路股份有限公司 統編: 70525697
          </p>
          <p className="text-muted text-xs">
            All rights reserved. ek21.com
          </p>
        </div>
      </div>
    </footer>
  )
}
