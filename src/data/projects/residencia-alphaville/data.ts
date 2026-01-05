// Residência Alphaville - Mock Project
import type { Project, ProjectDataByLocale } from '@/types/project'

// Using placeholder images from project assets
import projectImage1 from '@/assets/project-1.jpg'
import projectImage2 from '@/assets/project-2.jpg'

// Base data for PT locale
const ptData: Project = {
  id: 'residencia-alphaville',
  title: 'Residência Alphaville',
  category: 'interiors',
  location: 'São Paulo, SP',
  description: 'Projeto residencial de alto padrão com integração total entre ambientes.',
  size: 'tall',

  subtitle: 'RESIDÊNCIA',
  tagline: 'Interior Design',
  quote: '"A verdadeira sofisticação está na simplicidade dos materiais e na fluidez dos espaços."',
  image: projectImage1,
  heroImage: projectImage1,
  phases: [
    {
      label: 'O Conceito',
      title: 'Integração Total',
      description:
        'O projeto parte da premissa de que os espaços internos devem dialogar harmoniosamente com o exterior. Grandes aberturas e materiais naturais criam uma atmosfera de conforto e elegância.',
      badge: 'Design de Interiores',
      image: projectImage2,
      stats: [
        { value: '450', label: 'm² de Área' },
        { value: '12', label: 'Ambientes' },
      ],
    },
    {
      label: 'Os Materiais',
      title: 'Texturas e Acabamentos',
      description:
        'Madeira, mármore e vidro se combinam para criar uma paleta sofisticada. Cada material foi escolhido para complementar a luz natural abundante.',
      images: [projectImage1, projectImage2],
    },
  ],
  specs: {
    year: '2025',
    location: 'São Paulo, SP',
    client: 'Cliente Privado',
    status: 'Em Desenvolvimento',
  },
} satisfies Project

// Base data for EN locale
const enData: Project = {
  id: 'residencia-alphaville',
  title: 'Alphaville Residence',
  category: 'interiors',
  location: 'São Paulo, SP',
  description: 'High-end residential project with full integration between spaces.',
  size: 'tall',

  subtitle: 'RESIDENCE',
  tagline: 'Interior Design',
  quote: '"True sophistication lies in the simplicity of materials and the fluidity of spaces."',
  image: projectImage1,
  heroImage: projectImage1,
  phases: [
    {
      label: 'The Concept',
      title: 'Total Integration',
      description:
        'The project is based on the premise that interior spaces should harmoniously dialogue with the exterior. Large openings and natural materials create an atmosphere of comfort and elegance.',
      badge: 'Interior Design',
      image: projectImage2,
      stats: [
        { value: '450', label: 'm² Area' },
        { value: '12', label: 'Rooms' },
      ],
    },
    {
      label: 'The Materials',
      title: 'Textures and Finishes',
      description:
        'Wood, marble, and glass combine to create a sophisticated palette. Each material was chosen to complement the abundant natural light.',
      images: [projectImage1, projectImage2],
    },
  ],
  specs: {
    year: '2025',
    location: 'São Paulo, SP',
    client: 'Private Client',
    status: 'In Development',
  },
} satisfies Project

// Export data by locale
export const residenciaAlphavilleData: ProjectDataByLocale = {
  pt: ptData,
  en: enData,
}

// Export project ID for reference
export const PROJECT_ID = 'residencia-alphaville'
