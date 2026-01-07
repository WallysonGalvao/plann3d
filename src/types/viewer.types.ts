/**
 * Centralized type definitions for the 3D Viewer
 *
 * This file contains all shared types used across viewer components,
 * contexts, and hooks to ensure type consistency and avoid duplication.
 */

import type { ModelMetadata } from '@/components/viewer-3d/specifications-panel'

// ============================================
// CAMERA TYPES
// ============================================

export type CameraPresetType = 'front' | 'back' | 'left' | 'right' | 'top' | 'perspective'

export interface CameraPosition {
  x: number
  y: number
  z: number
}

// ============================================
// MODEL QUALITY TYPES
// ============================================

export type ModelQuality = 'low' | 'medium' | 'high'

export interface QualityStatus {
  available: boolean
  loading: boolean
  loaded: boolean
}

export type QualityStatusMap = Record<ModelQuality, QualityStatus>

// ============================================
// LAYER TYPES
// ============================================

export interface VisibleLayers {
  structure: boolean
  furniture: boolean
  vegetation: boolean
  lighting: boolean
}

export const DEFAULT_VISIBLE_LAYERS: VisibleLayers = {
  structure: true,
  furniture: true,
  vegetation: true,
  lighting: true,
}

// ============================================
// VIEWER STATE TYPES
// ============================================

export interface ViewerState {
  // Camera controls
  isPanMode: boolean
  isAutoRotate: boolean
  isAutoTour: boolean
  activeCameraPreset: CameraPresetType | null
  resetTrigger: number
  zoomLevel: number

  // Drag state
  isKeyPanActive: boolean
  isDragging: boolean

  // UI state
  showSpecs: boolean
  showLayers: boolean
  showPresets: boolean

  // Model state
  modelMetadata: ModelMetadata | null
  currentQuality: ModelQuality
  qualityStatus: QualityStatusMap
  lodProgress: number
  forceQuality: ModelQuality | undefined

  // Layers
  visibleLayers: VisibleLayers

  // Client state
  isMounted: boolean
}

export const DEFAULT_VIEWER_STATE: ViewerState = {
  // Camera controls
  isPanMode: false,
  isAutoRotate: true,
  isAutoTour: false,
  activeCameraPreset: null,
  resetTrigger: 0,
  zoomLevel: 50,

  // Drag state
  isKeyPanActive: false,
  isDragging: false,

  // UI state
  showSpecs: true,
  showLayers: false,
  showPresets: false,

  // Model state
  modelMetadata: null,
  currentQuality: 'low',
  qualityStatus: {
    low: { available: false, loading: false, loaded: false },
    medium: { available: false, loading: false, loaded: false },
    high: { available: false, loading: false, loaded: false },
  },
  lodProgress: 0,
  forceQuality: undefined,

  // Layers
  visibleLayers: DEFAULT_VISIBLE_LAYERS,

  // Client state
  isMounted: false,
}

// ============================================
// ACTION TYPES
// ============================================

export type ViewerAction =
  | { type: 'SET_MOUNTED' }
  | { type: 'TOGGLE_PAN_MODE' }
  | { type: 'TOGGLE_AUTO_ROTATE' }
  | { type: 'TOGGLE_AUTO_TOUR' }
  | { type: 'SET_CAMERA_PRESET'; payload: CameraPresetType | null }
  | { type: 'RESET_CAMERA' }
  | { type: 'SET_ZOOM_LEVEL'; payload: number }
  | { type: 'SET_KEY_PAN_ACTIVE'; payload: boolean }
  | { type: 'SET_DRAGGING'; payload: boolean }
  | { type: 'TOGGLE_SPECS' }
  | { type: 'TOGGLE_LAYERS' }
  | { type: 'TOGGLE_PRESETS' }
  | { type: 'SET_MODEL_METADATA'; payload: ModelMetadata | null }
  | { type: 'SET_CURRENT_QUALITY'; payload: ModelQuality }
  | { type: 'SET_QUALITY_STATUS'; payload: QualityStatusMap }
  | { type: 'SET_LOD_PROGRESS'; payload: number }
  | { type: 'SET_FORCE_QUALITY'; payload: ModelQuality | undefined }
  | { type: 'TOGGLE_LAYER'; payload: keyof VisibleLayers }
  | { type: 'SET_SHOW_SPECS'; payload: boolean }

// ============================================
// CONTEXT TYPES
// ============================================

export interface ViewerContextValue {
  state: ViewerState
  dispatch: React.Dispatch<ViewerAction>
  actions: ViewerActions
}

export interface ViewerActions {
  setMounted: () => void
  togglePanMode: () => void
  toggleAutoRotate: () => void
  toggleAutoTour: () => void
  setCameraPreset: (preset: CameraPresetType | null) => void
  resetCamera: () => void
  setZoomLevel: (level: number) => void
  setKeyPanActive: (active: boolean) => void
  setDragging: (dragging: boolean) => void
  toggleSpecs: () => void
  toggleLayers: () => void
  togglePresets: () => void
  setModelMetadata: (metadata: ModelMetadata | null) => void
  setCurrentQuality: (quality: ModelQuality) => void
  setQualityStatus: (status: QualityStatusMap) => void
  setLodProgress: (progress: number) => void
  setForceQuality: (quality: ModelQuality | undefined) => void
  toggleLayer: (layer: keyof VisibleLayers) => void
  setShowSpecs: (show: boolean) => void
}
