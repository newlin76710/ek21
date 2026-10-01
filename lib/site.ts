import roomData from './rooms.json'

export type RoomVersion = 'new' | 'legacy'

export interface Room {
  id: string
  version: RoomVersion
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
  member: 'http://member.ek21.com/',
  avatar: 'http://avatar.ek21.com/',
  line: 'https://line.me/R/ti/p/%40fip4700n',
  namiLine: 'https://lin.ee/iweaTucb',
  email: 'mkt@ek21.com',
  legacyGuide: 'https://docs.google.com/document/d/14YBkmkJG2TBXJVit4QiqWZYuiRRfsaksKbDGaSV2Hrs',
  newGuide: 'https://docs.google.com/document/d/1Wfuv2JiTb7kcxfMgdlbL8AwwEESeKYsHfqgG4YMV6Vs',
}

// 尋夢園家族：/news、/dating 是同網域下的姊妹站（各自的 Worker），一律用一般 <a> 整頁跳轉，不走 Next 的客戶端路由
export const SISTER_SITES = [
  { key: 'home', label: '尋夢園聊天室', short: '尋夢園', href: '/' },
  { key: 'news', label: '尋夢新聞', short: '尋夢新聞', href: '/news/' },
  { key: 'dating', label: '戀愛小秘書娜米', short: '娜米', href: '/dating/' },
  { key: 'eros', label: 'eros 主題派對', short: 'eros', href: 'https://eros.ek21.com/' },
  { key: 'shesay', label: 'SheSay', short: 'SheSay', href: 'https://shesay.com/' },
] as const

export const isExternal = (href: string) => /^https?:\/\//.test(href)
