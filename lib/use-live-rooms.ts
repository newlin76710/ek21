'use client'
import { useSyncExternalStore } from 'react'

// 頁面本身是靜態的；人數由 Worker 的 /api/rooms 提供（舊版抓 ipXX.ek21.com 登入頁，新版抓 chatroom-backend）。
// 同一頁的所有元件共用一個輪詢，分頁隱藏時暫停。

export interface LiveRooms {
  updatedAt: string
  online: number | null // 各聊天室人數加總
  rooms: Record<string, number | null>
}

export interface LiveState {
  status: 'loading' | 'ready' | 'error'
  data: LiveRooms | null
}

const API = process.env.NEXT_PUBLIC_ROOMS_API || '/api/rooms'
const POLL_MS = 30_000

let state: LiveState = { status: 'loading', data: null }
const listeners = new Set<() => void>()
let timer: ReturnType<typeof setInterval> | null = null

function set(next: LiveState) {
  state = next
  listeners.forEach(l => l())
}

async function load() {
  try {
    const res = await fetch(API, { cache: 'no-store' })
    if (!res.ok) throw new Error(String(res.status))
    set({ status: 'ready', data: await res.json() })
  } catch {
    // 保留上一次成功的資料，只在完全沒有資料時顯示錯誤
    if (!state.data) set({ status: 'error', data: null })
  }
}

function onVisibility() {
  if (document.visibilityState === 'visible') load()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (!timer) {
    load()
    timer = setInterval(() => { if (document.visibilityState === 'visible') load() }, POLL_MS)
    document.addEventListener('visibilitychange', onVisibility)
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0 && timer) {
      clearInterval(timer)
      timer = null
      document.removeEventListener('visibilitychange', onVisibility)
    }
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
