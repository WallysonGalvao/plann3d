// Tekla Stairs images
import type { Project, ProjectDataByLocale } from '@/types/project'

import teklaStairs1 from '@/data/projects/tekla-stairs/TEKLA1.png'
import teklaStairs2 from '@/data/projects/tekla-stairs/TEKLA2.png'
import teklaStairs3 from '@/data/projects/tekla-stairs/TEKLA3.png'
import teklaStairs4 from '@/data/projects/tekla-stairs/TEKLA4.png'

// Base data for PT locale
const ptData: Project = {
  id: 'tekla-stairs',
  title: 'Escada Metálica',
  category: 'commercial',
  location: 'Brasília, DF',
  description:
    'Estudo técnico de modelagem estrutural BIM utilizando Tekla Structures para detalhamento de escada metálica.',
  size: 'standard',

  subtitle: 'ESCADA METÁLICA',
  tagline: 'Estudo Técnico BIM',
  quote: 'Explorando a precisão da modelagem BIM estrutural para projetos metálicos detalhados.',
  image: teklaStairs4,
  heroImage: teklaStairs4,
  phases: [
    {
      label: 'Modelagem BIM',
      title: 'Precisão Estrutural',
      description:
        'Estudo de modelagem estrutural desenvolvido no Tekla Structures, explorando técnicas avançadas de detalhamento BIM para estruturas metálicas. Este projeto técnico focou no desenvolvimento de conexões, chapas de ligação e detalhamento de componentes estruturais de uma escada metálica.',
      badge: 'Modelagem BIM',
      image: teklaStairs1,
      stats: [
        { value: '2026', label: 'Ano do Estudo' },
        { value: 'BIM', label: 'Metodologia' },
      ],
    },
    {
      label: 'Detalhamento',
      title: 'Componentes Estruturais',
      description:
        'Aplicação de técnicas de detalhamento estrutural, explorando conexões parafusadas, soldadas e todos os componentes necessários para a fabricação e montagem da estrutura metálica.',
      images: [teklaStairs2, teklaStairs3, teklaStairs4],
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
      description: 'Modelagem BIM estrutural e detalhamento de conexões metálicas.',
    },
  ],

  // BIM Viewer configuration (IFC + PDF)
  bimViewer: {
    ifcUrl: '/models/tekla-stairs/model.ifc',
    pdfUrl: '/models/tekla-stairs/construction-drawings.pdf',
  },
} satisfies Project

// Base data for EN locale
const enData: Project = {
  id: 'tekla-stairs',
  title: 'Steel Staircase',
  category: 'commercial',
  location: 'Brasília, DF',
  description:
    'Technical study of BIM structural modeling using Tekla Structures for steel staircase detailing.',
  size: 'standard',

  subtitle: 'STEEL STAIRCASE',
  tagline: 'BIM Technical Study',
  quote: 'Exploring the precision of structural BIM modeling for detailed steel projects.',
  image: teklaStairs4,
  heroImage: teklaStairs4,
  phases: [
    {
      label: 'BIM Modeling',
      title: 'Structural Precision',
      description:
        'Structural modeling study developed in Tekla Structures, exploring advanced BIM detailing techniques for steel structures. This technical project focused on developing connections, connection plates, and detailing structural components of a steel staircase.',
      badge: 'BIM Modeling',
      image: teklaStairs1,
      stats: [
        { value: '2026', label: 'Study Year' },
        { value: 'BIM', label: 'Methodology' },
      ],
    },
    {
      label: 'Detailing',
      title: 'Structural Components',
      description:
        'Application of structural detailing techniques, exploring bolted and welded connections and all components necessary for the fabrication and assembly of the steel structure.',
      images: [teklaStairs2, teklaStairs3, teklaStairs4],
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
      description: 'BIM structural modeling and steel connection detailing.',
    },
  ],

  // BIM Viewer configuration (IFC + PDF)
  bimViewer: {
    ifcUrl: '/models/tekla-stairs/model.ifc',
    pdfUrl: '/models/tekla-stairs/construction-drawings.pdf',
  },
} satisfies Project

// Export data by locale
export const teklaStairsData: ProjectDataByLocale = {
  pt: ptData,
  en: enData,
}

// Export project ID for reference
export const PROJECT_ID = 'tekla-stairs'
