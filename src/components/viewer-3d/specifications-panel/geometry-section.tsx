import { useTranslation } from 'react-i18next'
import type { ModelMetadata } from './types'

interface GeometrySectionProps {
  metadata: ModelMetadata
  locale: string
}

export function GeometrySection({ metadata, locale }: GeometrySectionProps) {
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      <SectionHeader icon={<CubeIcon />} title={t('viewer3d.geometry')} />
      <div className="grid grid-cols-2 gap-3">
        <SpecCard
          icon={<TriangleIcon />}
          title={t('viewer3d.triangles')}
          value={metadata.triangles.toLocaleString(locale === 'pt' ? 'pt-BR' : 'en-US')}
          description={t('viewer3d.polygons')}
        />
        <SpecCard
          icon={<GridIcon />}
          title={t('viewer3d.vertices')}
          value={metadata.vertices.toLocaleString(locale === 'pt' ? 'pt-BR' : 'en-US')}
          description={t('viewer3d.points3d')}
        />
        <SpecCard
          icon={<LayersIcon />}
          title={t('viewer3d.objects')}
          value={metadata.objects.toLocaleString(locale === 'pt' ? 'pt-BR' : 'en-US')}
          description={t('viewer3d.meshes')}
        />
        {metadata.detailLevel && (
          <SpecCard
            icon={<ZapIcon />}
            title={t('viewer3d.detailLevel')}
            value={metadata.detailLevel}
            description={t('viewer3d.polygonDensity')}
          />
        )}
      </div>
    </div>
  )
}

// Icon components (imported from parent or defined here)
const CubeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
)

const TriangleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3l7 18m0 0l7-18m-7 18L5 3m7 18l7-18"
    />
  </svg>
)

const GridIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
    />
  </svg>
)

const LayersIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
)

const ZapIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
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
