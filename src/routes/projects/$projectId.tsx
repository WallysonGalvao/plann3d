import { createFileRoute, Link } from '@tanstack/react-router'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChevronRight, Play } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { projectDetails, type ProjectDetail, type ProjectPhase } from '@/data/projects'
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/motion-variants'

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectDetailPage,
})

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

  const project = projectDetails[projectId] || projectDetails['1']


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
            className="label-premium mb-8"
          >
            {project.tagline}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-4 sm:mb-6 leading-tight"
          >
            <span className="font-serif italic font-normal">
              {project.title.split(' ')[0]}
            </span>
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

      {/* Quote Section - Premium styling */}
      <motion.section
        ref={quoteRef}
        initial="hidden"
        animate={isQuoteInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="relative py-24 md:py-32 bg-background overflow-hidden"
      >
        {/* Decorative quote mark */}
        <span className="absolute -left-10 top-20 text-[20rem] font-serif text-white/[0.02] leading-none pointer-events-none select-none">"</span>
        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={isQuoteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-4xl font-serif italic font-light leading-tight text-foreground/80"
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
                  className="flex gap-6 border-t border-border/50 pt-8"
                >
                  {project.phases[0].stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isPhase1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="glass-card gradient-border p-4 rounded-xl"
                    >
                      <span className="block text-2xl font-serif font-normal text-primary">{stat.value}</span>
                      <span className="text-xs text-muted-foreground tracking-wider uppercase">{stat.label}</span>
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
                {/* Floating Badge - Premium glass style */}
                {project.phases[0].badge && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isPhase1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-6 left-6 glass-card gradient-border px-5 py-3 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs font-semibold uppercase tracking-[0.2em]">
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
