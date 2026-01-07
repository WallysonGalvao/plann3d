'use client'

import { useTranslation } from 'react-i18next'
import { useViewerContext } from '@/contexts/viewer-context'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ControlButton, VIEWER_ICONS } from './control-button'
import type { ModelQuality, CameraPresetType } from '@/types/viewer.types'

interface ViewerControlsBarProps {
  /** Whether the model has LOD support */
  hasLod?: boolean
}

/**
 * Responsive controls bar for 3D viewer
 *
 * Features:
 * - Horizontal scroll on mobile
 * - Collapsible quality selector on small screens
 * - Uses ViewerContext for state (no prop drilling)
 */
export function ViewerControlsBar({ hasLod = false }: ViewerControlsBarProps) {
  const { t } = useTranslation()
  const { state, actions } = useViewerContext()
  const { isMobile } = useMediaQuery()

  const handleCameraPreset = (preset: CameraPresetType) => {
    actions.setCameraPreset(preset)
    actions.togglePresets()
  }

  const handleFullscreen = () => {
    const element = document.documentElement
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 md:gap-3 max-w-[95vw]">
      {/* Keyboard Pan Indicator */}
      {state.isKeyPanActive && (
        <div className="glass-panel px-3 md:px-4 py-2 rounded-lg animate-fade-in opacity-75 hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 text-xs md:text-sm text-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={VIEWER_ICONS.pan} />
            </svg>
            <span className="font-medium">{t('viewer3d.panModeActive')} (⌘/Ctrl)</span>
          </div>
        </div>
      )}

      {/* Controls Bar */}
      <div className="opacity-90 hover:opacity-100 transition-opacity duration-300">
        <div className="glass-panel p-1.5 md:p-2 rounded-full flex items-center gap-0.5 md:gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-x-auto max-w-full scrollbar-hide">
          {/* Quality Selector - Hidden on mobile (use pinch-zoom) */}
          {hasLod && !isMobile && (
            <QualitySelector
              currentQuality={state.currentQuality}
              qualityStatus={state.qualityStatus}
              onSelectQuality={actions.setForceQuality}
            />
          )}

          {/* Pan Mode */}
          <ControlButton
            icon={VIEWER_ICONS.pan}
            label={t('viewer3d.controls.pan')}
            onClick={actions.togglePanMode}
            isActive={state.isPanMode || state.isKeyPanActive}
            size={isMobile ? 'sm' : 'md'}
          />

          {/* Camera Presets */}
          <ControlButton
            icon={VIEWER_ICONS.camera}
            label={t('viewer3d.controls.views')}
            onClick={actions.togglePresets}
            isActive={state.showPresets}
            size={isMobile ? 'sm' : 'md'}
          />

          {/* Auto Tour */}
          <ControlButton
            icon={VIEWER_ICONS.play}
            label={t('viewer3d.controls.autoTour')}
            onClick={actions.toggleAutoTour}
            isActive={state.isAutoTour}
            size={isMobile ? 'sm' : 'md'}
          />

          {/* Auto Rotate */}
          <ControlButton
            icon={VIEWER_ICONS.rotate}
            label={state.isAutoRotate ? t('viewer3d.controls.pause') : t('viewer3d.controls.rotation')}
            onClick={actions.toggleAutoRotate}
            isActive={state.isAutoRotate}
            size={isMobile ? 'sm' : 'md'}
          />

          {/* Layers - Hidden on very small screens */}
          {!isMobile && (
            <ControlButton
              icon={VIEWER_ICONS.layers}
              label={t('viewer3d.controls.layers')}
              onClick={actions.toggleLayers}
              isActive={state.showLayers}
              size={isMobile ? 'sm' : 'md'}
            />
          )}

          {/* Reset Camera */}
          <ControlButton
            icon={VIEWER_ICONS.rotate}
            label={t('viewer3d.resetCamera')}
            onClick={actions.resetCamera}
            size={isMobile ? 'sm' : 'md'}
          />

          {/* Fullscreen */}
          <ControlButton
            icon={VIEWER_ICONS.fullscreen}
            label={t('viewer3d.fullscreen')}
            onClick={handleFullscreen}
            size={isMobile ? 'sm' : 'md'}
          />

          {/* Toggle Specs */}
          <ControlButton
            icon={VIEWER_ICONS.menu}
            label={t('viewer3d.toggleSpecs')}
            onClick={actions.toggleSpecs}
            isActive={state.showSpecs}
            size={isMobile ? 'sm' : 'md'}
          />
        </div>
      </div>

      {/* Camera Presets Popup */}
      {state.showPresets && (
        <CameraPresetsPopup onSelect={handleCameraPreset} />
      )}

      {/* Layers Popup */}
      {state.showLayers && (
        <LayersPopup
          visibleLayers={state.visibleLayers}
          onToggleLayer={actions.toggleLayer}
        />
      )}
    </div>
  )
}

