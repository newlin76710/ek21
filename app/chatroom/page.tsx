'use client'
import { useState } from 'react'
import Link from 'next/link'
import SiteShell from '@/components/site-shell'
import RoomCard from '@/components/room-card'

const ALL_ROOMS = [
  { name: '平風造雨四無君', category: '孤男寡女', users: 253 },
  { name: '海神~', category: '已婚廣場', users: 136 },
  { name: '幻紫霓蹤', category: '忘年之交', users: 75 },
  { name: '水浮萍', category: '情人皇朝', users: 35 },
  { name: '神樂天心', category: '男歡女愛', users: 16 },
  { name: '魔力學園', category: '新版聊天室', users: 12 },
  { name: '聽風的歌', category: '新版聊天室', users: 10 },
  { name: '你依然在我心深處', category: '台南網友', users: 7 },
  { name: '幸福海洋', category: '情人皇朝', users: 6 },
  { name: '淡泊', category: '解憂防空洞', users: 0 },
  { name: '貓遇上魚', category: '孤男寡女', users: 0 },
  { name: '忘塵谷', category: '孤男寡女', users: 0 },
  { name: '月下星空', category: '男歡女愛', users: 0 },
  { name: '彩虹糖果屋', category: '新版聊天室', users: 0 },
  { name: '紫羅蘭花園', category: '情人皇朝', users: 0 },
  { name: '午夜電台', category: '解憂防空洞', users: 0 },
  { name: '星空下的約定', category: '忘年之交', users: 0 },
  { name: '微風下午茶', category: '已婚廣場', users: 0 },
  { name: '夜語話廊', category: '孤男寡女', users: 0 },
  { name: '奇幻異世界', category: '新版聊天室', users: 0 },
]

const CATEGORIES = ['全部', '孤男寡女', '已婚廣場', '忘年之交', '情人皇朝', '男歡女愛', '新版聊天室', '解憂防空洞', '台南網友']
const SORTS = [
  { label: '人氣最高', value: 'users' },
  { label: '最新', value: 'newest' },
]

export default function ChatroomPage() {
  const [activeCategory, setActiveCategory] = useState('全部')
  const [sort, setSort] = useState('users')
  const [search, setSearch] = useState('')

  let filtered = ALL_ROOMS
    .filter(r => activeCategory === '全部' || r.category === activeCategory)
    .filter(r => search === '' || r.name.includes(search) || r.category.includes(search))

  if (sort === 'users') {
    filtered = [...filtered].sort((a, b) => b.users - a.users)
  }

  const onlineCount = filtered.filter(r => r.users > 0).length

  return (
    <SiteShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-muted text-sm mb-6">
          <Link href="/" className="hover:text-white transition-colors">首頁</Link>
          <span>/</span>
          <span className="text-white">聊天室列表</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">聊天室列表</h1>
            <p className="text-muted flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
              目前有 <span className="text-green-400 font-semibold">{onlineCount}</span> 間聊天室正在活動
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="http://member.ek21.com/" className="btn-outline text-sm py-2">
              登入 / 註冊
            </Link>
            <Link href="/rent" className="btn-primary text-sm py-2">
              我要當站長
            </Link>
          </div>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="搜尋聊天室名稱或分類..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white text-sm placeholder-muted focus:outline-none focus:border-dream/50 transition-colors"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">🔍</span>
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-dream/50"
          >
            {SORTS.map(s => (
              <option key={s.value} value={s.value} className="bg-deep">{s.label}</option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === c
                  ? 'bg-dream text-white shadow-glow'
                  : 'glass text-muted hover:text-white hover:border-dream/40'
              }`}
            >
              {c}
              {c !== '全部' && (
                <span className="ml-1.5 text-xs opacity-60">
                  {ALL_ROOMS.filter(r => r.category === c).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Room Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <div className="text-5xl mb-4">🔍</div>
            <p>找不到符合條件的聊天室</p>
            <button onClick={() => { setSearch(''); setActiveCategory('全部') }} className="btn-outline mt-4 text-sm">
              清除篩選
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map(r => (
              <RoomCard key={r.name} {...r} />
            ))}
          </div>
        )}

        {/* Tutorial */}
        <div className="mt-10 glass-card p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="text-3xl">📖</div>
          <div>
            <div className="text-white font-semibold mb-1">第一次使用聊天室？</div>
            <div className="text-muted text-sm">查看完整教學，快速上手尋夢園聊天室功能</div>
          </div>
          <a
            href="https://ek21.com/blog/problem/"
            className="btn-outline text-sm sm:ml-auto whitespace-nowrap"
          >
            查看使用教學
          </a>
        </div>
      </section>
    </SiteShell>
  )
}
