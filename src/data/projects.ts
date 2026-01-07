import type { Project, ProjectDataByLocale, SupportedLocale } from '@/types/project'

import { PROJECT_ID as AREA_GOURMET_ID, areaGourmetData } from '@/data/projects/area-gourmet/data'
import { PROJECT_ID as ARENA_BSB_ID, arenaBsbData } from '@/data/projects/arena-bsb/data'
import { PROJECT_ID as JK_SHOPPING_ID, jkShoppingData } from '@/data/projects/jk-shopping/data'
import { PROJECT_ID as PROJECT_X_ID, projectXData } from '@/data/projects/project-x/data'
import { PROJECT_ID as TEKLA_STAIRS_ID, teklaStairsData } from '@/data/projects/tekla-stairs/data'
import {
  PROJECT_ID as TEKLA_WAREHOUSE_ID,
  teklaWarehouseData,
} from '@/data/projects/tekla-warehouse/data'
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
} from '@/types/project'

// ============================================
// PROJECT REGISTRY
// All project data organized by ID
// ============================================

// Get initial language, defaulting to 'pt' if not available
const lang = i18n.language ? i18n.language.split('-')[0] : 'pt'

const projectRegistry: Record<string, ProjectDataByLocale> = {
  [TORRE_DE_TV_ID]: torreDeTvData,
  [JK_SHOPPING_ID]: jkShoppingData,
  [ARENA_BSB_ID]: arenaBsbData,
  [AREA_GOURMET_ID]: areaGourmetData,
  [PROJECT_X_ID]: projectXData,
  [TEKLA_STAIRS_ID]: teklaStairsData,
  [TEKLA_WAREHOUSE_ID]: teklaWarehouseData,
}

// ============================================
// HELPER FUNCTIONS (with locale parameter)
// ============================================

/**
 * Get all projects for a specific locale
 */
export const getProjects = (locale: SupportedLocale = 'pt'): Array<Project> => {
  return Object.values(projectRegistry).map((dataByLocale) => {
    // ProjectDataByLocale guarantees both pt and en exist
    return dataByLocale[locale]
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
  // Check if project exists in registry using hasOwn for proper key check
  if (!Object.hasOwn(projectRegistry, id)) return undefined

  // ProjectDataByLocale guarantees the locale exists
  return projectRegistry[id][locale]
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
 * Get the previous project in the registry order
 * Returns undefined if there is no previous project (first in list)
 */
export const getPreviousProject = (
  currentId: string,
  locale: SupportedLocale = 'pt',
): { id: string; title: string } | undefined => {
  const projectIds = Object.keys(projectRegistry)
  const currentIndex = projectIds.indexOf(currentId)

  // If not found or is the first project, return undefined
  if (currentIndex === -1 || currentIndex === 0) {
    return undefined
  }

  const previousId = projectIds[currentIndex - 1]
  const previousProject = getProjectById(previousId, locale)

  return previousProject
    ? {
        id: previousProject.id,
        title: previousProject.title,
      }
    : undefined
}

/**
 * Get project by ID with next and previous project info
 */
export const getProjectWithNext = (
  id: string,
  locale: SupportedLocale = 'pt',
):
  | (Project & {
      nextProject?: { id: string; title: string }
      previousProject?: { id: string; title: string }
    })
  | undefined => {
  const project = getProjectById(id, locale)
  if (!project) return undefined

  const nextProject = getNextProject(id, locale)
  const previousProject = getPreviousProject(id, locale)

  return {
    ...project,
    nextProject,
    previousProject,
  }
}

export const projects: Array<Project> = getProjects(lang as SupportedLocale)
