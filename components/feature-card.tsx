interface FeatureCardProps {
  icon: string
  title: string
  description: string
  gradient?: string
}

export default function FeatureCard({ icon, title, description, gradient = 'from-dream to-glow' }: FeatureCardProps) {
  return (
    <div className="glass-card p-6 hover:border-dream/30 transition-all duration-300 group">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl mb-4 group-hover:shadow-glow transition-all`}>
        {icon}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
    </div>
  )
}
