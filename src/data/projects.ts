/**
 * Centralized project data - Single source of truth
 * All project-related mock data should be imported from this file
 */

import project1 from '@/assets/project-1.jpg'
import project2 from '@/assets/project-2.jpg'
import project3 from '@/assets/project-3.jpg'

// Torre de TV images
import torreTvSketchup from '@/assets/projects/torre-de-tv/01-SKETCHUP.png'
import torreTvTwinmotion1 from '@/assets/projects/torre-de-tv/02-TWINMOTION.png'
import torreTvTwinmotion2 from '@/assets/projects/torre-de-tv/03-TWINMOTION.png'

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
  images?: Array<string>
  videoImage?: string
  stats?: Array<{ value: string; label: string }>
}

export interface ProjectSpecs {
  year: string
  location: string
  client: string
  status: string
}

/**
 * Unified Project interface - Single source of truth
 * Contains all fields for listing, grid, and detail views
 */
export interface Project {
  // Required fields (used everywhere)
  id: string
  title: string
  category: ProjectCategory
  location: string
  image: string
  size: ProjectSize
  number: string

  // Optional listing fields
  titleKey?: string // i18n key for translated title
  description?: string
  tags?: Array<string>
  isVideo?: boolean
  isFeatured?: boolean // Show on home page

  // Optional detail fields
  subtitle?: string
  tagline?: string
  quote?: string
  heroImage?: string
  phases?: Array<ProjectPhase>
  specs?: ProjectSpecs
  nextProject?: {
    id: string
    title: string
  }
}

// Legacy type aliases for backwards compatibility
export type ProjectListItem = Pick<
  Project,
  | 'id'
  | 'title'
  | 'titleKey'
  | 'category'
  | 'location'
  | 'description'
  | 'image'
  | 'tags'
  | 'isVideo'
  | 'size'
  | 'number'
>

export type ProjectDetail = Pick<
  Project,
  | 'id'
  | 'title'
  | 'subtitle'
  | 'tagline'
  | 'description'
  | 'quote'
  | 'heroImage'
  | 'phases'
  | 'specs'
  | 'nextProject'
>

// ============================================
// UNIFIED PROJECTS DATA
// Single source of truth for all project data
// ============================================

