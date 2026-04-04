import type { Metadata } from 'next'
import SiteShell from '@/components/site-shell'

export const metadata: Metadata = {
  title: '儲值尋夢幣',
  description: '尋夢幣儲值方案，100幣=NT$100，支援銀行轉帳',
}

const packages = [
  { coins: 100, price: 100 },
  { coins: 300, price: 300 },
  { coins: 500, price: 500 },
  { coins: 1000, price: 1000 },
]

export default function StoredPage() {
  return (
    <SiteShell>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🪙</div>
          <h1 className="text-4xl font-bold text-white mb-3">儲值尋夢幣</h1>
          <p className="text-muted text-lg">購買尋夢幣，享受更多聊天室進階功能</p>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {packages.map(p => (
            <div key={p.coins} className="glass-card p-6 text-center hover:border-dream/40 hover:shadow-glow transition-all cursor-pointer">
              <div className="text-3xl mb-2">🪙</div>
              <div className="gradient-text text-3xl font-bold mb-1">{p.coins}</div>
              <div className="text-muted text-sm mb-3">尋夢幣</div>
              <div className="text-white font-semibold">NT${p.price}</div>
            </div>
          ))}
        </div>

        {/* Payment Info */}
        <div className="glass-card p-6 mb-6">
          <h2 className="text-white font-bold text-lg mb-4">💳 付款方式</h2>
          <div className="space-y-3 text-sm">
            <p className="text-gray-300">銀行轉帳至以下帳號：</p>
            <div className="bg-white/5 rounded-xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted">銀行</span>
                <span className="text-white">玉山銀行</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">戶名</span>
                <span className="text-white">林正立</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">帳號</span>
                <span className="text-white font-mono">0118968926561</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="glass-card p-6">
          <h2 className="text-white font-bold text-lg mb-4">📋 儲值步驟</h2>
          <ol className="space-y-3">
            {[
              '選擇你要購買的尋夢幣方案',
              '依照金額轉帳至上方帳號',
              '將以下資訊 Email 至 mkt@ek21.com',
              '確認後系統將在 1-2 個工作天內完成入帳',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-dream flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-gray-300 text-sm">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 bg-white/5 rounded-xl p-4 text-sm">
            <p className="text-muted mb-2">Email 需包含以下資訊：</p>
            <ul className="space-y-1 text-gray-300">
              <li>• 聯絡信箱</li>
              <li>• 轉帳帳號後五碼</li>
              <li>• 轉帳時間</li>
              <li>• 轉帳金額</li>
              <li>• 會員 ID</li>
            </ul>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
