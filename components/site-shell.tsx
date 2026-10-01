import SiteHeader from './site-header'
import SiteFooter from './site-footer'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-night">
      <div aria-hidden className="pointer-events-none fixed inset-0 starfield opacity-60" />
      <SiteHeader />
      <main className="relative pt-24">{children}</main>
      <SiteFooter />
    </div>
  )
}
