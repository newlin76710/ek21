import type { Metadata } from 'next'
import Link from 'next/link'
import SiteShell from '@/components/site-shell'
import FadeIn from '@/components/fade-in'
import { PLANS } from '@/lib/plans'
import { LINKS } from '@/lib/site'

export const metadata: Metadata = {
  title: '承租聊天室・成為站長',
  description: '在尋夢園裡，輕鬆讓您當百人聊天室的站長。50 人聊天室每月 NT$500、100 人 NT$1,000、150 人 NT$1,500。',
  alternates: { canonical: '/rent/' },
}

const abilities = [
  { icon: '📡', title: '經營個人頻道', desc: '站長可以獲得獨立聊天室，自由經營，設立各種活動、規則及遊戲。' },
  { icon: '🎤', title: '隨時歡樂活動', desc: '站長可自由舉辦各式站內活動，KTV 歌唱比賽、網聚活動，並由總站協助宣傳。' },
  { icon: '🛡️', title: '任意分派權限', desc: '站長可分配等級權限給會員，並自由安排網友為管理員，共同管理維護聊天室。' },
]

const perks = [
  { icon: '/img/home/Bicon-1.png', title: '聊天室公佈欄', desc: '自訂聊天室公告' },
  { icon: '/img/home/Bicon-2.png', title: '聊天等級管理', desc: '分派聊天室會員等級' },
  { icon: '/img/home/Bicon-3.png', title: '指定聊天室管理員', desc: '聊天內容過濾管理' },
  { icon: '/img/home/Bicon-4.png', title: '自定廣告版位欄', desc: '免費曝光版位' },
  { icon: '/img/home/Bicon-5.png', title: '專屬聊天室名稱', desc: '獨一無二的聊天室名' },
]

const mailBody = [
  '您好，我想承租尋夢園新版聊天室：',
  '',
  '姓名：',
  '電話：',
  'EMAIL：',
  '方案：（50 人／100 人／150 人）',
  '承租月數：（三個月／六個月／一年）',
  '備註：（例：請於傍晚聯絡我）',
].join('\n')

const mailto = (seats?: number) =>
  `mailto:${LINKS.email}?subject=${encodeURIComponent(`承租聊天室${seats ? `－${seats} 人方案` : ''}`)}&body=${encodeURIComponent(
    seats ? mailBody.replace('（50 人／100 人／150 人）', `${seats} 人`) : mailBody,
  )}`

export default function RentPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative -mt-24 overflow-hidden pb-16 pt-36">
        <div aria-hidden className="aurora pointer-events-none absolute -inset-x-40 -top-40 h-[640px]" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <p className="eyebrow">RENT A CHATROOM</p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl xl:text-6xl">
              心動了嗎？<br />在這，<span className="gradient-text whitespace-nowrap">我們幫你圓夢！</span>
            </h1>
            <p className="mt-5 text-xl font-bold text-glow">在尋夢園裡，輕鬆讓您當百人聊天室的站長</p>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              承租聊天室採用<strong className="text-white">新版聊天室</strong>。
              流暢平台、完整會員制度，成為站長會獲得一間專屬聊天室，
              除了有站長特製頭像，也擁有最高權限可以指派管理員，成為聊天室的 KING。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#pricing" className="btn-primary px-8 py-4 text-lg">查看價目表</a>
              <a href={mailto()} className="btn-outline px-8 py-4 text-lg">✉️ 來信申請</a>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="grid gap-4">
              {abilities.map(a => (
                <div key={a.title} className="glass-card flex gap-4 p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-2xl">{a.icon}</span>
                  <div>
                    <h2 className="font-bold">{a.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container-x scroll-mt-28 py-16">
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="eyebrow">PRICING</p>
            <h2 className="section-title mt-2">聊天室價目表</h2>
            <p className="section-subtitle !mb-0">依同時在線人數選擇方案，按月計費；承租時間越長，可享有折扣。</p>
          </div>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <FadeIn key={p.seats} delay={i * 100}>
              <div className={`relative flex h-full flex-col rounded-3xl border p-8 ${
                p.highlight ? 'border-dream/60 bg-gradient-to-b from-dream/15 to-deep shadow-glow' : 'border-white/10 bg-deep'
              }`}>
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-dream-gradient px-4 py-1 text-xs font-bold">最受歡迎</span>
                )}
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black">{p.seats} 人聊天室</h3>
                  <span className="badge-new">新版</span>
                </div>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-sm text-muted">每月</span>
                  <span className="text-5xl font-black tabular-nums">NT${p.price.toLocaleString()}</span>
                </div>
                <ul className="mb-8 mt-6 flex-1 space-y-3">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-live">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href={mailto(p.seats)} className={`${p.highlight ? 'btn-primary' : 'btn-outline'} w-full`}>申請 {p.seats} 人方案</a>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Perks */}
      <section className="border-y border-white/5 bg-deep/40 py-16">
        <div className="container-x">
          <FadeIn>
            <h2 className="section-title text-center">成立一間自己的聊天室</h2>
            <p className="section-subtitle text-center">每個方案都包含完整的站長管理功能</p>
          </FadeIn>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {perks.map((k, i) => (
              <FadeIn key={k.title} delay={i * 60}>
                <div className="glass-card flex h-full flex-col items-center p-6 text-center">
                  <img src={k.icon} alt="" className="h-16 w-16 object-contain" loading="lazy" />
                  <div className="mt-3 font-bold">{k.title}</div>
                  <div className="mt-1 text-xs text-muted">{k.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="container-x py-16">
        <FadeIn>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-deep p-8 sm:p-10">
            <h2 className="text-2xl font-black">我要承租聊天室</h2>
            <p className="mt-3 text-gray-300">
              請來信至 <a href={mailto()} className="font-bold text-dream hover:underline">{LINKS.email}</a> 並附上以下資訊，我們收到信後將會與您聯繫承租細節。
            </p>
            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              {[
                ['姓名', '方便稱呼您的名字'],
                ['電話', '聯繫承租細節用'],
                ['EMAIL', '回覆承租資訊用'],
                ['承租月數', '三個月、六個月、一年（時間越長折扣越多）'],
                ['方案', '50 人、100 人或 150 人'],
                ['備註', '例：請於傍晚聯絡我'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-white/5 p-4">
                  <dt className="font-bold text-white">{k}</dt>
                  <dd className="mt-1 text-muted">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={mailto()} className="btn-primary">✉️ 一鍵寄出申請信</a>
              <Link href="/chatroom/" className="btn-outline">先逛逛新版聊天室</Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </SiteShell>
  )
}
