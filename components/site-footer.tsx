import Link from 'next/link'
import Slogan from './slogan'
import { LINKS, SISTER_SITES } from '@/lib/site'

const aboutLinks = [
  { href: '/about/', label: '關於尋夢園' },
  { href: '/about/privacy/', label: '隱私權條款' },
  { href: '/blog/problem/', label: '常見問題' },
  { href: '/blog/advertisement/', label: '異業合作' },
  { href: '/blog/opinion/', label: '意見回饋' },
  { href: '/contact/', label: '聯絡我們' },
]

const serviceLinks = [
  { href: '/#rooms', label: '聊天室列表', internal: true },
  { href: '/rent/', label: '承租聊天室', internal: true },
  { href: '/stored/', label: '儲值尋夢幣', internal: true },
  { href: LINKS.member, label: '會員中心（舊版）', internal: false },
  { href: LINKS.avatar, label: '頭像商城（舊版）', internal: false },
  { href: LINKS.board, label: '留言板（舊版）', internal: false },
]

export default function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-deep/60">
      <div className="container-x py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-dream-gradient text-lg font-black">夢</span>
              <span className="text-lg font-black">尋夢園聊天室</span>
            </div>
            <Slogan className="mb-3 text-sm" />
            <p className="text-sm leading-7 text-muted">
              全台最大匿名聊天室。<br />
              上百間主題聊天室，隨時隨地找到志同道合的好友。
            </p>
            <div className="mt-5 flex gap-3">
              <a href={LINKS.line} target="_blank" rel="noopener noreferrer" className="btn-line px-4 py-2 text-sm">LINE 官方帳號</a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold tracking-widest text-white/80">服務</h3>
            <ul className="space-y-2.5 text-sm">
              {serviceLinks.map(l => (
                <li key={l.href}>
                  {l.internal
                    ? <Link href={l.href} className="text-muted transition-colors hover:text-white">{l.label}</Link>
                    : <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-white">{l.label}</a>}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold tracking-widest text-white/80">尋夢園家族</h3>
            <ul className="space-y-2.5 text-sm">
              {SISTER_SITES.filter(s => s.key !== 'home').map(s => (
                <li key={s.key}><a href={s.href} className="text-muted transition-colors hover:text-white">{s.label}</a></li>
              ))}
              <li><a href="https://www.rainbownumen.org/" target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-white">彩虹數字</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold tracking-widest text-white/80">關於</h3>
            <ul className="space-y-2.5 text-sm">
              {aboutLinks.map(l => (
                <li key={l.href}><Link href={l.href} className="text-muted transition-colors hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} 昱科網路股份有限公司 ／ 統編：70525697</p>
          <p>
            有任何問題？<Link href="/contact/" className="text-glow hover:text-white">填寫聯絡表單</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
