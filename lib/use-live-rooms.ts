'use client'
import { useSyncExternalStore } from 'react'

// 頁面本身是靜態的；人數由 Worker 的 /api/rooms 提供（舊版抓 ipXX.ek21.com 登入頁，新版抓 chatroom-backend）。
// 同一頁的所有元件共用一個輪詢。為了控制 Worker 請求數（免費方案每天 10 萬次）：
// - 每 60 秒更新一次，分頁隱藏或使用者 15 分鐘沒有操作時暫停
// - 失敗時逐步拉長重試間隔
// - 記住最近一次成功的資料，重新整理頁面時先顯示，API 暫時失敗也不會卡在讀取中

export interface LiveRooms {
  updatedAt: string
  online: number | null // 各聊天室人數加總
  rooms: Record<string, number | null>
}

export interface LiveState {
  status: 'loading' | 'ready' | 'error'
  data: LiveRooms | null
  stale?: boolean // data 是之前存下來的，最近一次更新失敗
}

const API = process.env.NEXT_PUBLIC_ROOMS_API || '/api/rooms'
const POLL_MS = 60_000
const BACKOFF_MS = [60_000, 120_000, 300_000, 600_000]
const IDLE_MS = 15 * 60_000
const STORE_KEY = 'ek21:live-rooms'
const STORE_MAX_AGE_MS = 30 * 60_000

let state: LiveState = { status: 'loading', data: null }
const listeners = new Set<() => void>()
let timer: ReturnType<typeof setTimeout> | null = null
let started = false
let failures = 0
let lastFetch = 0
let lastActivity = Date.now()

function set(next: LiveState) {
  state = next
  listeners.forEach(l => l())
}

function readStored(): LiveRooms | null {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as LiveRooms
    return Date.now() - new Date(data.updatedAt).getTime() < STORE_MAX_AGE_MS ? data : null
  } catch {
    return null
  }
}

function store(data: LiveRooms) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)) } catch {}
}

const active = () => document.visibilityState === 'visible' && Date.now() - lastActivity < IDLE_MS

function schedule(ms: number) {
  if (timer) clearTimeout(timer)
  timer = setTimeout(tick, ms)
}

function tick() {
  timer = null
  if (active()) load()
  // 暫停期間不排程，等分頁回到前景或使用者有操作時再由 wake() 喚醒
}

async function load() {
  lastFetch = Date.now()
  try {
    const res = await fetch(API, { cache: 'no-store' })
    if (!res.ok || !(res.headers.get('content-type') || '').includes('json')) throw new Error(String(res.status))
    const data = (await res.json()) as LiveRooms
    failures = 0
    store(data)
    set({ status: 'ready', data })
    schedule(POLL_MS)
  } catch {
    failures++
    set(state.data ? { ...state, stale: true } : { status: 'error', data: null })
    schedule(BACKOFF_MS[Math.min(failures - 1, BACKOFF_MS.length - 1)])
  }
}

function wake() {
  const wasIdle = Date.now() - lastActivity >= IDLE_MS
  lastActivity = Date.now()
  // 剛從閒置或背景回來、且資料已經過期，立刻更新一次
  if ((wasIdle || !timer) && active() && Date.now() - lastFetch >= POLL_MS) load()
  else if (!timer && active()) schedule(POLL_MS)
}

const ACTIVITY_EVENTS = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const

function start() {
  started = true
  const cached = readStored()
  if (cached) set({ status: 'ready', data: cached, stale: true })
  load()
  document.addEventListener('visibilitychange', wake)
  ACTIVITY_EVENTS.forEach(e => window.addEventListener(e, wake, { passive: true }))
}

function stop() {
  started = false
  if (timer) clearTimeout(timer)
  timer = null
  document.removeEventListener('visibilitychange', wake)
  ACTIVITY_EVENTS.forEach(e => window.removeEventListener(e, wake))
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (!started) start()
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) stop()
  }
}

const SERVER_STATE: LiveState = { status: 'loading', data: null }

export function useLiveRooms(): LiveState {
  return useSyncExternalStore(subscribe, () => state, () => SERVER_STATE)
}

export function roomCount(live: LiveState, id: string): number | null {
  return live.data?.rooms[id] ?? null
}

export function onlineCount(live: LiveState): number | null {
  return live.data?.online ?? null
}
