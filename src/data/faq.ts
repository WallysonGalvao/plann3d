/**
 * Centralized FAQ data structure
 * Translations are managed via i18n (see src/i18n/locales/*.json)
 */

export type FaqCategory = 'all' | 'visualization' | 'process' | 'pricing' | 'technical'

export interface FaqItem {
  id: string
  questionKey: string
  answerKey: string
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
// FAQ DATA (keys reference i18n translations)
// ============================================

export const faqItems: Array<FaqItem> = [
  {
    id: '1',
    questionKey: 'faqPage.items.1.question',
    answerKey: 'faqPage.items.1.answer',
    category: 'process',
  },
  {
    id: '2',
    questionKey: 'faqPage.items.2.question',
    answerKey: 'faqPage.items.2.answer',
    category: 'technical',
  },
  {
    id: '3',
    questionKey: 'faqPage.items.3.question',
    answerKey: 'faqPage.items.3.answer',
    category: 'visualization',
  },
  {
    id: '4',
    questionKey: 'faqPage.items.4.question',
    answerKey: 'faqPage.items.4.answer',
    category: 'process',
  },
  {
    id: '5',
    questionKey: 'faqPage.items.5.question',
    answerKey: 'faqPage.items.5.answer',
    category: 'process',
  },
  {
    id: '6',
    questionKey: 'faqPage.items.6.question',
    answerKey: 'faqPage.items.6.answer',
    category: 'technical',
  },
  {
    id: '7',
    questionKey: 'faqPage.items.7.question',
    answerKey: 'faqPage.items.7.answer',
    category: 'pricing',
  },
  {
    id: '8',
    questionKey: 'faqPage.items.8.question',
    answerKey: 'faqPage.items.8.answer',
    category: 'visualization',
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all FAQs
 */
export const getFaqs = (): Array<FaqItem> => {
  return faqItems
}

/**
 * Get FAQs filtered by category
 */
export const getFaqsByCategory = (category: FaqCategory): Array<FaqItem> => {
  if (category === 'all') return faqItems
  return faqItems.filter((faq) => faq.category === category)
}

/**
 * Get FAQ by ID
 */
export const getFaqById = (id: string): FaqItem | undefined => {
  return faqItems.find((faq) => faq.id === id)
}
