import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site-shell'
import FadeIn from '@/components/fade-in'

export const metadata: Metadata = {
  title: '承租聊天室・成為站長',
  description: '在尋夢園裡，輕鬆讓您當百人聊天室的站長，主辦活動、管理成員，月費方案從NT$500起',
}

const plans = [
  {
    name: '50人聊天室',
    price: 'NT$500',
    period: '/ 月',
    features: ['最多 50 人同時在線', '5 張客製化設計圖', '70×70 旋轉廣告位', '活動主辦權限', '基本管理工具', '電子郵件客服支援'],
    highlight: false,
    discount3: 'NT$1,350',
    discount6: 'NT$2,550',
    discount12: 'NT$4,800',
  },
  {
    name: '100人聊天室',
    price: 'NT$1,000',
    period: '/ 月',
    features: ['最多 100 人同時在線', '首頁特色推薦', '客製化聊天室模板', '進階管理工具', '廣告位置升級', '所有 50 人方案功能'],
    highlight: true,
    discount3: 'NT$2,700',
    discount6: 'NT$5,100',
    discount12: 'NT$9,600',
  },
  {
    name: '150人聊天室',
    price: 'NT$1,500',
    period: '/ 月',
    features: ['最多 150 人同時在線', '最大曝光推薦', '全功能解鎖', '優先客服支援', '多位管理員設置', '所有方案功能'],
    highlight: false,
    discount3: 'NT$4,050',
    discount6: 'NT$7,650',
    discount12: 'NT$14,400',
  },
]

const features = [
  { icon: '👥', title: '管理成員', desc: '設置管理員，掌控聊天室秩序與成員權限', img: 'https://www.ek21.com/home/images/more-img-1.png' },
  { icon: '🎤', title: '主辦 KTV 活動', desc: '舉辦 KTV 競賽、聯誼等精彩活動，建立社群凝聚力', img: 'https://www.ek21.com/home/images/more-img-2.png' },
  { icon: '📢', title: '自訂公告', desc: '發布聊天室公告，傳遞重要訊息給所有成員', img: 'https://www.ek21.com/home/images/more-img-3-1.png' },
]

export default function RentPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <div className="text-5xl mb-4 animate-float inline-block">🏰</div>
                <h1 className="text-5xl font-bold text-white mb-4">打造你的<br className="hidden sm:block" />聊天室王國</h1>
                <p className="text-glow font-semibold text-xl mb-4">在尋夢園裡，輕鬆讓您當百人聊天室的站長</p>
                <p className="text-muted text-lg mb-8 leading-relaxed">
                  擁有專屬聊天室，主辦 KTV 競賽、聯誼活動，
                  建立屬於自己的網路社群。每月費用僅需 NT$500 起，
                  立即成為尋夢園中的社群領袖！
                </p>
                <div className="flex gap-4">
                  <a href="mailto:service@ek21.com" className="btn-primary text-lg px-8 py-4">立即申請</a>
                  <a href="#pricing" className="btn-outline text-lg px-8 py-4">查看方案</a>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="relative">
                <div className="absolute inset-0 bg-sky/10 rounded-2xl blur-2xl" />
                <div className="relative glass-card p-2">
                  <Image
                    src="https://www.ek21.com/home/images/more-img-1.png"
                    alt="聊天室站長"
                    width={540}
                    height={400}
                    className="rounded-xl w-full object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features with images */}
      <section className="bg-deep/50 border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="section-title">站長能做什麼？</h2>
              <p className="section-subtitle">全功能聊天室管理工具，讓你的社群蓬勃發展</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 100}>
                <div className="glass-card overflow-hidden group hover:border-dream/40 transition-all">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={f.img}
                      alt={f.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="text-3xl mb-2">{f.icon}</div>
                    <h3 className="text-white font-semibold text-lg mb-1">{f.title}</h3>
                    <p className="text-muted text-sm">{f.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="section-title">選擇方案</h2>
            <p className="section-subtitle">月付或長期方案，享有更多折扣優惠</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {plans.map((p, i) => (
            <FadeIn key={p.name} delay={i * 100}>
              <div className={`glass-card p-8 relative flex flex-col ${p.highlight ? 'border-dream/50 shadow-glow' : ''}`}>
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dream-gradient text-white text-xs font-bold px-4 py-1 rounded-full">
                    最受歡迎
                  </div>
                )}
                <h3 className="text-white font-bold text-xl mb-2">{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="gradient-text text-4xl font-bold">{p.price}</span>
                  <span className="text-muted text-sm">{p.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-green-400 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:service@ek21.com"
                  className={`${p.highlight ? 'btn-primary' : 'btn-outline'} w-full text-center block`}
                >
                  立即申請
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Discount table */}
        <FadeIn>
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-white font-bold text-lg">長期方案折扣</h3>
              <p className="text-muted text-sm">簽約越長，折扣越多！</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-3 text-muted font-medium">方案</th>
                    <th className="text-center px-6 py-3 text-muted font-medium">月付</th>
                    <th className="text-center px-6 py-3 text-glow font-medium">3個月<span className="ml-1 text-xs text-green-400">省10%</span></th>
                    <th className="text-center px-6 py-3 text-glow font-medium">6個月<span className="ml-1 text-xs text-green-400">省15%</span></th>
                    <th className="text-center px-6 py-3 text-glow font-medium">12個月<span className="ml-1 text-xs text-green-400">省20%</span></th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map(p => (
                    <tr key={p.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{p.name}</td>
                      <td className="px-6 py-4 text-center text-muted">{p.price}</td>
                      <td className="px-6 py-4 text-center text-green-400">{p.discount3}</td>
                      <td className="px-6 py-4 text-center text-green-400">{p.discount6}</td>
                      <td className="px-6 py-4 text-center text-green-400">{p.discount12}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <p className="text-center text-muted text-sm mt-6">
            申請及詢問請 Email 至：
            <a href="mailto:service@ek21.com" className="text-dream hover:underline ml-1 font-medium">service@ek21.com</a>
          </p>
        </FadeIn>
      </section>
    </SiteShell>
  )
}
