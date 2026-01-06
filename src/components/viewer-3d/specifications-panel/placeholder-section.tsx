import { useTranslation } from 'react-i18next'

interface PlaceholderSectionProps {
  title: string
  icon: React.ReactNode
  description?: string
}

/**
 * Placeholder section for future implementation
 */
export function PlaceholderSection({ title, icon, description }: PlaceholderSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      <SectionHeader icon={icon} title={title} />
      <div className="glass-card p-4 rounded-lg border border-border/50 text-center">
        <p className="text-sm text-muted-foreground">
          {description || t('viewer3d.comingSoon', 'Coming soon')}
        </p>
      </div>
    </div>
  )
}

interface SectionHeaderProps {
  icon: React.ReactNode
  title: string
}

function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
      {icon}
      <span>{title}</span>
    </div>
  )
}
