import Link from 'next/link'
import SiteShell from '@/components/site-shell'
import FeatureCard from '@/components/feature-card'
import RoomCard from '@/components/room-card'
import StatCounter from '@/components/stat-counter'
import FadeIn from '@/components/fade-in'
import { ALL_ROOMS, FEATURED_ROOM_NAMES } from '@/lib/rooms'
import { getLiveRoomData } from '@/lib/ek21-live'

const categories = [
  { name: '孤男寡女', icon: '💑', desc: '單身交友' },
  { name: '男歡女愛', icon: '❤️', desc: '情感話題' },
  { name: '情人皇朝', icon: '👑', desc: '戀人專區' },
  { name: '忘年之交', icon: '🌸', desc: '跨代友情' },
  { name: '已婚廣場', icon: '💍', desc: '已婚話題' },
  { name: '解憂防空洞', icon: '🛡️', desc: '心靈撫慰' },
  { name: '台南網友', icon: '🏙️', desc: '在地交流' },
  { name: '新版聊天室', icon: '✨', desc: '全新體驗' },
]

const subServices = [
  {
    icon: 'https://www.ek21.com/home/images/Bicon-1.png',
    title: '尋夢園聊天室',
    desc: '全台最大匿名聊天室，實名匿名雙模式',
    href: '/chatroom',
  },
  {
    icon: 'https://www.ek21.com/home/images/Bicon-2.png',
    title: '戀愛小秘書娜米',
    desc: '專業交友顧問，幫你脫單找到真愛',
    href: '/dating',
  },
  {
    icon: 'https://www.ek21.com/home/images/Bicon-3.png',
    title: 'eros主題派對',
    desc: '精心設計的主題派對活動',
    href: 'https://eros.ek21.com',
  },
  {
    icon: 'https://www.ek21.com/home/images/Bicon-4.png',
    title: '尋夢新聞',
    desc: '每日更新生活娛樂話題',
    href: '/news',
  },
  {
    icon: 'https://www.ek21.com/home/images/Bicon-5.png',
    title: '彩虹數字占卜',
    desc: '根據生日了解你的戀愛特質',
    href: '/dating',
  },
]

