// Área Gourmet images
import type { Project, ProjectDataByLocale } from '@/types/project'

import areaGourmetSketchup from '@/data/projects/area-gourmet/SKT.png'
import areaGourmetTwin1 from '@/data/projects/area-gourmet/TWIN1.png'
import areaGourmetTwin2 from '@/data/projects/area-gourmet/TWIN2.png'
import areaGourmetTwin3 from '@/data/projects/area-gourmet/TWIN3.png'

const MODEL_3D: Project['model3d'] = {
  src: '/models/area-gourmet/model.glb',
  thumbnail: areaGourmetTwin1,
  cameraPosition: [30, 25, 30],
  scale: 1,
  autoRotate: true,
  lod: {
    low: '/models/area-gourmet/low.glb',
    medium: '/models/area-gourmet/medium.glb',
    high: '/models/area-gourmet/high.glb',
  },
}

// Base data for PT locale
const ptData: Project = {
  id: 'area-gourmet',
  title: 'Área Gourmet',
  category: 'interiors',
  location: 'Brasília, DF',
  description:
    'Espaço gourmet sofisticado com integração entre churrasqueira, bar e área de convivência.',
  size: 'standard',

  subtitle: 'ÁREA GOURMET',
  tagline: 'Projeto Residencial',
  quote:
    'Um espaço onde a gastronomia encontra o conforto, criando momentos memoráveis em família.',
  image: areaGourmetTwin1,
  heroImage: areaGourmetTwin1,
  phases: [
    {
      label: 'O Conceito',
      title: 'Integração e Funcionalidade',
      description:
        'O projeto da área gourmet foi desenvolvido para criar um ambiente acolhedor e funcional. A integração entre os espaços de preparo, convivência e lazer proporciona uma experiência completa para receber amigos e família.',
      badge: 'Modelagem 3D',
      image: areaGourmetSketchup,
      stats: [
        { value: '45m²', label: 'Área Total' },
        { value: '100%', label: 'Integrado' },
      ],
    },
    {
      label: 'O Ambiente',
      title: 'Sofisticação e Conforto',
      description:
        'Materiais nobres e iluminação cuidadosamente planejada criam uma atmosfera acolhedora. O design contemporâneo dialoga com elementos rústicos, resultando em um espaço único.',
      images: [areaGourmetTwin1, areaGourmetTwin2, areaGourmetTwin3],
    },
    {
      label: 'A Experiência',
      title: 'Tour Virtual',
      description:
        'Assista ao tour completo pelo espaço gourmet, explorando cada detalhe do ambiente que foi pensado para momentos especiais.',
      videoImage: areaGourmetTwin1,
      video: 'https://www.youtube.com/watch?v=eN9J57qO-GU',
    },
  ],
  specs: {
    year: '2025',
    location: '26 de Setembro, Brasília',
    client: 'Alison',
    status: 'Concluído',
  },
  model3d: MODEL_3D,
  tools: [
    {
      name: 'SketchUp',
      icon: 'architecture',
      description: 'Modelagem 3D e estudos de layout espacial.',
    },
    {
      name: 'Twinmotion',
      icon: 'camera_enhance',
      description: 'Renderização fotorrealista e iluminação ambiente.',
    },
  ],
} satisfies Project

// Base data for EN locale
const enData: Project = {
  id: 'area-gourmet',
  title: 'Gourmet Area',
  category: 'interiors',
  location: 'Brasília, DF',
  description:
    'Sophisticated gourmet space with integration between barbecue, bar, and living area.',
  size: 'standard',

  subtitle: 'GOURMET AREA',
  tagline: 'Residential Project',
  quote: 'A space where gastronomy meets comfort, creating memorable family moments.',
  image: areaGourmetTwin1,
  heroImage: areaGourmetTwin1,
  phases: [
    {
      label: 'The Concept',
      title: 'Integration and Functionality',
      description:
        'The gourmet area project was developed to create a welcoming and functional environment. The integration between preparation, living, and leisure spaces provides a complete experience for hosting friends and family.',
      badge: '3D Modeling',
      image: areaGourmetSketchup,
      stats: [
        { value: '45m²', label: 'Total Area' },
        { value: '100%', label: 'Integrated' },
      ],
    },
    {
      label: 'The Atmosphere',
      title: 'Sophistication and Comfort',
      description:
        'Noble materials and carefully planned lighting create a cozy atmosphere. The contemporary design dialogues with rustic elements, resulting in a unique space.',
      images: [areaGourmetTwin1, areaGourmetTwin2, areaGourmetTwin3],
    },
    {
      label: 'The Experience',
      title: 'Virtual Tour',
      description:
        'Watch the complete tour through the gourmet space, exploring every detail of the environment designed for special moments.',
      videoImage: areaGourmetTwin1,
      video: 'https://www.youtube.com/watch?v=eN9J57qO-GU',
    },
  ],
  specs: {
    year: '2025',
    location: '26 de Setembro, Brasília',
    client: 'Alison',
    status: 'Completed',
  },
  model3d: MODEL_3D,
  tools: [
    {
      name: 'SketchUp',
      icon: 'architecture',
      description: '3D modeling and spatial layout studies.',
    },
    {
      name: 'Twinmotion',
      icon: 'camera_enhance',
      description: 'Photorealistic rendering and ambient lighting.',
    },
  ],
} satisfies Project

// Export data by locale
export const areaGourmetData: ProjectDataByLocale = {
  pt: ptData,
  en: enData,
}

// Export project ID for reference
export const PROJECT_ID = 'area-gourmet'
