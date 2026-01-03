/**
 * Centralized tools data - Software and technologies used by PLANN3D
 */

import {
  Clapperboard,
  Compass,
  Lightbulb,
  Pencil,
  Building2,
  Layers,
  type LucideIcon,
} from 'lucide-react'

export interface Tool {
  id: string
  name: string
  category: string
  categoryIcon: LucideIcon
  description: string
  features: {
    title: string
    description: string
    icon?: LucideIcon
  }[]
  tags?: string[]
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

export const tools: Tool[] = [
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
]

export const getToolById = (id: string): Tool | undefined => {
  return tools.find((t) => t.id === id)
}
