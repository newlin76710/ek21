'use client'
import { useState } from 'react'
import { LiveRoomGrid, VersionTotal } from './live-widgets'
import { LEGACY_ROOMS, LINKS, NEW_ROOMS, ROOMS, type Room } from '@/lib/site'

type Tab = 'all' | 'new' | 'legacy'

const TABS: { key: Tab; label: string; rooms: Room[] }[] = [
  { key: 'all', label: '全部', rooms: ROOMS },
  { key: 'new', label: '新版聊天室', rooms: NEW_ROOMS },
  { key: 'legacy', label: '舊版聊天室', rooms: LEGACY_ROOMS },
]

export default function ChatroomBrowser() {
  const [tab, setTab] = useState<Tab>('all')
  const [q, setQ] = useState('')

  const match = (r: Room) => !q || r.name.includes(q) || r.host.includes(q) || r.tag.includes(q)
  const newRooms = tab !== 'legacy' ? NEW_ROOMS.filter(match) : []
  const legacyRooms = tab !== 'new' ? LEGACY_ROOMS.filter(match) : []

  return (
    <>
      <div className="sticky top-24 z-30 -mx-4 mb-8 border-b border-white/5 bg-night/85 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="聊天室版本">
            {TABS.map(t => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-all ${
                  tab === t.key ? 'bg-dream-gradient text-white shadow-glow' : 'bg-white/5 text-muted hover:text-white'
                }`}
              >
                {t.label}
                <span className="ml-1.5 text-xs opacity-70">{t.rooms.length}</span>
              </button>
            ))}
          </div>
          <label className="relative sm:ml-auto sm:w-72">
            <span className="sr-only">搜尋聊天室</span>
            <span aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">🔍</span>
            <input
              type="search"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="輸入聊天室名稱、站長…"
              className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-sm text-white placeholder-muted focus:border-glow/60 focus:outline-none"
            />
          </label>
        </div>
      </div>

      {newRooms.length > 0 && (
        <section className="mb-14" aria-labelledby="new-rooms">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="new-rooms" className="flex items-center gap-2 text-2xl font-black">新版聊天室 <span className="badge-new">新版</span></h2>
              <p className="mt-1 text-sm text-muted">全新介面，點擊直接進入。目前共 <span className="font-bold text-live"><VersionTotal rooms={NEW_ROOMS} /></span> 人在線。</p>
            </div>
            <a href={LINKS.newGuide} target="_blank" rel="noopener noreferrer" className="text-sm text-glow hover:underline">新版聊天室教學 →</a>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <LiveRoomGrid rooms={newRooms} size="lg" sort />
          </div>
        </section>
      )}

      {legacyRooms.length > 0 && (
        <section className="mb-10" aria-labelledby="legacy-rooms">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="legacy-rooms" className="flex items-center gap-2 text-2xl font-black">舊版聊天室 <span className="badge-legacy">舊版</span></h2>
              <p className="mt-1 text-sm text-muted">開啟原本的聊天室登入頁，會員、非會員都能進入。目前共 <span className="font-bold text-gold"><VersionTotal rooms={LEGACY_ROOMS} /></span> 人在線。</p>
            </div>
            <a href={LINKS.legacyGuide} target="_blank" rel="noopener noreferrer" className="text-sm text-glow hover:underline">舊版聊天室教學 →</a>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <LiveRoomGrid rooms={legacyRooms} sort />
          </div>
        </section>
      )}

      {newRooms.length === 0 && legacyRooms.length === 0 && (
        <div className="py-16 text-center text-muted">
          <div className="mb-4 text-5xl">🔍</div>
          <p>找不到「{q}」相關的聊天室</p>
          <button onClick={() => { setQ(''); setTab('all') }} className="btn-outline mt-5 text-sm">清除搜尋</button>
        </div>
      )}
    </>
  )
}
