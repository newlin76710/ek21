import type { Metadata } from 'next'
import SiteShell from '@/components/site-shell'
import FormspreeForm from '@/components/formspree-form'

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
        <FormspreeForm
          className="glass-card p-8"
          subject="【尋夢園】意見回饋"
          submitLabel="送出意見"
          successMessage="感謝您的寶貴意見！"
          fields={[
            { name: 'email', label: 'Email（選填，需要回覆時填寫）', type: 'email', placeholder: 'your@email.com' },
            { name: 'type', label: '意見類型', type: 'select', options: ['回報問題', '功能建議', '其他'] },
            { name: 'message', label: '意見內容', type: 'textarea', required: true, placeholder: '請詳細描述您的意見或建議...' },
          ]}
        />
      </section>
    </SiteShell>
  )
}