export const projects: Array<Project> = [
  // ---- FEATURED PROJECTS (Home page) ----
  {
    id: 'nordic-retreat',
    title: 'Nordic Retreat',
    titleKey: 'projects.nordicRetreat',
    category: 'exteriors',
    location: 'Oslo, Norway',
    image: project1,
    size: 'standard',
    number: '01',
    isFeatured: true,
    // Detail fields
    subtitle: 'NORDIC',
    tagline: 'Case Study',
    description: 'A serene retreat nestled in the Norwegian landscape.',
    quote: '"Architecture should speak of its time and place, but yearn for timelessness."',
    heroImage: project1,
    specs: {
      year: '2024',
      location: 'Oslo, Norway',
      client: 'Nordic Studio',
      status: 'Concluído',
    },
    nextProject: {
      id: 'void-museum',
      title: 'The Void Museum',
    },
  },
  {
    id: 'void-museum',
    title: 'The Void Museum',
    titleKey: 'projects.voidMuseum',
    category: 'exteriors',
    location: 'Berlin, Germany',
    image: project2,
    size: 'standard',
    number: '02',
    isFeatured: true,
    // Detail fields
    subtitle: 'VOID',
    tagline: 'Case Study',
    description: 'A space that celebrates emptiness and negative space.',
    quote: '"The void is not nothing. It is the potential for everything."',
    heroImage: project2,
    specs: {
      year: '2024',
      location: 'Berlin, Germany',
      client: 'Museum Foundation',
      status: 'Em Construção',
    },
    nextProject: {
      id: 'vertex-tower',
      title: 'Vertex Tower',
    },
  },
  {
    id: 'vertex-tower',
    title: 'Vertex Tower',
    titleKey: 'projects.vertexTower',
    category: 'exteriors',
    location: 'New York, USA',
    image: project3,
    size: 'standard',
    number: '03',
    isFeatured: true,
    // Detail fields
    subtitle: 'VERTEX',
    tagline: 'Case Study',
    description: 'A striking vertical statement in the Manhattan skyline.',
    quote: '"Height is not about elevation, but about aspiration."',
    heroImage: project3,
    specs: {
      year: '2025',
      location: 'New York, USA',
      client: 'Vertex Development',
      status: 'Em Projeto',
    },
    nextProject: {
      id: 'torre-de-tv',
      title: 'Torre de TV de Brasília',
    },
  },
  {
    id: 'torre-de-tv',
    title: 'Torre de TV de Brasília',
    titleKey: 'projects.torreDeTv',
    category: 'exteriors',
    location: 'Brasília, DF',
    description: 'Vista panorâmica de 360 graus do Eixo Monumental.',
    image: torreTvTwinmotion2,
    size: 'large',
    number: '04',
    isFeatured: true,
    // Detail fields
    subtitle: 'TORRE DE TV',
    tagline: 'Case Study',
    quote:
      '"A arquitetura deve ser um ponto de observação, conectando o visitante à cidade e à sua história através da perspectiva."',
    heroImage: torreTvTwinmotion2,
    phases: [
      {
        number: '01',
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
        number: '02',
        label: 'A Atmosfera',
        title: 'O Encontro com o Céu',
        description:
          'A torre ganha vida através da luz e do contexto urbano. O Eixo Monumental se revela em toda sua magnitude, com a Praça dos Três Poderes e os marcos arquitetônicos de Brasília compondo uma narrativa visual única.',
        images: [torreTvTwinmotion1, torreTvTwinmotion2],
      },
      {
        number: '03',
        label: 'A Vida',
        title: 'O Mirante da Experiência',
        description:
          'Mais do que um ponto turístico, a Torre de TV se transforma em uma experiência sensorial. Visitantes são convidados a contemplar Brasília de uma perspectiva privilegiada.',
        videoImage: torreTvTwinmotion2,
      },
    ],
    specs: {
      year: '2025',
      location: 'Brasília, DF',
      client: 'M.U.B Produtora',
      status: 'Concluído',
    },
    nextProject: {
      id: 'residencia-horizonte',
      title: 'Residência Horizonte',
    },
  },

  // ---- ALL PROJECTS (Grid page) ----
  {
    id: 'residencia-horizonte',
    title: 'Residência Horizonte',
    category: 'exteriors',
    location: 'Nova Lima, MG',
    description: 'Uma jornada visual do conceito abstrato à realidade cinematográfica imersiva.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDiL1PQKFr4YQSwro8JBu6AmSyWz9cgaGtLdxwmt4CTxuVtWtuogd8l8qTIZr_pANwk5bRjAJKamHDQMKk3DwRtCIsIHlNylQgVG4yDKdk5xuQL-E_s_ZegxmxMyd0cTzc8HqLjoYsoKPO39u1KzhbsIO1WzW_sc8EvK_DSO3wJ1cq4n0cy5xrd6BokLLKS-_nGhW-QA6CWpaY0wxPhy519cxygf-T25G-SUOrRRPlHsYak_-dzoXoRwtdh7R4IHw-cgiAybC5i46k',
    size: 'large',
    number: '05',
    // Detail fields
    subtitle: 'HORIZONTE',
    tagline: 'Case Study',
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
          'Onde tudo começa. Linhas puras e volumes definem a intenção espacial. Nesta fase, despimos o projeto de qualquer distração visual para focar na harmonia das formas e na honestidade da geometria.',
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
          'Além da estática. Utilizamos inteligência avançada para interpolar sonhos e realidade. O vento nas árvores, o movimento sutil das cortinas, a imperfeição granulada de um filme analógico.',
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
      id: 'casa-brutalista',
      title: 'Casa Brutalista',
    },
  },
  {
    id: 'casa-brutalista',
    title: 'Casa Brutalista',
    category: 'exteriors',
    location: 'São Paulo, Brazil',
    description: 'A study in concrete and light.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDb6YAXqNTBjDuJvoltTD9gr1vcCJj1P_pw3MPNMRcNYIqcTILOOygqk9kLKnNPq5V50qnuuuKv87BvaZjxlZqVAAvtwgtRZqTxbhF_gPMxiA2_jU84_ETUQbTAK4-0jYSFshQC6XeAdI0ikvp7XxW-Su3nDp3Ci0N-hkIWmRFmVtsp3a76H9Mv44wsoEf1CU-JnScMIbxkQTUX5kCPHcKpgR6Xk54U_OgBFkOq7Fx2Szo3c85cRhIurmM96qVV-OkpCRE2lECvklg',
    size: 'large',
    number: '06',
    // Detail fields
    subtitle: 'BRUTALISTA',
    tagline: 'Case Study',
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
      id: 'residencia-horizonte',
      title: 'Residência Horizonte',
    },
  },
  {
    id: 'skyline-tower',
    title: 'Skyline Tower',
    category: 'exteriors',
    location: 'Dubai, UAE',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_XsW54iMzwjquwPklFFnqInAnJdAIk6DsgjEgkw1n8EO9oqt_8hOPTVTIsbZ-edGhlLsgu3YvDzwMIWoU39Xv1nIXGi4t0SlPMpR97qBwRR64RhWuTV69RMTv0-2JY0dQPdbMWv4MDbtKXe1GE6I0mOjzQRVj9dmVjXZvXgPHe03HdhCrM84rNLgMT2Rf0prUBIcVG8erc3NEG9OC_ibdAZlv0yIiXz0bPQ3xvTi4LXAvtAyu0GmP2R40o1F4WaL9XKffwwzTUto',
    size: 'tall',
    number: '07',
  },
  {
    id: 'interior-motion',
    title: 'Interior Motion',
    category: 'animation',
    location: 'Berlin, Germany',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAx_RnsB0ISB85_D3lNrMS_9q6PyTHV0XxwgNf4WF6cBgrIE2FO8TBZzuaZ0EcMT6vwor3nw7Cr_jiNJNdruC9Ngj2sEFkRMKMf0QWoHBUaymZvITLwEJ0TJla1OQ3eAVwZNY-9Y0VkNcUw1XR2UItwJMX_2HB0BVZRsuhVASGSA9EgoV6tbPMMP0mjEzj782RZfwbWtewY58Xaiq-y6LdfJL7sjhQsCGX6yRBANxVixzOpiTSGVtsufQctm8_5Q6QANnfneJ_yzqg',
    size: 'standard',
    isVideo: true,
    number: '08',
  },
  {
    id: 'nordic-details',
    title: 'Nordic Details',
    category: 'interiors',
    location: 'Copenhagen, Denmark',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBrie4mCQFBiXbDbAQsBmU1qV81yQSACvDS53Td_kNUGNd7PubJxmdDCUIT6fX1dT573pmf2d_aG66iyuvV-TixGxzBHjcc6nur-WBdfgiBx5rg_-aI2uVWn4UCt_EXE6GxVjfABqw_jPXzA2tmerKBeKAVMUjeSEvU7FmBCs41pSeH9F9Q6GncKcpWBAsABAo_5XNJzx5JLWFOOysQmPZAza3yfbDZLj__jTh4RRDuB53Chm8fkbBjIaGk62g1oEE_tS-4Bbm4Utg',
    size: 'standard',
    number: '09',
  },
  {
    id: 'the-oasis',
    title: 'The Oasis',
    category: 'exteriors',
    location: 'Miami, USA',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-eq5pP2QGIZhqkII7-t_3X5TjRpb455naIkKj-COQ8Jb_-k0mZMqQeVBZsT6nXWcObpUe5CaG5Es67SmNSFiZgS1lBe1729FQW5peLt-M6NEpXZ3LGgvpdb5t8E6fbvnPknTQi4uZZM5dCgW7gP9D0k5_1o_4BkRuNHfrc_xlraXxM3IpmYZHQp4Mi-RLgrspFR0iQO3BP4VKCSX5RxADTGj4TNk8ERgBH6xU3A6grWdnEC00ITf0sdYldIalF-2kSWOmItVWhBk',
    tags: ['CGI', 'Animation'],
    size: 'wide',
    number: '10',
  },
  {
    id: 'tech-hq-v2',
    title: 'Tech HQ V2',
    category: 'interiors',
    location: 'Silicon Valley',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-jJvJol3HmIaYYnKUEPGlqAicj3dTsF7kLaJ-BLo9Ekw-W0sSHkAbCR5fjQd73KCmpDK6dPuJNcCo789lg_sMe0wNFnCxKV1xJgCaqS3IdREUyKiMw7ia96QvAU4MSXqRth7nlQ90MQ4jAJZU7PfbD327MZmQ8_4JLahl5zp-z-28HQDWn2vHLCMW6tI6UiPZf2cTEbijhKYG9Aw10vG3CEdnl-kMwcuh3QmhV_1P2kAbHcLQ5SWLEK91wyERQ9lcRg4kxZNjJM0',
    size: 'wide',
    number: '11',
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get project by ID
 */
export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id)
}

/**
 * Get all projects filtered by category
 */
export const getProjectsByCategory = (category: ProjectCategory): Array<Project> => {
  if (category === 'all') return projects
  return projects.filter((p) => p.category === category)
}

/**
 * Get featured projects for home page
 */
export const getFeaturedProjects = (limit?: number): Array<Project> => {
  const featured = projects.filter((p) => p.isFeatured)
  return limit ? featured.slice(0, limit) : featured
}

// ============================================
// LEGACY EXPORTS (Backwards compatibility)
// ============================================

/**
 * @deprecated Use `projects` array with `isFeatured` filter instead
 */
export const featuredProjects: Array<ProjectListItem> = getFeaturedProjects(3)

/**
 * @deprecated Use `projects` array directly
 */
export const allProjects: Array<ProjectListItem> = projects

/**
 * @deprecated Use `getProjectById()` instead
 */
export const projectDetails: Record<string, Project> = projects.reduce(
  (acc, project) => {
    acc[project.id] = project
    return acc
  },
  {} as Record<string, Project>,
)
