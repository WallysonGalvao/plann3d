import { PROJECT_ID as TORRE_DE_TV_ID, torreDeTvData } from '@/data/projects/torre-de-tv/data'
import i18n from '@/i18n'

// ============================================
// TYPE RE-EXPORTS (for backward compatibility)
// Types are now centralized in @/types/project.ts
// ============================================

export type {
  Project,
  ProjectCategory,
  ProjectDataByLocale,
  ProjectPhase,
  ProjectSize,
  ProjectSpecs,
  SupportedLocale,
} from '@/types'

import type { Project, ProjectDataByLocale, SupportedLocale } from '@/types'

// ============================================
// PROJECT REGISTRY
// All project data organized by ID
// ============================================

const lang = i18n.language?.split('-')[0] || 'pt'

const projectRegistry: Record<string, ProjectDataByLocale> = {
  [TORRE_DE_TV_ID]: torreDeTvData,
  // Add more projects here:
  // [OTHER_PROJECT_ID]: otherProjectData,
}

// ============================================
// HELPER FUNCTIONS (with locale parameter)
// ============================================

/**
 * Get all projects for a specific locale
 */
export const getProjects = (locale: SupportedLocale = 'pt'): Array<Project> => {
  return Object.values(projectRegistry).map((dataByLocale) => {
    return dataByLocale[locale] || dataByLocale.pt
  })
}

/**
 * Get total number of projects in the registry
 */
export const getProjectsCount = (): number => {
  return Object.keys(projectRegistry).length
}

/**
 * Get project by ID for a specific locale
 */
export const getProjectById = (id: string, locale: SupportedLocale = 'pt'): Project | undefined => {
  const dataByLocale = projectRegistry[id]
  if (!dataByLocale) return undefined

  return dataByLocale[locale] || dataByLocale.pt
}

/**
 * Get the next project in the registry order
 * Returns undefined if there is no next project
 */
export const getNextProject = (
  currentId: string,
  locale: SupportedLocale = 'pt',
): { id: string; title: string } | undefined => {
  const projectIds = Object.keys(projectRegistry)
  const currentIndex = projectIds.indexOf(currentId)

  // If not found or is the last project, return undefined
  if (currentIndex === -1 || currentIndex === projectIds.length - 1) {
    return undefined
  }

  const nextId = projectIds[currentIndex + 1]
  const nextProject = getProjectById(nextId, locale)

  return nextProject
    ? {
        id: nextProject.id,
        title: nextProject.title,
      }
    : undefined
}

/**
 * Get project by ID with next project info
 */
export const getProjectWithNext = (
  id: string,
  locale: SupportedLocale = 'pt',
): (Project & { nextProject?: { id: string; title: string } }) | undefined => {
  const project = getProjectById(id, locale)
  if (!project) return undefined

  const nextProject = getNextProject(id, locale)

  return {
    ...project,
    nextProject,
  }
}

export const projects: Array<Project> = getProjects(lang as SupportedLocale)
