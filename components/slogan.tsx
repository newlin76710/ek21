// 品牌標語：藏頭「尋・夢・園（原）」
const PARTS = [
  { head: '尋', rest: '找你' },
  { head: '夢', rest: '到你' },
  { head: '原', rest: '來你在這裡' },
]

export const SLOGAN_TEXT = '尋找你，夢到你，原來你在這裡　尋夢園～'

export default function Slogan({ className = '' }: { className?: string }) {
  return (
    <p className={`font-bold tracking-wide ${className}`} aria-label={SLOGAN_TEXT}>
      <span aria-hidden>
        {PARTS.map((p, i) => (
          <span key={p.head}>
            <span className="gradient-text text-[1.25em] font-black">{p.head}</span>
            <span className="text-white/90">{p.rest}</span>
            {i < PARTS.length - 1 && <span className="mx-1.5 text-white/40">·</span>}
          </span>
        ))}
        <span className="ml-3 whitespace-nowrap text-white">尋夢園<span className="text-dream">～</span></span>
      </span>
    </p>
  )
}
