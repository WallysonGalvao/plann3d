// JK Shopping Brasília images
import type { Project, ProjectDataByLocale } from '@/types/project'

import jkSketchup from '@/data/projects/jk-shopping/SKT.png'
import jkTwinmotion1 from '@/data/projects/jk-shopping/TWIN1.png'
import jkTwinmotion2 from '@/data/projects/jk-shopping/TWIN2.png'

const MODEL_3D: Project['model3d'] = {
  src: '/models/jk-shopping/high.glb',
  thumbnail: jkTwinmotion2,
  cameraPosition: [50, 50, 50],
  scale: 0.01,
  autoRotate: true,
  lod: {
    low: '/models/jk-shopping/low.glb',
    medium: '/models/jk-shopping/medium.glb',
    high: '/models/jk-shopping/high.glb',
  },
}

// Base data for PT locale
const ptData: Project = {
  id: 'jk-shopping',
  title: 'JK Shopping Brasília',
  category: 'commercial',
  location: 'Brasília, DF',
  description:
    'Complexo comercial gigantesco com shopping center, torre de escritórios e sistema de segurança de ponta.',
  size: 'tall',

  subtitle: 'JK SHOPPING',
  tagline: 'Projeto Comercial',
  quote:
    'A arquitetura comercial deve ser um ecossistema completo, integrando comércio, trabalho e convivência em um único espaço grandioso.',
  image: jkTwinmotion2,
  heroImage: jkTwinmotion2,
  phases: [
    {
      label: 'O Complexo',
      title: 'Uma Cidade Dentro da Cidade',
      description:
        'O JK Shopping Brasília é mais do que um centro comercial – é um verdadeiro marco arquitetônico que reúne shopping center, torre de escritórios e 5 pavimentos de garagem. A imponência do projeto reflete a grandiosidade da capital federal.',
      badge: 'Complexo Comercial',
      image: jkSketchup,
      stats: [
        { value: '5', label: 'Pavimentos de Garagem' },
        { value: '360°', label: 'Segurança Integrada' },
      ],
    },
    {
      label: 'A Integração',
      title: 'Comércio e Negócios em Harmonia',
      description:
        'A torre de escritórios e o shopping center coexistem em perfeita harmonia, oferecendo uma experiência integrada para visitantes e profissionais. O design moderno favorece a circulação e a conectividade entre os espaços.',
      images: [jkTwinmotion1, jkTwinmotion2],
    },
    {
      label: 'A Experiência',
      title: 'Segurança e Conforto Premium',
      description:
        'Com um sistema de segurança de ponta, o JK Shopping proporciona tranquilidade total aos seus visitantes. Cada detalhe foi pensado para oferecer uma experiência premium de compras e lazer.',
      videoImage: jkTwinmotion2,
      video: 'https://www.youtube.com/watch?v=xiq5k4ehztU',
    },
  ],
  specs: {
    year: '2025',
    location: 'Brasília, DF',
    client: 'JK Shopping',
    status: 'Em Desenvolvimento',
  },
  model3d: MODEL_3D,
  tools: [
    {
      name: 'SketchUp',
      icon: 'architecture',
      description: 'Modelagem 3D volumétrica e estudos de massa.',
    },
    {
      name: 'Blender',
      icon: 'view_in_ar',
      description: 'Renderização avançada, iluminação e texturização realista.',
    },
    {
      name: 'Adobe Premiere',
      icon: 'movie_edit',
      description: 'Edição, color grading e pós-produção cinematográfica.',
    },
    {
      name: 'Tekla',
      icon: 'foundation',
      description: 'Modelagem de alta precisão e detalhes estruturais.',
    },
  ],
} satisfies Project

// Base data for EN locale
const enData = {
  id: 'jk-shopping',
  title: 'JK Shopping Brasília',
  category: 'commercial',
  location: 'Brasília, DF',
  description:
    'Massive commercial complex featuring a shopping center, office tower, and state-of-the-art security system.',
  size: 'large',

  subtitle: 'JK SHOPPING',
  tagline: 'Commercial Project',
  quote:
    'Commercial architecture should be a complete ecosystem, integrating commerce, work, and social life into a single grand space.',
  image: jkTwinmotion2,
  heroImage: jkTwinmotion2,
  phases: [
    {
      label: 'The Complex',
      title: 'A City Within a City',
      description:
        "JK Shopping Brasília is more than a shopping center – it's a true architectural landmark that brings together a shopping mall, office tower, and 5 parking floors. The imposing design reflects the grandeur of Brazil's capital.",
      badge: 'Commercial Complex',
      image: jkSketchup,
      stats: [
        { value: '5', label: 'Parking Floors' },
        { value: '360°', label: 'Integrated Security' },
      ],
    },
    {
      label: 'The Integration',
      title: 'Commerce and Business in Harmony',
      description:
        'The office tower and shopping center coexist in perfect harmony, offering an integrated experience for visitors and professionals alike. The modern design favors circulation and connectivity between spaces.',
      images: [jkTwinmotion1, jkTwinmotion2],
    },
    {
      label: 'The Experience',
      title: 'Premium Security and Comfort',
      description:
        'With a state-of-the-art security system, JK Shopping provides complete peace of mind to its visitors. Every detail has been designed to deliver a premium shopping and leisure experience.',
      videoImage: jkTwinmotion2,
      video: 'https://www.youtube.com/watch?v=xiq5k4ehztU',
    },
  ],
  specs: {
    year: '2025',
    location: 'Brasília, DF',
    client: 'JK Shopping',
    status: 'In Development',
  },
  model3d: MODEL_3D,
  tools: [
    {
      name: 'SketchUp',
      icon: 'architecture',
      description: '3D volumetric modeling and massing studies.',
    },
    {
      name: 'Blender',
      icon: 'view_in_ar',
      description: 'Advanced rendering, lighting, and realistic texturing.',
    },
    {
      name: 'Adobe Premiere',
      icon: 'movie_edit',
      description: 'Editing, color grading, and cinematic post-production.',
    },
    {
      name: 'Tekla',
      icon: 'foundation',
      description: 'High-precision modeling and structural detailing.',
    },
  ],
} satisfies Project

// Export data by locale
export const jkShoppingData: ProjectDataByLocale = {
  pt: ptData,
  en: enData,
}

// Export project ID for reference
export const PROJECT_ID = 'jk-shopping'
