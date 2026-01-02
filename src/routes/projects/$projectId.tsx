import { createFileRoute, Link } from '@tanstack/react-router'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChevronRight, Play } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/motion-variants'

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
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const project = projectsData[projectId] || projectsData['1']

  // Refs for scroll-triggered animations
  const quoteRef = useRef<HTMLElement>(null)
  const phase1Ref = useRef<HTMLElement>(null)
  const phase2Ref = useRef<HTMLElement>(null)
  const phase3Ref = useRef<HTMLElement>(null)

  const isQuoteInView = useInView(quoteRef, { once: true, margin: '-100px' })
  const isPhase1InView = useInView(phase1Ref, { once: true, margin: '-100px' })
  const isPhase2InView = useInView(phase2Ref, { once: true, margin: '-100px' })
  const isPhase3InView = useInView(phase3Ref, { once: true, margin: '-100px' })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section with Parallax */}
      <motion.header
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${project.heroImage}')` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-6 md:px-12 pt-20 flex flex-col items-center text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-primary font-bold tracking-[0.2em] text-sm uppercase mb-6"
          >
            {project.tagline}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-6 leading-tight"
          >
            {project.title.split(' ')[0]}
            <br />
            <span className="text-foreground/40">{project.subtitle}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-12"
          >
            {project.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col items-center gap-4 mt-8"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 96 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="w-px bg-linear-to-b from-primary to-transparent"
            />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              {t('projectDetail.scrollToExplore')}
            </span>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Quote Section */}
      <motion.section
        ref={quoteRef}
        initial="hidden"
        animate={isQuoteInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="relative py-24 md:py-32 bg-background"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={isQuoteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-4xl font-light leading-tight"
            >
              {project.quote}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Phase 01: Structure */}
      {project.phases[0] && (
        <motion.section
          ref={phase1Ref}
          className="relative min-h-screen py-12 md:py-24 flex flex-col justify-center border-t border-border/50"
        >
          <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial="hidden"
              animate={isPhase1InView ? 'visible' : 'hidden'}
              variants={staggerContainer}
              className="order-2 lg:order-1 flex flex-col justify-center"
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-primary text-primary text-sm font-bold">
                  {project.phases[0].number}
                </span>
                <span className="text-primary tracking-widest text-sm font-bold uppercase">
                  {project.phases[0].label}
                </span>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight"
              >
                {project.phases[0].title.split(' ').slice(0, 2).join(' ')}
                <br />
                {project.phases[0].title.split(' ').slice(2).join(' ')}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-muted-foreground text-lg leading-relaxed mb-8"
              >
                {project.phases[0].description}
              </motion.p>
              {project.phases[0].stats && (
                <motion.div
                  variants={fadeInUp}
                  className="flex gap-8 border-t border-border/50 pt-8"
                >
                  {project.phases[0].stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isPhase1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <span className="block text-2xl font-bold">{stat.value}</span>
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Visual Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isPhase1InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 relative group"
            >
              <div className="aspect-4/5 md:aspect-square w-full rounded-2xl overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-cover bg-center grayscale contrast-125"
                  style={{ backgroundImage: `url('${project.phases[0].image}')` }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-60" />
                {/* Floating Badge */}
                {project.phases[0].badge && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isPhase1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-6 left-6 bg-background/80 backdrop-blur-md px-4 py-2 rounded-lg border border-border/50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {project.phases[0].badge}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Phase 02: Atmosphere */}
      {project.phases[1] && (
        <motion.section
          ref={phase2Ref}
          className="relative min-h-screen py-12 md:py-24 flex flex-col justify-center bg-secondary/30"
        >
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              animate={isPhase2InView ? 'visible' : 'hidden'}
              variants={staggerContainer}
              className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
            >
              <motion.div variants={fadeInUp}>
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
              </motion.div>
              <motion.p
                variants={fadeInUp}
                className="text-muted-foreground text-lg max-w-md leading-relaxed text-right md:text-left"
              >
                {project.phases[1].description}
              </motion.p>
            </motion.div>

            {/* Image Grid */}
            {project.phases[1].images && (
              <motion.div
                initial="hidden"
                animate={isPhase2InView ? 'visible' : 'hidden'}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[80vh] md:h-[600px]"
              >
                {/* Main Render */}
                <motion.div
                  variants={scaleIn}
                  className="md:col-span-8 h-full rounded-2xl overflow-hidden relative group"
                >
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${project.phases[1].images[0]}')` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </motion.div>

                {/* Detail Renders */}
                <div className="md:col-span-4 flex flex-col gap-4 h-full">
                  <motion.div variants={scaleIn} className="flex-1 rounded-2xl overflow-hidden relative group">
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${project.phases[1].images[1]}')` }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    />
                  </motion.div>
                  <motion.div variants={scaleIn} className="flex-1 rounded-2xl overflow-hidden relative group">
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${project.phases[1].images[2]}')` }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* Phase 03: Life/Motion */}
      {project.phases[2] && (
        <motion.section
          ref={phase3Ref}
          className="relative min-h-screen py-12 md:py-24 flex flex-col justify-center overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-black z-0" />

          <div className="relative z-10 container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Visual Content (Video Thumbnail) */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={isPhase3InView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.8 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10"
              >
                <div
                  className="aspect-video w-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${project.phases[2].videoImage}')` }}
                >
                  {/* Play button overlay */}
                  <motion.div
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer group"
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <Play size={32} className="text-white ml-1" />
                    </motion.div>
                  </motion.div>
                  {/* AI Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={isPhase3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ delay: 0.4 }}
                    className="absolute top-4 left-4 flex gap-2"
                  >
                    <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] text-white font-mono border border-white/10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      GENERATIVE ENHANCEMENT
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Text Content */}
              <motion.div
                initial="hidden"
                animate={isPhase3InView ? 'visible' : 'hidden'}
                variants={staggerContainer}
                className="flex flex-col justify-center"
              >
                <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-primary text-primary text-sm font-bold">
                    {project.phases[2].number}
                  </span>
                  <span className="text-primary tracking-widest text-sm font-bold uppercase">
                    {project.phases[2].label}
                  </span>
                </motion.div>
                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight"
                >
                  {project.phases[2].title}
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-muted-foreground text-lg leading-relaxed mb-8"
                >
                  {project.phases[2].description}
                </motion.p>
                <motion.div variants={fadeInUp}>
                  <Button variant="ghost" className="group w-fit gap-3">
                    <span>{t('projectDetail.watchFullFilm')}</span>
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Technical Specs Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-black py-20"
      >
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground">{t('projectDetail.vizArtDirection')}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
              {[
                { label: t('projectDetail.year'), value: project.specs.year },
                { label: t('projectDetail.location'), value: project.specs.location },
                { label: t('projectDetail.client'), value: project.specs.client },
                { label: t('projectDetail.status'), value: project.specs.status },
              ].map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="block text-xs font-bold text-muted-foreground uppercase mb-2">
                    {spec.label}
                  </span>
                  <span>{spec.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Next Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-20 pt-10 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <Link
              to="/projects"
              className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <motion.span whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
                <ArrowLeft size={16} />
              </motion.span>
              <span>{t('projectDetail.backToProjects')}</span>
            </Link>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
                <motion.div
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight size={20} />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
