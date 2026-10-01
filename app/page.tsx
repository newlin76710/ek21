import Link from 'next/link'
import SiteShell from '@/components/site-shell'
import FadeIn from '@/components/fade-in'
import NewsFeed from '@/components/news-feed'
import { HotBoard, LiveRoomGrid, OnlineNow, VersionTotal } from '@/components/live-widgets'
import { LEGACY_ROOMS, LINKS, NEW_ROOMS, TOTAL_MEMBERS } from '@/lib/site'
import { PLANS } from '@/lib/plans'

const family = [
  {
    href: '/news/',
    img: '/img/home/more-img-1.png',
    name: '尋夢新聞',
    hook: '找不到話題，不知道該聊些什麼嗎？',
    desc: '尋夢新聞每日推播最夯最熱門的新聞，隨時掌握流行大小事，提供第一手熱門話題給你。',
    cta: '找尋話題',
    accent: 'from-dream/30',
  },
  {
    href: '/dating/',
    img: '/img/home/more-img-3-1.jpg',
    name: '戀愛小秘書娜米',
    hook: '工作久了，遇不到新的異性怎麼辦？',
    desc: '娜米會根據你的喜好和篩選條件，幫你找到心靈契合的另一半。脫單秘笈、戀愛諮詢、聯誼活動一次到位。',
    cta: '逛逛娜米',
    accent: 'from-sky/30',
  },
  {
    href: 'https://eros.ek21.com/',
    img: '/img/home/more-img-2.png',
    name: 'eros 主題派對',
    hook: '最火熱的交友趴踢都在這裡！',
    desc: '下班後充實自己的主題活動，氣氛溫馨自在，像在家一樣輕鬆愉快，來參加就能交到新朋友。',
    cta: '報名活動',
    accent: 'from-glow/30',
  },
  {
    href: 'https://shesay.com/',
    img: '/img/home/shesay.jpg',
    name: 'SheSay',
    hook: '專為單身女性打造的戀愛網站',
    desc: '單身聯誼活動、一對一戀愛諮詢與戀愛數字密碼分析，幫妳更自然地認識適合的對象。',
    cta: '前往 SheSay',
    accent: 'from-dream/25',
  },
]

const legacyServices = [
  { href: LINKS.member, icon: '👤', name: '會員中心', desc: '註冊、登入、修改會員資料與密碼', tag: '舊版' },
  { href: LINKS.avatar, icon: '🎭', name: '頭像商城', desc: '用尋夢幣購買頭貼、擴增留言板', tag: '舊版' },
  { href: '/stored/', icon: '💰', name: '儲值尋夢幣', desc: '100 元起，匯款後來信即可轉點', tag: '' },
]

const kingPerks = [
  { icon: '/img/home/Bicon-1.png', title: '聊天室公佈欄', desc: '自訂聊天室公告' },
  { icon: '/img/home/Bicon-2.png', title: '聊天等級管理', desc: '分派聊天室會員等級' },
  { icon: '/img/home/Bicon-3.png', title: '指定管理員', desc: '聊天內容過濾管理' },
  { icon: '/img/home/Bicon-4.png', title: '自訂廣告版位', desc: '免費曝光版位' },
  { icon: '/img/home/Bicon-5.png', title: '專屬聊天室名稱', desc: '獨一無二的聊天室名' },
]

const allRoomNames = [...NEW_ROOMS, ...LEGACY_ROOMS].map(r => r.name)

