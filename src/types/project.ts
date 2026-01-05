/**
 * Shared type definitions for the Plann3d project
 *
 * This file centralizes all project-related types to ensure type-safety
 * and consistency across the application.
 */

// ============================================
// LOCALE TYPES
// ============================================

export type SupportedLocale = 'pt' | 'en'

// ============================================
// PROJECT TYPES
// ============================================

export type ProjectCategory = 'all' | 'exteriors' | 'interiors' | 'animation' | 'commercial'
export type ProjectSize = 'large' | 'tall' | 'standard' | 'wide'

export interface ProjectPhase {
  label: string
  title: string
  description: string
  badge?: string
  image?: string
  images?: Array<string>
  videoImage?: string
  video?: string
  stats?: Array<{ value: string; label: string }>
}

export interface ProjectSpecs {
  year: string
  location: string
  client: string
  status: string
}

/**
 * 3D Model configuration for the interactive viewer
 */
export interface Model3DConfig {
  /** URL to the .glb or .gltf file */
  src: string
  /** Optional poster/thumbnail while loading */
  thumbnail?: string
  /** Initial camera position [x, y, z] */
  cameraPosition?: [number, number, number]
  /** Model scale multiplier (default: 1) */
  scale?: number
  /** Enable auto-rotation (default: false) */
  autoRotate?: boolean
}

/**
 * Unified Project interface - Single source of truth
 * Contains all fields for listing, grid, and detail views
 */
export interface Project {
  // Required fields (used everywhere)
  id: string
  title: string
  category: ProjectCategory
  location: string
  image: string
  size: ProjectSize

  // Optional listing fields
  description?: string
  tags?: Array<string>
  isVideo?: boolean

  // Optional detail fields
  subtitle?: string
  tagline?: string
  quote?: string
  heroImage?: string
  phases?: Array<ProjectPhase>
  specs?: ProjectSpecs
  nextProject?: {
    id: string
    title: string
  }

  // Optional 3D viewer configuration
  model3d?: Model3DConfig
}

/**
 * Project data organized by locale
 */
export type ProjectDataByLocale = Record<SupportedLocale, Project>

// ============================================
// NAVIGATION TYPES
// ============================================

export interface NavLink {
  label: string
  href: string
  isRoute?: boolean
}

export interface SocialLink {
  label: string
  href: string
  icon: React.ReactNode
}
