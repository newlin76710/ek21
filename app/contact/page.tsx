import type { Metadata } from 'next'
import SiteShell from '@/components/site-shell'
import ContactForm from '@/components/contact-form'

export const metadata: Metadata = {
  title: '聯絡我們',
  description: '承租聊天室、廣告合作或任何問題，歡迎透過表單與尋夢園聯繫',
}

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">✉️</div>
          <h1 className="text-4xl font-bold text-white mb-3">聯絡我們</h1>
          <p className="text-muted text-lg">承租聊天室、廣告合作或任何問題，歡迎與我們聯繫</p>
        </div>

        <ContactForm />

        <p className="text-center text-muted text-sm mt-8">
          也可以加入
          <a href="https://line.me/R/ti/p/%40fip4700n" target="_blank" rel="noopener noreferrer" className="text-dream hover:underline ml-1 font-medium">
            尋夢園 LINE 官方帳號
          </a>
          與我們聯繫
        </p>
      </section>
    </SiteShell>
  )
}
