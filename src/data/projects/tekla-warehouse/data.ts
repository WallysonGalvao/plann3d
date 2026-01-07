// Tekla Warehouse images
import type { Project, ProjectDataByLocale } from '@/types/project'

import teklaWarehouse1 from '@/data/projects/tekla-warehouse/TEKLA-WAREHOUSE1.png'
import teklaWarehouse2 from '@/data/projects/tekla-warehouse/TEKLA-WAREHOUSE2.png'
import teklaWarehouse3 from '@/data/projects/tekla-warehouse/TEKLA-WAREHOUSE3.png'

// Base data for PT locale
const ptData: Project = {
  id: 'tekla-warehouse',
  title: 'Galpão Industrial',
  category: 'commercial',
  location: 'Brasília, DF',
  description:
    'Estudo técnico de modelagem estrutural BIM utilizando Tekla Structures para detalhamento de galpão industrial metálico.',
  size: 'standard',

  subtitle: 'GALPÃO INDUSTRIAL',
  tagline: 'Estudo Técnico BIM',
  quote: 'Explorando a precisão da modelagem BIM estrutural para projetos de galpões metálicos.',
  image: teklaWarehouse3,
  heroImage: teklaWarehouse3,
  phases: [
    {
      label: 'Modelagem BIM',
      title: 'Estrutura Industrial',
      description:
        'Estudo de modelagem estrutural desenvolvido no Tekla Structures, explorando técnicas avançadas de detalhamento BIM para estruturas metálicas industriais. Este projeto técnico focou no desenvolvimento de pórticos, treliças, terças e detalhamento completo de um galpão industrial.',
      badge: 'Modelagem BIM',
      image: teklaWarehouse1,
      stats: [
        { value: '2026', label: 'Ano do Estudo' },
        { value: 'BIM', label: 'Metodologia' },
      ],
    },
    {
      label: 'Detalhamento',
      title: 'Componentes Estruturais',
      description:
        'Aplicação de técnicas de detalhamento estrutural, explorando conexões, contraventamentos e todos os componentes necessários para a fabricação e montagem da estrutura metálica do galpão.',
      images: [teklaWarehouse1, teklaWarehouse2, teklaWarehouse3],
    },
  ],
  specs: {
    year: '2026',
    location: 'Brasília, DF',
    client: 'Estudo Técnico',
    status: 'Concluído',
  },
  tools: [
    {
      name: 'Tekla Structures',
      icon: 'precision_manufacturing',
      description: 'Modelagem BIM estrutural e detalhamento de galpões industriais.',
    },
  ],
} satisfies Project

// Base data for EN locale
const enData: Project = {
  id: 'tekla-warehouse',
  title: 'Industrial Warehouse',
  category: 'commercial',
  location: 'Brasília, DF',
  description:
    'Technical study of BIM structural modeling using Tekla Structures for industrial warehouse detailing.',
  size: 'standard',

  subtitle: 'INDUSTRIAL WAREHOUSE',
  tagline: 'BIM Technical Study',
  quote: 'Exploring the precision of structural BIM modeling for industrial warehouse projects.',
  image: teklaWarehouse3,
  heroImage: teklaWarehouse3,
  phases: [
    {
      label: 'BIM Modeling',
      title: 'Industrial Structure',
      description:
        'Structural modeling study developed in Tekla Structures, exploring advanced BIM detailing techniques for industrial steel structures. This technical project focused on developing portal frames, trusses, purlins, and complete detailing of an industrial warehouse.',
      badge: 'BIM Modeling',
      image: teklaWarehouse1,
      stats: [
        { value: '2026', label: 'Study Year' },
        { value: 'BIM', label: 'Methodology' },
      ],
    },
    {
      label: 'Detailing',
      title: 'Structural Components',
      description:
        'Application of structural detailing techniques, exploring connections, bracing, and all components necessary for the fabrication and assembly of the warehouse steel structure.',
      images: [teklaWarehouse1, teklaWarehouse2, teklaWarehouse3],
    },
  ],
  specs: {
    year: '2026',
    location: 'Brasília, DF',
    client: 'Technical Study',
    status: 'Completed',
  },
  tools: [
    {
      name: 'Tekla Structures',
      icon: 'precision_manufacturing',
      description: 'BIM structural modeling and industrial warehouse detailing.',
    },
  ],
} satisfies Project

// Export data by locale
export const teklaWarehouseData: ProjectDataByLocale = {
  pt: ptData,
  en: enData,
}

// Export project ID for reference
export const PROJECT_ID = 'tekla-warehouse'
