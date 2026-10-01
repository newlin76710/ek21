import type { Metadata } from 'next'
import SiteShell from '@/components/site-shell'
import { LINKS } from '@/lib/site'

export const metadata: Metadata = {
  title: '儲值尋夢幣',
  description: '尋夢幣可於頭像中心購買頭貼，或擴增留言板等功能。尋夢幣 100 元起，匯款後來信即可轉點。',
  alternates: { canonical: '/stored/' },
}

const packages = [100, 300, 500, 1000]

const mailBody = ['聯絡人 email：', '匯款帳號末五碼：', '匯款時間：', '匯款金額：', '要轉點的會員編號：'].join('\n')
const mailto = `mailto:${LINKS.email}?subject=${encodeURIComponent('尋夢幣儲值轉點')}&body=${encodeURIComponent(mailBody)}`

export default function StoredPage() {
  return (
    <SiteShell>
      <section className="container-x max-w-4xl py-12">
        <div className="mb-12 text-center">
          <p className="eyebrow">STORED</p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">尋夢幣儲值</h1>
          <p className="mt-4 text-lg text-muted">
            尋夢幣可以於<a href={LINKS.avatar} target="_blank" rel="noopener noreferrer" className="text-glow hover:underline">頭像商城（舊版）</a>購買頭貼，或擴增留言板等功能。
          </p>
        </div>

        <h2 className="mb-4 font-bold">儲值金額</h2>
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {packages.map(n => (
            <div key={n} className="glass-card p-6 text-center">
              <div className="text-3xl">💰</div>
              <div className="gradient-text mt-2 text-3xl font-black">{n.toLocaleString()}</div>
              <div className="text-sm text-muted">尋夢幣</div>
              <div className="mt-3 text-sm font-bold">匯款 NT${n.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-card p-6">
            <h2 className="mb-4 text-lg font-bold">① 匯款帳號</h2>
            <dl className="space-y-3 rounded-2xl bg-white/5 p-4 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-muted">銀行</dt><dd>玉山銀行（808）基隆路分行</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">戶名</dt><dd>林正立</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">帳號</dt><dd className="font-mono tracking-wider">0118968926561</dd></div>
            </dl>
          </div>
          <div className="glass-card p-6">
            <h2 className="mb-4 text-lg font-bold">② 匯款完成後來信</h2>
            <p className="text-sm text-gray-300">請來信至 <a href={mailto} className="font-bold text-dream hover:underline">{LINKS.email}</a>，並註明：</p>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-300">
              {['聯絡人 email', '匯款帳號末五碼', '匯款時間', '匯款金額', '要轉點的會員編號'].map(t => (
                <li key={t} className="flex gap-2"><span className="text-live">✓</span>{t}</li>
              ))}
            </ul>
            <a href={mailto} className="btn-primary mt-5 w-full text-sm">✉️ 一鍵寄出轉點信</a>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-muted">我們收到信且核對完成後，將會撥款尋夢幣到您的會員編號。</p>
      </section>
    </SiteShell>
  )
}
