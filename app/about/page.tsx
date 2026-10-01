import type { Metadata } from 'next'
import Link from 'next/link'
import SiteShell from '@/components/site-shell'
import FadeIn from '@/components/fade-in'
import { LINKS, TOTAL_MEMBERS } from '@/lib/site'

export const metadata: Metadata = {
  title: '關於尋夢園',
  description: '尋夢園是台灣最大的聊天室及交友網站，原由大學生架設的個人網站，後發展出聊天聯盟，致力打造讓會員彼此互動、盡情分享自我的平台。',
  alternates: { canonical: '/about/' },
}

const businesses = [
  { href: '/#rooms', internal: true, icon: '💬', name: '尋夢園聊天室', line1: '免費線上聊天室', line2: '提供匿名／實名雙聊天制度' },
  { href: 'https://eros.ek21.com/', internal: false, icon: '🎉', name: 'eros 主題派對', line1: '最多元的交友活動', line2: '主打豐富有趣的主題活動' },
  { href: LINKS.news, internal: false, icon: '📰', name: '尋夢新聞', line1: '最新最火熱的娛樂新聞', line2: '隨時發掘流行世界大小事' },
  { href: LINKS.dating, internal: false, icon: '💌', name: '戀愛小秘書娜米', line1: '單身久了，', line2: '遇不到新的異性怎麼辦？' },
  { href: 'https://shesay.com/', internal: false, icon: '🌷', name: 'SheSay', line1: '專為單身女性打造', line2: '聯誼活動與一對一戀愛諮詢' },
]

const honors = [
  { title: '交友網站台灣 No.1', desc: '全台最大交友社群網站，調查當時會員人數 286 萬人次', note: 'NetValue、Alexa Research、數位週刊調查' },
  { title: '全台第 6 大網站', desc: '全世界最大網路調查公司 NetValue 之 pageview 調查', note: 'NetValue' },
  { title: '蕃薯藤熱站排名第一', desc: 'Hotrank 熱站排行榜交友類第一名', note: 'www.hotrank.com.tw' },
]

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="relative -mt-24 overflow-hidden pb-16 pt-36">
        <div aria-hidden className="aurora pointer-events-none absolute -inset-x-40 -top-40 h-[600px]" />
        <div className="container-x relative max-w-4xl text-center">
          <FadeIn>
            <p className="eyebrow">ABOUT</p>
            <h1 className="mt-3 text-4xl font-black sm:text-6xl">關於<span className="gradient-text">尋夢園</span></h1>
            <p className="mt-6 text-xl font-bold text-white">台灣最大的匿名聊天室。</p>
            <p className="mt-2 text-lg text-gray-300">擁有上百間聊天室，讓您隨時隨地都能找到志同道合的好友！</p>
            <p className="mt-6 inline-flex rounded-full bg-white/5 px-5 py-2 text-sm text-muted">目前總會員人數 <span className="mx-1 font-black text-white">{TOTAL_MEMBERS.toLocaleString()}</span> 人</p>
          </FadeIn>
        </div>
      </section>

      <section className="container-x max-w-5xl pb-16">
        <FadeIn>
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-deep p-8 sm:p-12 md:grid-cols-[auto_1fr] md:items-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-dream-gradient text-6xl font-black shadow-glow">夢</div>
            <div>
              <h2 className="text-2xl font-black">尋夢園是什麼？</h2>
              <p className="mt-4 leading-8 text-gray-300">
                尋夢園是台灣最大的聊天室及交友網站。原本是由大學生架設的個人網站，後來發展出聊天聯盟，
                一路以來致力於打造能夠讓會員們彼此互動、盡情分享自我的平台。
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="border-y border-white/5 bg-deep/40 py-16">
        <div className="container-x">
          <FadeIn>
            <h2 className="section-title text-center">經營項目</h2>
            <p className="section-subtitle text-center">從聊天室出發，陪你聊天、找話題、認識新朋友</p>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {businesses.map((b, i) => {
              const inner = (
                <>
                  <div className="text-4xl">{b.icon}</div>
                  <h3 className="mt-4 text-lg font-black group-hover:text-glow">{b.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{b.line1}<br />{b.line2}</p>
                </>
              )
              const cls = 'glass-card group block h-full p-6 text-center transition-all hover:-translate-y-1 hover:border-white/25'
              return (
                <FadeIn key={b.name} delay={i * 60}>
                  {b.internal ? <Link href={b.href} className={cls}>{inner}</Link> : <a href={b.href} className={cls}>{inner}</a>}
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <FadeIn>
          <h2 className="section-title text-center">網站榮耀</h2>
          <p className="section-subtitle text-center">一路走來，謝謝每一位會員的陪伴</p>
        </FadeIn>
        <div className="grid gap-5 md:grid-cols-3">
          {honors.map((h, i) => (
            <FadeIn key={h.title} delay={i * 80}>
              <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-soft to-deep p-7">
                <div className="text-3xl">🏆</div>
                <h3 className="mt-4 text-xl font-black gradient-text">{h.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-300">{h.desc}</p>
                <p className="mt-4 text-[11px] text-muted">資料來源：{h.note}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container-x max-w-4xl pb-8">
        <FadeIn>
          <div className="rounded-3xl border border-white/10 bg-deep p-8 sm:p-10">
            <h2 className="text-2xl font-black">經營策略</h2>
            <p className="mt-4 leading-8 text-gray-300">
              除了交友網站外，我們秉持一貫成功的實績經驗，成功開發新型社群軟體，
              包括新型多人版聊天室、討論區、留言板、日記、電子報等，
              希望上下游垂直整合，提供最先進的社群整合性服務。
            </p>
            <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-sm sm:grid-cols-3">
              <p><span className="text-muted">公司名稱</span><br /><span className="font-bold">昱科網路股份有限公司</span></p>
              <p><span className="text-muted">統一編號</span><br /><span className="font-bold">70525697</span></p>
              <p><span className="text-muted">聯絡我們</span><br /><Link href="/contact/" className="font-bold text-dream hover:underline">線上聯絡表單 →</Link></p>
            </div>
          </div>
        </FadeIn>
      </section>
    </SiteShell>
  )
}
