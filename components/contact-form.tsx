'use client'

import { FormEvent, useState } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-muted focus:outline-none focus:border-dream/50 transition-colors'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID

    if (!formId) {
      setStatus('error')
      return
    }

    setStatus('sending')

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="glass-card p-6 sm:p-8">
      <h3 className="text-white font-bold text-lg mb-6">發送訊息給我們</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-muted text-sm mb-1.5">姓名 *</label>
          <input id="name" name="name" type="text" placeholder="請輸入您的姓名" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="block text-muted text-sm mb-1.5">Email *</label>
          <input id="email" name="email" type="email" placeholder="請輸入您的 Email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-muted text-sm mb-1.5">聯絡電話</label>
          <input id="phone" name="phone" type="tel" placeholder="請輸入聯絡電話（選填）" className={inputClass} />
        </div>
        <div>
          <label htmlFor="subject" className="block text-muted text-sm mb-1.5">主旨 *</label>
          <input id="subject" name="subject" type="text" placeholder="請輸入訊息主旨" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="message" className="block text-muted text-sm mb-1.5">訊息內容 *</label>
          <textarea id="message" name="message" placeholder="請輸入您的訊息內容…" required rows={5} className={inputClass} />
        </div>

        <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
          {status === 'sending' ? '傳送中…' : '送出訊息'}
        </button>

        {status === 'success' && (
          <p className="text-green-400 text-sm text-center">感謝您的來信！我們將盡快與您聯繫。</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-sm text-center">傳送失敗，請稍後再試或直接 Email 至 mkt@ek21.com。</p>
        )}
      </form>
    </div>
  )
}
