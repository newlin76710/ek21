'use client'

import { FormEvent, useRef, useState } from 'react'
import { legacyFacebookUrl, legacyLoginAction, LINKS, type Room } from '@/lib/site'

// 暱稱檢查：與舊站 home.js 的 OnLogin4b 相同
const DIRTY = ['$', '\\', '&', '"', "'", ' ', '/', '<', '>', '|', '*', ';', ':', '@', '!', '%', '.', '幹', '肏', '操', '糙', '襙', '贛', '榦', '淦', '淫', '賤', '婬', '穴', '屌', '鮑', '雞巴', '死', '灨']

function checkNickname(nick: string): string | null {
  if (!nick) return '暱稱未填'
  let n = 0
  for (let i = 0; i < nick.length; i++) n += nick.charCodeAt(i) > 256 ? 2 : 1
  if (n < 2) return '暱稱太短'
  if (n > 16) return '暱稱太長'
  if (DIRTY.some(d => nick.includes(d))) return '暱稱中請勿含有空白、特殊符號及不雅文字'
  return null
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-muted transition-colors focus:border-glow/60 focus:outline-none'

export default function LegacyLoginForm({ room }: { room: Room }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const nick = (form.elements.namedItem('nickname') as HTMLInputElement).value
    const msg = checkNickname(nick)
    if (msg) {
      setError(msg)
      ;(form.elements.namedItem('nickname') as HTMLInputElement).focus()
      return
    }
    setError(null)
    setSending(true)
    // 與舊頁面相同：送出到該聊天室主機的 /login，由舊主機驗證帳密並開啟聊天室
    form.submit()
    setTimeout(() => {
      const pw = form.elements.namedItem('password') as HTMLInputElement | null
      if (pw) pw.value = ''
      setSending(false)
    }, 1500)
  }

  return (
    <div className="space-y-5">
      <form ref={formRef} method="post" action={legacyLoginAction(room)} acceptCharset="big5" onSubmit={onSubmit} autoComplete="off" className="space-y-4">
        <input type="hidden" name="roomid" value={room.id} />
        <div>
          <label htmlFor="nickname" className="mb-1.5 block text-sm text-muted">暱稱</label>
          <input id="nickname" name="nickname" maxLength={18} required autoFocus placeholder="2～8 個中文字或 2～16 個英數字" className={inputClass} />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm text-muted">密碼</label>
          <input id="password" name="password" type="password" placeholder="非會員不需密碼" autoComplete="current-password" className={inputClass} />
        </div>
        <fieldset>
          <legend className="mb-1.5 block text-sm text-muted">性別</legend>
          <div className="grid grid-cols-2 gap-3">
            {[
              { v: 'boy', label: '男生' },
              { v: 'girl', label: '女生' },
            ].map((g, i) => (
              <label key={g.v} className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 has-[:checked]:border-dream/70 has-[:checked]:bg-dream/15">
                <input type="radio" name="gender" value={g.v} defaultChecked={i === 0} className="accent-[#ff3d7f]" />
                {g.label}
              </label>
            ))}
          </div>
        </fieldset>
        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
        <button type="submit" disabled={sending} className="btn-primary w-full py-4 text-lg disabled:opacity-60">
          {sending ? '進入中…' : '進入聊天室'}
        </button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-white/10" />或<span className="h-px flex-1 bg-white/10" />
      </div>
      <a href={legacyFacebookUrl(room)} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1877f2] py-3.5 font-bold text-white transition hover:brightness-110">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
        用 Facebook 直接進入
      </a>
      <p className="text-center text-sm text-muted">
        <a href={LINKS.member} target="_blank" rel="noopener noreferrer" className="hover:text-white">會員中心</a>
        <span className="mx-2 text-white/20">／</span>
        <a href={LINKS.member} target="_blank" rel="noopener noreferrer" className="hover:text-white">忘記密碼</a>
        <span className="mx-2 text-white/20">／</span>
        <a href={LINKS.member} target="_blank" rel="noopener noreferrer" className="hover:text-white">註冊</a>
      </p>
    </div>
  )
}
