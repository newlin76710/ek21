import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site-shell'
import FadeIn from '@/components/fade-in'

export const metadata: Metadata = {
  title: '交友聯誼・戀愛小秘書娜米',
  description: '戀愛小秘書娜米，台灣最專業交友顧問，協助超過4000人成功脫單，大數據配對分析',
}

const services = [
  { icon: '🎯', title: '免費配對諮詢', desc: '根據你的個人條件與喜好，提供精準的對象配對建議，完全免費' },
  { icon: '🎉', title: '主題聯誼活動', desc: '每月舉辦多場精心設計的主題活動，在輕鬆愉快的環境中認識新朋友' },
  { icon: '📸', title: '形象顧問', desc: '提供造型諮詢與專業攝影服務，打造最好的第一印象，讓你更吸引人' },
  { icon: '🔢', title: '彩虹數字分析', desc: '運用彩虹數字分析你的戀愛特質與最佳匹配對象，了解你的感情密碼' },
  { icon: '💬', title: '一對一教練', desc: '個人化的戀愛教練服務，協助你提升社交魅力與溝通技巧，成為更好的自己' },
  { icon: '📱', title: '交友軟體照片', desc: '提供專業個人照片拍攝服務，讓你的交友軟體大頭貼更吸引人，提高配對率' },
]

const events = [
  {
    name: 'Game START派對',
    desc: '桌遊聯誼，一起玩耍中自然認識彼此，打破尷尬，輕鬆開始新友誼',
    date: '每月舉辦',
    img: 'https://ek21.com/dating/wp-content/uploads/2023/07/MTXX_MR20230715_180309740-300x200.jpg',
  },
  {
    name: '馬卡龍彩繪工作坊',
    desc: '一起動手做甜點，在甜蜜的氛圍中分享笑容，讓甜點成為你們故事的開始',
    date: '不定期',
    img: 'https://ek21.com/dating/wp-content/uploads/2023/11/pngtree-the-french-eiffel-tower-and-macarons-on-table-top-image_13161076-300x200.jpg',
  },
  {
    name: '探戈舞蹈派對',
    desc: '在舞池中感受心動的悸動，雙人舞蹈是最自然的接觸，讓身體說出內心話',
    date: '每季舉辦',
    img: 'https://ek21.com/dating/wp-content/uploads/2024/04/S__18202927_0-300x249.jpg',
  },
  {
    name: '品酒社交之夜',
    desc: '在優雅的環境中認識新朋友，杯觥交錯間自然打開話匣子，讓美酒成為友誼的橋樑',
    date: '不定期',
    img: 'https://ek21.com/dating/wp-content/uploads/2023/07/MTXX_MR20230715_180309740-300x200.jpg',
  },
]

const steps = [
  { step: '01', title: '加入 LINE 諮詢', desc: '加入戀愛小秘書娜米的官方 LINE，與顧問進行免費諮詢，分享你的擇偶條件' },
  { step: '02', title: '填寫個人資料', desc: '填寫詳細的個人資料，包括興趣、個性、理想對象類型，幫助我們精準配對' },
  { step: '03', title: '參加活動脫單', desc: '接受推薦配對通知，參加精心設計的聯誼活動，在歡樂中尋找屬於你的緣分' },
]

export default function DatingPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-glow/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-dream/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-glow mb-6">
                  💝 已協助 4,000+ 人成功脫單
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">戀愛小秘書娜米</h1>
                <p className="text-glow font-semibold text-xl mb-4">幫你脫單！豐富有趣的單身聯誼</p>
                <p className="text-muted text-lg mb-8 leading-relaxed">
                  台灣最專業的交友顧問服務，透過大數據配對分析，
                  找到最適合你的另一半。從線上諮詢到線下活動，
                  全程陪伴你的脫單之旅。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="https://lin.ee/iweaTucb" target="_blank" rel="noopener noreferrer" className="btn-primary text-lg px-8 py-4 text-center animate-pulse-glow">
                    💬 加入 LINE 立即諮詢
                  </Link>
                  <a href="#events" className="btn-outline text-lg px-8 py-4 text-center">
                    查看聯誼活動
                  </a>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="relative">
                <div className="absolute inset-0 bg-glow/10 rounded-3xl blur-2xl" />
                <div className="relative glass-card p-2">
                  <Image
                    src="https://ek21.com/dating/wp-content/uploads/2023/03/1678493288998-875x1024.jpg"
                    alt="戀愛小秘書娜米"
                    width={480}
                    height={400}
                    className="rounded-2xl w-full object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-deep/50 border-y border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '4,000+', label: '成功脫單人數', icon: '💝' },
              { value: '100+', label: '場聯誼活動', icon: '🎉' },
              { value: '98%', label: '活動滿意度', icon: '⭐' },
              { value: '免費', label: '配對諮詢', icon: '🎁' },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 80}>
                <div className="glass-card p-6">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <div className="text-3xl font-bold gradient-text mb-1">{s.value}</div>
                  <div className="text-muted text-sm">{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="section-title">我們的服務</h2>
            <p className="section-subtitle">全方位的交友支援，從配對到約會一手包辦</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 80}>
              <div className="glass-card p-6 hover:border-dream/30 transition-all group h-full">
                <div className="text-4xl mb-4 group-hover:animate-float inline-block">{s.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Events */}
      <section id="events" className="bg-deep/50 border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="section-title">近期聯誼活動</h2>
              <p className="section-subtitle">多元有趣的主題活動，在歡樂中尋找緣分</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((e, i) => (
              <FadeIn key={e.name} delay={i * 80}>
                <div className="glass-card overflow-hidden hover:border-dream/40 hover:shadow-glow transition-all group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={e.img}
                      alt={e.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/70 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="text-xs text-glow/80 bg-black/50 backdrop-blur px-2 py-1 rounded-full">{e.date}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-semibold text-lg mb-2">{e.name}</h3>
                    <p className="text-muted text-sm leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="section-title">如何開始脫單之旅</h2>
            <p className="section-subtitle">三個簡單步驟，讓娜米陪你找到真愛</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {steps.map((p, i) => (
            <FadeIn key={p.step} delay={i * 100}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-dream-gradient flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-glow">
                  {p.step}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div className="text-center">
            <Link
              href="https://lin.ee/iweaTucb"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-10 py-4 animate-pulse-glow inline-flex"
            >
              💌 立即加入 LINE 開始諮詢
            </Link>
          </div>
        </FadeIn>
      </section>
    </SiteShell>
  )
}
