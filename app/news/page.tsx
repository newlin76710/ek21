'use client'
import { useState } from 'react'
import Link from 'next/link'
import SiteShell from '@/components/site-shell'

const ALL_ARTICLES = [
  {
    title: '2026年台中假日旅遊指南：精選景點與美食',
    category: '旅遊',
    date: '2026-04-03',
    excerpt: '春假將至，台中有哪些值得一遊的景點？本文為你精選最受歡迎的旅遊路線，從彩虹眷村到高美溼地，一網打盡。',
    img: 'https://www.ek21.com/home/images/more-img-2.png',
  },
  {
    title: '兒童節特輯：全台親子同樂活動大蒐羅',
    category: '生活',
    date: '2026-04-02',
    excerpt: '四月份是親子同樂的好時光，全台各地舉辦多場兒童節活動，帶著孩子一起出遊吧！',
    img: 'https://www.ek21.com/home/images/more-img-3.png',
  },
  {
    title: '2026南韓賞櫻旅遊攻略：最佳時機與路線',
    category: '旅遊',
    date: '2026-04-01',
    excerpt: '今年南韓櫻花季來得比往年早，首爾與濟州島都有絕美花海，出發前先做好功課！',
    img: 'https://www.ek21.com/home/images/more-img-1.png',
  },
  {
    title: '曬後保養完全指南：拯救受損肌膚',
    category: '健康',
    date: '2026-03-30',
    excerpt: '春夏交接，紫外線指數節節攀升，曬後保養是保持肌膚健康的關鍵。專業醫美建議大公開。',
    img: 'https://www.ek21.com/home/images/more-img-2.png',
  },
  {
    title: '台灣自行車路線推薦：環島挑戰全攻略',
    category: '旅遊',
    date: '2026-03-28',
    excerpt: '越來越多人選擇以自行車環島，本文整理最受歡迎的路線和必備行程規劃建議。',
    img: 'https://www.ek21.com/home/images/more-img-3-1.png',
  },
  {
    title: '嬰幼兒急救常識：家長必學的基本技能',
    category: '健康',
    date: '2026-03-27',
    excerpt: '家有嬰幼兒的父母，應該具備基本的急救知識，以備不時之需。',
    img: 'https://www.ek21.com/home/images/more-img-1.png',
  },
  {
    title: '春季食材大公開：當季蔬果怎麼吃最健康',
    category: '健康',
    date: '2026-03-25',
    excerpt: '春天是萬物生長的季節，當季蔬果不僅新鮮美味，營養價值也最高。',
    img: 'https://www.ek21.com/home/images/more-img-2.png',
  },
  {
    title: '居家佈置新趨勢：2026年最流行的室內設計風格',
    category: '生活',
    date: '2026-03-22',
    excerpt: '室內設計圈掀起新浪潮，今年最受歡迎的是哪幾種風格？看完這篇你也能輕鬆打造夢想家居。',
    img: 'https://www.ek21.com/home/images/more-img-3.png',
  },
  {
    title: '數位理財入門：年輕人如何開始投資理財',
    category: '政經',
    date: '2026-03-20',
    excerpt: '理財越早開始越好！本文整理適合新手的投資工具和理財觀念，讓你的錢為你工作。',
    img: 'https://www.ek21.com/home/images/more-img-1.png',
  },
]

const CATEGORIES = ['全部', '生活', '旅遊', '健康', '政經']

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('全部')

  const filtered = ALL_ARTICLES.filter(
    a => activeCategory === '全部' || a.category === activeCategory
  )

  const categoryIcon: Record<string, string> = {
    '旅遊': '✈️', '健康': '💊', '生活': '🌸', '政經': '📰',
  }

  return (
    <SiteShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">尋夢新聞</h1>
          <p className="text-muted text-lg">全台最大匿名聊天室《尋夢園》旗下媒體，聊天前先補充話題！</p>
        </div>

        {/* Featured Article */}
        {ALL_ARTICLES[0] && (
          <div className="glass-card overflow-hidden mb-10 group cursor-pointer hover:border-dream/40 transition-all">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="relative h-56 sm:h-auto overflow-hidden">
                <img
                  src={ALL_ARTICLES[0].img}
                  alt={ALL_ARTICLES[0].title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-dream/80 bg-dream/10 px-2 py-1 rounded-full font-medium">
                    {categoryIcon[ALL_ARTICLES[0].category]} {ALL_ARTICLES[0].category}
                  </span>
                  <span className="text-xs text-muted">{ALL_ARTICLES[0].date}</span>
                </div>
                <h2 className="text-white font-bold text-xl sm:text-2xl mb-3 group-hover:text-glow transition-colors">
                  {ALL_ARTICLES[0].title}
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-4">{ALL_ARTICLES[0].excerpt}</p>
                <span className="text-dream text-sm font-medium">閱讀更多 →</span>
              </div>
            </div>
          </div>
        )}

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === c ? 'bg-dream text-white shadow-glow' : 'glass text-muted hover:text-white'
              }`}
            >
              {c !== '全部' && categoryIcon[c] && `${categoryIcon[c]} `}{c}
              {c !== '全部' && (
                <span className="ml-1.5 text-xs opacity-60">
                  {ALL_ARTICLES.filter(a => a.category === c).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(a => (
            <article key={a.title} className="glass-card overflow-hidden hover:border-dream/40 hover:shadow-glow transition-all group cursor-pointer">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={a.img}
                  alt={a.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/60 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-dream/80 bg-dream/10 px-2 py-0.5 rounded-full">
                    {categoryIcon[a.category]} {a.category}
                  </span>
                  <span className="text-xs text-muted">{a.date}</span>
                </div>
                <h2 className="text-white font-semibold text-sm mb-2 group-hover:text-glow transition-colors line-clamp-2">{a.title}</h2>
                <p className="text-muted text-xs leading-relaxed line-clamp-2">{a.excerpt}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://ek21.com/news/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            前往尋夢新聞網站，閱讀更多文章 →
          </a>
        </div>
      </section>
    </SiteShell>
  )
}
