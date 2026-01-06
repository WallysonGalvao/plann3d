import { useTranslation } from 'react-i18next'
import type { ModelMetadata } from './types'

interface ResourcesSectionProps {
  metadata: ModelMetadata
}

export function ResourcesSection({ metadata }: ResourcesSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      <SectionHeader icon={<PaletteIcon />} title={t('viewer3d.resources')} />
      <div className="grid grid-cols-2 gap-3">
        <SpecCard
          icon={<PaletteIcon />}
          title={t('viewer3d.materials')}
          value={metadata.materials.toString()}
          description={t('viewer3d.texturesShaders')}
        />
        {metadata.textures !== undefined && metadata.textures > 0 && (
          <SpecCard
            icon={<ImageIcon />}
            title={t('viewer3d.textures')}
            value={metadata.textures.toString()}
            description={t('viewer3d.textureMaps')}
          />
        )}
        {metadata.animations !== undefined && metadata.animations > 0 && (
          <SpecCard
            icon={<PlayIcon />}
            title={t('viewer3d.animations')}
            value={metadata.animations.toString()}
            description={t('viewer3d.animationClips')}
          />
        )}
      </div>
    </div>
  )
}

// Icon components
const PaletteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    />
  </svg>
)

const ImageIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const PlayIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

// Helper components
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

interface SpecCardProps {
  icon: React.ReactNode
  title: string
  value: string
  description: string
}

function SpecCard({ icon, title, value, description }: SpecCardProps) {
  return (
    <div className="glass-card p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-200">
      <div className="flex items-center gap-2 mb-1">
        <div className="text-primary">{icon}</div>
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
      </div>
      <div className="text-lg font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground/70">{description}</div>
    </div>
  )
}
