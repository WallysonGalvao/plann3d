'use client'

import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import logo from '@/assets/logo.svg'

interface ViewerHeaderProps {
  projectId: string
}

/**
 * Responsive header for the 3D viewer page
 *
 * Features:
 * - Back button to project page
 * - Brand logo (text hidden on mobile)
 * - Responsive padding
 */
export function ViewerHeader({ projectId }: ViewerHeaderProps) {
  const { t } = useTranslation()
  const { isMobile } = useMediaQuery()

  return (
    <header className="h-14 md:h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 lg:px-10 shrink-0 z-50 relative shadow-lg">
      <div className="flex items-center gap-2 md:gap-4">
        <Link
          to="/projects/$projectId"
          params={{ projectId }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={isMobile ? 18 : 20} />
          <span className="text-xs md:text-sm font-medium">
            {isMobile ? t('viewer3d.back') : t('viewer3d.backToProject')}
          </span>
        </Link>
      </div>

      <Link
        to="/"
        className="flex items-center gap-2 md:gap-3 text-foreground hover:opacity-80 transition-opacity duration-300"
      >
        <img src={logo} alt="Plann3d Logo" className="h-6 md:h-8 w-auto" />
        {!isMobile && (
          <h2 className="text-foreground text-lg md:text-xl font-bold leading-tight tracking-tight uppercase">
            Plann3d
          </h2>
        )}
      </Link>
    </header>
  )
}
