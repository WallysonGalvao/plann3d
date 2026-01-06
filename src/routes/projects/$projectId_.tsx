import { Link, Outlet, createFileRoute, useRouterState } from '@tanstack/react-router'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { GalleryMediaItem } from '@/components/media-gallery-modal'

import Header from '@/components/header.tsx'
import { BackToTop } from '@/components/ui/back-to-top'
import { OptimizedBackground } from '@/components/ui/optimized-background'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { getProjectById, getProjectWithNext } from '@/data/projects'
import { trackGalleryOpen, trackProjectView } from '@/lib/analytics'
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/motion-variants'
import { createProjectSchema } from '@/lib/seo'

// Lazy load heavy components for better initial load
const MediaGalleryModal = lazy(() =>
  import('@/components/media-gallery-modal').then((m) => ({ default: m.MediaGalleryModal })),
)
const VideoPlayer = lazy(() =>
  import('@/components/video-player').then((m) => ({ default: m.VideoPlayer })),
)

export const Route = createFileRoute('/projects/$projectId_')({
  component: ProjectDetailPage,
  // Dynamic SEO meta tags and Schema.org for each project
  head: ({ params }) => {
    const project = getProjectById(params.projectId, 'pt')
    if (!project) {
      return {
        meta: [{ title: 'Projeto não encontrado | Plann3d' }],
      }
    }

    const ogImage = project.heroImage || project.image
    const projectUrl = `https://plann3d.com.br/projects/${project.id}`

    return {
      meta: [
        { title: `${project.title} | Plann3d` },
        {
          name: 'description',
          content: project.description || `Visualização arquitetônica: ${project.title}`,
        },
        // Open Graph
        { property: 'og:title', content: project.title },
        { property: 'og:description', content: project.description },
        { property: 'og:image', content: ogImage },
        { property: 'og:url', content: projectUrl },
        { property: 'og:type', content: 'article' },
        // Twitter
        { name: 'twitter:title', content: project.title },
        { name: 'twitter:description', content: project.description },
        { name: 'twitter:image', content: ogImage },
      ],
      links: [{ rel: 'canonical', href: projectUrl }],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(createProjectSchema(project)),
        },
      ],
    }
  },
})

