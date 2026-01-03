/**
 * Centralized project data - Single source of truth
 * All project-related mock data should be imported from this file
 */

import project1 from '@/assets/project-1.jpg'
import project2 from '@/assets/project-2.jpg'
import project3 from '@/assets/project-3.jpg'

// ============================================
// TYPE DEFINITIONS
// ============================================

export type ProjectCategory = 'all' | 'exteriors' | 'interiors' | 'animation'
export type ProjectSize = 'large' | 'tall' | 'standard' | 'wide'

export interface ProjectPhase {
  number: string
  label: string
  title: string
  description: string
  badge?: string
  image?: string
  images?: string[]
  videoImage?: string
  stats?: { value: string; label: string }[]
}

export interface ProjectSpecs {
  year: string
  location: string
  client: string
  status: string
}

export interface ProjectListItem {
  id: string
  title: string
  titleKey?: string // i18n key for translated title
  category: ProjectCategory
  location: string
  description?: string
  image: string
  tags?: string[]
  isVideo?: boolean
  size: ProjectSize
  number: string // Display number like '01'
}

export interface ProjectDetail {
  id: string
  title: string
  subtitle: string
  tagline: string
  description: string
  quote: string
  heroImage: string
  phases: ProjectPhase[]
  specs: ProjectSpecs
  nextProject: {
    id: string
    title: string
  }
}

// ============================================
// FEATURED PROJECTS (Home page)
// Uses local assets for optimal loading
// ============================================

export const featuredProjects: ProjectListItem[] = [
  {
    id: '1',
    title: 'Nordic Retreat',
    titleKey: 'projects.nordicRetreat',
    category: 'exteriors',
    location: 'Oslo, Norway',
    image: project1,
    size: 'standard',
    number: '01',
  },
  {
    id: '2',
    title: 'The Void Museum',
    titleKey: 'projects.voidMuseum',
    category: 'exteriors',
    location: 'Berlin, Germany',
    image: project2,
    size: 'standard',
    number: '02',
  },
  {
    id: '3',
    title: 'Vertex Tower',
    titleKey: 'projects.vertexTower',
    category: 'exteriors',
    location: 'New York, USA',
    image: project3,
    size: 'standard',
    number: '03',
  },
]

// ============================================
// ALL PROJECTS (Projects page grid)
// Uses external URLs for variety
// ============================================

