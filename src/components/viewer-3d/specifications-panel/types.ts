export interface ModelMetadata {
  vertices: number
  triangles: number
  materials: number
  objects: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  boundingBox: {
    min: { x: number; y: number; z: number }
    max: { x: number; y: number; z: number }
  }
  fileSize?: string
  format?: string
  textures?: number
  animations?: number
  area?: number
  volume?: number
  detailLevel?: 'Low' | 'Medium' | 'High' | 'Ultra'
}

export interface PerformanceMetrics {
  fps: number
  drawCalls: number
  renderTime: number
  memoryUsage: string
}

export interface LightingInfo {
  lights: number
  shadows: boolean
  lightTypes: string[]
}

export interface QualityInfo {
  compression: string
  lodLevels: number
  textureResolution: string
  uvMaps: number
}

export interface ProjectInfo {
  software: string
  exportDate: string
  modelVersion: string
  author: string
}

export interface OptimizationInfo {
  compressionRatio: string
  originalSize: string
  optimizedSize: string
  loadTime: number
}

export interface SectionSettings {
  geometry: boolean
  resources: boolean
  physicalMeasures: boolean
  file: boolean
  performance: boolean
  lighting: boolean
  quality: boolean
  projectInfo: boolean
  optimization: boolean
}

export const DEFAULT_SECTION_SETTINGS: SectionSettings = {
  geometry: true,
  resources: true,
  physicalMeasures: true,
  file: true,
  performance: false,
  lighting: false,
  quality: false,
  projectInfo: false,
  optimization: false,
}
