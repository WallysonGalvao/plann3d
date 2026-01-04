import { useTranslation } from 'react-i18next'

/**
 * SEO Metadata for a page
 */
export interface SEOMetadata {
  title: string
  description: string
  url?: string
  image?: string
  type?: 'website' | 'article'
  locale?: string
  jsonLd?: object
}

/**
 * Default SEO values
 */
export const DEFAULT_SEO: SEOMetadata = {
  title: 'Plann3d - Visualização Arquitetônica 3D',
  description:
    'Transformamos projetos arquitetônicos em experiências visuais cinematográficas. Renderização 3D, animação e realidade virtual.',
  url: 'https://plann3d.com.br',
  image: 'https://plann3d.com.br/og-image.jpg',
  type: 'website',
  locale: 'pt_BR',
}

/**
 * Organization JSON-LD schema
 */
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Plann3d',
  url: 'https://plann3d.com.br',
  logo: 'https://plann3d.com.br/logo.png',
  description:
    'Estúdio de visualização arquitetônica 3D especializado em renderização fotorrealista e animações cinematográficas.',
  sameAs: ['https://instagram.com/plann3d', 'https://linkedin.com/company/plann3d'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brasília',
    addressRegion: 'DF',
    addressCountry: 'BR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'contato@plann3d.com.br',
  },
}

/**
 * LocalBusiness JSON-LD schema
 */
export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://plann3d.com.br/#business',
  name: 'Plann3d',
  description: 'Estúdio de visualização arquitetônica 3D',
  url: 'https://plann3d.com.br',
  priceRange: '$$',
  areaServed: {
    '@type': 'Country',
    name: 'Brazil',
  },
  serviceType: [
    'Renderização 3D',
    'Animação Arquitetônica',
    'Visualização Arquitetônica',
    'Realidade Virtual',
  ],
}

/**
 * WebSite JSON-LD schema
 */
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Plann3d',
  url: 'https://plann3d.com.br',
  description: DEFAULT_SEO.description,
  inLanguage: ['pt-BR', 'en'],
  publisher: {
    '@type': 'Organization',
    name: 'Plann3d',
  },
}

/**
 * Generate meta tags array for TanStack Router head
 */
export function generateMetaTags(seo: Partial<SEOMetadata> = {}) {
  const meta = { ...DEFAULT_SEO, ...seo }

  return [
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { title: meta.title },
    { name: 'description', content: meta.description },
    { name: 'theme-color', content: '#09090b' },

    // Open Graph
    { property: 'og:type', content: meta.type },
    { property: 'og:url', content: meta.url },
    { property: 'og:title', content: meta.title },
    { property: 'og:description', content: meta.description },
    { property: 'og:image', content: meta.image },
    { property: 'og:locale', content: meta.locale },
    { property: 'og:site_name', content: 'Plann3d' },

    // Twitter Cards
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: meta.title },
    { name: 'twitter:description', content: meta.description },
    { name: 'twitter:image', content: meta.image },

    // Robots
    { name: 'robots', content: 'index, follow' },
  ]
}

/**
 * Generate JSON-LD script content
 */
export function generateJsonLd(schemas: object[]): string {
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)
}

/**
 * Create CreativeWork schema for a project
 */
export function createProjectSchema(project: {
  id: string
  title: string
  description?: string
  image: string
  location?: string
  specs?: { year: string }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `https://plann3d.com.br/projects/${project.id}`,
    name: project.title,
    description: project.description,
    image: project.image,
    creator: {
      '@type': 'Organization',
      name: 'Plann3d',
    },
    dateCreated: project.specs?.year,
    contentLocation: project.location
      ? {
          '@type': 'Place',
          name: project.location,
        }
      : undefined,
  }
}

/**
 * Create FAQPage schema from FAQ items
 */
export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Hook to get translated SEO metadata
 */
export function useSEO(page: string) {
  const { t, i18n } = useTranslation()

  const seoData: Record<string, Partial<SEOMetadata>> = {
    home: {
      title: t('seo.home.title', 'Plann3d - Visualização Arquitetônica 3D'),
      description: t(
        'seo.home.description',
        'Transformamos projetos em experiências visuais cinematográficas.',
      ),
      url: 'https://plann3d.com.br',
    },
    projects: {
      title: t('seo.projects.title', 'Projetos - Plann3d'),
      description: t(
        'seo.projects.description',
        'Explore nosso portfólio de visualizações arquitetônicas em 3D.',
      ),
      url: 'https://plann3d.com.br/projects',
    },
    tools: {
      title: t('seo.tools.title', 'Ferramentas e Tecnologias - Plann3d'),
      description: t(
        'seo.tools.description',
        'Conheça as ferramentas profissionais que utilizamos.',
      ),
      url: 'https://plann3d.com.br/tools',
    },
    faq: {
      title: t('seo.faq.title', 'Perguntas Frequentes - Plann3d'),
      description: t('seo.faq.description', 'Tire suas dúvidas sobre visualização arquitetônica.'),
      url: 'https://plann3d.com.br/faq',
    },
    contact: {
      title: t('seo.contact.title', 'Contato - Plann3d'),
      description: t(
        'seo.contact.description',
        'Entre em contato para transformar seu projeto em visualização 3D.',
      ),
      url: 'https://plann3d.com.br/contact',
    },
  }

  return {
    ...DEFAULT_SEO,
    ...seoData[page],
    locale: i18n.language === 'en' ? 'en_US' : 'pt_BR',
  }
}
