export default function Loading() {
  return (
    <div className="min-h-screen bg-night flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-dream-gradient mx-auto mb-4 animate-pulse flex items-center justify-center">
          <span className="text-white font-bold text-2xl">夢</span>
        </div>
        <div className="text-muted text-sm">載入中...</div>
      </div>
    </div>
  )
}
