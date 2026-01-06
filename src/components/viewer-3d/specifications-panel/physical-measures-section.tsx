import { useTranslation } from 'react-i18next'
import type { ModelMetadata } from './types'

interface PhysicalMeasuresSectionProps {
  metadata: ModelMetadata
  locale: string
}

export function PhysicalMeasuresSection({ metadata, locale }: PhysicalMeasuresSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      <SectionHeader icon={<RulerIcon />} title={t('viewer3d.physicalMeasures')} />
      <div className="grid grid-cols-3 gap-3">
        <DimensionCard label={t('viewer3d.width')} value={metadata.dimensions.width} unit="m" />
        <DimensionCard label={t('viewer3d.height')} value={metadata.dimensions.height} unit="m" />
        <DimensionCard label={t('viewer3d.depth')} value={metadata.dimensions.depth} unit="m" />
      </div>
      {metadata.area !== undefined && metadata.volume !== undefined && (
        <div className="grid grid-cols-2 gap-3 mt-3">
          <SpecCard
            icon={<SquareIcon />}
            title="Área Total"
            value={metadata.area.toLocaleString(locale === 'pt' ? 'pt-BR' : 'en-US')}
            description="m² (largura × profundidade)"
          />
          <SpecCard
            icon={<BoxIcon />}
            title={t('viewer3d.volume')}
            value={metadata.volume.toLocaleString(locale === 'pt' ? 'pt-BR' : 'en-US')}
            description="m³ (l × a × p)"
          />
        </div>
      )}
    </div>
  )
}

// Icon components
const RulerIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
    />
  </svg>
)

const SquareIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
    />
  </svg>
)

const BoxIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
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

interface DimensionCardProps {
  label: string
  value: number
  unit: string
}

function DimensionCard({ label, value, unit }: DimensionCardProps) {
  return (
    <div className="glass-card p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-200">
      <div className="text-[10px] text-muted-foreground uppercase font-mono tracking-wide mb-1">
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-foreground">{value.toFixed(2)}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
    </div>
  )
}
