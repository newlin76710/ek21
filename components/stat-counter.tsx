'use client'
import { useEffect, useRef, useState } from 'react'

interface StatCounterProps {
  end: number
  suffix?: string
  label: string
  icon: string
}

export default function StatCounter({ end, suffix = '', label, icon }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const duration = 2000
          const steps = 60
          const increment = end / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return (
    <div ref={ref} className="glass-card p-6 text-center hover:border-dream/30 transition-all duration-300">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-3xl font-bold gradient-text mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-muted text-sm">{label}</div>
    </div>
  )
}
