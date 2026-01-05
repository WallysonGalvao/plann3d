// Hotel Copacabana - Mock Project
import type { Project, ProjectDataByLocale } from '@/types/project'

// Using placeholder images from project assets
import projectImage2 from '@/assets/project-2.jpg'
import projectImage3 from '@/assets/project-3.jpg'

// Base data for PT locale
const ptData: Project = {
  id: 'hotel-copacabana',
  title: 'Hotel Copacabana Palace',
  category: 'exteriors',
  location: 'Rio de Janeiro, RJ',
  description: 'Renderização exterior de complexo hoteleiro frente-mar.',
  size: 'wide',

  subtitle: 'HOTEL',
  tagline: 'Exterior Render',
  quote: '"A arquitetura costeira deve abraçar o oceano, não competir com ele."',
  image: projectImage3,
  heroImage: projectImage3,
  phases: [
    {
      label: 'O Horizonte',
      title: 'Vista para o Mar',
      description:
        'O projeto explora a relação entre o edifício e o horizonte marítimo. Cada ângulo foi cuidadosamente estudado para maximizar as vistas e criar uma experiência visual única.',
      badge: 'Renderização 3D',
      image: projectImage2,
      stats: [
        { value: '28', label: 'Andares' },
        { value: '180', label: 'Suítes' },
      ],
    },
    {
      label: 'A Atmosfera',
      title: 'Luz do Entardecer',
      description:
        'Capturamos a magia do pôr do sol carioca, onde tons de laranja e rosa pintam a fachada do hotel, criando uma atmosfera romântica e acolhedora.',
      images: [projectImage3, projectImage2],
    },
  ],
  specs: {
    year: '2025',
    location: 'Rio de Janeiro, RJ',
    client: 'Grupo Hoteleiro XYZ',
    status: 'Concluído',
  },
} satisfies Project

// Base data for EN locale
const enData: Project = {
  id: 'hotel-copacabana',
  title: 'Copacabana Palace Hotel',
  category: 'exteriors',
  location: 'Rio de Janeiro, RJ',
  description: 'Exterior rendering of beachfront hotel complex.',
  size: 'wide',

  subtitle: 'HOTEL',
  tagline: 'Exterior Render',
  quote: '"Coastal architecture should embrace the ocean, not compete with it."',
  image: projectImage3,
  heroImage: projectImage3,
  phases: [
    {
      label: 'The Horizon',
      title: 'Ocean View',
      description:
        'The project explores the relationship between the building and the maritime horizon. Every angle was carefully studied to maximize views and create a unique visual experience.',
      badge: '3D Rendering',
      image: projectImage2,
      stats: [
        { value: '28', label: 'Floors' },
        { value: '180', label: 'Suites' },
      ],
    },
    {
      label: 'The Atmosphere',
      title: 'Sunset Light',
      description:
        'We captured the magic of the Rio sunset, where orange and pink tones paint the hotel facade, creating a romantic and welcoming atmosphere.',
      images: [projectImage3, projectImage2],
    },
  ],
  specs: {
    year: '2025',
    location: 'Rio de Janeiro, RJ',
    client: 'XYZ Hotel Group',
    status: 'Completed',
  },
} satisfies Project

// Export data by locale
export const hotelCopacabanaData: ProjectDataByLocale = {
  pt: ptData,
  en: enData,
}

// Export project ID for reference
export const PROJECT_ID = 'hotel-copacabana'