function ProjectDetailPage() {
  const { projectId } = Route.useParams()
  const { t, i18n } = useTranslation()

  // Check if we're rendering a child route by looking at matched routes
  const routerState = useRouterState()
  const matches = routerState.matches
  const currentRouteId = '/projects/$projectId_'
  const hasChildRoute = matches.some((match, index) => {
    // Find current route in matches and check if there's a route after it
    const currentIdx = matches.findIndex((m) => m.routeId === currentRouteId)
    return currentIdx !== -1 && index > currentIdx
  })

  // Get project data BEFORE hooks to use in useMemo
  const languageCode = i18n.language ? i18n.language.split('-')[0] : 'pt'
  const locale = languageCode === 'en' ? 'en' : 'pt'
  const project = getProjectWithNext(projectId, locale)

  // ALL hooks MUST be declared BEFORE any conditional returns (React rules of hooks)
  const heroRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLElement>(null)

  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0)

  const isIntroInView = useInView(introRef, { once: true, margin: '-100px' })
  const isGalleryInView = useInView(galleryRef, { once: true, margin: '-100px' })

  // Collect all media items for the gallery - MUST be before early return
  const galleryItems: Array<GalleryMediaItem> = useMemo(() => {
    const items: Array<GalleryMediaItem> = []

    // Guard against undefined project or phases
    if (!project?.phases) return items

    project.phases.forEach((phase, phaseIndex) => {
      // Generate phase number based on index (1-indexed, zero-padded)
      const phaseNumber = String(phaseIndex + 1).padStart(2, '0')

      // Phase 1 style: single image
      if (phase.image) {
        items.push({
          id: `${phaseNumber}-main`,
          type: 'image',
          src: phase.image,
          phaseNumber,
          phaseLabel: phase.label,
          title: phase.title,
          description: phase.description,
          badge: phase.badge,
        })
      }

      // Phase 2 style: image array
      if (phase.images) {
        phase.images.forEach((img, idx) => {
          items.push({
            id: `${phaseNumber}-${idx}`,
            type: 'image',
            src: img,
            phaseNumber,
            phaseLabel: phase.label,
            title: phase.title,
            description: phase.description,
          })
        })
      }

      // Phase 3 style: video thumbnail
      if (phase.videoImage) {
        items.push({
          id: `${phaseNumber}-video`,
          type: 'video',
          src: phase.videoImage,
          videoSrc: phase.video, // Include actual video source
          phaseNumber,
          phaseLabel: phase.label,
          title: phase.title,
          description: phase.description,
          badge: 'Video',
        })
      }
    })

    return items
  }, [project, projectId])

  // Track project view on mount - MUST be before early return
  useEffect(() => {
    if (project) {
      trackProjectView(project.id, project.title)
    }
  }, [project])

  // NOW we can have early return - AFTER all hooks are declared
  if (hasChildRoute) {
    return <Outlet />
  }

  // Handle project not found - AFTER all hooks
  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Header />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('projectDetail.notFound')}</h1>
          <Link to="/projects" className="text-primary hover:underline">
            {t('projectDetail.backToProjects')}
          </Link>
        </div>
      </div>
    )
  }

  // Function to open gallery at a specific index
  const openGallery = (itemId: string) => {
    const index = galleryItems.findIndex((item) => item.id === itemId)
    setGalleryInitialIndex(index >= 0 ? index : 0)
    setIsGalleryOpen(true)
    // Track gallery open event
    trackGalleryOpen(projectId)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      <Header />

      {/* Hero Section - Full Screen */}
      <header
        id="project-hero"
        ref={heroRef}
        className="relative w-full h-screen min-h-[600px] flex items-end justify-start overflow-hidden group"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/30 z-0" />
          <OptimizedBackground
            src={project.heroImage || project.image}
            alt={project.title}
            priority={true}
            className="w-full h-full"
            hoverScale={1.05}
          />
        </div>

        {/* Content */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-10 pb-20 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4 max-w-4xl"
          >
            <div className="flex items-center gap-3 text-primary">
              <span className="inline-block w-8 h-px bg-primary" />
              <span className="text-primary text-sm font-bold tracking-widest uppercase">
                {project.tagline}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-4">
              {project.title.split(' ')[0]}
              <br />
              <span className="opacity-80">{project.subtitle}</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-8">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {project.model3d && (
                <Link
                  to="/projects/$projectId/viewer"
                  params={{ projectId }}
                  className="flex items-center justify-center h-14 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white text-base font-bold tracking-wide transition-all hover:scale-105 shadow-[0_0_30px_rgba(19,91,236,0.3)]"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 -960 960 960">
                    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480h80q0 115 72.5 203T418-166l-58-58 56-56L598-98q-29 10-58.5 14T480-80Zm20-280v-240h120q17 0 28.5 11.5T660-560v160q0 17-11.5 28.5T620-360H500Zm-200 0v-60h100v-40h-60v-40h60v-40H300v-60h120q17 0 28.5 11.5T460-560v160q0 17-11.5 28.5T420-360H300Zm260-60h40v-120h-40v120Zm240-60q0-115-72.5-203T542-794l58 58-56 56-182-182q29-10 58.5-14t59.5-4q83 0 156 31.5T763-763q54 54 85.5 127T880-480h-80Z" />
                  </svg>
                  {t('projectDetail.explore3DModel')}
                </Link>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce"
        >
          <svg className="w-8 h-8 text-white/50" fill="currentColor" viewBox="0 -960 960 960">
            <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        </motion.div>
      </header>

      {/* Main Content Layout */}
      <main className="w-full flex flex-col items-center bg-background">
        {/* Intro & Concept Section */}
        <motion.section
          ref={introRef}
          initial="hidden"
          animate={isIntroInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="w-full max-w-[1200px] px-6 md:px-10 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
        >
          {/* Left Column - Title + Specs */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 flex flex-col gap-8">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              {project.quote || t('projectDetail.defaultQuote')}
            </h3>
            <div className="w-full h-px bg-linear-to-r from-primary to-transparent" />

            {/* Specs List */}
            {project.specs && (
              <div className="flex flex-col gap-6 pt-4">
                <div className="flex justify-between items-end border-b border-border/50 pb-2">
                  <span className="text-muted-foreground text-sm uppercase tracking-wider">
                    {t('projectDetail.location')}
                  </span>
                  <span className="text-foreground font-medium text-right">
                    {project.specs.location}
                  </span>
                </div>
                <div className="flex justify-between items-end border-b border-border/50 pb-2">
                  <span className="text-muted-foreground text-sm uppercase tracking-wider">
                    {t('projectDetail.year')}
                  </span>
                  <span className="text-foreground font-medium text-right">
                    {project.specs.year}
                  </span>
                </div>
                {project.phases?.[0]?.stats && (
                  <div className="flex justify-between items-end border-b border-border/50 pb-2">
                    <span className="text-muted-foreground text-sm uppercase tracking-wider">
                      {project.phases[0].stats[0]?.label}
                    </span>
                    <span className="text-foreground font-medium text-right">
                      {project.phases[0].stats[0]?.value}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-end border-b border-border/50 pb-2">
                  <span className="text-muted-foreground text-sm uppercase tracking-wider">
                    {t('projectDetail.client')}
                  </span>
                  <span className="text-foreground font-medium text-right">
                    {project.specs.client}
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column - Description Text */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-7 flex flex-col gap-6 text-muted-foreground text-lg leading-relaxed"
          >
            {project.phases?.[0] && (
              <>
                <p>{project.phases[0].description}</p>
                {project.phases[1]?.description && <p>{project.phases[1].description}</p>}
              </>
            )}
          </motion.div>
        </motion.section>
        {/* Video Section - if project has video */}
        {(() => {
          const videoPhase = project.phases?.find(p => p.video && p.videoImage)
          if (!videoPhase) return null
          return (
            <section className="w-full py-16 px-4 md:px-10">
              <div className="max-w-[1200px] mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-foreground text-xl font-bold uppercase tracking-widest">
                    {videoPhase.label}
                  </h3>
                  <div className="h-px bg-border grow" />
                </div>
                <Suspense fallback={
                  <div className="aspect-video bg-secondary rounded-2xl animate-pulse" />
                }>
                  <VideoPlayer
                    src={videoPhase.video || ''}
                    poster={videoPhase.videoImage}
                    badge="Video"
                    className="w-full"
                  />
                </Suspense>
                <div className="mt-6">
                  <h4 className="text-2xl font-bold text-foreground mb-2">{videoPhase.title}</h4>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                    {videoPhase.description}
                  </p>
                </div>
              </div>
            </section>
          )
        })()}

        {/* Immersive Gallery (Masonry/Bento style) */}
        <motion.section
          ref={galleryRef}
          initial="hidden"
          animate={isGalleryInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="w-full px-4 md:px-10 pb-20"
        >
          <div className="max-w-[1440px] mx-auto">
            {/* Dynamic masonry grid based on number of items */}
            {(() => {
              const itemCount = galleryItems.length

              if (itemCount === 0) return null

              if (itemCount === 1) {
                // Single item: full width
                return (
                  <div className="grid grid-cols-1 gap-4 md:gap-6">
                    <motion.div
                      variants={scaleIn}
                      onClick={() => openGallery(galleryItems[0].id)}
                      className="aspect-video relative group overflow-hidden rounded-xl bg-secondary cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && openGallery(galleryItems[0].id)}
                    >
                      <OptimizedBackground
                        src={galleryItems[0].src}
                        alt={galleryItems[0].title || 'Gallery image'}
                        className="absolute inset-0"
                        hoverScale={1.1}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-4 hover:bg-primary hover:border-primary transition-all scale-75 group-hover:scale-100">
                          <Expand size={24} />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )
              }

              if (itemCount === 2) {
                // Two items: side by side
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-[400px]">
                    {galleryItems.slice(0, 2).map((item) => (
                      <motion.div
                        key={item.id}
                        variants={scaleIn}
                        onClick={() => openGallery(item.id)}
                        className="relative group overflow-hidden rounded-xl bg-secondary cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && openGallery(item.id)}
                      >
                        <OptimizedBackground
                          src={item.src}
                          alt={item.title || 'Gallery image'}
                          className="absolute inset-0"
                          hoverScale={1.1}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                          <Expand size={24} className="text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              }

              if (itemCount === 3) {
                // Three items: large left, two stacked right
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                    <motion.div
                      variants={scaleIn}
                      onClick={() => openGallery(galleryItems[0].id)}
                      className="row-span-2 relative group overflow-hidden rounded-xl bg-secondary cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && openGallery(galleryItems[0].id)}
                    >
                      <OptimizedBackground
                        src={galleryItems[0].src}
                        alt={galleryItems[0].title || 'Gallery image'}
                        className="absolute inset-0"
                        hoverScale={1.1}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-4 hover:bg-primary hover:border-primary transition-all scale-75 group-hover:scale-100">
                          <Expand size={24} />
                        </button>
                      </div>
                    </motion.div>
                    {galleryItems.slice(1, 3).map((item) => (
                      <motion.div
                        key={item.id}
                        variants={scaleIn}
                        onClick={() => openGallery(item.id)}
                        className="relative group overflow-hidden rounded-xl bg-secondary cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && openGallery(item.id)}
                      >
                        <OptimizedBackground
                          src={item.src}
                          alt={item.title || 'Gallery image'}
                          className="absolute inset-0"
                          hoverScale={1.1}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                          <Expand size={24} className="text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              }

              if (itemCount === 4) {
                // Four items: 2x2 grid
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                    {galleryItems.slice(0, 4).map((item) => (
                      <motion.div
                        key={item.id}
                        variants={scaleIn}
                        onClick={() => openGallery(item.id)}
                        className="relative group overflow-hidden rounded-xl bg-secondary cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && openGallery(item.id)}
                      >
                        <OptimizedBackground
                          src={item.src}
                          alt={item.title || 'Gallery image'}
                          className="absolute inset-0"
                          hoverScale={1.1}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                          <Expand size={24} className="text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              }

              // 5+ items: Original masonry with last item spanning to fill
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                  {/* Item 1 (Large) */}
                  <motion.div
                    variants={scaleIn}
                    onClick={() => openGallery(galleryItems[0].id)}
                    className="md:col-span-2 row-span-1 md:row-span-2 relative group overflow-hidden rounded-xl bg-secondary cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openGallery(galleryItems[0].id)}
                  >
                    <OptimizedBackground
                      src={galleryItems[0].src}
                      alt={galleryItems[0].title || 'Gallery image'}
                      className="absolute inset-0"
                      hoverScale={1.1}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-4 hover:bg-primary hover:border-primary transition-all scale-75 group-hover:scale-100">
                        <Expand size={24} />
                      </button>
                    </div>
                  </motion.div>

                  {/* Items 2, 3, 4 */}
                  {galleryItems.slice(1, 4).map((item) => (
                    <motion.div
                      key={item.id}
                      variants={scaleIn}
                      onClick={() => openGallery(item.id)}
                      className="relative group overflow-hidden rounded-xl bg-secondary cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && openGallery(item.id)}
                    >
                      <OptimizedBackground
                        src={item.src}
                        alt={item.title || 'Gallery image'}
                        className="absolute inset-0"
                        hoverScale={1.1}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <Expand size={24} className="text-white" />
                      </div>
                    </motion.div>
                  ))}

                  {/* Item 5+ (Wide - spans remaining columns) */}
                  {galleryItems.length >= 5 && (
                    <motion.div
                      variants={scaleIn}
                      onClick={() => openGallery(galleryItems[4].id)}
                      className="md:col-span-2 lg:col-span-3 relative group overflow-hidden rounded-xl bg-secondary cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && openGallery(galleryItems[4].id)}
                    >
                      <OptimizedBackground
                        src={galleryItems[4].src}
                        alt={galleryItems[4].title || 'Gallery image'}
                        className="absolute inset-0"
                        hoverScale={1.1}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                        <Expand size={24} className="text-white" />
                      </div>
                    </motion.div>
                  )}
                </div>
              )
            })()}
          </div>
        </motion.section>

        {/* Tools Used Section */}
        {project.tools && project.tools.length > 0 && (
          <section className="w-full bg-secondary/30 py-16 px-4 md:px-10 border-t border-border">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-foreground text-xl font-bold uppercase tracking-widest">
                  {t('projectDetail.toolsUsed')}
                </h3>
                <div className="h-px bg-border flex-grow" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {project.tools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-secondary border border-border p-6 rounded-xl flex flex-col items-start gap-3 hover:border-primary/50 transition-colors group h-full"
                  >
                    <span className="material-symbols-outlined text-primary text-3xl mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      {tool.icon}
                    </span>
                    <div>
                      <h4 className="text-foreground font-bold text-lg tracking-tight">
                        {tool.name}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-snug pt-1">
                        {tool.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}


        {/* Technical Specs & Next Project Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full pb-20"
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">

            {/* Navigation: Previous / Back to Projects / Next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6"
            >
              {/* Previous Project */}
              {project.previousProject ? (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: project.previousProject.id }}
                    className="group flex items-center gap-4 bg-secondary hover:bg-secondary/80 border border-border px-6 py-4 rounded-xl transition-all w-full md:w-auto"
                  >
                    <motion.div
                      className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center"
                      whileHover={{ x: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronLeft size={20} className="text-foreground" />
                    </motion.div>
                    <div className="text-left">
                      <span className="block text-xs text-muted-foreground uppercase">
                        {t('projectDetail.previousProject')}
                      </span>
                      <span className="block font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.previousProject.title}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ) : (
                <Link
                  to="/projects"
                  className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <motion.span whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
                    <ArrowLeft size={16} />
                  </motion.span>
                  <span>{t('projectDetail.backToProjects')}</span>
                </Link>
              )}

              {/* Back to Projects (center) - only when has Previous */}
              {project.previousProject && (
                <Link
                  to="/projects"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {t('projectDetail.backToProjects')}
                </Link>
              )}

              {/* Next Project */}
              {project.nextProject && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: project.nextProject.id }}
                    className="group flex items-center gap-4 bg-secondary hover:bg-secondary/80 border border-border px-6 py-4 rounded-xl transition-all w-full md:w-auto"
                  >
                    <div className="text-right">
                      <span className="block text-xs text-muted-foreground uppercase">
                        {t('projectDetail.nextProject')}
                      </span>
                      <span className="block font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.nextProject.title}
                      </span>
                    </div>
                    <motion.div
                      className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight size={20} className="text-foreground" />
                    </motion.div>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Fullscreen Media Gallery Modal */}
      <Suspense fallback={null}>
        <MediaGalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          items={galleryItems}
          initialIndex={galleryInitialIndex}
        />
      </Suspense>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  )
}
