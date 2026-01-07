'use client'

import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { Project } from '@/types/project'

interface ViewerInfoCardProps {
  project: Project
  projectId: string
}

/**
 * Responsive project info card for the 3D viewer
 *
 * Features:
 * - Adapts width and padding for mobile
 * - Reduced font sizes on small screens
 * - Glass-morphism design
 */
export function ViewerInfoCard({ project, projectId }: ViewerInfoCardProps) {
  const { t } = useTranslation()
  const { isMobile } = useMediaQuery()

  return (
    <div className="absolute top-4 md:top-6 left-4 md:left-6 z-20 flex flex-col gap-2 w-[calc(100%-2rem)] max-w-xs md:max-w-lg animate-fade-in">
      <div className="glass-panel p-4 md:p-6 rounded-xl shadow-2xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="flex size-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] md:text-xs font-bold text-primary tracking-wider uppercase">
            {t('viewer3d.title')}
          </span>
        </div>

        <h1 className="text-foreground text-xl md:text-4xl font-bold leading-tight tracking-tight mb-1 md:mb-2 line-clamp-2">
          {project.title}
        </h1>

        {!isMobile && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
        )}

        <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs text-muted-foreground font-mono flex-wrap">
          <span>Ref: {projectId.toUpperCase()}</span>
          <span className="w-px h-3 bg-gray-700 hidden md:block" />
          <span className="hidden md:inline">
            {t('viewer3d.location')}: {project.location}
          </span>
        </div>
      </div>
    </div>
  )
}
