import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, ChevronRight, Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectDetailPage,
})

// Mock project data - in real app this would come from an API
const projectsData: Record<string, ProjectData> = {
  '1': {
    id: '1',
    title: 'Residência Horizonte',
    subtitle: 'HORIZONTE',
    tagline: 'Case Study',
    description:
      'Uma jornada visual do conceito abstrato à realidade cinematográfica imersiva.',
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
      title: 'Pavilhão Araucária',
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

interface ProjectData {
  id: string
  title: string
  subtitle: string
  tagline: string
  description: string
  quote: string
  heroImage: string
  phases: Phase[]
  specs: {
    year: string
    location: string
    client: string
    status: string
  }
  nextProject: {
    id: string
    title: string
  }
}

interface Phase {
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

function ProjectDetailPage() {
  const { projectId } = Route.useParams()
  const { t } = useTranslation()

  const project = projectsData[projectId] || projectsData['1']

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${project.heroImage}')` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 pt-20 flex flex-col items-center text-center">
          <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase mb-6 animate-pulse">
            {project.tagline}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-6 leading-tight">
            {project.title.split(' ')[0]}
            <br />
            <span className="text-foreground/40">{project.subtitle}</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-12">
            {project.description}
          </p>
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="w-px h-24 bg-linear-to-b from-primary to-transparent" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              {t('projectDetail.scrollToExplore')}
            </span>
          </div>
        </div>
      </header>

      {/* Quote Section */}
      <section className="relative py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-4xl font-light leading-tight">{project.quote}</p>
          </div>
        </div>
      </section>

      {/* Phase 01: Structure */}
      {project.phases[0] && (
        <section className="relative min-h-screen py-12 md:py-24 flex flex-col justify-center border-t border-border/50">
          <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-primary text-primary text-sm font-bold">
                  {project.phases[0].number}
                </span>
                <span className="text-primary tracking-widest text-sm font-bold uppercase">
                  {project.phases[0].label}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
                {project.phases[0].title.split(' ').slice(0, 2).join(' ')}
                <br />
                {project.phases[0].title.split(' ').slice(2).join(' ')}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {project.phases[0].description}
              </p>
              {project.phases[0].stats && (
                <div className="flex gap-8 border-t border-border/50 pt-8">
                  {project.phases[0].stats.map((stat, index) => (
                    <div key={index}>
                      <span className="block text-2xl font-bold">{stat.value}</span>
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Visual Content */}
            <div className="order-1 lg:order-2 relative group">
              <div className="aspect-4/5 md:aspect-square w-full rounded-2xl overflow-hidden relative">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ backgroundImage: `url('${project.phases[0].image}')` }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-60" />
                {/* Floating Badge */}
                {project.phases[0].badge && (
                  <div className="absolute bottom-6 left-6 bg-background/80 backdrop-blur-md px-4 py-2 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {project.phases[0].badge}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Phase 02: Atmosphere */}
      {project.phases[1] && (
        <section className="relative min-h-screen py-12 md:py-24 flex flex-col justify-center bg-secondary/30">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-primary text-primary text-sm font-bold">
                    {project.phases[1].number}
                  </span>
                  <span className="text-primary tracking-widest text-sm font-bold uppercase">
                    {project.phases[1].label}
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                  {project.phases[1].title}
                </h2>
              </div>
              <p className="text-muted-foreground text-lg max-w-md leading-relaxed text-right md:text-left">
                {project.phases[1].description}
              </p>
            </div>

            {/* Image Grid */}
            {project.phases[1].images && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[80vh] md:h-[600px]">
                {/* Main Render */}
                <div className="md:col-span-8 h-full rounded-2xl overflow-hidden relative group">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ backgroundImage: `url('${project.phases[1].images[0]}')` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Detail Renders */}
                <div className="md:col-span-4 flex flex-col gap-4 h-full">
                  <div className="flex-1 rounded-2xl overflow-hidden relative group">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url('${project.phases[1].images[1]}')` }}
                    />
                  </div>
                  <div className="flex-1 rounded-2xl overflow-hidden relative group">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url('${project.phases[1].images[2]}')` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Phase 03: Life/Motion */}
      {project.phases[2] && (
        <section className="relative min-h-screen py-12 md:py-24 flex flex-col justify-center overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-black z-0" />

          <div className="relative z-10 container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Visual Content (Video Thumbnail) */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
                <div
                  className="aspect-video w-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${project.phases[2].videoImage}')` }}
                >
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors cursor-pointer group">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                  </div>
                  {/* AI Badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] text-white font-mono border border-white/10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      GENERATIVE ENHANCEMENT
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-primary text-primary text-sm font-bold">
                    {project.phases[2].number}
                  </span>
                  <span className="text-primary tracking-widest text-sm font-bold uppercase">
                    {project.phases[2].label}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
                  {project.phases[2].title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {project.phases[2].description}
                </p>
                <Button variant="ghost" className="group w-fit gap-3">
                  <span>{t('projectDetail.watchFullFilm')}</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technical Specs Section */}
      <section className="bg-black py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground">{t('projectDetail.vizArtDirection')}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
              <div>
                <span className="block text-xs font-bold text-muted-foreground uppercase mb-2">
                  {t('projectDetail.year')}
                </span>
                <span>{project.specs.year}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-muted-foreground uppercase mb-2">
                  {t('projectDetail.location')}
                </span>
                <span>{project.specs.location}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-muted-foreground uppercase mb-2">
                  {t('projectDetail.client')}
                </span>
                <span>{project.specs.client}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-muted-foreground uppercase mb-2">
                  {t('projectDetail.status')}
                </span>
                <span>{project.specs.status}</span>
              </div>
            </div>
          </div>

          {/* Next Project */}
          <div className="mt-20 pt-10 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
            <Link
              to="/projects"
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>{t('projectDetail.backToProjects')}</span>
            </Link>

            <Link
              to="/projects/$projectId"
              params={{ projectId: project.nextProject.id }}
              className="group flex items-center gap-4 bg-secondary/80 hover:bg-secondary px-6 py-4 rounded-xl transition-all w-full md:w-auto"
            >
              <div className="text-right">
                <span className="block text-xs text-muted-foreground uppercase">
                  {t('projectDetail.nextProject')}
                </span>
                <span className="block font-bold group-hover:text-primary transition-colors">
                  {project.nextProject.title}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
