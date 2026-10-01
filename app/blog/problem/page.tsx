'use client'
import { useState } from 'react'
import Link from 'next/link'
import SiteShell from '@/components/site-shell'

const faqs = [
  {
    category: '🔐 帳號與登入',
    questions: [
      { q: '如何註冊帳號？', a: '點擊右上角「登入/註冊」按鈕，前往 member.ek21.com 填寫基本資料即可免費註冊。整個過程只需2分鐘，馬上就能開始使用所有聊天室功能。' },
      { q: '忘記密碼怎麼辦？', a: '在登入頁面點擊「忘記密碼」，輸入你在註冊時使用的電子郵件地址，系統將自動發送密碼重設連結到你的信箱。' },
      { q: '如何修改個人資料？', a: '登入後點擊右上角的個人頭像，進入帳號設定頁面，即可修改暱稱、頭像、個人介紹等資訊。' },
      { q: '一個帳號可以加入幾間聊天室？', a: '沒有限制！你可以自由加入任意數量的聊天室，並在不同聊天室中同時交流。' },
    ],
  },
  {
    category: '💬 聊天室功能',
    questions: [
      { q: '什麼是實名/匿名雙制度？', a: '尋夢園支援兩種聊天模式：實名模式會顯示你的真實暱稱，讓其他人認識你；匿名模式則以系統隨機分配的名稱進行聊天，完全保護你的個人隱私。你可以在進入聊天室時自由選擇。' },
      { q: '如何提升聊天室等級？', a: '積極參與聊天互動、累積發言次數可逐步提升等級。高等級會員將享有更多功能特權，包括更多的頭像選擇和聊天室裝飾選項。' },
      { q: '留言板密碼怎麼設置？', a: '進入聊天室後，在設定頁面可以設置留言板密碼。設置後，只有知道密碼的人才能留言，有效保護你的聊天室私密性。' },
      { q: '如何舉報不當行為？', a: '在聊天室中點擊對方暱稱，選擇「舉報」功能，填寫舉報原因後提交，管理團隊將進行審核處理。' },
    ],
  },
  {
    category: '🎤 KTV 歌唱',
    questions: [
      { q: 'KTV 功能需要什麼設備？', a: '你需要一台有麥克風的電腦或筆電，以及支援 WebRTC 的瀏覽器（強烈建議使用 Chrome 最新版本）。首次使用時，瀏覽器會詢問是否允許使用麥克風，請點擊「允許」。' },
      { q: '如何選歌唱歌？', a: '進入支援 KTV 功能的聊天室，點擊「KTV」按鈕進入歌唱模式。你可以在歌曲列表中搜尋想唱的歌曲，點擊即可加入排隊，等待輪到你演唱。' },
      { q: '唱歌時聲音出現延遲或雜音怎麼辦？', a: '建議使用有線網路連接以獲得最穩定的連線品質；關閉其他佔用網路頻寬的程式；確認麥克風設備正常並已正確連接；嘗試降低麥克風靈敏度設定。如問題持續，可嘗試重新整理頁面。' },
      { q: 'KTV 功能支援哪些瀏覽器？', a: '目前最佳支援 Google Chrome（最新版）和 Microsoft Edge。不建議使用 Internet Explorer 或舊版瀏覽器，可能會遇到功能不相容的問題。' },
    ],
  },
  {
    category: '🪙 儲值與點數',
    questions: [
      { q: '尋夢幣可以用來做什麼？', a: '尋夢幣可用於購買頭像裝扮與個人造型、擴充留言板功能、送出虛擬禮物給聊天室成員，以及解鎖部分進階聊天室功能。' },
      { q: '如何儲值尋夢幣？', a: '前往「儲值尋夢幣」頁面，選擇適合你的方案，依照指示完成銀行轉帳，再將匯款資訊 Email 至 mkt@ek21.com，核對完成後即會撥款尋夢幣到你的會員編號。' },
      { q: '尋夢幣有效期限嗎？', a: '尋夢幣儲值後不設定有效期限，請放心使用。但請注意，尋夢幣不可退款，也不可轉移給其他會員。' },
      { q: '如何查看我的點數餘額？', a: '登入帳號後，在個人設定頁面可以查看目前的尋夢幣餘額及使用記錄。' },
    ],
  },
  {
    category: '🏠 承租聊天室',
    questions: [
      { q: '如何申請承租聊天室？', a: '請 Email 至 mkt@ek21.com，說明你希望的聊天室規格（50/100/150人）及預計使用時長，客服人員會與你確認細節並安排設置。' },
      { q: '承租聊天室可以自訂名稱和外觀嗎？', a: '是的！承租聊天室可以完全自訂名稱，100人以上方案還包含客製化設計圖片，讓你的聊天室展現獨特個性。' },
      { q: '承租聊天室可以設置管理員嗎？', a: '可以！站長可以指派多名管理員協助管理聊天室，設置成員權限，確保聊天環境良好。' },
    ],
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`glass-card overflow-hidden transition-all duration-300 ${open ? 'border-dream/30' : ''}`}>
      <button
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-white font-medium text-sm">{q}</span>
        <span className={`text-dream text-lg transition-transform duration-300 shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-5 pb-4 border-t border-white/5 pt-3">
          <p className="text-muted text-sm leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function ProblemPage() {
  const [search, setSearch] = useState('')

  const filtered = faqs.map(section => ({
    ...section,
    questions: section.questions.filter(
      item => search === '' || item.q.includes(search) || item.a.includes(search)
    ),
  })).filter(section => section.questions.length > 0)

  return (
    <SiteShell>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">常見問題</h1>
          <p className="text-muted text-lg mb-6">找不到答案？歡迎聯絡我們的客服</p>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="搜尋問題..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white text-sm placeholder-muted focus:outline-none focus:border-dream/50"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">🔍</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted">
            <div className="text-4xl mb-3">🤔</div>
            <p>找不到相關問題，請直接聯絡客服</p>
          </div>
        ) : (
          <div className="space-y-10">
            {filtered.map(section => (
              <div key={section.category}>
                <h2 className="text-lg font-bold text-glow mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-dream rounded-full inline-block" />
                  {section.category}
                </h2>
                <div className="space-y-2">
                  {section.questions.map(item => (
                    <AccordionItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 glass-card p-6 text-center">
          <h2 className="text-white font-bold text-lg mb-2">還有其他問題？</h2>
          <p className="text-muted text-sm mb-4">我們的客服團隊隨時為你提供協助</p>
          <div className="flex gap-3 justify-center">
            <a href="mailto:mkt@ek21.com" className="btn-primary text-sm">📧 Email 客服</a>
            <a href="https://line.me/R/ti/p/%40fip4700n" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">💬 LINE 客服</a>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
