import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE = 'https://www.ek21.com'
const TITLE = '尋夢園聊天室｜免費交友聊天唱歌的匿名聊天室'
const DESC = '尋找你，夢到你，原來你在這裡　尋夢園～ 尋夢園是全台最大交友聊天室、匿名聊天交友平台，擁有百萬會員及各種豐富有趣的主題聊天室。新版、舊版聊天室即時在線人數一次看，除了匿名聊天，還可以唱歌交友，快來找尋志同道合的知心好友！'

export const metadata: Metadata = {
  title: { default: TITLE, template: '%s｜尋夢園聊天室' },
  description: DESC,
  metadataBase: new URL(SITE),
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE,
    siteName: '尋夢園聊天室',
    locale: 'zh_TW',
    type: 'website',
    images: [{ url: '/img/home/og.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: ['/img/home/og.jpg'] },
  icons: { icon: '/img/favicon.ico' },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

export const viewport: Viewport = {
  themeColor: '#0b0a1f',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '尋夢園聊天室',
  legalName: '昱科網路股份有限公司',
  url: SITE,
  logo: `${SITE}/img/logo.png`,
  email: 'mkt@ek21.com',
  sameAs: ['https://line.me/R/ti/p/%40fip4700n', 'https://eros.ek21.com/', 'https://shesay.com/'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
