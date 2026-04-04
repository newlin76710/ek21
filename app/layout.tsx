import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '尋夢園聊天室｜全台最大免費匿名聊天交友平台',
    template: '%s — 尋夢園聊天室',
  },
  description: '尋夢園是台灣最大的免費匿名聊天室，擁有超過300萬會員。提供KTV歌唱、交友聯誼、主題聊天室等豐富功能，隨時隨地找到志同道合的朋友。',
  metadataBase: new URL('https://www.ek21.com'),
  openGraph: {
    title: '尋夢園聊天室｜全台最大免費匿名聊天交友平台',
    description: '台灣最大匿名聊天室，300萬會員，免費交友聊天唱歌',
    url: 'https://www.ek21.com',
    siteName: '尋夢園聊天室',
    locale: 'zh_TW',
    type: 'website',
    images: [{ url: 'https://www.ek21.com/images/logo/logo.png', width: 800, height: 600 }],
  },
  twitter: { card: 'summary_large_image', title: '尋夢園聊天室', description: '台灣最大匿名聊天室' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.ek21.com' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '尋夢園聊天室',
  url: 'https://www.ek21.com',
  logo: 'https://www.ek21.com/images/logo/logo.png',
  description: '台灣最大匿名聊天室，超過300萬名會員',
  contactPoint: { '@type': 'ContactPoint', email: 'mkt@ek21.com', contactType: 'customer service' },
  sameAs: ['https://line.me/R/ti/p/%40fip4700n'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
