'use client'

import { createContext, useContext, useReducer, useMemo, useEffect, type ReactNode } from 'react'
import type {
  ViewerState,
  ViewerAction,
  ViewerActions,
  ViewerContextValue,
  CameraPresetType,
  ModelQuality,
  QualityStatusMap,
  VisibleLayers,
} from '@/types/viewer.types'
import { DEFAULT_VIEWER_STATE } from '@/types/viewer.types'
import type { ModelMetadata } from '@/components/viewer-3d/specifications-panel'

// ============================================
// REDUCER
// ============================================

function viewerReducer(state: ViewerState, action: ViewerAction): ViewerState {
  switch (action.type) {
    case 'SET_MOUNTED':
      return { ...state, isMounted: true }

    case 'TOGGLE_PAN_MODE':
      return { ...state, isPanMode: !state.isPanMode }

    case 'TOGGLE_AUTO_ROTATE':
      return { ...state, isAutoRotate: !state.isAutoRotate }

    case 'TOGGLE_AUTO_TOUR':
      return { ...state, isAutoTour: !state.isAutoTour }

    case 'SET_CAMERA_PRESET':
      return { ...state, activeCameraPreset: action.payload }

    case 'RESET_CAMERA':
      return { ...state, resetTrigger: state.resetTrigger + 1 }

    case 'SET_ZOOM_LEVEL':
      return { ...state, zoomLevel: action.payload }

    case 'SET_KEY_PAN_ACTIVE':
      return { ...state, isKeyPanActive: action.payload }

    case 'SET_DRAGGING':
      return { ...state, isDragging: action.payload }

    case 'TOGGLE_SPECS':
      return { ...state, showSpecs: !state.showSpecs }

    case 'SET_SHOW_SPECS':
      return { ...state, showSpecs: action.payload }

    case 'TOGGLE_LAYERS':
      return { ...state, showLayers: !state.showLayers }

    case 'TOGGLE_PRESETS':
      return { ...state, showPresets: !state.showPresets }

    case 'SET_MODEL_METADATA':
      return { ...state, modelMetadata: action.payload }

    case 'SET_CURRENT_QUALITY':
      return { ...state, currentQuality: action.payload }

    case 'SET_QUALITY_STATUS':
      return { ...state, qualityStatus: action.payload }

    case 'SET_LOD_PROGRESS':
      return { ...state, lodProgress: action.payload }

    case 'SET_FORCE_QUALITY':
      return { ...state, forceQuality: action.payload }

    case 'TOGGLE_LAYER':
      return {
        ...state,
        visibleLayers: {
          ...state.visibleLayers,
          [action.payload]: !state.visibleLayers[action.payload],
        },
      }

    default:
      return state
  }
}

// ============================================
// CONTEXT
// ============================================

const ViewerContext = createContext<ViewerContextValue | null>(null)

// ============================================
// PROVIDER
// ============================================

interface ViewerContextProviderProps {
  children: ReactNode
  initialState?: Partial<ViewerState>
}

export function ViewerContextProvider({ children, initialState }: ViewerContextProviderProps) {
  const [state, dispatch] = useReducer(viewerReducer, {
    ...DEFAULT_VIEWER_STATE,
    ...initialState,
  })

  // Create memoized action creators
  const actions: ViewerActions = useMemo(
    () => ({
      setMounted: () => dispatch({ type: 'SET_MOUNTED' }),
      togglePanMode: () => dispatch({ type: 'TOGGLE_PAN_MODE' }),
      toggleAutoRotate: () => dispatch({ type: 'TOGGLE_AUTO_ROTATE' }),
      toggleAutoTour: () => dispatch({ type: 'TOGGLE_AUTO_TOUR' }),
      setCameraPreset: (preset: CameraPresetType | null) =>
        dispatch({ type: 'SET_CAMERA_PRESET', payload: preset }),
      resetCamera: () => dispatch({ type: 'RESET_CAMERA' }),
      setZoomLevel: (level: number) => dispatch({ type: 'SET_ZOOM_LEVEL', payload: level }),
      setKeyPanActive: (active: boolean) =>
        dispatch({ type: 'SET_KEY_PAN_ACTIVE', payload: active }),
      setDragging: (dragging: boolean) => dispatch({ type: 'SET_DRAGGING', payload: dragging }),
      toggleSpecs: () => dispatch({ type: 'TOGGLE_SPECS' }),
      toggleLayers: () => dispatch({ type: 'TOGGLE_LAYERS' }),
      togglePresets: () => dispatch({ type: 'TOGGLE_PRESETS' }),
      setModelMetadata: (metadata: ModelMetadata | null) =>
        dispatch({ type: 'SET_MODEL_METADATA', payload: metadata }),
      setCurrentQuality: (quality: ModelQuality) =>
        dispatch({ type: 'SET_CURRENT_QUALITY', payload: quality }),
      setQualityStatus: (status: QualityStatusMap) =>
        dispatch({ type: 'SET_QUALITY_STATUS', payload: status }),
      setLodProgress: (progress: number) =>
        dispatch({ type: 'SET_LOD_PROGRESS', payload: progress }),
      setForceQuality: (quality: ModelQuality | undefined) =>
        dispatch({ type: 'SET_FORCE_QUALITY', payload: quality }),
      toggleLayer: (layer: keyof VisibleLayers) =>
        dispatch({ type: 'TOGGLE_LAYER', payload: layer }),
      setShowSpecs: (show: boolean) => dispatch({ type: 'SET_SHOW_SPECS', payload: show }),
    }),
    [],
  )

  // Set mounted on client-side
  useEffect(() => {
    actions.setMounted()
  }, [actions])

  // Handle keyboard pan mode (Cmd/Ctrl key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !state.isKeyPanActive) {
        actions.setKeyPanActive(true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey && state.isKeyPanActive) {
        actions.setKeyPanActive(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [state.isKeyPanActive, actions])

  const value = useMemo(() => ({ state, dispatch, actions }), [state, actions])

  return <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>
}

// ============================================
// HOOK
// ============================================

export function useViewerContext(): ViewerContextValue {
  const context = useContext(ViewerContext)

  if (!context) {
    throw new Error('useViewerContext must be used within a ViewerContextProvider')
  }

  return context
}

// ============================================
// SELECTOR HOOKS (for performance optimization)
// ============================================

export function useViewerState() {
  const { state } = useViewerContext()
  return state
}

export function useViewerActions() {
  const { actions } = useViewerContext()
  return actions
}
