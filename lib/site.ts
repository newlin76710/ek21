import roomData from './rooms.json'

export type RoomVersion = 'new' | 'legacy'

export interface Room {
  id: string
  version: RoomVersion
  pinned?: boolean // 置頂：列表中固定排在最前面
  name: string
  host: string
  tag: string
  url: string
  image: string
  server?: string
}

export const ROOMS = roomData as Room[]
export const NEW_ROOMS = ROOMS.filter(r => r.version === 'new')
export const LEGACY_ROOMS = ROOMS.filter(r => r.version === 'legacy')

export const TOTAL_MEMBERS = 3125493

export const LINKS = {
  news: 'https://news.ek21.com/',
  dating: 'https://dating.ek21.com/',
  // 右上角登入／註冊：導到新版「歡喜就好」的登入頁，?mode= 決定開哪個分頁
  login: 'https://chat1.ek21.com/login?mode=login',
  register: 'https://chat1.ek21.com/login?mode=register',
  member: 'http://member.ek21.com/',
  avatar: 'http://avatar.ek21.com/',
  board: 'http://board.ek21.com/',
  line: 'https://line.me/R/ti/p/%40fip4700n',
  namiLine: 'https://lin.ee/iweaTucb',
  email: 'mkt@ek21.com',
  legacyGuide: 'https://docs.google.com/document/d/14YBkmkJG2TBXJVit4QiqWZYuiRRfsaksKbDGaSV2Hrs',
  newGuide: 'https://docs.google.com/document/d/1Wfuv2JiTb7kcxfMgdlbL8AwwEESeKYsHfqgG4YMV6Vs',
}

// 尋夢園家族：一律用一般 <a> 整頁跳轉，不走 Next 的客戶端路由
export const SISTER_SITES = [
  { key: 'home', label: '尋夢園聊天室', short: '尋夢園', href: '/' },
  { key: 'news', label: '尋夢新聞', short: '尋夢新聞', href: LINKS.news },
  { key: 'dating', label: '戀愛小秘書娜米', short: '娜米', href: LINKS.dating },
  { key: 'eros', label: 'eros 主題派對', short: 'eros', href: 'https://eros.ek21.com/' },
  { key: 'shesay', label: 'SheSay', short: 'SheSay', href: 'https://shesay.com/' },
] as const

export const isExternal = (href: string) => /^https?:\/\//.test(href)

// ── 舊版聊天室登入（沿用舊站 home.js 的 OnLogin4b 與 Facebook 登入）──
// 新版直接開聊天室網址；舊版先到本站的 /room/<房號>/ 登入頁，再送出到舊主機
export const roomHref = (r: Room) => (r.version === 'legacy' ? `/room/${r.id}/` : r.url)
export const isNewTab = (r: Room) => r.version === 'new'

// 表單 POST 到該聊天室主機的 /login，欄位 roomid / nickname / password / gender（boy|girl）
export const legacyLoginAction = (r: Room) => `http://${r.server}/login`

// Facebook 登入：授權後由 api.ek21.com 處理並進入該聊天室（client_id 沿用舊頁面目前啟用的那一組）
const FB_CLIENT_ID = '915669256300787'
export const legacyFacebookUrl = (r: Room) =>
  // 網址格式與舊頁面完全相同（redirect_uri 不編碼），避免與 Facebook 後台登記的網址不一致
  `https://www.facebook.com/dialog/oauth?client_id=${FB_CLIENT_ID}&redirect_uri=https://api.ek21.com/fbekc/login/${r.server}/${r.id}/&response_type=token&display=popup`
