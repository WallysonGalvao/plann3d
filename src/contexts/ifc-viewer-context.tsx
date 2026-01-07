/**
 * IFC Viewer Context
 * Zustand store for IFC viewer state management
 */

import { create } from 'zustand'
import type {
  IFCViewerState,
  IFCViewerActions,
  ViewMode,
  IFCElementProperties,
} from '@/types/ifc-viewer.types'
import { DEFAULT_IFC_VIEWER_STATE } from '@/types/ifc-viewer.types'

// ============================================
// ZUSTAND STORE
// ============================================

interface IFCViewerStore extends IFCViewerState, IFCViewerActions { }

export const useIFCViewerStore = create<IFCViewerStore>((set) => ({
  // Initial state
  ...DEFAULT_IFC_VIEWER_STATE,

  // Actions
  setMounted: () => set({ isMounted: true }),

  setViewMode: (mode: ViewMode) => set({ viewMode: mode }),

  setModelUrl: (url: string | null) => set({ modelUrl: url }),

  setPdfUrl: (url: string | null) => set({ pdfUrl: url }),

  setModelLoading: (loading: boolean) => set({ isModelLoading: loading }),

  setModelError: (error: string | null) => set({ modelError: error }),

  selectElement: (id: number | null, props?: IFCElementProperties | null) =>
    set({
      selectedElementId: id,
      selectedElementProps: props ?? null,
    }),

  highlightElement: (id: number | null) => set({ highlightedElementId: id }),

  setCameraPreset: (presetId: string | null) => set({ activeCameraPreset: presetId }),

  setZoomLevel: (level: number) => set({ zoomLevel: level }),

  toggleClipping: () =>
    set((state) => ({
      clippingEnabled: !state.clippingEnabled,
    })),

  setClippingPlane: (plane) => set({ clippingPlane: plane }),

  togglePropertiesPanel: () =>
    set((state) => ({
      showPropertiesPanel: !state.showPropertiesPanel,
    })),

  toggleFiltersPanel: () =>
    set((state) => ({
      showFiltersPanel: !state.showFiltersPanel,
    })),

  toggleIfcTypeVisibility: (typeKey: string) =>
    set((state) => ({
      visibleIfcTypes: {
        ...state.visibleIfcTypes,
        [typeKey]: !state.visibleIfcTypes[typeKey],
      },
    })),

  setPdfPage: (page: number) => set({ currentPdfPage: page }),

  setTotalPdfPages: (total: number) => set({ totalPdfPages: total }),

  reset: () => set(DEFAULT_IFC_VIEWER_STATE),
}))

// ============================================
// SELECTOR HOOKS (for optimized re-renders)
// ============================================

export const useIFCViewMode = () => useIFCViewerStore((state) => state.viewMode)
export const useIFCModelUrl = () => useIFCViewerStore((state) => state.modelUrl)
export const useIFCModelLoading = () => useIFCViewerStore((state) => state.isModelLoading)
export const useIFCSelectedElement = () =>
  useIFCViewerStore((state) => ({
    id: state.selectedElementId,
    props: state.selectedElementProps,
  }))
export const useIFCCameraPreset = () => useIFCViewerStore((state) => state.activeCameraPreset)
export const useIFCClipping = () =>
  useIFCViewerStore((state) => ({
    enabled: state.clippingEnabled,
    plane: state.clippingPlane,
  }))
export const useIFCVisibleTypes = () => useIFCViewerStore((state) => state.visibleIfcTypes)
export const useIFCPdfState = () =>
  useIFCViewerStore((state) => ({
    page: state.currentPdfPage,
    total: state.totalPdfPages,
  }))

// ============================================
// ACTION HOOKS
// ============================================

export const useIFCViewerActions = () =>
  useIFCViewerStore((state) => ({
    setMounted: state.setMounted,
    setViewMode: state.setViewMode,
    setModelUrl: state.setModelUrl,
    setPdfUrl: state.setPdfUrl,
    setModelLoading: state.setModelLoading,
    setModelError: state.setModelError,
    selectElement: state.selectElement,
    highlightElement: state.highlightElement,
    setCameraPreset: state.setCameraPreset,
    setZoomLevel: state.setZoomLevel,
    toggleClipping: state.toggleClipping,
    setClippingPlane: state.setClippingPlane,
    togglePropertiesPanel: state.togglePropertiesPanel,
    toggleFiltersPanel: state.toggleFiltersPanel,
    toggleIfcTypeVisibility: state.toggleIfcTypeVisibility,
    setPdfPage: state.setPdfPage,
    setTotalPdfPages: state.setTotalPdfPages,
    reset: state.reset,
  }))
