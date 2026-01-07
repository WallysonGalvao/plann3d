'use client'

/**
 * IFC Viewer Header
 * Styled to match viewer-3d/viewer-header.tsx patterns
 */

import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useIFCViewerStore } from '@/contexts/ifc-viewer-context'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { ViewMode } from '@/types/ifc-viewer.types'
import logo from '@/assets/logo.svg'

// ============================================
// TYPES
// ============================================

interface IFCViewerHeaderProps {
  projectName: string
  projectCode?: string
  projectId: string
}

// ============================================
// VIEW MODE TOGGLE BUTTON
// ============================================

interface ViewToggleProps {
  mode: ViewMode
  label: string
  icon: string
  isActive: boolean
  onClick: () => void
}

function ViewToggle({ label, icon, isActive, onClick }: ViewToggleProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${isActive
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground'
        }`}
    >
      <span className="material-symbols-outlined text-[16px]">{icon}</span>
      {label}
    </button>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export function IFCViewerHeader({ projectName, projectCode, projectId }: IFCViewerHeaderProps) {
  const { t } = useTranslation()
  const { isMobile } = useMediaQuery()
  const viewMode = useIFCViewerStore((state) => state.viewMode)
  const setViewMode = useIFCViewerStore((state) => state.setViewMode)

  return (
    <header className="h-14 md:h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 lg:px-10 shrink-0 z-50 relative shadow-lg">
      {/* Left: Back Button */}
      <div className="flex items-center gap-2 md:gap-4">
        <Link
          to="/projects/$projectId"
          params={{ projectId }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={isMobile ? 18 : 20} />
          <span className="text-xs md:text-sm font-medium hidden sm:inline">
            {t('viewer3d.backToProject')}
          </span>
        </Link>

        {/* Divider */}
        <div className="h-6 w-px bg-border hidden md:block" />

        {/* Project Info */}
        {!isMobile && (
          <div className="hidden md:block">
            <h1 className="text-sm font-bold tracking-wide uppercase leading-none text-foreground">
              {projectName}
            </h1>
            <span className="text-xs text-muted-foreground">
              BIM Viewer {projectCode && `• ${projectCode}`}
            </span>
          </div>
        )}
      </div>

      {/* Center: View Mode Toggles */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="bg-muted/50 p-1 rounded-lg flex items-center gap-0.5 border border-border">
          <ViewToggle
            mode="2d"
            label="2D"
            icon="description"
            isActive={viewMode === '2d'}
            onClick={() => setViewMode('2d')}
          />
          <ViewToggle
            mode="split"
            label="Split"
            icon="splitscreen"
            isActive={viewMode === 'split'}
            onClick={() => setViewMode('split')}
          />
          <ViewToggle
            mode="3d"
            label="3D"
            icon="view_in_ar"
            isActive={viewMode === '3d'}
            onClick={() => setViewMode('3d')}
          />
        </div>
      </div>

      {/* Right: Logo */}
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
