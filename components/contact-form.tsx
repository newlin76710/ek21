import FormspreeForm from './formspree-form'

export default function ContactForm() {
  return (
    <FormspreeForm
      title="發送訊息給我們"
      subject="【尋夢園】聯絡我們"
      submitLabel="送出訊息"
      successMessage="感謝您的來信！我們將盡快與您聯繫。"
      fields={[
        { name: 'name', label: '姓名', required: true, placeholder: '請輸入您的姓名', half: true },
        { name: 'phone', label: '聯絡電話', type: 'tel', placeholder: '選填', half: true },
        { name: 'email', label: 'Email', type: 'email', required: true, placeholder: '請輸入您的 Email' },
        { name: 'topic', label: '主旨', required: true, placeholder: '請輸入訊息主旨' },
        { name: 'message', label: '訊息內容', type: 'textarea', required: true, placeholder: '請輸入您的訊息內容…' },
      ]}
    />
  )
}
