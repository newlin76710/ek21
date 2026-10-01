// 品牌標語：藏頭「尋・夢・園」
const PARTS = [
  { head: '尋', rest: '找你' },
  { head: '夢', rest: '到你' },
  { head: '園', rest: '來你' },
  { head: '', rest: '在這裡' },
]

export const SLOGAN_TEXT = '尋找你，夢到你，園來你，在這裡'

export default function Slogan({ className = '' }: { className?: string }) {
  return (
    <p className={`font-bold tracking-wide ${className}`} aria-label={SLOGAN_TEXT}>
      <span aria-hidden>
        {PARTS.map((p, i) => (
          <span key={p.rest} className="whitespace-nowrap">
            {p.head && <span className="gradient-text text-[1.25em] font-black">{p.head}</span>}
            <span className="text-white/90">{p.rest}</span>
            {i < PARTS.length - 1 && <span className="mr-1.5 text-white/40">，</span>}
          </span>
        ))}
      </span>
    </p>
  )
}
