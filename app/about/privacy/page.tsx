import type { Metadata } from 'next'
import SiteShell from '@/components/site-shell'

export const metadata: Metadata = {
  title: '隱私權條款',
  description: '尋夢園聊天室隱私權政策，說明我們如何收集、使用及保護您的個人資料',
}

const sections = [
  {
    title: '一、資料收集',
    content: '我們可能收集您的姓名、電子郵件、生日、性別、暱稱、地址、電話、職業及興趣等資料，以提供更完整的服務。',
  },
  {
    title: '二、資料使用',
    content: '收集的資料將用於提供個人化服務、問卷調查、精準廣告投放及統計分析。您的 IP 位址、瀏覽器類型及點擊記錄僅用於整體分析，不會單獨識別個人身份。',
  },
  {
    title: '三、第三方分享',
    content: '我們僅在事先告知的情況下與策略合作夥伴或贊助商分享您的資料。我們絕不出售、租賃或交換您的個人資料給未授權的第三方。',
  },
  {
    title: '四、Cookies 使用',
    content: '我們使用 Cookies 來追蹤您的身份識別、流量分析、促銷活動效果及瀏覽模式，以提供更好的個人化體驗及精準廣告。',
  },
  {
    title: '五、用戶選擇',
    content: '您可以透過帳號設定修改您的個人偏好及資料使用方式。若您不希望接收特定類型的通知或廣告，可在設定中進行調整。',
  },
  {
    title: '六、資料更新',
    content: '會員隨時可以登入帳號修改或更新個人資料。請確保您的資料保持最新，以獲得最佳服務體驗。',
  },
  {
    title: '七、安全性',
    content: '用戶必須負責保護自己的帳號密碼及個人資料安全。我們盡力保護您的資料，但無法保證網際網路傳輸的絕對安全，請謹慎使用。',
  },
]

export default function PrivacyPage() {
  return (
    <SiteShell>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-4">隱私權條款</h1>
        <p className="text-muted mb-10">尋夢園聊天室致力於保護您的個人隱私，請詳細閱讀以下條款。</p>
        <div className="space-y-6">
          {sections.map(s => (
            <div key={s.title} className="glass-card p-6">
              <h2 className="text-white font-bold text-lg mb-3">{s.title}</h2>
              <p className="text-muted text-sm leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  )
}