// ============================================
// QUALITY SELECTOR
// ============================================

interface QualitySelectorProps {
  currentQuality: ModelQuality
  qualityStatus: Record<ModelQuality, { available: boolean; loading: boolean; loaded: boolean }>
  onSelectQuality: (quality: ModelQuality) => void
}

function QualitySelector({ currentQuality, qualityStatus, onSelectQuality }: QualitySelectorProps) {
  const { t } = useTranslation()

  const qualities: { key: ModelQuality; label: string }[] = [
    { key: 'low', label: t('viewer3d.qualitySelector.low') },
    { key: 'medium', label: t('viewer3d.qualitySelector.medium') },
    { key: 'high', label: t('viewer3d.qualitySelector.high') },
  ]

  return (
    <div className="flex items-center gap-3 px-2 border-r border-border mr-1">
      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest hidden sm:block">
        {t('viewer3d.qualitySelector.label')}
      </span>
      <div className="flex bg-muted/30 dark:bg-muted/20 rounded-lg p-0.5 border border-border">
        {qualities.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onSelectQuality(key)}
            disabled={!qualityStatus[key].loaded}
            className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${currentQuality === key
              ? 'text-primary-foreground bg-primary shadow-lg shadow-primary/20'
              : qualityStatus[key].loaded
                ? 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                : 'text-muted-foreground/30 cursor-not-allowed'
              }`}
          >
            {qualityStatus[key].loading ? t('viewer3d.qualitySelector.loading') : label}
          </button>
        ))}
      </div>
      <div className="w-px h-6 bg-border" />
    </div>
  )
}

// ============================================
// CAMERA PRESETS POPUP
// ============================================

interface CameraPresetsPopupProps {
  onSelect: (preset: CameraPresetType) => void
}

function CameraPresetsPopup({ onSelect }: CameraPresetsPopupProps) {
  const { t } = useTranslation()

  const presets: { key: CameraPresetType; label: string }[] = [
    { key: 'front', label: t('viewer3d.presets.front') },
    { key: 'back', label: t('viewer3d.presets.back') },
    { key: 'left', label: t('viewer3d.presets.left') },
    { key: 'right', label: t('viewer3d.presets.right') },
    { key: 'top', label: t('viewer3d.presets.top') },
    { key: 'perspective', label: t('viewer3d.presets.perspective') },
  ]

  return (
    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2">
      <div className="glass-panel p-2 md:p-3 rounded-xl shadow-2xl">
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {presets.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className="px-2 md:px-3 py-1.5 md:py-2 text-[10px] md:text-xs text-foreground bg-muted/10 hover:bg-muted/20 rounded-lg transition-colors font-medium"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// LAYERS POPUP
// ============================================

interface LayersPopupProps {
  visibleLayers: {
    structure: boolean
    furniture: boolean
    vegetation: boolean
    lighting: boolean
  }
  onToggleLayer: (layer: 'structure' | 'furniture' | 'vegetation' | 'lighting') => void
}

function LayersPopup({ visibleLayers, onToggleLayer }: LayersPopupProps) {
  const { t } = useTranslation()

  const layers: { key: keyof typeof visibleLayers; label: string }[] = [
    { key: 'structure', label: t('viewer3d.layers.structure') },
    { key: 'furniture', label: t('viewer3d.layers.furniture') },
    { key: 'vegetation', label: t('viewer3d.layers.vegetation') },
    { key: 'lighting', label: t('viewer3d.layers.lighting') },
  ]

  return (
    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2">
      <div className="glass-panel p-3 md:p-4 rounded-xl shadow-2xl w-56 md:w-64">
        <h4 className="text-xs md:text-sm font-bold text-foreground mb-2 md:mb-3 uppercase tracking-wide">
          {t('viewer3d.layers.title')}
        </h4>
        <div className="space-y-2">
          {layers.map(({ key, label }) => (
            <label key={key} className="flex items-center justify-between cursor-pointer group">
              <span className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {label}
              </span>
              <input
                type="checkbox"
                checked={visibleLayers[key]}
                onChange={() => onToggleLayer(key)}
                className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary/50"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
