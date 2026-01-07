// Project X images
import type { Project, ProjectDataByLocale } from '@/types/project'

import projectXSketchup from '@/data/projects/project-x/SKT.jpg'
import projectXTwinmotion1 from '@/data/projects/project-x/TWIN1.png'
import projectXTwinmotion2 from '@/data/projects/project-x/TWIN2.png'
import projectXTwinmotion3 from '@/data/projects/project-x/TWIN3.png'

const MODEL_3D: Project['model3d'] = {
  src: '/models/project-x/high.glb',
  thumbnail: projectXTwinmotion1,
  cameraPosition: [50, 50, 50],
  scale: 0.001,
  autoRotate: true,
  lod: {
    low: '/models/project-x/low.glb',
    medium: '/models/project-x/medium.glb',
    high: '/models/project-x/high.glb',
  },
}

// Base data for PT locale
const ptData: Project = {
  id: 'project-x',
  title: 'Project X',
  category: 'commercial',
  location: 'Brasília, DF',
  description:
    'Estudo técnico de modelagem 3D e renderização em tempo real utilizando SketchUp e Twinmotion.',
  size: 'standard',

  subtitle: 'PROJECT X',
  tagline: 'Estudo Técnico',
  quote:
    'Explorando as possibilidades de integração entre modelagem arquitetônica e visualização em tempo real.',
  image: projectXTwinmotion1,
  heroImage: projectXTwinmotion1,
  phases: [
    {
      label: 'Modelagem',
      title: 'SketchUp como Base',
      description:
        'Estudo de volumetria e composição arquitetônica desenvolvido no SketchUp, explorando formas contemporâneas e integração espacial. Este projeto técnico serviu para aprimorar técnicas de modelagem e organização de elementos 3D.',
      badge: 'Modelagem 3D',
      image: projectXSketchup,
      stats: [
        { value: '2025', label: 'Ano do Estudo' },
        { value: '100%', label: 'Completo' },
      ],
    },
    {
      label: 'Renderização',
      title: 'Visualização em Tempo Real',
      description:
        'Aplicação de técnicas de renderização em tempo real no Twinmotion, explorando materiais, iluminação e composição de cena para criar visualizações fotorrealistas.',
      images: [projectXTwinmotion2, projectXTwinmotion3],
    },
  ],
  specs: {
    year: '2025',
    location: 'Brasília, DF',
    client: 'Estudo Técnico',
    status: 'Concluído',
  },
  model3d: MODEL_3D,
  tools: [
    {
      name: 'SketchUp',
      icon: 'architecture',
      description: 'Modelagem 3D volumétrica e estudos de massa.',
    },
    {
      name: 'Twinmotion',
      icon: 'view_in_ar',
      description: 'Renderização em tempo real e visualização imersiva.',
    },
  ],
} satisfies Project

// Base data for EN locale
const enData: Project = {
  id: 'project-x',
  title: 'Project X',
  category: 'commercial',
  location: 'Brasília, DF',
  description:
    'Technical study of 3D modeling and real-time rendering using SketchUp and Twinmotion.',
  size: 'standard',

  subtitle: 'PROJECT X',
  tagline: 'Technical Study',
  quote:
    'Exploring the possibilities of integration between architectural modeling and real-time visualization.',
  image: projectXTwinmotion1,
  heroImage: projectXTwinmotion1,
  phases: [
    {
      label: 'Modeling',
      title: 'SketchUp as Foundation',
      description:
        'Volumetric and architectural composition study developed in SketchUp, exploring contemporary forms and spatial integration. This technical project served to improve 3D modeling techniques and element organization.',
      badge: '3D Modeling',
      image: projectXSketchup,
      stats: [
        { value: '2025', label: 'Study Year' },
        { value: '100%', label: 'Complete' },
      ],
    },
    {
      label: 'Rendering',
      title: 'Real-Time Visualization',
      description:
        'Application of real-time rendering techniques in Twinmotion, exploring materials, lighting, and scene composition to create photorealistic visualizations.',
      images: [projectXTwinmotion2, projectXTwinmotion3],
    },
  ],
  specs: {
    year: '2025',
    location: 'Brasília, DF',
    client: 'Technical Study',
    status: 'Completed',
  },
  model3d: MODEL_3D,
  tools: [
    {
      name: 'SketchUp',
      icon: 'architecture',
      description: '3D volumetric modeling and massing studies.',
    },
    {
      name: 'Twinmotion',
      icon: 'view_in_ar',
      description: 'Real-time rendering and immersive visualization.',
    },
  ],
} satisfies Project

// Export data by locale
export const projectXData: ProjectDataByLocale = {
  pt: ptData,
  en: enData,
}

// Export project ID for reference
export const PROJECT_ID = 'project-x'
