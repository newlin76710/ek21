'use client'
import Link from 'next/link'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-night flex items-center justify-center text-center px-4">
      <div>
        <div className="text-7xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-3">發生了一些問題</h1>
        <p className="text-muted mb-8">頁面載入時遇到錯誤，請稍後再試</p>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="btn-primary">重新載入</button>
          <Link href="/" className="btn-outline">回到首頁</Link>
        </div>
      </div>
    </div>
  )
}