export const allProjects: ProjectListItem[] = [
  {
    id: '1',
    title: 'Casa Brutalista',
    category: 'exteriors',
    location: 'São Paulo, Brazil',
    description: 'A study in concrete and light.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDb6YAXqNTBjDuJvoltTD9gr1vcCJj1P_pw3MPNMRcNYIqcTILOOygqk9kLKnNPq5V50qnuuuKv87BvaZjxlZqVAAvtwgtRZqTxbhF_gPMxiA2_jU84_ETUQbTAK4-0jYSFshQC6XeAdI0ikvp7XxW-Su3nDp3Ci0N-hkIWmRFmVtsp3a76H9Mv44wsoEf1CU-JnScMIbxkQTUX5kCPHcKpgR6Xk54U_OgBFkOq7Fx2Szo3c85cRhIurmM96qVV-OkpCRE2lECvklg',
    size: 'large',
    number: '01',
  },
  {
    id: '2',
    title: 'Skyline Tower',
    category: 'exteriors',
    location: 'Dubai, UAE',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_XsW54iMzwjquwPklFFnqInAnJdAIk6DsgjEgkw1n8EO9oqt_8hOPTVTIsbZ-edGhlLsgu3YvDzwMIWoU39Xv1nIXGi4t0SlPMpR97qBwRR64RhWuTV69RMTv0-2JY0dQPdbMWv4MDbtKXe1GE6I0mOjzQRVj9dmVjXZvXgPHe03HdhCrM84rNLgMT2Rf0prUBIcVG8erc3NEG9OC_ibdAZlv0yIiXz0bPQ3xvTi4LXAvtAyu0GmP2R40o1F4WaL9XKffwwzTUto',
    size: 'tall',
    number: '02',
  },
  {
    id: '3',
    title: 'Interior Motion',
    category: 'animation',
    location: 'Berlin, Germany',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAx_RnsB0ISB85_D3lNrMS_9q6PyTHV0XxwgNf4WF6cBgrIE2FO8TBZzuaZ0EcMT6vwor3nw7Cr_jiNJNdruC9Ngj2sEFkRMKMf0QWoHBUaymZvITLwEJ0TJla1OQ3eAVwZNY-9Y0VkNcUw1XR2UItwJMX_2HB0BVZRsuhVASGSA9EgoV6tbPMMP0mjEzj782RZfwbWtewY58Xaiq-y6LdfJL7sjhQsCGX6yRBANxVixzOpiTSGVtsufQctm8_5Q6QANnfneJ_yzqg',
    size: 'standard',
    isVideo: true,
    number: '03',
  },
  {
    id: '4',
    title: 'Nordic Details',
    category: 'interiors',
    location: 'Copenhagen, Denmark',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBrie4mCQFBiXbDbAQsBmU1qV81yQSACvDS53Td_kNUGNd7PubJxmdDCUIT6fX1dT573pmf2d_aG66iyuvV-TixGxzBHjcc6nur-WBdfgiBx5rg_-aI2uVWn4UCt_EXE6GxVjfABqw_jPXzA2tmerKBeKAVMUjeSEvU7FmBCs41pSeH9F9Q6GncKcpWBAsABAo_5XNJzx5JLWFOOysQmPZAza3yfbDZLj__jTh4RRDuB53Chm8fkbBjIaGk62g1oEE_tS-4Bbm4Utg',
    size: 'standard',
    number: '04',
  },
  {
    id: '5',
    title: 'The Oasis',
    category: 'exteriors',
    location: 'Miami, USA',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-eq5pP2QGIZhqkII7-t_3X5TjRpb455naIkKj-COQ8Jb_-k0mZMqQeVBZsT6nXWcObpUe5CaG5Es67SmNSFiZgS1lBe1729FQW5peLt-M6NEpXZ3LGgvpdb5t8E6fbvnPknTQi4uZZM5dCgW7gP9D0k5_1o_4BkRuNHfrc_xlraXxM3IpmYZHQp4Mi-RLgrspFR0iQO3BP4VKCSX5RxADTGj4TNk8ERgBH6xU3A6grWdnEC00ITf0sdYldIalF-2kSWOmItVWhBk',
    tags: ['CGI', 'Animation'],
    size: 'wide',
    number: '05',
  },
  {
    id: '6',
    title: 'Tech HQ V2',
    category: 'interiors',
    location: 'Silicon Valley',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-jJvJol3HmIaYYnKUEPGlqAicj3dTsF7kLaJ-BLo9Ekw-W0sSHkAbCR5fjQd73KCmpDK6dPuJNcCo789lg_sMe0wNFnCxKV1xJgCaqS3IdREUyKiMw7ia96QvAU4MSXqRth7nlQ90MQ4jAJZU7PfbD327MZmQ8_4JLahl5zp-z-28HQDWn2vHLCMW6tI6UiPZf2cTEbijhKYG9Aw10vG3CEdnl-kMwcuh3QmhV_1P2kAbHcLQ5SWLEK91wyERQ9lcRg4kxZNtJM0',
    size: 'wide',
    number: '06',
  },
]

// ============================================
// PROJECT DETAILS (Project detail pages)
// Full case study data
// ============================================

