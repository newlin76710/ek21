import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 主色沿用姊妹站「尋夢新聞」的品牌粉紅，搭配夜空紫
        dream: '#ff3d7f',
        night: '#0b0a1f',
        deep: '#15122e',
        soft: '#211c45',
        glow: '#b794ff',
        sky: '#4cc9f0',
        gold: '#ffc857',
        live: '#3ee08f',
        muted: '#a29fc0',
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', '-apple-system', 'BlinkMacSystemFont', '"PingFang TC"', '"Microsoft JhengHei"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(255, 61, 127, 0.35)',
        'glow-lg': '0 10px 60px rgba(183, 148, 255, 0.35)',
        card: '0 10px 40px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'dream-gradient': 'linear-gradient(120deg, #ff3d7f 0%, #b794ff 55%, #4cc9f0 100%)',
        'night-gradient': 'linear-gradient(180deg, #0b0a1f 0%, #15122e 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,61,127,0.10) 0%, rgba(183,148,255,0.06) 100%)',
      },
    },
  },
  plugins: [],
}

export default config
