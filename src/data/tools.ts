/**
 * Centralized tools data with i18n support
 * Software and technologies used by PLANN3D
 */

import type { SupportedLocale } from '@/types/project'

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
import i18n from '@/i18n'

export interface Tool {
  id: string
  name: string
  category: string
  categoryIcon: LucideIcon
  description: string
  features: Array<{
    title: string
    description: string
    icon?: LucideIcon
  }>
  tags?: Array<string>
  image: string
  badge: {
    icon: string
    label: string
  }
  cta: {
    label: string
    icon?: string
  }
}

// ============================================
// TOOLS DATA BY LOCALE
// ============================================

const toolsPt: Array<Tool> = [
  {
    id: 'twinmotion',
    name: 'Twinmotion',
    category: 'Ambiente',
    categoryIcon: Lightbulb,
    description:
      'Imersão em tempo real que dá vida aos espaços. Utilizamos o Twinmotion para simular iluminação atmosférica, clima e estações do ano, criando uma conexão emocional instantânea com o projeto antes mesmo de ser construído.',
    features: [
      {
        title: 'Renderização em Tempo Real',
        description: 'Feedback instantâneo para estudos de luz e materiais.',
      },
      {
        title: 'Atmosfera Dinâmica',
        description: 'Simulação de chuva, vento e movimento humano.',
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGp95waGVFETLZ_fBrPKzTA1V4A0l7Mg1HK3UBegrg1iuw2M4Sj-W3MJUDes-yjE6VSjIi9CPbEnBE7t-luxsec_xKhwayPv78twqlzwOgLljDGkYggjcGijYHMFn4W77Rj0lpm29b5_RJhLVJMfSXwa4ipmtAu8PEVzs0JLWoiz8LdqzNiEYmoPEGjaY1cssDWmQ3q0SzJM4mMAHIH6gM9SphM7oZIp59nAO8WcS0PAlBHJmgA4ZAx4h5jWnwwMS1flCJJkskPko',
    badge: {
      icon: 'image',
      label: 'Render 4K',
    },
    cta: {
      label: 'Ver Projetos Twinmotion',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'tekla',
    name: 'Tekla',
    category: 'Engenharia',
    categoryIcon: Building2,
    description:
      'Precisão estrutural onde cada viga conta. O uso do Tekla garante que a beleza visual esteja fundamentada na realidade construtiva, fundindo engenharia e arte sem emendas visíveis. Detalhamento máximo para execução perfeita.',
    features: [
      {
        title: 'Detalhamento',
        description: 'Nível de detalhe construtivo superior.',
        icon: Compass,
      },
      {
        title: 'Integração BIM',
        description: 'Colaboração multidisciplinar.',
        icon: Layers,
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCN3xcCtUVsFA0wt_QamjrvWgFRkP5mG8Xk2CDJ2xng7eJRCUxAutB9sIjiMJ80FT0okasKMec_XMZ1srg3yBQNtYJ5ujG6sBVTVBuN7gL9zum1MZmnTL0GV0CUlmXu5LOgCcJGcKJpXEdu1Yip5zjGoGvOIWTlf3m3LipuFcUsHdeMiJsjQjDFkMSJiZV5axihWd19jbubcVaQDcjMmulOaiB-CJ2vkWNQajgxi03kH4rmRq7cGFIqkjlt6vNsr0m8ferF2YuNMyc',
    badge: {
      icon: 'grid_4x4',
      label: 'Modelo BIM',
    },
    cta: {
      label: 'Ver Projetos Tekla',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'sketchup',
    name: 'SketchUp',
    category: 'Conceito',
    categoryIcon: Pencil,
    description:
      'Agilidade conceitual para a exploração rápida de formas. O SketchUp nos permite iterar rapidamente sobre volumetrias e massas, transformando ideias abstratas em conceitos 3D tangíveis em tempo recorde.',
    features: [
      {
        title: 'Prototipagem Rápida',
        description: 'Iteração veloz de conceitos volumétricos.',
      },
      {
        title: 'Estudos de Massa',
        description: 'Visualização clara de escala e proporção.',
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2MRWFQSPOXzX-Czs3EMTaiLVPvCrbmTxYgASenGM10eYb5eWzL-jYqRsOrkkEqZRUbgGWPBE3ZsAsCRihlqeiuZmxJ8pe905FAhYJ_0lYti4kBMZc2te4mIImiW-Wm7diHKew8qqkS3xN8oxKS16yZtzJpQp4h9kgu1-TAcnAogs8w5fr8dJqMqDY2Hpzg4WoNhKKFKEbRIJjaRm9xFjfeeJ1g9mXe3HjSZTCGY8eo3mcMNXCeKXhlJrqp8iTCqXISXrv4VUxab4',
    badge: {
      icon: 'draw',
      label: 'Sketch Mode',
    },
    cta: {
      label: 'Ver Projetos SketchUp',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'blender',
    name: 'Blender',
    category: 'Animação',
    categoryIcon: Clapperboard,
    description:
      'Narrativa cinematográfica sem limites. Com o Blender, criamos animações fluidas e renderizações fotorrealistas de alta complexidade. É a ferramenta onde a física encontra a arte para contar a história do seu projeto.',
    features: [],
    tags: ['VFX & Partículas', 'Soft Body Physics', 'Cycles Rendering'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbhQTeOglLvDoilty3V0JhnIvwARx55QzJqnPFEjmjI_XLQeSO4dYWNFAqRJAn-d4UBLU2OgPvqiST48_NJklQEX5BMr9LZ1VMq-s58TJd-7dYvHYiVJDI8GhYWssbbHmBl_TCMVgSlCfJivZXol0IoJiZ3xp5njvwmqcRjvQrDP8YPScERkeoMvPFqY2xEZpjSu8BFN1WfsMzOpjEoRtW0l7Y7NipmwYEG5pWZ573j44OYjWFBerKNynFzWB88tLkYeATYjZyNWo',
    badge: {
      icon: 'play_arrow',
      label: 'Animation',
    },
    cta: {
      label: 'Ver Showreel',
      icon: 'play_circle',
    },
  },
  {
    id: 'autocad',
    name: 'AutoCAD',
    category: 'Documentação',
    categoryIcon: FileText,
    description:
      'O alicerce da precisão técnica. Utilizamos o AutoCAD para o desenvolvimento rigoroso de plantas baixas, cortes e detalhamentos técnicos que servem como a base sólida para toda a modelagem 3D subsequente. A exatidão geométrica em seu estado puro.',
    features: [
      {
        title: 'Gestão de Layers',
        description: 'Organização complexa para fluxos eficientes.',
        icon: Layers,
      },
      {
        title: 'Desenho Técnico',
        description: 'Precisão milimétrica em documentação 2D.',
        icon: Ruler,
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCyG3G6mzB8pRDe0iYtOn4BrFZ3pSZEwlvSstqktt-s0mdaqGS4zsJ3W3r8k4FT-mtnJhS8NYEMCTKNU6vlVJXS0L__nGw4sxLhqBTSxXD0lnQ13jRqmf_sQgLBU4kgHNmVvz2adA1riayoCzUHzCByUZnDTCaVmdwEituTWxZba7swnMuGUp3rDkbLwbDih7uxEmUIogr_V2wiRb5kgxXudaTXZgCNHnKBSwYHFe0dFiLFpfk4fn3mk-8vufCYRnqahkx6TwgauCY',
    badge: {
      icon: 'architecture',
      label: 'CAD Drawing',
    },
    cta: {
      label: 'Ver Detalhamentos',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'premiere',
    name: 'Adobe Premiere',
    category: 'Pós-Produção',
    categoryIcon: Film,
    description:
      'A arte final da narrativa. No Premiere, costuramos cada frame renderizado para criar uma história coesa. É aqui que a mágica da edição, o ritmo e a correção de cor transformam sequências de imagens em filmes emocionantes que cativam o espectador.',
    features: [
      {
        title: 'Color Grading',
        description: 'Estética cinematográfica e mood.',
        icon: Palette,
      },
      {
        title: 'Sound Design',
        description: 'Imersão auditiva completa.',
        icon: Volume2,
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNE1zZUi11jKz6avzJM-tXFlHzWLKtC2a6iogxPKEvNZwHfWkJpWSVg5JuTrDpKraT2Jh0F3dP9NKTKDYGUJYhm8pqWYt69G30hXMmwq6FKS6EU0RsqCXrBEeOHuMzZkhiLA5hR0RxsIdeWrSEsYzDy6s59CTxQipm8wQV4lYGRRUJjGOegKmH7E4Enr_A5VsdPr56DWH7YeJgM7QicfwuhomgOds8KaZ7vVBuK97jv66DI04TutyE-g9Yev3xbcMbX7keSbZzqms',
    badge: {
      icon: 'movie_edit',
      label: 'Post-Production',
    },
    cta: {
      label: 'Ver Edições',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'lumion',
    name: 'Lumion',
    category: 'Visualização',
    categoryIcon: Mountain,
    description:
      'Beleza instantânea e atmosferas vibrantes. O Lumion nos permite traduzir modelos complexos em imagens e vídeos deslumbrantes com rapidez incomparável, focando na vegetação, na vida e no entorno para contextualizar a arquitetura em seu habitat natural.',
    features: [
      {
        title: 'Ambientação Rica',
        description: 'Bibliotecas vastas de natureza e pessoas.',
      },
      {
        title: 'Render Ultra-Rápido',
        description: 'Agilidade para entregas de curto prazo.',
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAujUpQxcLLmmSD3tML62dp9SP3x1ejDdO33C8OgPOqKkGHV4Qza_xoMCn_TFgH8w2u8m0JDqsx-qSQc_iivXPNKpZNsn_tbBqwXTQRLuwlavDPFRo0XwanLYjsAQw5RzC6JkHbQIbsUCNHcJd1Ga0H82aEgJgzX1ajHnU_7I86B3LsJFcPqZFh_7zzSnFdfjMX0ToR7ISJy4fmS_miMlfYzvyJvc0OcxVBbw-Q3IcYOCkeZjNCy0cPuxRVarusO4suzkwGkwh4w-4',
    badge: {
      icon: 'filter_hdr',
      label: 'High Quality Render',
    },
    cta: {
      label: 'Ver Projetos Lumion',
      icon: 'arrow_forward',
    },
  },
]

const toolsEn: Array<Tool> = [
  {
    id: 'twinmotion',
    name: 'Twinmotion',
    category: 'Environment',
    categoryIcon: Lightbulb,
    description:
      'Real-time immersion that brings spaces to life. We use Twinmotion to simulate atmospheric lighting, weather, and seasons, creating an instant emotional connection with the project before it is even built.',
    features: [
      {
        title: 'Real-Time Rendering',
        description: 'Instant feedback for lighting and material studies.',
      },
      {
        title: 'Dynamic Atmosphere',
        description: 'Simulation of rain, wind, and human movement.',
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGp95waGVFETLZ_fBrPKzTA1V4A0l7Mg1HK3UBegrg1iuw2M4Sj-W3MJUDes-yjE6VSjIi9CPbEnBE7t-luxsec_xKhwayPv78twqlzwOgLljDGkYggjcGijYHMFn4W77Rj0lpm29b5_RJhLVJMfSXwa4ipmtAu8PEVzs0JLWoiz8LdqzNiEYmoPEGjaY1cssDWmQ3q0SzJM4mMAHIH6gM9SphM7oZIp59nAO8WcS0PAlBHJmgA4ZAx4h5jWnwwMS1flCJJkskPko',
    badge: {
      icon: 'image',
      label: '4K Render',
    },
    cta: {
      label: 'View Twinmotion Projects',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'tekla',
    name: 'Tekla',
    category: 'Engineering',
    categoryIcon: Building2,
    description:
      'Structural precision where every beam counts. Using Tekla ensures visual beauty is grounded in constructive reality, merging engineering and art with no visible seams. Maximum detailing for perfect execution.',
    features: [
      {
        title: 'Detailing',
        description: 'Superior level of constructive detail.',
        icon: Compass,
      },
      {
        title: 'BIM Integration',
        description: 'Multidisciplinary collaboration.',
        icon: Layers,
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCN3xcCtUVsFA0wt_QamjrvWgFRkP5mG8Xk2CDJ2xng7eJRCUxAutB9sIjiMJ80FT0okasKMec_XMZ1srg3yBQNtYJ5ujG6sBVTVBuN7gL9zum1MZmnTL0GV0CUlmXu5LOgCcJGcKJpXEdu1Yip5zjGoGvOIWTlf3m3LipuFcUsHdeMiJsjQjDFkMSJiZV5axihWd19jbubcVaQDcjMmulOaiB-CJ2vkWNQajgxi03kH4rmRq7cGFIqkjlt6vNsr0m8ferF2YuNMyc',
    badge: {
      icon: 'grid_4x4',
      label: 'BIM Model',
    },
    cta: {
      label: 'View Tekla Projects',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'sketchup',
    name: 'SketchUp',
    category: 'Concept',
    categoryIcon: Pencil,
    description:
      'Conceptual agility for rapid form exploration. SketchUp allows us to quickly iterate on volumetrics and masses, transforming abstract ideas into tangible 3D concepts in record time.',
    features: [
      {
        title: 'Rapid Prototyping',
        description: 'Fast iteration of volumetric concepts.',
      },
      {
        title: 'Mass Studies',
        description: 'Clear visualization of scale and proportion.',
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2MRWFQSPOXzX-Czs3EMTaiLVPvCrbmTxYgASenGM10eYb5eWzL-jYqRsOrkkEqZRUbgGWPBE3ZsAsCRihlqeiuZmxJ8pe905FAhYJ_0lYti4kBMZc2te4mIImiW-Wm7diHKew8qqkS3xN8oxKS16yZtzJpQp4h9kgu1-TAcnAogs8w5fr8dJqMqDY2Hpzg4WoNhKKFKEbRIJjaRm9xFjfeeJ1g9mXe3HjSZTCGY8eo3mcMNXCeKXhlJrqp8iTCqXISXrv4VUxab4',
    badge: {
      icon: 'draw',
      label: 'Sketch Mode',
    },
    cta: {
      label: 'View SketchUp Projects',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'blender',
    name: 'Blender',
    category: 'Animation',
    categoryIcon: Clapperboard,
    description:
      'Cinematic storytelling without limits. With Blender, we create fluid animations and photorealistic renderings of high complexity. It is the tool where physics meets art to tell your project\'s story.',
    features: [],
    tags: ['VFX & Particles', 'Soft Body Physics', 'Cycles Rendering'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbhQTeOglLvDoilty3V0JhnIvwARx55QzJqnPFEjmjI_XLQeSO4dYWNFAqRJAn-d4UBLU2OgPvqiST48_NJklQEX5BMr9LZ1VMq-s58TJd-7dYvHYiVJDI8GhYWssbbHmBl_TCMVgSlCfJivZXol0IoJiZ3xp5njvwmqcRjvQrDP8YPScERkeoMvPFqY2xEZpjSu8BFN1WfsMzOpjEoRtW0l7Y7NipmwYEG5pWZ573j44OYjWFBerKNynFzWB88tLkYeATYjZyNWo',
    badge: {
      icon: 'play_arrow',
      label: 'Animation',
    },
    cta: {
      label: 'View Showreel',
      icon: 'play_circle',
    },
  },
  {
    id: 'autocad',
    name: 'AutoCAD',
    category: 'Documentation',
    categoryIcon: FileText,
    description:
      'The foundation of technical precision. We use AutoCAD for rigorous development of floor plans, sections, and technical details that serve as the solid base for all subsequent 3D modeling. Geometric accuracy in its purest form.',
    features: [
      {
        title: 'Layer Management',
        description: 'Complex organization for efficient workflows.',
        icon: Layers,
      },
      {
        title: 'Technical Drawing',
        description: 'Millimetric precision in 2D documentation.',
        icon: Ruler,
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCyG3G6mzB8pRDe0iYtOn4BrFZ3pSZEwlvSstqktt-s0mdaqGS4zsJ3W3r8k4FT-mtnJhS8NYEMCTKNU6vlVJXS0L__nGw4sxLhqBTSxXD0lnQ13jRqmf_sQgLBU4kgHNmVvz2adA1riayoCzUHzCByUZnDTCaVmdwEituTWxZba7swnMuGUp3rDkbLwbDih7uxEmUIogr_V2wiRb5kgxXudaTXZgCNHnKBSwYHFe0dFiLFpfk4fn3mk-8vufCYRnqahkx6TwgauCY',
    badge: {
      icon: 'architecture',
      label: 'CAD Drawing',
    },
    cta: {
      label: 'View Details',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'premiere',
    name: 'Adobe Premiere',
    category: 'Post-Production',
    categoryIcon: Film,
    description:
      'The final art of storytelling. In Premiere, we stitch each rendered frame to create a cohesive story. This is where the magic of editing, rhythm, and color correction transform image sequences into captivating films.',
    features: [
      {
        title: 'Color Grading',
        description: 'Cinematic aesthetics and mood.',
        icon: Palette,
      },
      {
        title: 'Sound Design',
        description: 'Complete auditory immersion.',
        icon: Volume2,
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNE1zZUi11jKz6avzJM-tXFlHzWLKtC2a6iogxPKEvNZwHfWkJpWSVg5JuTrDpKraT2Jh0F3dP9NKTKDYGUJYhm8pqWYt69G30hXMmwq6FKS6EU0RsqCXrBEeOHuMzZkhiLA5hR0RxsIdeWrSEsYzDy6s59CTxQipm8wQV4lYGRRUJjGOegKmH7E4Enr_A5VsdPr56DWH7YeJgM7QicfwuhomgOds8KaZ7vVBuK97jv66DI04TutyE-g9Yev3xbcMbX7keSbZzqms',
    badge: {
      icon: 'movie_edit',
      label: 'Post-Production',
    },
    cta: {
      label: 'View Edits',
      icon: 'arrow_forward',
    },
  },
  {
    id: 'lumion',
    name: 'Lumion',
    category: 'Visualization',
    categoryIcon: Mountain,
    description:
      'Instant beauty and vibrant atmospheres. Lumion allows us to translate complex models into stunning images and videos with unmatched speed, focusing on vegetation, life, and surroundings to contextualize architecture in its natural habitat.',
    features: [
      {
        title: 'Rich Environment',
        description: 'Vast libraries of nature and people.',
      },
      {
        title: 'Ultra-Fast Rendering',
        description: 'Agility for short-term deliveries.',
      },
    ],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAujUpQxcLLmmSD3tML62dp9SP3x1ejDdO33C8OgPOqKkGHV4Qza_xoMCn_TFgH8w2u8m0JDqsx-qSQc_iivXPNKpZNsn_tbBqwXTQRLuwlavDPFRo0XwanLYjsAQw5RzC6JkHbQIbsUCNHcJd1Ga0H82aEgJgzX1ajHnU_7I86B3LsJFcPqZFh_7zzSnFdfjMX0ToR7ISJy4fmS_miMlfYzvyJvc0OcxVBbw-Q3IcYOCkeZjNCy0cPuxRVarusO4suzkwGkwh4w-4',
    badge: {
      icon: 'filter_hdr',
      label: 'High Quality Render',
    },
    cta: {
      label: 'View Lumion Projects',
      icon: 'arrow_forward',
    },
  },
]

// ============================================
// TOOLS DATA REGISTRY
// ============================================

const toolsDataRegistry: Record<SupportedLocale, Array<Tool>> = {
  pt: toolsPt,
  en: toolsEn,
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all tools for a specific locale
 */
export const getTools = (locale: SupportedLocale = 'pt'): Array<Tool> => {
  return toolsDataRegistry[locale]
}

/**
 * Get tool by ID for a specific locale
 */
export const getToolById = (id: string, locale: SupportedLocale = 'pt'): Tool | undefined => {
  const toolsList = getTools(locale)
  return toolsList.find((t) => t.id === id)
}

// ============================================
// DEFAULT EXPORT (uses current i18n language)
// ============================================

const lang = (i18n.language.split('-')[0] || 'pt') as SupportedLocale
export const tools: Array<Tool> = getTools(lang)
