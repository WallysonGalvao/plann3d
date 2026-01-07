'use client'

/**
 * IFC Viewer Info Card
 * Project info overlay - adapted from viewer-3d/viewer-info-card.tsx
 */

import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { Project } from '@/types/project'

interface IFCInfoCardProps {
  project: Project
  projectId: string
}

export function IFCInfoCard({ project, projectId }: IFCInfoCardProps) {
  const { t } = useTranslation()
  const { isMobile } = useMediaQuery()

  return (
    <div className="absolute top-4 md:top-6 left-4 md:left-6 z-20 flex flex-col gap-2 w-[calc(100%-2rem)] max-w-xs md:max-w-sm animate-fade-in pointer-events-none">
      <div className="glass-panel p-4 md:p-5 rounded-xl shadow-2xl pointer-events-auto">
        <div className="flex items-center gap-2 mb-1">
          <span className="flex size-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] md:text-xs font-bold text-primary tracking-wider uppercase">
            BIM Viewer
          </span>
        </div>

        <h1 className="text-foreground text-lg md:text-2xl font-bold leading-tight tracking-tight mb-1 line-clamp-2">
          {project.title}
        </h1>

        {!isMobile && (
          <p className="text-muted-foreground text-xs md:text-sm mb-3 line-clamp-2">
            {project.description}
          </p>
        )}

        <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-muted-foreground font-mono flex-wrap">
          <span>Ref: {projectId.toUpperCase()}</span>
          <span className="w-px h-3 bg-border hidden md:block" />
          <span className="hidden md:inline">
            {t('viewer3d.location')}: {project.location}
          </span>
        </div>
      </div>
    </div>
  )
}
