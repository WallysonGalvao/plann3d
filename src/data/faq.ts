/**
 * Centralized FAQ data
 */

export type FaqCategory = 'all' | 'visualization' | 'process' | 'pricing' | 'technical'

export interface FaqItem {
  id: string
  question: string
  answer: string
  category: FaqCategory
}

export const faqCategories: { key: FaqCategory; labelKey: string }[] = [
  { key: 'all', labelKey: 'faqPage.filters.all' },
  { key: 'visualization', labelKey: 'faqPage.filters.visualization' },
  { key: 'process', labelKey: 'faqPage.filters.process' },
  { key: 'pricing', labelKey: 'faqPage.filters.pricing' },
  { key: 'technical', labelKey: 'faqPage.filters.technical' },
]

export const faqItems: FaqItem[] = [
  {
    id: '1',
    question: 'Qual o prazo médio de entrega para um projeto?',
    answer:
      'O prazo depende da complexidade do projeto. Geralmente, imagens estáticas (renders) levam de 5 a 10 dias úteis, enquanto animações 3D completas podem levar de 2 a 4 semanas. Fornecemos um cronograma detalhado no início de cada colaboração para garantir que suas expectativas sejam atendidas.',
    category: 'process',
  },
  {
    id: '2',
    question: 'Quais arquivos preciso enviar para iniciar?',
    answer:
      'Para garantir a melhor fidelidade, preferimos arquivos 3D (SketchUp, Revit, Archicad, 3ds Max) ou desenhos 2D completos em CAD. Também solicitamos referências de materiais, moodboards e especificações de iluminação para capturar a atmosfera desejada.',
    category: 'technical',
  },
  {
    id: '3',
    question: 'Vocês fazem animações 3D cinemáticas?',
    answer:
      'Sim, nossa especialidade é criar narrativas visuais impactantes. Desenvolvemos roteiros, storyboards e animações de alta qualidade que destacam os pontos fortes do seu empreendimento, focando em storytelling e emoção.',
    category: 'visualization',
  },
  {
    id: '4',
    question: 'Como funciona o processo de revisão?',
    answer:
      'Trabalhamos com um sistema de revisões em etapas (preview branco, prévia de materiais, render final). Normalmente, incluímos 2 a 3 rodadas de revisão em cada etapa para garantir que cada detalhe esteja perfeito antes da entrega final.',
    category: 'process',
  },
  {
    id: '5',
    question: 'Vocês atendem clientes internacionais?',
    answer:
      'Absolutamente. A Plann3d tem experiência global, trabalhando com arquitetos e desenvolvedores na Europa, América do Norte e Ásia. Nossa equipe é fluente em inglês e acostumada a trabalhar com fusos horários variados.',
    category: 'process',
  },
  {
    id: '6',
    question: 'Qual o formato final dos arquivos entregues?',
    answer:
      'Entregamos imagens em alta resolução (4K ou superior) em formatos JPG, PNG ou TIFF. Para animações, entregamos em MP4 (H.264) ou MOV (ProRes) em 1080p ou 4K, conforme a necessidade do cliente para web ou apresentação em tela grande.',
    category: 'technical',
  },
  {
    id: '7',
    question: 'Qual o valor de um projeto de visualização?',
    answer:
      'Os valores variam conforme a complexidade e escopo do projeto. Imagens estáticas começam a partir de R$ 800, enquanto animações cinemáticas são orçadas individualmente. Entre em contato para um orçamento personalizado.',
    category: 'pricing',
  },
  {
    id: '8',
    question: 'Vocês trabalham com qual estilo de renderização?',
    answer:
      'Somos especialistas em renderização fotorrealista com foco em atmosfera e emoção. Utilizamos iluminação natural, materiais de alta qualidade e técnicas de pós-produção cinematográfica para criar imagens que contam histórias.',
    category: 'visualization',
  },
]

export const getFaqsByCategory = (category: FaqCategory): FaqItem[] => {
  if (category === 'all') return faqItems
  return faqItems.filter((faq) => faq.category === category)
}
