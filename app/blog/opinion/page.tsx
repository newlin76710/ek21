import type { Metadata } from 'next'
import SiteShell from '@/components/site-shell'

export const metadata: Metadata = {
  title: '意見反應',
  description: '尋夢園聊天室意見反應，告訴我們你的想法',
}

export default function OpinionPage() {
  return (
    <SiteShell>
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">💬</div>
          <h1 className="text-4xl font-bold text-white mb-3">意見反應</h1>
          <p className="text-muted text-lg">你的意見是我們進步的動力</p>
        </div>
        <div className="glass-card p-8">
          <form className="space-y-4">
            <div>
              <label className="text-sm text-muted mb-1 block">Email（選填）</label>
              <input
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-muted focus:outline-none focus:border-dream/50"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-sm text-muted mb-1 block">意見類型</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-dream/50">
                <option value="bug" className="bg-deep">回報問題</option>
                <option value="feature" className="bg-deep">功能建議</option>
                <option value="other" className="bg-deep">其他</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-muted mb-1 block">意見內容</label>
              <textarea
                rows={6}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-muted focus:outline-none focus:border-dream/50 resize-none"
                placeholder="請詳細描述您的意見或建議..."
              />
            </div>
            <button type="submit" className="btn-primary w-full py-4">
              送出意見
            </button>
          </form>
        </div>
      </section>
    </SiteShell>
  )
}
