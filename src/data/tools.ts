/**
 * Centralized tools data structure
 * Translations are managed via i18n (see src/i18n/locales/*.json)
 */

import {
  Building2,
  Clapperboard,
  Compass,
  FileText,
  Film,
  Layers,
  Lightbulb,
  Mountain,
  Palette,
  Pencil,
  Ruler,
  Volume2,
} from 'lucide-react'

import type { LucideIcon } from 'lucide-react'

export interface ToolFeature {
  titleKey: string
  descriptionKey: string
  icon?: LucideIcon
}

export interface Tool {
  id: string
  name: string
  categoryKey: string
  categoryIcon: LucideIcon
  descriptionKey: string
  features: Array<ToolFeature>
  tagsKey?: string // Reference to i18n array
  image: string
  badge: {
    icon: string
    labelKey: string
  }
  cta: {
    labelKey: string
    icon?: string
  }
}

// ============================================
// TOOLS DATA (keys reference i18n translations)
// ============================================

export const tools: Array<Tool> = [
  {
    id: 'twinmotion',
    name: 'Twinmotion',
    categoryKey: 'toolsPage.tools.twinmotion.category',
    categoryIcon: Lightbulb,
    descriptionKey: 'toolsPage.tools.twinmotion.description',
    features: [
      {
        titleKey: 'toolsPage.tools.twinmotion.features.0.title',
        descriptionKey: 'toolsPage.tools.twinmotion.features.0.description',
      },
      {
        titleKey: 'toolsPage.tools.twinmotion.features.1.title',
        descriptionKey: 'toolsPage.tools.twinmotion.features.1.description',
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGp95waGVFETLZ_fBrPKzTA1V4A0l7Mg1HK3UBegrg1iuw2M4Sj-W3MJUDes-yjE6VSjIi9CPbEnBE7t-luxsec_xKhwayPv78twqlzwOgLljDGkYggjcGijYHMFn4W77Rj0lpm29b5_RJhLVJMfSXwa4ipmtAu8PEVzs0JLWoiz8LdqzNiEYmoPEGjaY1cssDWmQ3q0SzJM4mMAHIH6gM9SphM7oZIp59nAO8WcS0PAlBHJmgA4ZAx4h5jWnwwMS1flCJJkskPko',
    badge: {
      icon: 'image',
      labelKey: 'toolsPage.tools.twinmotion.badge',
    },
    cta: {
      labelKey: 'toolsPage.tools.twinmotion.cta',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'tekla',
    name: 'Tekla',
    categoryKey: 'toolsPage.tools.tekla.category',
    categoryIcon: Building2,
    descriptionKey: 'toolsPage.tools.tekla.description',
    features: [
      {
        titleKey: 'toolsPage.tools.tekla.features.0.title',
        descriptionKey: 'toolsPage.tools.tekla.features.0.description',
        icon: Compass,
      },
      {
        titleKey: 'toolsPage.tools.tekla.features.1.title',
        descriptionKey: 'toolsPage.tools.tekla.features.1.description',
        icon: Layers,
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCN3xcCtUVsFA0wt_QamjrvWgFRkP5mG8Xk2CDJ2xng7eJRCUxAutB9sIjiMJ80FT0okasKMec_XMZ1srg3yBQNtYJ5ujG6sBVTVBuN7gL9zum1MZmnTL0GV0CUlmXu5LOgCcJGcKJpXEdu1Yip5zjGoGvOIWTlf3m3LipuFcUsHdeMiJsjQjDFkMSJiZV5axihWd19jbubcVaQDcjMmulOaiB-CJ2vkWNQajgxi03kH4rmRq7cGFIqkjlt6vNsr0m8ferF2YuNMyc',
    badge: {
      icon: 'grid_4x4',
      labelKey: 'toolsPage.tools.tekla.badge',
    },
    cta: {
      labelKey: 'toolsPage.tools.tekla.cta',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'sketchup',
    name: 'SketchUp',
    categoryKey: 'toolsPage.tools.sketchup.category',
    categoryIcon: Pencil,
    descriptionKey: 'toolsPage.tools.sketchup.description',
    features: [
      {
        titleKey: 'toolsPage.tools.sketchup.features.0.title',
        descriptionKey: 'toolsPage.tools.sketchup.features.0.description',
      },
      {
        titleKey: 'toolsPage.tools.sketchup.features.1.title',
        descriptionKey: 'toolsPage.tools.sketchup.features.1.description',
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2MRWFQSPOXzX-Czs3EMTaiLVPvCrbmTxYgASenGM10eYb5eWzL-jYqRsOrkkEqZRUbgGWPBE3ZsAsCRihlqeiuZmxJ8pe905FAhYJ_0lYti4kBMZc2te4mIImiW-Wm7diHKew8qqkS3xN8oxKS16yZtzJpQp4h9kgu1-TAcnAogs8w5fr8dJqMqDY2Hpzg4WoNhKKFKEbRIJjaRm9xFjfeeJ1g9mXe3HjSZTCGY8eo3mcMNXCeKXhlJrqp8iTCqXISXrv4VUxab4',
    badge: {
      icon: 'draw',
      labelKey: 'toolsPage.tools.sketchup.badge',
    },
    cta: {
      labelKey: 'toolsPage.tools.sketchup.cta',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'blender',
    name: 'Blender',
    categoryKey: 'toolsPage.tools.blender.category',
    categoryIcon: Clapperboard,
    descriptionKey: 'toolsPage.tools.blender.description',
    features: [],
    tagsKey: 'toolsPage.tools.blender.tags',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbhQTeOglLvDoilty3V0JhnIvwARx55QzJqnPFEjmjI_XLQeSO4dYWNFAqRJAn-d4UBLU2OgPvqiST48_NJklQEX5BMr9LZ1VMq-s58TJd-7dYvHYiVJDI8GhYWssbbHmBl_TCMVgSlCfJivZXol0IoJiZ3xp5njvwmqcRjvQrDP8YPScERkeoMvPFqY2xEZpjSu8BFN1WfsMzOpjEoRtW0l7Y7NipmwYEG5pWZ573j44OYjWFBerKNynFzWB88tLkYeATYjZyNWo',
    badge: {
      icon: 'play_arrow',
      labelKey: 'toolsPage.tools.blender.badge',
    },
    cta: {
      labelKey: 'toolsPage.tools.blender.cta',
      icon: 'play_circle',
    },
  },
  {
    id: 'autocad',
    name: 'AutoCAD',
    categoryKey: 'toolsPage.tools.autocad.category',
    categoryIcon: FileText,
    descriptionKey: 'toolsPage.tools.autocad.description',
    features: [
      {
        titleKey: 'toolsPage.tools.autocad.features.0.title',
        descriptionKey: 'toolsPage.tools.autocad.features.0.description',
        icon: Layers,
      },
      {
        titleKey: 'toolsPage.tools.autocad.features.1.title',
        descriptionKey: 'toolsPage.tools.autocad.features.1.description',
        icon: Ruler,
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCyG3G6mzB8pRDe0iYtOn4BrFZ3pSZEwlvSstqktt-s0mdaqGS4zsJ3W3r8k4FT-mtnJhS8NYEMCTKNU6vlVJXS0L__nGw4sxLhqBTSxXD0lnQ13jRqmf_sQgLBU4kgHNmVvz2adA1riayoCzUHzCByUZnDTCaVmdwEituTWxZba7swnMuGUp3rDkbLwbDih7uxEmUIogr_V2wiRb5kgxXudaTXZgCNHnKBSwYHFe0dFiLFpfk4fn3mk-8vufCYRnqahkx6TwgauCY',
    badge: {
      icon: 'architecture',
      labelKey: 'toolsPage.tools.autocad.badge',
    },
    cta: {
      labelKey: 'toolsPage.tools.autocad.cta',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'premiere',
    name: 'Adobe Premiere',
    categoryKey: 'toolsPage.tools.premiere.category',
    categoryIcon: Film,
    descriptionKey: 'toolsPage.tools.premiere.description',
    features: [
      {
        titleKey: 'toolsPage.tools.premiere.features.0.title',
        descriptionKey: 'toolsPage.tools.premiere.features.0.description',
        icon: Palette,
      },
      {
        titleKey: 'toolsPage.tools.premiere.features.1.title',
        descriptionKey: 'toolsPage.tools.premiere.features.1.description',
        icon: Volume2,
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNE1zZUi11jKz6avzJM-tXFlHzWLKtC2a6iogxPKEvNZwHfWkJpWSVg5JuTrDpKraT2Jh0F3dP9NKTKDYGUJYhm8pqWYt69G30hXMmwq6FKS6EU0RsqCXrBEeOHuMzZkhiLA5hR0RxsIdeWrSEsYzDy6s59CTxQipm8wQV4lYGRRUJjGOegKmH7E4Enr_A5VsdPr56DWH7YeJgM7QicfwuhomgOds8KaZ7vVBuK97jv66DI04TutyE-g9Yev3xbcMbX7keSbZzqms',
    badge: {
      icon: 'movie_edit',
      labelKey: 'toolsPage.tools.premiere.badge',
    },
    cta: {
      labelKey: 'toolsPage.tools.premiere.cta',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'lumion',
    name: 'Lumion',
    categoryKey: 'toolsPage.tools.lumion.category',
    categoryIcon: Mountain,
    descriptionKey: 'toolsPage.tools.lumion.description',
    features: [
      {
        titleKey: 'toolsPage.tools.lumion.features.0.title',
        descriptionKey: 'toolsPage.tools.lumion.features.0.description',
      },
      {
        titleKey: 'toolsPage.tools.lumion.features.1.title',
        descriptionKey: 'toolsPage.tools.lumion.features.1.description',
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAujUpQxcLLmmSD3tML62dp9SP3x1ejDdO33C8OgPOqKkGHV4Qza_xoMCn_TFgH8w2u8m0JDqsx-qSQc_iivXPNKpZNsn_tbBqwXTQRLuwlavDPFRo0XwanLYjsAQw5RzC6JkHbQIbsUCNHcJd1Ga0H82aEgJgzX1ajHnU_7I86B3LsJFcPqZFh_7zzSnFdfjMX0ToR7ISJy4fmS_miMlfYzvyJvc0OcxVBbw-Q3IcYOCkeZjNCy0cPuxRVarusO4suzkwGkwh4w-4',
    badge: {
      icon: 'filter_hdr',
      labelKey: 'toolsPage.tools.lumion.badge',
    },
    cta: {
      labelKey: 'toolsPage.tools.lumion.cta',
      icon: 'arrow_forward',
    },
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all tools
 */
export const getTools = (): Array<Tool> => {
  return tools
}

/**
 * Get tool by ID
 */
export const getToolById = (id: string): Tool | undefined => {
  return tools.find((t) => t.id === id)
}
