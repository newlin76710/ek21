'use client'

import { FormEvent, useState } from 'react'

// 全站寄信一律走 Formspree（不開 mailto / Outlook）
export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xaenkkgb'

type Status = 'idle' | 'sending' | 'success' | 'error'

export interface Field {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'datetime-local'
  required?: boolean
  placeholder?: string
  options?: string[]
  defaultValue?: string
  half?: boolean // 桌機版佔半欄
  inputMode?: 'numeric' | 'text'
  pattern?: string
}

interface FormspreeFormProps {
  subject: string // 信件主旨，方便在收件匣分類
  fields: Field[]
  title?: string
  submitLabel?: string
  successMessage?: string
  className?: string
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-muted transition-colors focus:border-glow/60 focus:outline-none'

export default function FormspreeForm({
  subject,
  fields,
  title,
  submitLabel = '送出',
  successMessage = '已收到您的訊息！我們將盡快與您聯繫。',
  className = 'glass-card p-6 sm:p-8',
}: FormspreeFormProps) {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={className}>
      {title && <h2 className="mb-6 text-xl font-black">{title}</h2>}
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <input type="hidden" name="_subject" value={subject} />
        {/* Formspree 的防機器人欄位，真人看不到 */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        {fields.map(f => {
          const id = `${subject}-${f.name}`
          const common = {
            id,
            name: f.name,
            required: f.required,
            placeholder: f.placeholder,
            defaultValue: f.defaultValue,
            className: inputClass,
          }
          return (
            <div key={`${f.name}-${f.defaultValue ?? ''}`} className={f.half ? '' : 'sm:col-span-2'}>
              <label htmlFor={id} className="mb-1.5 block text-sm text-muted">
                {f.label}{f.required && <span className="ml-0.5 text-dream">*</span>}
              </label>
              {f.type === 'textarea' ? (
                <textarea {...common} rows={5} />
              ) : f.type === 'select' ? (
                <select {...common}>
                  {f.options?.map(o => <option key={o} value={o} className="bg-deep">{o}</option>)}
                </select>
              ) : (
                <input {...common} type={f.type || 'text'} inputMode={f.inputMode} pattern={f.pattern} />
              )}
            </div>
          )
        })}

        <div className="sm:col-span-2">
          <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60">
            {status === 'sending' ? '傳送中…' : submitLabel}
          </button>
          <div aria-live="polite" className="mt-3 text-center text-sm">
            {status === 'success' && <p className="text-live">{successMessage}</p>}
            {status === 'error' && <p className="text-red-400">傳送失敗，請稍後再試，或加入 LINE 官方帳號與我們聯繫。</p>}
          </div>
        </div>
      </form>
    </div>
  )
}
