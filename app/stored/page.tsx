import type { Metadata } from 'next'
import SiteShell from '@/components/site-shell'
import FormspreeForm from '@/components/formspree-form'
import { LINKS } from '@/lib/site'

export const metadata: Metadata = {
  title: '儲值尋夢幣',
  description: '尋夢幣可於頭像中心購買頭貼，或擴增留言板等功能。尋夢幣 100 元起，匯款後填寫轉點表單即可。',
  alternates: { canonical: '/stored/' },
}

const packages = [100, 300, 500, 1000]

export default function StoredPage() {
  return (
    <SiteShell>
      <section className="container-x max-w-4xl py-12">
        <div className="mb-12 text-center">
          <p className="eyebrow">STORED</p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">尋夢幣儲值</h1>
          <p className="mt-4 text-lg text-muted">
            尋夢幣可以於<a href={LINKS.avatar} target="_blank" rel="noopener noreferrer" className="text-glow hover:underline">頭像商城</a>購買頭貼，或擴增留言板等功能。
          </p>
        </div>

        <h2 className="mb-4 font-bold">儲值金額</h2>
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {packages.map(n => (
            <div key={n} className="glass-card p-6 text-center">
              <div className="text-3xl">💰</div>
              <div className="gradient-text mt-2 text-3xl font-black">{n.toLocaleString()}</div>
              <div className="text-sm text-muted">尋夢幣</div>
              <div className="mt-3 text-sm font-bold">匯款 NT${n.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-[2fr_3fr]">
          <div className="glass-card self-start p-6">
            <h2 className="mb-4 text-lg font-bold">① 匯款帳號</h2>
            <dl className="space-y-3 rounded-2xl bg-white/5 p-4 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-muted">銀行</dt><dd>玉山銀行（808）基隆路分行</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">戶名</dt><dd>林正立</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">帳號</dt><dd className="font-mono tracking-wider">0118968926561</dd></div>
            </dl>
          </div>
          <div className="glass-card p-6">
            <h2 className="mb-2 text-lg font-bold">② 匯款完成後填寫轉點表單</h2>
            <p className="mb-5 text-sm text-muted">我們收到並核對完成後，將會撥款尋夢幣到您的會員編號。</p>
            <FormspreeForm
              className=""
              subject="【尋夢園】尋夢幣儲值轉點"
              submitLabel="送出轉點申請"
              successMessage="已收到您的轉點申請！核對完成後將撥款尋夢幣到您的會員編號。"
              fields={[
                { name: 'email', label: '聯絡人 email', type: 'email', required: true, placeholder: 'your@email.com' },
                { name: 'last5', label: '匯款帳號末五碼', required: true, inputMode: 'numeric', pattern: '[0-9]{5}', placeholder: '12345', half: true },
                { name: 'amount', label: '匯款金額', type: 'select', options: packages.map(n => `NT$${n.toLocaleString()}（尋夢幣 ${n.toLocaleString()}）`), half: true },
                { name: 'time', label: '匯款時間', type: 'datetime-local', required: true, half: true },
                { name: 'member_id', label: '要轉點的會員編號', required: true, placeholder: '會員編號', half: true },
              ]}
            />
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