export default function HomePage() {
  return (
    <SiteShell>
      {/* ── Hero ─────────────────────────────── */}
      <section className="relative -mt-24 overflow-hidden pb-16 pt-36 sm:pt-40">
        <div aria-hidden className="aurora pointer-events-none absolute -inset-x-40 -top-40 h-[760px]" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <span className="live-dot" />
              <span>現在有 <OnlineNow className="font-black text-live" /> 人在線上等你聊天</span>
            </p>
            <h1 className="text-[2.6rem] font-black leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
              今晚，<br />
              想跟<span className="gradient-text">誰</span>聊聊？
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
              <strong className="text-white">尋夢園聊天室</strong>－全台最大匿名聊天室。
              實名／匿名雙聊天制度，唱歌、私訊、交朋友，
              上百間主題聊天室讓你隨時隨地找到志同道合的好友。
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/chatroom/" className="btn-primary animate-pulse-glow px-8 py-4 text-lg">💬 前往聊天室</Link>
              <a href="/dating/" className="btn-outline px-8 py-4 text-lg">💘 找尋對象</a>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              <div className="glass rounded-2xl p-3 text-center">
                <dt className="text-[11px] text-muted">總會員人數</dt>
                <dd className="mt-1 text-lg font-black tabular-nums">{TOTAL_MEMBERS.toLocaleString()}</dd>
              </div>
              <div className="glass rounded-2xl p-3 text-center">
                <dt className="text-[11px] text-muted">新版聊天室在線</dt>
                <dd className="mt-1 text-lg font-black text-live"><VersionTotal rooms={NEW_ROOMS} /></dd>
              </div>
              <div className="glass rounded-2xl p-3 text-center">
                <dt className="text-[11px] text-muted">舊版聊天室在線</dt>
                <dd className="mt-1 text-lg font-black text-gold"><VersionTotal rooms={LEGACY_ROOMS} /></dd>
              </div>
            </dl>
          </div>

          <FadeIn>
            <HotBoard />
          </FadeIn>
        </div>

        {/* 聊天室跑馬燈 */}
        <div className="relative mt-16 overflow-hidden border-y border-white/5 bg-white/[0.02] py-3" aria-hidden>
          <div className="marquee gap-10 whitespace-nowrap text-sm text-muted">
            {[...allRoomNames, ...allRoomNames].map((n, i) => (
              <span key={i} className="flex items-center gap-10">
                <span>#{n}</span><span className="text-dream/60">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 新版聊天室 ───────────────────────── */}
      <section className="container-x py-16" id="new">
        <FadeIn>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">NEW CHATROOM</p>
              <h2 className="section-title mt-2">新版聊天室 <span className="badge-new align-middle">新版</span></h2>
              <p className="text-muted">全新介面，點擊卡片直接進入聊天室。</p>
            </div>
            <Link href="/chatroom/" className="btn-outline shrink-0 px-5 py-2 text-sm">看全部聊天室 →</Link>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <LiveRoomGrid rooms={NEW_ROOMS} size="lg" sort />
        </div>
      </section>

      {/* ── 舊版聊天室 ───────────────────────── */}
      <section className="border-y border-white/5 bg-deep/40 py-16" id="legacy">
        <div className="container-x">
          <FadeIn>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow !text-gold">CLASSIC</p>
                <h2 className="section-title mt-2">舊版聊天室 <span className="badge-legacy align-middle">舊版</span></h2>
                <p className="text-muted">老朋友都在這！沿用原本的登入頁，會員輸入密碼、非會員輸入暱稱就能進入。</p>
              </div>
              <a href={LINKS.legacyGuide} target="_blank" rel="noopener noreferrer" className="btn-outline shrink-0 px-5 py-2 text-sm">舊版聊天室教學</a>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <LiveRoomGrid rooms={LEGACY_ROOMS} sort />
          </div>
        </div>
      </section>

      {/* ── 今日話題（尋夢新聞） ─────────────── */}
      <section className="container-x py-20">
        <FadeIn>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">TODAY&apos;S TOPICS</p>
              <h2 className="section-title mt-2">聊天找不到話題？我們幫你找！</h2>
              <p className="text-muted">尋夢新聞每天網羅新奇趣聞，帶著話題進聊天室。</p>
            </div>
            <a href="/news/" className="btn-outline shrink-0 px-5 py-2 text-sm">更多新聞 →</a>
          </div>
        </FadeIn>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NewsFeed />
        </div>
      </section>

      {/* ── 尋夢園家族 ───────────────────────── */}
      <section className="border-y border-white/5 bg-deep/40 py-20">
        <div className="container-x">
          <FadeIn>
            <div className="mb-10 text-center">
              <p className="eyebrow">EK21 FAMILY</p>
              <h2 className="section-title mt-2">除了聊天，我們還有更多服務</h2>
              <p className="section-subtitle !mb-0">尋夢園家族的每個網站，都能從頁面最上方一鍵切換。</p>
            </div>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-2">
            {family.map((f, i) => (
              <FadeIn key={f.name} delay={i * 80}>
                <a
                  href={f.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-deep transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-glow-lg sm:flex-row"
                >
                  <div className={`relative flex items-center justify-center bg-gradient-to-br ${f.accent} to-transparent p-6 sm:w-2/5`}>
                    <img src={f.img} alt={f.name} loading="lazy" className="max-h-44 w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-black">{f.name}</h3>
                    <p className="mt-1 text-sm font-bold text-glow">{f.hook}</p>
                    <p className="mt-3 text-sm leading-7 text-muted">{f.desc}</p>
                    <span className="mt-auto pt-4 text-sm font-bold text-dream transition-all group-hover:tracking-wide">{f.cta} →</span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <a
              href="https://www.rainbownumen.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 flex flex-col items-center gap-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-deep via-soft to-deep p-6 transition-colors hover:border-white/25 sm:flex-row"
            >
              <img src="/img/home/rainbow.png" alt="彩虹數字" loading="lazy" className="w-full max-w-xs object-contain" />
              <div>
                <h3 className="text-xl font-black">🌈 彩虹數字 改變人生</h3>
                <p className="mt-1 text-sm font-bold text-glow">造物主用數字塑造這個世界，萬事萬物皆由數字組成。</p>
                <p className="mt-3 text-sm leading-7 text-muted">出生年月日就是你在地球上的生命密碼，每一個數字都代表著不同的個性能量。</p>
                <span className="mt-3 inline-block text-sm font-bold text-dream">立即看看 →</span>
              </div>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── 承租聊天室 ───────────────────────── */}
      <section className="container-x py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <p className="eyebrow">BE THE KING</p>
            <h2 className="section-title mt-2">成立一間自己的聊天室</h2>
            <p className="text-lg leading-8 text-gray-300">
              在尋夢園裡，輕鬆讓你當百人聊天室的站長。
              站長擁有特製頭像與最高權限，可以指派管理員、舉辦 KTV 歌唱比賽與網聚活動，成為聊天室的 <strong className="text-gold">KING</strong>！
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {PLANS.map(p => (
                <div key={p.seats} className={`rounded-2xl border p-4 text-center ${p.highlight ? 'border-dream/60 bg-dream/10' : 'border-white/10 bg-white/5'}`}>
                  <div className="text-sm text-muted">{p.seats} 人</div>
                  <div className="mt-1 text-xl font-black">NT${p.price.toLocaleString()}</div>
                  <div className="text-[11px] text-muted">每月</div>
                </div>
              ))}
            </div>
            <Link href="/rent/" className="btn-primary mt-8">我要承租聊天室 →</Link>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {kingPerks.map((k, i) => (
                <div key={k.title} className={`glass-card flex flex-col items-center p-5 text-center ${i === 0 ? 'col-span-2 sm:col-span-1' : ''}`}>
                  <img src={k.icon} alt="" className="h-14 w-14 object-contain" loading="lazy" />
                  <div className="mt-3 text-sm font-bold">{k.title}</div>
                  <div className="mt-1 text-xs text-muted">{k.desc}</div>
                </div>
              ))}
              <div className="glass-card flex flex-col items-center justify-center bg-dream/10 p-5 text-center">
                <div className="text-3xl">👑</div>
                <div className="mt-2 text-sm font-bold">站長特製頭像</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 會員服務（舊版） ─────────────────── */}
      <section className="container-x pb-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {legacyServices.map(s => (
            <a
              key={s.name}
              href={s.href}
              {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="glass-card group flex items-center gap-4 p-5 transition-colors hover:border-white/25"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-2xl">{s.icon}</span>
              <span className="min-w-0">
                <span className="flex items-center gap-2 font-bold">
                  {s.name}
                  {s.tag && <span className="badge-legacy">{s.tag}</span>}
                </span>
                <span className="mt-0.5 block text-xs text-muted">{s.desc}</span>
              </span>
              <span className="ml-auto text-muted transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── 持續關注 ─────────────────────────── */}
      <section className="container-x pt-12">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-soft via-deep to-night p-8 text-center sm:p-14">
            <div aria-hidden className="aurora pointer-events-none absolute inset-0 opacity-70" />
            <div className="relative">
              <h2 className="text-3xl font-black sm:text-4xl">新聊天室開張、活動消息<br className="sm:hidden" />第一時間通知你</h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-300">加入尋夢園 LINE 官方帳號，聊天室活動、KTV 比賽、聯誼派對不漏接。</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={LINKS.line} target="_blank" rel="noopener noreferrer" className="btn-line px-8 py-4 text-lg">加入 LINE 好友</a>
                <Link href="/chatroom/" className="btn-outline px-8 py-4 text-lg">先去聊天室逛逛</Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </SiteShell>
  )
}
