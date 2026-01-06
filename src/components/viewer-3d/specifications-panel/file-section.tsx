import { useTranslation } from 'react-i18next'
import type { ModelMetadata } from './types'

interface FileSectionProps {
  metadata: ModelMetadata
}

export function FileSection({ metadata }: FileSectionProps) {
  const { t } = useTranslation()

  if (!metadata.format) return null

  return (
    <div className="space-y-3">
      <SectionHeader icon={<FileIcon />} title={t('viewer3d.file')} />
      <div className="grid grid-cols-2 gap-3">
        <SpecCard
          icon={<FileIcon />}
          title={t('viewer3d.format')}
          value={metadata.format}
          description={t('viewer3d.fileType')}
        />
        {metadata.fileSize && (
          <SpecCard
            icon={<DatabaseIcon />}
            title={t('viewer3d.fileSize')}
            value={metadata.fileSize}
            description={t('viewer3d.fileSizeDesc')}
          />
        )}
      </div>
    </div>
  )
}

// Icon components
const FileIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const DatabaseIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
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
