export interface RoomInfo {
  name: string
  category: string
  fallbackUsers: number
}

export const ALL_ROOMS: RoomInfo[] = [
  { name: '平風造雨四無君', category: '孤男寡女', fallbackUsers: 253 },
  { name: '海神~', category: '已婚廣場', fallbackUsers: 136 },
  { name: '幻紫霓蹤', category: '忘年之交', fallbackUsers: 75 },
  { name: '水浮萍', category: '情人皇朝', fallbackUsers: 35 },
  { name: '神樂天心', category: '男歡女愛', fallbackUsers: 16 },
  { name: '魔力學園', category: '新版聊天室', fallbackUsers: 12 },
  { name: '聽風的歌', category: '新版聊天室', fallbackUsers: 10 },
  { name: '你依然在我心深處', category: '台南網友', fallbackUsers: 7 },
  { name: '幸福海洋', category: '情人皇朝', fallbackUsers: 6 },
  { name: '淡泊', category: '解憂防空洞', fallbackUsers: 0 },
  { name: '貓遇上魚', category: '孤男寡女', fallbackUsers: 0 },
  { name: '忘塵谷', category: '孤男寡女', fallbackUsers: 0 },
  { name: '月下星空', category: '男歡女愛', fallbackUsers: 0 },
  { name: '彩虹糖果屋', category: '新版聊天室', fallbackUsers: 0 },
  { name: '紫羅蘭花園', category: '情人皇朝', fallbackUsers: 0 },
  { name: '午夜電台', category: '解憂防空洞', fallbackUsers: 0 },
  { name: '星空下的約定', category: '忘年之交', fallbackUsers: 0 },
  { name: '微風下午茶', category: '已婚廣場', fallbackUsers: 0 },
  { name: '夜語話廊', category: '孤男寡女', fallbackUsers: 0 },
  { name: '奇幻異世界', category: '新版聊天室', fallbackUsers: 0 },
]

export const FEATURED_ROOM_NAMES = ALL_ROOMS.slice(0, 8).map(r => r.name)
