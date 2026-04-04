import type { Metadata } from 'next'
import Link from 'next/link'
import SiteShell from '@/components/site-shell'
import FadeIn from '@/components/fade-in'

export const metadata: Metadata = {
  title: '關於我們',
  description: '尋夢園聊天室從大學生個人網站發展至台灣最大匿名聊天室，擁有超過300萬名會員',
}

const businesses = [
  {
    icon: '💬',
    name: '尋夢園聊天室',
    desc: '台灣最大的免費匿名聊天室，提供實名與匿名兩種聊天模式，支援 KTV 歌唱功能，擁有數百間主題聊天室。',
    img: 'https://ek21.com/images/Bitmap.png',
    link: '/',
  },
  {
    icon: '🎉',
    name: 'eros主題派對',
    desc: '精心設計的主題派對活動，已舉辦超過 1,000 場，參與人數超過 10 萬人。夏日泳池派對、萬聖節手工藝，每場都讓人難忘。',
    img: 'https://ek21.com/images/Bitmap-2.png',
    link: 'https://eros.ek21.com',
  },
  {
    icon: '📰',
    name: '尋夢新聞',
    desc: '每日更新的生活、政經、健康、旅遊等新聞資訊，從日常生活角度出發，讓你永遠不缺聊天的話題。',
    img: 'https://ek21.com/images/Bitmap-3.png',
    link: '/news',
  },
  {
    icon: '💌',
    name: '戀愛小秘書娜米',
    desc: '台灣最專業的交友顧問服務，透過大數據配對分析，提供個人化的交友建議，已協助超過 4,000 人成功脫單。',
    img: 'https://ek21.com/images/Bitmap-4.png',
    link: '/dating',
  },
]

const timeline = [
  { year: '早期', event: '大學生創立個人聊天網站，提供簡單的文字聊天功能' },
  { year: '成長期', event: '聊天室數量快速增長，加入 KTV 歌唱功能，吸引大量用戶' },
  { year: '擴張期', event: '會員突破百萬，成為台灣最大交友網站，蕃薯藤排行第一' },
  { year: '多元化', event: '推出 eros 主題派對、戀愛小秘書娜米等多元服務' },
  { year: '現在', event: '超過 312 萬會員，持續創新，提供全台最優質的匿名社群體驗' },
]

const achievements = [
  { value: '312萬+', label: '註冊會員數' },
  { value: '台灣第一', label: '最大交友網站' },
  { value: '台灣第六', label: '全台流量排名' },
  { value: '蕃薯藤第一', label: '交友類別排名' },
]

export default function AboutPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-dream/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-5xl font-bold text-white mb-6">關於尋夢園</h1>
            <p className="text-muted text-lg leading-relaxed">
              尋夢園從一位大學生的個人網站，逐步成長為台灣最大的匿名聊天室平台。
              我們始終以打造互動豐富的會員體驗為核心，
              讓每一位用戶都能在尋夢園中找到屬於自己的社群。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-deep/50 border-y border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {achievements.map((a, i) => (
              <FadeIn key={a.label} delay={i * 80}>
                <div className="glass-card p-6 text-center">
                  <div className="gradient-text text-2xl font-bold mb-2">{a.value}</div>
                  <div className="text-muted text-sm">{a.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Business Units */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="section-title">我們的事業</h2>
            <p className="section-subtitle">尋夢園旗下四大服務，全方位滿足你的社群需求</p>
          </div>
        </FadeIn>
        <div className="space-y-8">
          {businesses.map((b, i) => (
            <FadeIn key={b.name} delay={i * 80}>
              <Link href={b.link} className="glass-card overflow-hidden hover:border-dream/40 hover:shadow-glow transition-all block group">
                <div className={`grid grid-cols-1 sm:grid-cols-3 ${i % 2 !== 0 ? 'sm:[direction:rtl]' : ''}`}>
                  <div className="relative h-48 sm:h-auto overflow-hidden">
                    <img
                      src={b.img}
                      alt={b.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-deep/60 to-transparent" />
                  </div>
                  <div className={`sm:col-span-2 p-6 sm:p-8 flex flex-col justify-center ${i % 2 !== 0 ? '[direction:ltr]' : ''}`}>
                    <div className="text-4xl mb-3">{b.icon}</div>
                    <h3 className="text-white font-bold text-2xl mb-3 group-hover:text-glow transition-colors">{b.name}</h3>
                    <p className="text-muted leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-deep/50 border-y border-white/5 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="section-title">發展歷程</h2>
              <p className="section-subtitle">從個人網站到台灣最大社群平台</p>
            </div>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-dream/20" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <FadeIn key={t.year} delay={i * 100}>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-dream-gradient flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-glow z-10">
                      {i + 1}
                    </div>
                    <div className="glass-card p-4 flex-1">
                      <div className="gradient-text text-sm font-bold mb-1">{t.year}</div>
                      <div className="text-gray-300 text-sm leading-relaxed">{t.event}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <FadeIn>
          <h2 className="section-title mb-4">聯絡我們</h2>
          <div className="glass-card p-8 space-y-3 text-sm">
            <p className="text-gray-300">公司名稱：<span className="text-white font-medium">昱科網路股份有限公司</span></p>
            <p className="text-gray-300">統一編號：<span className="text-white font-medium">70525697</span></p>
            <p className="text-gray-300">Email：
              <a href="mailto:mkt@ek21.com" className="text-dream hover:underline ml-1">mkt@ek21.com</a>
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <a href="mailto:mkt@ek21.com" className="btn-primary text-sm">📧 發送 Email</a>
              <a href="https://line.me/R/ti/p/%40fip4700n" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
                💬 LINE 聯絡
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </SiteShell>
  )
}