export default async function HomePage() {
  const { rooms: liveCounts } = await getLiveRoomData(ALL_ROOMS.map(r => r.name))
  const featuredRooms = ALL_ROOMS
    .filter(r => FEATURED_ROOM_NAMES.includes(r.name))
    .map(r => ({
      name: r.name,
      category: r.category,
      users: liveCounts[r.name] ?? r.fallbackUsers,
    }))

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dream/20 rounded-full blur-3xl animate-spin-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-glow mb-8">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                全台最大匿名聊天室・現在上線中
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text">尋夢園</span>
                <br />
                <span className="text-white text-4xl sm:text-5xl">聊天室</span>
              </h1>

              <p className="text-gray-400 text-xl mb-10 leading-relaxed">
                超過 <span className="text-white font-bold">312萬</span> 名會員<br />
                免費匿名聊天・KTV歌唱・交友聯誼<br />
                找到屬於你的聊天空間
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/chatroom" className="btn-primary text-lg px-8 py-4 text-center animate-pulse-glow">
                  🎤 立即進入聊天室
                </Link>
                <Link
                  href="http://member.ek21.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-lg px-8 py-4 text-center"
                >
                  免費註冊會員
                </Link>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '312萬+', label: '會員數' },
                  { value: '100萬+', label: '月訪人次' },
                  { value: '24/7', label: '全天服務' },
                ].map(s => (
                  <div key={s.label} className="glass-card p-3 text-center">
                    <div className="gradient-text font-bold text-lg">{s.value}</div>
                    <div className="text-muted text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-dream/20 rounded-3xl blur-2xl scale-110" />
                <div className="relative glass-card p-2 rounded-3xl">
                  <img
                    src="https://www.ek21.com/home/images/chating.gif"
                    alt="尋夢園聊天室介面"
                    className="rounded-2xl object-cover w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-services bar */}
      <section className="bg-deep/70 border-y border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {subServices.map((s) => (
              <FadeIn key={s.title}>
                <Link
                  href={s.href}
                  {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="glass-card p-4 text-center hover:border-dream/40 hover:shadow-glow transition-all group block"
                >
                  <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                    <img src={s.icon} alt={s.title} className="object-contain w-10 h-10" />
                  </div>
                  <div className="text-white text-sm font-semibold mb-1">{s.title}</div>
                  <div className="text-muted text-xs leading-relaxed">{s.desc}</div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="section-title">尋夢園的規模</h2>
            <p className="section-subtitle">台灣最大的網路社群聊天平台</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <FadeIn delay={0}><StatCounter end={3125493} label="總註冊會員" icon="👥" /></FadeIn>
          <FadeIn delay={100}><StatCounter end={1000000} suffix="+" label="每月訪客" icon="📊" /></FadeIn>
          <FadeIn delay={200}><StatCounter end={300} suffix="+" label="主題聊天室" icon="💬" /></FadeIn>
          <FadeIn delay={300}><StatCounter end={4000} suffix="+" label="成功脫單人數" icon="💝" /></FadeIn>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="bg-deep/50 border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="section-title">熱門聊天室</h2>
                <p className="text-muted">選擇你喜歡的聊天主題，立即加入</p>
              </div>
              <Link href="/chatroom" className="btn-outline text-sm hidden sm:inline-flex">
                查看全部 →
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {featuredRooms.map((r, i) => (
              <FadeIn key={r.name} delay={i * 60}>
                <RoomCard {...r} />
              </FadeIn>
            ))}
          </div>
          <div className="text-center sm:hidden">
            <Link href="/chatroom" className="btn-outline">查看所有聊天室 →</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="section-title">聊天室分類</h2>
            <p className="section-subtitle">多樣化主題，總有一個適合你</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((c, i) => (
            <FadeIn key={c.name} delay={i * 50}>
              <Link
                href="/chatroom"
                className="glass-card p-5 text-center hover:border-dream/40 hover:shadow-glow transition-all duration-300 group block"
              >
                <div className="text-3xl mb-3 group-hover:animate-float inline-block">{c.icon}</div>
                <div className="text-white font-semibold text-sm mb-1">{c.name}</div>
                <div className="text-muted text-xs">{c.desc}</div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Features with images */}
      <section className="bg-deep/50 border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="section-title">為什麼選擇尋夢園</h2>
              <p className="section-subtitle">完整的聊天體驗，讓交友更輕鬆有趣</p>
            </div>
          </FadeIn>

          {/* Feature rows with images */}
          <div className="space-y-16">
            {[
              {
                img: 'https://www.ek21.com/home/images/card-img-1.png',
                icon: '🎭',
                title: '實名 / 匿名雙制度',
                desc: '支援實名與匿名兩種聊天模式，自由選擇你的互動方式。匿名模式完全保護隱私，實名模式建立更深厚的人際連結，你來決定。',
                reverse: false,
              },
              {
                img: 'https://www.ek21.com/home/images/card-img-2.png',
                icon: '🎤',
                title: 'KTV 線上歌唱',
                desc: '內建 KTV 歌唱功能，在聊天室中開唱！與朋友一起歡唱你最愛的歌曲，讓聊天更有趣、更有互動性。',
                reverse: true,
              },
              {
                img: 'https://www.ek21.com/home/images/card-img-3.png',
                icon: '📰',
                title: '尋夢新聞・永不缺話題',
                desc: '每日更新的生活、娛樂、時事新聞，讓你隨時掌握最新話題。聊天前先補充今日新聞，讓你的聊天更豐富有深度。',
                reverse: false,
              },
            ].map((f, i) => (
              <FadeIn key={f.title} delay={i * 100}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${f.reverse ? 'lg:[direction:rtl]' : ''}`}>
                  <div className={f.reverse ? '[direction:ltr]' : ''}>
                    <div className="relative">
                      <div className="absolute inset-0 bg-dream/10 rounded-2xl blur-xl" />
                      <div className="relative glass-card p-2">
                        <img
                          src={f.img}
                          alt={f.title}
                          className="rounded-xl w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={f.reverse ? '[direction:ltr]' : ''}>
                    <div className="text-5xl mb-4">{f.icon}</div>
                    <h3 className="text-3xl font-bold text-white mb-4">{f.title}</h3>
                    <p className="text-muted text-lg leading-relaxed mb-6">{f.desc}</p>
                    <Link href="/chatroom" className="btn-primary inline-flex">立即體驗 →</Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Dating & Rainbow section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dating */}
          <FadeIn>
            <div className="glass-card p-8 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-40 h-40 bg-dream/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="text-5xl mb-4">💌</div>
                <h2 className="text-2xl font-bold text-white mb-3">戀愛小秘書娜米</h2>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  台灣最專業的交友顧問，已協助超過 4,000 人成功脫單。
                  透過大數據配對分析，找到最適合你的另一半。
                </p>
                <div className="flex gap-3">
                  <Link href="/dating" className="btn-primary text-sm">了解服務</Link>
                  <Link href="https://lin.ee/iweaTucb" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
                    LINE 諮詢
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Rainbow numbers */}
          <FadeIn delay={100}>
            <div className="glass-card p-8 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-40 h-40 bg-glow/10 rounded-full blur-2xl" />
              <div className="relative flex gap-6 items-start">
                <div className="flex-1">
                  <div className="text-5xl mb-4">🌈</div>
                  <h2 className="text-2xl font-bold text-white mb-3">彩虹數字占卜</h2>
                  <p className="text-muted text-sm leading-relaxed mb-6">
                    根據你的生日，計算專屬的彩虹數字。了解你的戀愛特質、
                    人生方向，找到最適合的人生伴侶。
                  </p>
                  <Link href="/dating" className="btn-outline text-sm">開始占卜</Link>
                </div>
                <div className="shrink-0 hidden sm:block">
                  <img
                    src="https://www.ek21.com/home/images/rainbow.png"
                    alt="彩虹數字"
                    className="object-contain w-[120px] h-[120px]"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Rent CTA */}
      <section className="bg-deep/50 border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <div className="text-5xl mb-4">🏰</div>
                <h2 className="text-3xl font-bold text-white mb-4">打造你的聊天室王國</h2>
                <p className="text-muted text-lg mb-8 leading-relaxed">
                  在尋夢園裡，輕鬆讓您當百人聊天室的站長。
                  主辦 KTV 競賽、聯誼活動，建立屬於自己的網路社群。
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { plan: '50人', price: '$500/月' },
                    { plan: '100人', price: '$1,000/月' },
                    { plan: '150人', price: '$1,500/月' },
                  ].map(p => (
                    <div key={p.plan} className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <div className="text-white font-bold text-lg mb-1">{p.plan}</div>
                      <div className="gradient-text text-sm font-semibold">{p.price}</div>
                    </div>
                  ))}
                </div>
                <Link href="/rent" className="btn-primary inline-flex">了解承租方案 →</Link>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="relative">
                <div className="absolute inset-0 bg-sky/10 rounded-2xl blur-2xl" />
                <div className="relative glass-card p-2">
                  <img
                    src="https://www.ek21.com/home/images/more-img-1.png"
                    alt="承租聊天室"
                    className="rounded-xl w-full object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="section-title">更多服務</h2>
            <p className="section-subtitle">尋夢園提供全方位的社群服務</p>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '🏠', title: '承租專屬聊天室', description: '打造屬於自己的聊天室，擔任站長管理成員，主辦各種有趣活動', gradient: 'from-dream to-glow' },
            { icon: '💝', title: '交友聯誼服務', description: '透過戀愛小秘書娜米，參加線下聯誼活動，找到真正的心動對象', gradient: 'from-glow to-sky' },
            { icon: '🎉', title: 'eros主題派對', description: '精心設計的主題派對，在歡樂氣氛中認識新朋友，超過1,000場活動', gradient: 'from-sky to-dream' },
          ].map((f, i) => (
            <FadeIn key={f.title} delay={i * 100}>
              <FeatureCard {...f} />
            </FadeIn>
          ))}
        </div>
      </section>
    </SiteShell>
  )
}
