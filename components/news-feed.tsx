'use client'
import { useEffect, useState } from 'react'

// 姊妹站「尋夢新聞」（同網域 /news，ek21news Worker）的 JSON API
interface NewsItem {
  id: string
  title: string
  summary?: string
  image?: string | null
  category_name?: string
  source_name?: string
  published_at: string
}

const NEWS_API = process.env.NEXT_PUBLIC_NEWS_API || '/news/api/news?limit=6'
// 文章連結走 news.ek21.com；API 用同網域 /news 路徑讀取（避免跨網域 CORS）
const NEWS_BASE = process.env.NEXT_PUBLIC_NEWS_BASE || 'https://news.ek21.com'

function timeAgo(iso: string) {
  const m = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  if (m < 60) return `${m} 分鐘前`
  const h = Math.round(m / 60)
  if (h < 24) return `${h} 小時前`
  return `${Math.round(h / 24)} 天前`
}

export default function NewsFeed() {
  const [items, setItems] = useState<NewsItem[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let alive = true
    fetch(NEWS_API)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(j => { if (alive) setItems(Array.isArray(j.data) ? j.data : []) })
      .catch(() => { if (alive) setFailed(true) })
    return () => { alive = false }
  }, [])

  if (failed || (items && items.length === 0)) {
    return (
      <a href={`${NEWS_BASE}/`} className="glass-card flex flex-col items-start gap-3 p-6 transition-colors hover:border-white/25 sm:col-span-2 lg:col-span-3">
        <span className="text-2xl">📰</span>
        <span className="text-lg font-bold">到尋夢新聞看看今天大家在聊什麼</span>
        <span className="text-sm text-muted">尋夢新聞每日推播最夯最熱門的新聞，隨時掌握流行大小事。</span>
        <span className="text-sm font-semibold text-dream">前往尋夢新聞 →</span>
      </a>
    )
  }

  if (!items) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass-card space-y-3 p-5">
            <div className="skeleton h-4 w-16 rounded" />
            <div className="skeleton h-5 w-full rounded" />
            <div className="skeleton h-5 w-2/3 rounded" />
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      {items.map((n, i) => (
        <a
          key={n.id}
          href={`${NEWS_BASE}/article/${n.id}`}
          className="glass-card group flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:border-white/25"
        >
          <div className="mb-2 flex items-center gap-2 text-[11px]">
            {n.category_name && <span className="rounded-md bg-dream/15 px-2 py-0.5 font-bold text-dream">{n.category_name}</span>}
            <span className="text-muted">{timeAgo(n.published_at)}</span>
            {i === 0 && <span className="ml-auto rounded-md bg-gold/15 px-2 py-0.5 font-bold text-gold">最新</span>}
          </div>
          <h3 className="line-clamp-2 font-bold leading-snug text-white group-hover:text-glow">{n.title}</h3>
          {n.summary && <p className="mt-2 line-clamp-2 text-sm text-muted">{n.summary}</p>}
          {n.source_name && <p className="mt-auto pt-3 text-[11px] text-muted/80">{n.source_name}</p>}
        </a>
      ))}
    </>
  )
}