export const projectDetails: Record<string, ProjectDetail> = {
  '1': {
    id: '1',
    title: 'Residência Horizonte',
    subtitle: 'HORIZONTE',
    tagline: 'Case Study',
    description: 'Uma jornada visual do conceito abstrato à realidade cinematográfica imersiva.',
    quote:
      '"A arquitetura não é apenas sobre o espaço construído, mas sobre como a luz o habita e como a emoção o preenche antes mesmo de existir."',
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDiL1PQKFr4YQSwro8JBu6AmSyWz9cgaGtLdxwmt4CTxuVtWtuogd8l8qTIZr_pANwk5bRjAJKamHDQMKk3DwRtCIsIHlNylQgVG4yDKdk5xuQL-E_s_ZegxmxMyd0cTzc8HqLjoYsoKPO39u1KzhbsIO1WzW_sc8EvK_DSO3wJ1cq4n0cy5xrd6BokLLKS-_nGhW-QA6CWpaY0wxPhy519cxygf-T25G-SUOrRRPlHsYak_-dzoXoRwtdh7R4IHw-cgiAybC5i46k',
    phases: [
      {
        number: '01',
        label: 'A Estrutura',
        title: 'O Silêncio do Volume Puro',
        description:
          'Onde tudo começa. Linhas puras e volumes definem a intenção espacial. Nesta fase, despimos o projeto de qualquer distração visual para focar na harmonia das formas e na honestidade da geometria. É o esqueleto da ideia, cru e intocável.',
        badge: 'Concepção Volumétrica',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCfNaOj_E9j7eNSepT2tKCZIwzFmDPNIigK9h3vcXxSoU1f2mM2vIBPmqfkwiotcEmv8zxppn8RRQdYUt2t_tSknskOiWDfKdcyMFRxwdzaIXVCyahRiA_E_o6QOjG3g14wb0x1sPgy2rxY7aVjHGuulpgb43muzY_knVY0C1KKVUfGvcsi58O2aLIJeC5y-YMiS1bFGghRprXdXIUzS12W8ZqAHQr-TeuZ4_zwu-dnJ3yAYytXXifDLqok-fRL7MqO_-parf5Q2kQ',
        stats: [
          { value: '450m²', label: 'Área Construída' },
          { value: '3', label: 'Pavimentos' },
        ],
      },
      {
        number: '02',
        label: 'A Atmosfera',
        title: 'O Despertar da Luz',
        description:
          'A matéria ganha vida. O sol poente toca o concreto, a vegetação respira. Aqui, transformamos geometria em sentimento através da luz e textura.',
        images: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCH_nSQPory7Kzzrio5WQ6csqfJwpRiz0F2erLmkU8Dx9Oq0Y7wYV7ipuTUrQRF9FY9xzWvwMPgV0IYwBEi93tJR36dXZaDFW3_FWhSGV_O2j5Ye9rVPRVjO78hg8fwakesLtLd4TqsRxd46XT66L1ppRCtpQURB4H65gAddRNVw2exNWQUDpiIy1Et5WgGdea0J6Qi2Fjx__6XPKkfpr8lw0CfxL35qCy5dR1EFP3bF73qSXxis3DhuxESBfVgng5sGUJ72cgb-gA',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCpOEfiaStlEqfcEvmD7awjDWiyMAwzGHBts034HfNPgXByT2T9GZNpDtXfhYSt1iU_vwz0Ryk0PM71m0Odg3tBsWpVh4hi5jypZqUyFX6ylzrUD5Tu_ipdkxyg6oeXFmkEDSF--SgZSj_j7F0kqXarjJKErrejD18qpccWTcbFUaUMToXl5jl3knTn-3w6vyUJHxmPucZRFBCwCOORTkYdCCdXSi6SIwtGHL-yZ51pG_KtMi47yqC29Qarlhqb6g9H0fR6nRGbaAQ',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBomz-r5UxDT-U99e1sPEWY2Kzym_66vbLpeMgB_LYjTvgZnDUruFIgc3qQNOPZs9o3XDnaROR3LJaFiSKdUzgWOTEKGF8vyN1Qud_aT8yothPPOCYUmQvkPuRoevuW900qQQhUtmS-oikLzTXVGhhaAMSASOj9PkbMSuuzOedL05gjuXjvZaviY2Bzq9YD_UDWIsHCY66tzvrpEYQ0uXXDmGvk012utmT9YfxhOCTK2s_BndZYn9bih_i0blsjeGm9X7Stmt52DIQ',
        ],
      },
      {
        number: '03',
        label: 'A Vida',
        title: 'A Narrativa Viva',
        description:
          'Além da estática. Utilizamos inteligência avançada para interpolar sonhos e realidade. O vento nas árvores, o movimento sutil das cortinas, a imperfeição granulada de um filme analógico. Esta é a experiência final: não apenas ver o projeto, mas sentir-se dentro dele.',
        videoImage:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCpAJUrNVt8CFys3btVctQE-FROQ1TUz7ZakALUMPp7O_EykIWJtVx5sWUvSRNQ0Z_V711eqM69CZaAB1c4bFfh8cpBUSNv2I_hKA8zlneyV53u3thAxoJZxPWyawZtx3xZtCBZI5nFlOLvtyrOc8gvuSsTLKd5JeiI6Sw0PTGn8WIr2uXiDzoZWiJaky7tEBJeIlEjj-afmY6XZEUnYP0gKloJW9cGmy13yjicwKfeU9fQg55sTe0aWvxO3NSt9R0JK3Hp2rjA3VA',
      },
    ],
    specs: {
      year: '2023',
      location: 'Nova Lima, MG',
      client: 'Studio M',
      status: 'Construído',
    },
    nextProject: {
      id: '2',
      title: 'Casa Brutalista',
    },
  },
  '2': {
    id: '2',
    title: 'Casa Brutalista',
    subtitle: 'BRUTALISTA',
    tagline: 'Case Study',
    description: 'Concreto aparente e luz natural em perfeita harmonia.',
    quote:
      '"O brutalismo não é sobre agressividade, mas sobre a honestidade dos materiais e a poesia da estrutura exposta."',
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDb6YAXqNTBjDuJvoltTD9gr1vcCJj1P_pw3MPNMRcNYIqcTILOOygqk9kLKnNPq5V50qnuuuKv87BvaZjxlZqVAAvtwgtRZqTxbhF_gPMxiA2_jU84_ETUQbTAK4-0jYSFshQC6XeAdI0ikvp7XxW-Su3nDp3Ci0N-hkIWmRFmVtsp3a76H9Mv44wsoEf1CU-JnScMIbxkQTUX5kCPHcKpgR6Xk54U_OgBFkOq7Fx2Szo3c85cRhIurmM96qVV-OkpCRE2lECvklg',
    phases: [
      {
        number: '01',
        label: 'A Estrutura',
        title: 'Geometria Brutalista',
        description:
          'Volumes massivos que desafiam a gravidade. O concreto como protagonista absoluto.',
        badge: 'Concepção Volumétrica',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCfNaOj_E9j7eNSepT2tKCZIwzFmDPNIigK9h3vcXxSoU1f2mM2vIBPmqfkwiotcEmv8zxppn8RRQdYUt2t_tSknskOiWDfKdcyMFRxwdzaIXVCyahRiA_E_o6QOjG3g14wb0x1sPgy2rxY7aVjHGuulpgb43muzY_knVY0C1KKVUfGvcsi58O2aLIJeC5y-YMiS1bFGghRprXdXIUzS12W8ZqAHQr-TeuZ4_zwu-dnJ3yAYytXXifDLqok-fRL7MqO_-parf5Q2kQ',
        stats: [
          { value: '380m²', label: 'Área Construída' },
          { value: '2', label: 'Pavimentos' },
        ],
      },
    ],
    specs: {
      year: '2024',
      location: 'São Paulo, SP',
      client: 'Privado',
      status: 'Em Construção',
    },
    nextProject: {
      id: '1',
      title: 'Residência Horizonte',
    },
  },
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get project detail by ID
 */
export const getProjectById = (id: string): ProjectDetail | undefined => {
  return projectDetails[id]
}

/**
 * Get all projects filtered by category
 */
export const getProjectsByCategory = (category: ProjectCategory): ProjectListItem[] => {
  if (category === 'all') return allProjects
  return allProjects.filter((p) => p.category === category)
}

/**
 * Get featured projects for home page
 */
export const getFeaturedProjects = (): ProjectListItem[] => {
  return featuredProjects
}
