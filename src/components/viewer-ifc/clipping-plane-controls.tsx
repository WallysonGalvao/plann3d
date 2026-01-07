'use client'

/**
 * Clipping Plane Controls
 * UI for controlling section cuts in the IFC viewer
 */

import { useIFCViewerStore } from '@/contexts/ifc-viewer-context'

// ============================================
// CONTROL BUTTON
// ============================================

interface ControlButtonProps {
  icon: string
  label: string
  isActive?: boolean
  onClick: () => void
}

function ControlButton({ icon, label, isActive, onClick }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-sm flex flex-col items-center gap-0.5 group ${isActive
          ? 'bg-primary text-[#111718] shadow-glow'
          : 'hover:bg-white/10 text-gray-200'
        }`}
      title={label}
    >
      <span className={`material-symbols-outlined text-[20px] ${!isActive && 'group-hover:text-primary'} transition-colors`}>
        {icon}
      </span>
      <span className="text-[9px] uppercase font-bold tracking-wider">{label}</span>
    </button>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export function ClippingPlaneControls() {
  const clippingEnabled = useIFCViewerStore((state) => state.clippingEnabled)
  const toggleClipping = useIFCViewerStore((state) => state.toggleClipping)

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#111718]/95 backdrop-blur text-gray-200 rounded-sm px-2 py-1.5 flex gap-2 shadow-2xl z-20">
      <ControlButton
        icon="3d_rotation"
        label="Orbit"
        onClick={() => { }}
      />

      <div className="w-px bg-white/10 my-1" />

      <ControlButton
        icon="drag_pan"
        label="Pan"
        onClick={() => { }}
      />

      <div className="w-px bg-white/10 my-1" />

      <ControlButton
        icon="content_cut"
        label="Cut"
        isActive={clippingEnabled}
        onClick={toggleClipping}
      />

      <div className="w-px bg-white/10 my-1" />

      <ControlButton
        icon="open_in_full"
        label="Expl"
        onClick={() => { }}
      />
    </div>
  )
}
