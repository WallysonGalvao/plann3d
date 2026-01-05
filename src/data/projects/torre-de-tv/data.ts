// Torre de TV images
import type { Project, ProjectDataByLocale } from '@/types/project'

import torreTvSketchup from '@/data/projects/torre-de-tv/01-SKETCHUP.png'
import torreTvTwinmotion1 from '@/data/projects/torre-de-tv/02-TWINMOTION.png'
import torreTvTwinmotion2 from '@/data/projects/torre-de-tv/03-TWINMOTION.png'

// Base data for PT locale
const ptData: Project = {
  id: 'torre-de-tv',
  title: 'Torre de TV de Brasília',
  category: 'exteriors',
  location: 'Brasília, DF',
  description: 'Vista panorâmica de 360 graus do Eixo Monumental.',
  size: 'large',

  subtitle: 'TORRE DE TV',
  tagline: 'Case Study',
  quote:
    '"A arquitetura deve ser um ponto de observação, conectando o visitante à cidade e à sua história através da perspectiva."',
  image: torreTvTwinmotion2,
  heroImage: torreTvTwinmotion2,
  phases: [
    {
      label: 'A Estrutura',
      title: 'A Base da Monumentalidade',
      description:
        'O projeto inicia-se com a concepção estrutural da torre, onde a verticalidade encontra a funcionalidade. Volumes puros definem a relação entre a terra e o céu, criando uma experiência arquitetônica que eleva o observador acima da paisagem urbana de Brasília.',
      badge: 'Modelagem Estrutural',
      image: torreTvSketchup,
      stats: [
        { value: '75m', label: 'Altura' },
        { value: '360°', label: 'Vista Panorâmica' },
      ],
    },
    {
      label: 'A Atmosfera',
      title: 'O Encontro com o Céu',
      description:
        'A torre ganha vida através da luz e do contexto urbano. O Eixo Monumental se revela em toda sua magnitude, com a Praça dos Três Poderes e os marcos arquitetônicos de Brasília compondo uma narrativa visual única.',
      images: [torreTvTwinmotion1, torreTvTwinmotion2],
    },
    {
      label: 'A Vida',
      title: 'O Mirante da Experiência',
      description:
        'Mais do que um ponto turístico, a Torre de TV se transforma em uma experiência sensorial. Visitantes são convidados a contemplar Brasília de uma perspectiva privilegiada.',
      videoImage: torreTvTwinmotion2,
      video: 'https://www.youtube.com/watch?v=K-MFeu4Ma7s',
    },
  ],
  specs: {
    year: '2025',
    location: 'Brasília, DF',
    client: 'M.U.B Produtora',
    status: 'Concluído',
  },
  model3d: {
    src: '/models/torre-de-tv/model-optimized.glb',
    thumbnail: torreTvTwinmotion2,
    cameraPosition: [50, 50, 50],
    scale: 0.01,
    autoRotate: true,
  },
} satisfies Project

// Base data for EN locale
const enData = {
  id: 'torre-de-tv',
  title: 'Brasília TV Tower',
  category: 'exteriors',
  location: 'Brasília, DF',
  description: '360-degree panoramic view of the Monumental Axis.',
  size: 'large',

  subtitle: 'TV TOWER',
  tagline: 'Case Study',
  quote:
    '"Architecture should be an observation point, connecting the visitor to the city and its history through perspective."',
  image: torreTvTwinmotion2,
  heroImage: torreTvTwinmotion2,
  phases: [
    {
      label: 'The Structure',
      title: 'The Foundation of Monumentality',
      description:
        "The project begins with the structural conception of the tower, where verticality meets functionality. Pure volumes define the relationship between earth and sky, creating an architectural experience that elevates the observer above Brasília's urban landscape.",
      badge: 'Structural Modeling',
      image: torreTvSketchup,
      stats: [
        { value: '75m', label: 'Height' },
        { value: '360°', label: 'Panoramic View' },
      ],
    },
    {
      label: 'The Atmosphere',
      title: 'The Meeting with the Sky',
      description:
        "The tower comes alive through light and urban context. The Monumental Axis reveals itself in all its magnitude, with the Three Powers Square and Brasília's architectural landmarks composing a unique visual narrative.",
      images: [torreTvTwinmotion1, torreTvTwinmotion2],
    },
    {
      label: 'The Life',
      title: 'The Experience Viewpoint',
      description:
        'More than a tourist spot, the TV Tower transforms into a sensory experience. Visitors are invited to contemplate Brasília from a privileged perspective.',
      videoImage: torreTvTwinmotion2,
      video: 'https://www.youtube.com/watch?v=K-MFeu4Ma7s',
    },
  ],
  specs: {
    year: '2025',
    location: 'Brasília, DF',
    client: 'M.U.B Produtora',
    status: 'Completed',
  },
  model3d: {
    src: '/models/torre-de-tv/model-optimized.glb',
    thumbnail: torreTvTwinmotion2,
    cameraPosition: [50, 50, 50],
    scale: 0.01,
    autoRotate: true,
  },
} satisfies Project

// Export data by locale
export const torreDeTvData: ProjectDataByLocale = {
  pt: ptData,
  en: enData,
}

// Export project ID for reference
export const PROJECT_ID = 'torre-de-tv'
