'use client'

/**
 * IFC Viewer Header
 * Based on reference design (ViewerIFC/code.html)
 */

import { Link } from '@tanstack/react-router'
import { useIFCViewerStore } from '@/contexts/ifc-viewer-context'
import type { ViewMode } from '@/types/ifc-viewer.types'

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
      className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-sm transition-colors ${isActive
          ? 'bg-primary text-surface-dark shadow-sm'
          : 'bg-transparent hover:bg-white/10 text-gray-300'
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
  const viewMode = useIFCViewerStore((state) => state.viewMode)
  const setViewMode = useIFCViewerStore((state) => state.setViewMode)

  return (
    <header className="h-14 bg-[#111718] text-white flex items-center justify-between px-4 border-b border-[#2a2f30] shrink-0 z-50">
      {/* Left: Logo + Project Info */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-[24px]">deployed_code</span>
        </Link>

        <div className="h-6 w-px bg-white/20" />

        {/* Project Info */}
        <div>
          <h1 className="text-sm font-bold tracking-wide uppercase leading-none">
            {projectName}
          </h1>
          <span className="text-xs text-gray-400 font-sans">
            BIM Viewer {projectCode && `• Projeto ${projectCode}`}
          </span>
        </div>
      </div>

      {/* Center: View Mode Toggles */}
      <div className="flex items-center gap-6">
        <div className="bg-white/10 p-1 rounded-sm flex items-center gap-1">
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

        <div className="h-6 w-px bg-white/20" />

        {/* Right: User Actions */}
        <div className="flex items-center gap-3">
          <button className="text-gray-300 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <button className="text-gray-300 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
          <Link
            to="/projects/$projectId"
            params={{ projectId }}
            className="size-8 rounded bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border border-primary/40 hover:bg-primary/30 transition-colors"
          >
            ←
          </Link>
        </div>
      </div>
    </header>
  )
}
