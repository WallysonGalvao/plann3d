/**
 * Centralized FAQ data with i18n support
 */

import type { SupportedLocale } from '@/types/project'

import i18n from '@/i18n'

export type FaqCategory = 'all' | 'visualization' | 'process' | 'pricing' | 'technical'

export interface FaqItem {
  id: string
  question: string
  answer: string
  category: FaqCategory
}

export const faqCategories: Array<{ key: FaqCategory; labelKey: string }> = [
  { key: 'all', labelKey: 'faqPage.filters.all' },
  { key: 'visualization', labelKey: 'faqPage.filters.visualization' },
  { key: 'process', labelKey: 'faqPage.filters.process' },
  { key: 'pricing', labelKey: 'faqPage.filters.pricing' },
  { key: 'technical', labelKey: 'faqPage.filters.technical' },
]

// ============================================
// FAQ DATA BY LOCALE
// ============================================

const faqItemsPt: Array<FaqItem> = [
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

const faqItemsEn: Array<FaqItem> = [
  {
    id: '1',
    question: 'What is the average delivery time for a project?',
    answer:
      'The timeline depends on the project complexity. Generally, static images (renders) take 5 to 10 business days, while complete 3D animations can take 2 to 4 weeks. We provide a detailed schedule at the beginning of each collaboration to ensure your expectations are met.',
    category: 'process',
  },
  {
    id: '2',
    question: 'What files do I need to send to get started?',
    answer:
      'To ensure the best fidelity, we prefer 3D files (SketchUp, Revit, Archicad, 3ds Max) or complete 2D CAD drawings. We also request material references, moodboards, and lighting specifications to capture the desired atmosphere.',
    category: 'technical',
  },
  {
    id: '3',
    question: 'Do you create cinematic 3D animations?',
    answer:
      'Yes, our specialty is creating impactful visual narratives. We develop scripts, storyboards, and high-quality animations that highlight the strengths of your development, focusing on storytelling and emotion.',
    category: 'visualization',
  },
  {
    id: '4',
    question: 'How does the review process work?',
    answer:
      'We work with a staged review system (white preview, materials preview, final render). Typically, we include 2 to 3 review rounds at each stage to ensure every detail is perfect before final delivery.',
    category: 'process',
  },
  {
    id: '5',
    question: 'Do you serve international clients?',
    answer:
      'Absolutely. Plann3d has global experience, working with architects and developers in Europe, North America, and Asia. Our team is fluent in English and accustomed to working across different time zones.',
    category: 'process',
  },
  {
    id: '6',
    question: 'What is the final format of delivered files?',
    answer:
      'We deliver high-resolution images (4K or higher) in JPG, PNG, or TIFF formats. For animations, we deliver in MP4 (H.264) or MOV (ProRes) in 1080p or 4K, depending on client needs for web or large screen presentation.',
    category: 'technical',
  },
  {
    id: '7',
    question: 'What is the cost of a visualization project?',
    answer:
      'Pricing varies based on project complexity and scope. Static images start from R$ 800, while cinematic animations are quoted individually. Contact us for a personalized quote.',
    category: 'pricing',
  },
  {
    id: '8',
    question: 'What rendering style do you work with?',
    answer:
      'We specialize in photorealistic rendering with a focus on atmosphere and emotion. We use natural lighting, high-quality materials, and cinematic post-production techniques to create images that tell stories.',
    category: 'visualization',
  },
]

// ============================================
// FAQ DATA REGISTRY
// ============================================

const faqDataRegistry: Record<SupportedLocale, Array<FaqItem>> = {
  pt: faqItemsPt,
  en: faqItemsEn,
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all FAQs for a specific locale
 */
export const getFaqs = (locale: SupportedLocale = 'pt'): Array<FaqItem> => {
  return faqDataRegistry[locale]
}

/**
 * Get FAQs filtered by category
 */
export const getFaqsByCategory = (
  category: FaqCategory,
  locale: SupportedLocale = 'pt',
): Array<FaqItem> => {
  const faqs = getFaqs(locale)
  if (category === 'all') return faqs
  return faqs.filter((faq) => faq.category === category)
}

/**
 * Get FAQ by ID
 */
export const getFaqById = (id: string, locale: SupportedLocale = 'pt'): FaqItem | undefined => {
  const faqs = getFaqs(locale)
  return faqs.find((faq) => faq.id === id)
}

// ============================================
// DEFAULT EXPORT (uses current i18n language)
// ============================================

const lang = (i18n.language.split('-')[0] || 'pt') as SupportedLocale
export const faqItems: Array<FaqItem> = getFaqs(lang)
