import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dream: '#6366f1',
        night: '#0a0a1a',
        deep: '#13132b',
        glow: '#a78bfa',
        sky: '#38bdf8',
        gold: '#f59e0b',
        soft: '#1e1e3f',
        muted: '#6b7280',
      },
      boxShadow: {
        glow: '0 0 30px rgba(99, 102, 241, 0.4)',
        'glow-lg': '0 0 60px rgba(99, 102, 241, 0.3)',
        card: '0 8px 32px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'dream-gradient': 'linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #38bdf8 100%)',
        'night-gradient': 'linear-gradient(180deg, #0a0a1a 0%, #13132b 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(167,139,250,0.05) 100%)',
      },
    },
  },
  plugins: [],
}

export default config
