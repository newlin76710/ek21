import type { Metadata } from 'next'
import SiteShell from '@/components/site-shell'
import FormspreeForm from '@/components/formspree-form'

export const metadata: Metadata = {
  title: '廣告合作',
  description: '尋夢園廣告合作，超過300萬會員、月訪百萬人次，為你的品牌量身定做最佳宣傳方案',
}

export default function AdvertisementPage() {
  return (
    <SiteShell>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-4xl font-bold text-white mb-3">廣告合作</h1>
          <p className="text-muted text-lg">讓你的品牌觸及台灣最大聊天社群</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          {[
            { value: '312萬+', label: '註冊會員' },
            { value: '100萬+', label: '月訪人次' },
            { value: '多元化', label: '廣告版位' },
          ].map(s => (
            <div key={s.label} className="glass-card p-5 text-center">
              <div className="gradient-text text-3xl font-bold mb-1">{s.value}</div>
              <div className="text-muted text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="glass-card p-8 mb-8">
          <h2 className="text-white font-bold text-xl mb-4">關於我們的受眾</h2>
          <p className="text-muted text-sm leading-relaxed mb-4">
            尋夢園聊天室擁有超過 312 萬名註冊會員，每月吸引約 100 萬人次造訪。
            我們的用戶以 18-45 歲的台灣年輕族群為主，對社交、娛樂、生活消費等議題高度關注。
          </p>
          <p className="text-muted text-sm leading-relaxed">
            在這裡，我們可以為您的品牌與商品量身定做，達到最佳的宣傳效果！
            我們提供多種廣告格式，包括橫幅廣告、聊天室內廣告、原生推廣內容等。
          </p>
        </div>

        {/* Contact Form */}
        <FormspreeForm
          title="填寫合作意向"
          subject="【尋夢園】異業合作"
          submitLabel="送出合作意向"
          successMessage="已收到您的合作意向！我們將盡快與您聯繫。"
          fields={[
            { name: 'name', label: '姓名', required: true, placeholder: '您的姓名', half: true },
            { name: 'phone', label: '電話', type: 'tel', placeholder: '聯絡電話', half: true },
            { name: 'company', label: '公司／品牌', placeholder: '選填', half: true },
            { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'business@example.com', half: true },
            { name: 'message', label: '合作說明', type: 'textarea', required: true, placeholder: '請說明您的廣告需求或合作想法' },
          ]}
        />
      </section>
    </SiteShell>
  )
}
