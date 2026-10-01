'use client'

import { useEffect, useState } from 'react'
import FormspreeForm from './formspree-form'
import { PLANS } from '@/lib/plans'

const PLAN_OPTIONS = PLANS.map(p => `${p.seats} 人聊天室（每月 NT$${p.price.toLocaleString()}）`)
const MONTHS = ['三個月', '六個月', '一年', '其他（請於備註說明）']

// 價目表的「申請 N 人方案」按鈕連到 #apply-N，這裡讀網址 hash 預選方案並捲到表單
export default function RentApplyForm() {
  const [plan, setPlan] = useState(PLAN_OPTIONS[1])

  useEffect(() => {
    const sync = () => {
      const m = window.location.hash.match(/^#apply-(\d+)$/)
      if (!m) return
      const i = PLANS.findIndex(p => String(p.seats) === m[1])
      if (i >= 0) setPlan(PLAN_OPTIONS[i])
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  return (
    <FormspreeForm
      className=""
      subject="【尋夢園】承租聊天室申請"
      submitLabel="送出承租申請"
      successMessage="已收到您的承租申請！我們將盡快與您聯繫承租細節。"
      fields={[
        { name: 'name', label: '姓名', required: true, placeholder: '方便稱呼您的名字', half: true },
        { name: 'phone', label: '電話', type: 'tel', required: true, placeholder: '聯繫承租細節用', half: true },
        { name: 'email', label: 'EMAIL', type: 'email', required: true, placeholder: '回覆承租資訊用' },
        { name: 'plan', label: '方案', type: 'select', options: PLAN_OPTIONS, defaultValue: plan, half: true },
        { name: 'months', label: '承租月數（時間越長折扣越多）', type: 'select', options: MONTHS, half: true },
        { name: 'note', label: '備註', type: 'textarea', placeholder: '例：請於傍晚聯絡我' },
      ]}
    />
  )
}
