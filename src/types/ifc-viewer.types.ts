/**
 * IFC Viewer Types
 * Types for BIM IFC viewer with 2D/3D synchronization
 */

// ============================================
// VIEW CONFIG
// ============================================

export interface ViewConfig {
  id: string
  name: string
  nameKey?: string // i18n key
  icon?: string // Material Symbol name
  camera: {
    position: [number, number, number]
    target: [number, number, number]
  }
  clipping?: {
    normal: [number, number, number]
    constant: number
  }
  ifcTypes?: number[] // IFC type filter
}

// ============================================
// IFC ELEMENT
// ============================================

export interface IFCElementProperties {
  expressID: number
  type: string
  name?: string
  description?: string
  dimensions?: {
    length?: number
    width?: number
    height?: number
  }
  weight?: number
  material?: string
  // Raw IFC properties
  properties: Record<string, unknown>
}

// ============================================
// VIEWER STATE
// ============================================

export type ViewMode = '2d' | 'split' | '3d'

export interface IFCViewerState {
  // Mount state
  isMounted: boolean

  // View mode
  viewMode: ViewMode

  // Model state
  modelUrl: string | null
  pdfUrl: string | null
  isModelLoading: boolean
  modelError: string | null

  // Selection
  selectedElementId: number | null
  selectedElementProps: IFCElementProperties | null
  highlightedElementId: number | null

  // Camera
  activeCameraPreset: string | null
  zoomLevel: number

  // Clipping
  clippingEnabled: boolean
  clippingPlane: {
    axis: 'x' | 'y' | 'z'
    position: number
  } | null

  // UI panels
  showPropertiesPanel: boolean
  showFiltersPanel: boolean

  // Filters (IFC types visibility)
  visibleIfcTypes: Record<string, boolean>

  // PDF state
  currentPdfPage: number
  totalPdfPages: number
}

export const DEFAULT_IFC_VIEWER_STATE: IFCViewerState = {
  isMounted: false,
  viewMode: 'split',
  modelUrl: null,
  pdfUrl: null,
  isModelLoading: false,
  modelError: null,
  selectedElementId: null,
  selectedElementProps: null,
  highlightedElementId: null,
  activeCameraPreset: null,
  zoomLevel: 100,
  clippingEnabled: false,
  clippingPlane: null,
  showPropertiesPanel: true,
  showFiltersPanel: false,
  visibleIfcTypes: {
    structure: true,
    steps: true,
    railings: true,
  },
  currentPdfPage: 1,
  totalPdfPages: 0,
}

// ============================================
// ACTIONS
// ============================================

export interface IFCViewerActions {
  setMounted: () => void
  setViewMode: (mode: ViewMode) => void
  setModelUrl: (url: string | null) => void
  setPdfUrl: (url: string | null) => void
  setModelLoading: (loading: boolean) => void
  setModelError: (error: string | null) => void
  selectElement: (id: number | null, props?: IFCElementProperties | null) => void
  highlightElement: (id: number | null) => void
  setCameraPreset: (presetId: string | null) => void
  setZoomLevel: (level: number) => void
  toggleClipping: () => void
  setClippingPlane: (plane: IFCViewerState['clippingPlane']) => void
  togglePropertiesPanel: () => void
  toggleFiltersPanel: () => void
  toggleIfcTypeVisibility: (typeKey: string) => void
  setPdfPage: (page: number) => void
  setTotalPdfPages: (total: number) => void
  reset: () => void
}

// ============================================
// PRESET VIEWS (based on reference design)
// ============================================

export const PRESET_VIEWS: ViewConfig[] = [
  {
    id: 'plan',
    name: 'Planta',
    nameKey: 'ifcViewer.presets.plan',
    icon: 'grid_view',
    camera: {
      position: [0, 50, 0],
      target: [0, 0, 0],
    },
  },
  {
    id: 'section-a',
    name: 'Corte A-A',
    nameKey: 'ifcViewer.presets.sectionA',
    icon: 'arrow_right_alt',
    camera: {
      position: [50, 10, 0],
      target: [0, 0, 0],
    },
    clipping: {
      normal: [0, 0, 1],
      constant: 0,
    },
  },
  {
    id: 'section-b',
    name: 'Corte B-B',
    nameKey: 'ifcViewer.presets.sectionB',
    icon: 'arrow_upward',
    camera: {
      position: [0, 10, 50],
      target: [0, 0, 0],
    },
    clipping: {
      normal: [1, 0, 0],
      constant: 0,
    },
  },
  {
    id: 'isometric',
    name: 'Isométrica',
    nameKey: 'ifcViewer.presets.isometric',
    icon: 'view_in_ar',
    camera: {
      position: [30, 30, 30],
      target: [0, 0, 0],
    },
  },
]

// ============================================
// IFC TYPE FILTERS (based on reference design)
// ============================================

export const IFC_TYPE_FILTERS = [
  { key: 'structure', nameKey: 'ifcViewer.filters.structure', name: 'Estrutura' },
  { key: 'steps', nameKey: 'ifcViewer.filters.steps', name: 'Degraus' },
  { key: 'railings', nameKey: 'ifcViewer.filters.railings', name: 'Guarda-corpos' },
]
