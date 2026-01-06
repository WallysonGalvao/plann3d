// Arena BSB images
import type { Project, ProjectDataByLocale } from '@/types/project'

import arenaBsbSketchup from '@/data/projects/arena-bsb/SKT.jpg'
import arenaBsbTwin1 from '@/data/projects/arena-bsb/TWIN1.png'
import arenaBsbTwin2 from '@/data/projects/arena-bsb/TWIN2.png'
import arenaBsbTwin3 from '@/data/projects/arena-bsb/TWIN3.png'

// Base data for PT locale
const ptData: Project = {
  id: 'arena-bsb',
  title: 'Arena BSB',
  category: 'commercial',
  location: 'Brasília, DF',
  description: 'Arena multiuso com capacidade para grandes eventos e shows na capital federal.',
  size: 'large',

  subtitle: 'ARENA BSB',
  tagline: 'Projeto Comercial',
  quote:
    'Um palco grandioso para os maiores espetáculos de Brasília, unindo arquitetura e entretenimento.',
  image: arenaBsbTwin1,
  heroImage: arenaBsbTwin1,
  phases: [
    {
      label: 'O Projeto',
      title: 'Grandiosidade e Escala',
      description:
        'A Arena BSB foi projetada para ser um marco no cenário de eventos da capital. Com arquitetura moderna e infraestrutura de ponta, o espaço oferece versatilidade para receber desde shows até eventos corporativos de grande porte.',
      badge: 'Modelagem Estrutural',
      image: arenaBsbSketchup,
      stats: [
        { value: '10k+', label: 'Capacidade' },
        { value: '360°', label: 'Visibilidade' },
      ],
    },
    {
      label: 'A Experiência',
      title: 'Imersão Total',
      description:
        'Cada detalhe foi pensado para proporcionar uma experiência imersiva ao público. Acústica premium, iluminação cênica e conforto térmico garantem eventos memoráveis.',
      images: [arenaBsbTwin1, arenaBsbTwin2, arenaBsbTwin3],
    },
    {
      label: 'O Espetáculo',
      title: 'Visualização em Movimento',
      description:
        'Confira a animação que apresenta a arena em toda sua grandiosidade, simulando a experiência de um grande evento na capital.',
      videoImage: arenaBsbTwin1,
      video: 'https://www.youtube.com/watch?v=6HiHp3dYJ_Q',
    },
  ],
  specs: {
    year: '2025',
    location: 'Brasília, DF',
    client: 'Incendiários',
    status: 'Concluído',
  },
  model3d: {
    src: '/models/arena-bsb/model.glb',
    thumbnail: arenaBsbTwin1,
    cameraPosition: [80, 60, 80],
    scale: 1,
    autoRotate: true,
  },
  tools: [
    {
      name: 'SketchUp',
      icon: 'architecture',
      description: 'Modelagem 3D volumétrica e estudos de massa.',
    },
    {
      name: 'Twinmotion',
      icon: 'camera_enhance',
      description: 'Renderização fotorrealista e simulação de iluminação cênica.',
    },
  ],
} satisfies Project

// Base data for EN locale
const enData: Project = {
  id: 'arena-bsb',
  title: 'Arena BSB',
  category: 'commercial',
  location: 'Brasília, DF',
  description:
    'Multi-purpose arena with capacity for large events and shows in the federal capital.',
  size: 'large',

  subtitle: 'ARENA BSB',
  tagline: 'Commercial Project',
  quote: 'A grand stage for the biggest shows in Brasília, uniting architecture and entertainment.',
  image: arenaBsbTwin1,
  heroImage: arenaBsbTwin1,
  phases: [
    {
      label: 'The Project',
      title: 'Grandiosity and Scale',
      description:
        "Arena BSB was designed to be a landmark in the capital's events scene. With modern architecture and cutting-edge infrastructure, the space offers versatility to host everything from concerts to large corporate events.",
      badge: 'Structural Modeling',
      image: arenaBsbSketchup,
      stats: [
        { value: '10k+', label: 'Capacity' },
        { value: '360°', label: 'Visibility' },
      ],
    },
    {
      label: 'The Experience',
      title: 'Total Immersion',
      description:
        'Every detail was designed to provide an immersive experience for the audience. Premium acoustics, scenic lighting, and thermal comfort ensure memorable events.',
      images: [arenaBsbTwin1, arenaBsbTwin2, arenaBsbTwin3],
    },
    {
      label: 'The Spectacle',
      title: 'Visualization in Motion',
      description:
        'Watch the animation that showcases the arena in all its grandeur, simulating the experience of a major event in the capital.',
      videoImage: arenaBsbTwin1,
      video: 'https://www.youtube.com/watch?v=6HiHp3dYJ_Q',
    },
  ],
  specs: {
    year: '2025',
    location: 'Brasília, DF',
    client: 'Incendiários',
    status: 'Completed',
  },
  model3d: {
    src: '/models/arena-bsb/model.glb',
    thumbnail: arenaBsbTwin1,
    cameraPosition: [80, 60, 80],
    scale: 1,
    autoRotate: true,
  },
  tools: [
    {
      name: 'SketchUp',
      icon: 'architecture',
      description: '3D volumetric modeling and massing studies.',
    },
    {
      name: 'Twinmotion',
      icon: 'camera_enhance',
      description: 'Photorealistic rendering and scenic lighting simulation.',
    },
  ],
} satisfies Project

// Export data by locale
export const arenaBsbData: ProjectDataByLocale = {
  pt: ptData,
  en: enData,
}

// Export project ID for reference
export const PROJECT_ID = 'arena-bsb'
