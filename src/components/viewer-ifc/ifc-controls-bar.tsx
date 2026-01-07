'use client'

/**
 * IFC Viewer Controls Bar
 * Bottom control bar - adapted from viewer-3d/viewer-controls-bar.tsx
 */

import { useTranslation } from 'react-i18next'
import {
  RotateCcw,
  Move3d,
  Eye,
  Layers3,
  Maximize2,
  Box,
} from 'lucide-react'
import { useIFCViewerStore } from '@/contexts/ifc-viewer-context'

// ============================================
// CONTROL BUTTON
// ============================================

interface ControlButtonProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
  disabled?: boolean
}

function ControlButton({ icon, label, isActive, onClick, disabled }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${isActive
        ? 'bg-primary/20 text-primary border border-primary/40'
        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-transparent'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {icon}
      <span className="text-[10px] font-medium uppercase tracking-wide">{label}</span>
    </button>
  )
}

// ============================================
// CAMERA PRESETS POPUP
// ============================================

interface CameraPresetsPopupProps {
  onSelect: (preset: string) => void
  activePreset: string | null
}

function CameraPresetsPopup({ onSelect, activePreset }: CameraPresetsPopupProps) {
  const { t } = useTranslation()

  const presets = [
    { id: 'front', icon: 'front', label: t('viewer3d.presets.front') },
    { id: 'back', icon: 'back', label: t('viewer3d.presets.back') },
    { id: 'left', icon: 'left', label: t('viewer3d.presets.left') },
    { id: 'right', icon: 'right', label: t('viewer3d.presets.right') },
    { id: 'top', icon: 'top', label: t('viewer3d.presets.top') },
    { id: 'perspective', icon: 'perspective', label: t('viewer3d.presets.perspective') },
  ]

  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 glass-panel rounded-xl p-2 shadow-2xl border border-border animate-fade-in">
      <div className="grid grid-cols-3 gap-1">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset.id)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${activePreset === preset.id
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export function IFCControlsBar() {
  const { t } = useTranslation()

  const viewMode = useIFCViewerStore((state) => state.viewMode)
  const activeCameraPreset = useIFCViewerStore((state) => state.activeCameraPreset)
  const setCameraPreset = useIFCViewerStore((state) => state.setCameraPreset)
  const showPropertiesPanel = useIFCViewerStore((state) => state.showPropertiesPanel)
  const togglePropertiesPanel = useIFCViewerStore((state) => state.togglePropertiesPanel)
  const clippingEnabled = useIFCViewerStore((state) => state.clippingEnabled)
  const toggleClipping = useIFCViewerStore((state) => state.toggleClipping)

  const [showPresetsPopup, setShowPresetsPopup] = React.useState(false)

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }

  const handleCameraPreset = (preset: string) => {
    setCameraPreset(preset)
    setShowPresetsPopup(false)
  }

  // Only show 3D controls when 3D view is active
  const show3DControls = viewMode === '3d' || viewMode === 'split'

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30">
      <div className="glass-panel rounded-2xl p-2 shadow-2xl border border-border flex items-center gap-1 md:gap-2 overflow-x-auto max-w-[90vw]">
        {/* Reset View */}
        <ControlButton
          icon={<RotateCcw size={18} />}
          label={t('viewer3d.resetCamera')}
          onClick={() => setCameraPreset('perspective')}
          disabled={!show3DControls}
        />

        {/* Camera Presets */}
        <div className="relative">
          <ControlButton
            icon={<Move3d size={18} />}
            label={t('viewer3d.controls.views')}
            isActive={showPresetsPopup || !!activeCameraPreset}
            onClick={() => setShowPresetsPopup(!showPresetsPopup)}
            disabled={!show3DControls}
          />
          {showPresetsPopup && show3DControls && (
            <CameraPresetsPopup
              onSelect={handleCameraPreset}
              activePreset={activeCameraPreset}
            />
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-border mx-1" />

        {/* Properties Panel */}
        <ControlButton
          icon={<Eye size={18} />}
          label={t('viewer3d.toggleSpecs')}
          isActive={showPropertiesPanel}
          onClick={togglePropertiesPanel}
          disabled={!show3DControls}
        />

        {/* Clipping */}
        <ControlButton
          icon={<Box size={18} />}
          label="Clipping"
          isActive={clippingEnabled}
          onClick={toggleClipping}
          disabled={!show3DControls}
        />

        {/* Layers */}
        <ControlButton
          icon={<Layers3 size={18} />}
          label={t('viewer3d.controls.layers')}
          onClick={() => { }}
          disabled={!show3DControls}
        />

        {/* Divider */}
        <div className="w-px h-8 bg-border mx-1" />

        {/* Fullscreen */}
        <ControlButton
          icon={<Maximize2 size={18} />}
          label={t('viewer3d.fullscreen')}
          onClick={handleFullscreen}
        />
      </div>
    </div>
  )
}

// Import React for useState
import React from 'react'
