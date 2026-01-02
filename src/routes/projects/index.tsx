import { createFileRoute, Link } from '@tanstack/react-router'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Grid3X3, Play, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { fadeInUp, layoutSpring, staggerContainerFast } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/projects/')({ component: ProjectsPage })

type ProjectCategory = 'all' | 'exteriors' | 'interiors' | 'animation'

interface Project {
  id: string
  title: string
  category: ProjectCategory
  location: string
  description?: string
  image: string
  tags?: string[]
  isVideo?: boolean
  size: 'large' | 'tall' | 'standard' | 'wide'
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Casa Brutalista',
    category: 'exteriors',
    location: 'São Paulo, Brazil',
    description: 'A study in concrete and light.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDb6YAXqNTBjDuJvoltTD9gr1vcCJj1P_pw3MPNMRcNYIqcTILOOygqk9kLKnNPq5V50qnuuuKv87BvaZjxlZqVAAvtwgtRZqTxbhF_gPMxiA2_jU84_ETUQbTAK4-0jYSFshQC6XeAdI0ikvp7XxW-Su3nDp3Ci0N-hkIWmRFmVtsp3a76H9Mv44wsoEf1CU-JnScMIbxkQTUX5kCPHcKpgR6Xk54U_OgBFkOq7Fx2Szo3c85cRhIurmM96qVV-OkpCRE2lECvklg',
    size: 'large',
  },
  {
    id: '2',
    title: 'Skyline Tower',
    category: 'exteriors',
    location: 'Dubai, UAE',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_XsW54iMzwjquwPklFFnqInAnJdAIk6DsgjEgkw1n8EO9oqt_8hOPTVTIsbZ-edGhlLsgu3YvDzwMIWoU39Xv1nIXGi4t0SlPMpR97qBwRR64RhWuTV69RMTv0-2JY0dQPdbMWv4MDbtKXe1GE6I0mOjzQRVj9dmVjXZvXgPHe03HdhCrM84rNLgMT2Rf0prUBIcVG8erc3NEG9OC_ibdAZlv0yIiXz0bPQ3xvTi4LXAvtAyu0GmP2R40o1F4WaL9XKffwwzTUto',
    size: 'tall',
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
  },
  {
    id: '4',
    title: 'Nordic Details',
    category: 'interiors',
    location: 'Copenhagen, Denmark',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBrie4mCQFBiXbDbAQsBmU1qV81yQSACvDS53Td_kNUGNd7PubJxmdDCUIT6fX1dT573pmf2d_aG66iyuvV-TixGxzBHjcc6nur-WBdfgiBx5rg_-aI2uVWn4UCt_EXE6GxVjfABqw_jPXzA2tmerKBeKAVMUjeSEvU7FmBCs41pSeH9F9Q6GncKcpWBAsABAo_5XNJzx5JLWFOOysQmPZAza3yfbDZLj__jTh4RRDuB53Chm8fkbBjIaGk62g1oEE_tS-4Bbm4Utg',
    size: 'standard',
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
  },
  {
    id: '6',
    title: 'Tech HQ V2',
    category: 'interiors',
    location: 'Silicon Valley',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-jJvJol3HmIaYYnKUEPGlqAicj3dTsF7kLaJ-BLo9Ekw-W0sSHkAbCR5fjQd73KCmpDK6dPuJNcCo789lg_sMe0wNFnCxKV1xJgCaqS3IdREUyKiMw7ia96QvAU4MSXqRth7nlQ90MQ4jAJZU7PfbD327MZmQ8_4JLahl5zp-z-28HQDWn2vHLCMW6tI6UiPZf2cTEbijhKYG9Aw10vG3CEdnl-kMwcuh3QmhV_1P2kAbHcLQ5SWLEK91wyERQ9lcRg4kxZNtJM0',
    size: 'wide',
  },
]

function ProjectsPage() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all')
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const filters: { key: ProjectCategory; label: string; icon?: boolean }[] = [
    { key: 'all', label: t('projectsPage.filters.all'), icon: true },
    { key: 'exteriors', label: t('projectsPage.filters.exteriors') },
    { key: 'interiors', label: t('projectsPage.filters.interiors') },
    { key: 'animation', label: t('projectsPage.filters.animation') },
  ]

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const getCategoryLabel = (category: ProjectCategory) => {
    const labels: Record<ProjectCategory, string> = {
      all: t('projectsPage.filters.all'),
      exteriors: t('projectsPage.categories.residential'),
      interiors: t('projectsPage.categories.commercial'),
      animation: t('projectsPage.categories.animation'),
    }
    return labels[category]
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 md:px-12 lg:px-20 pt-16 pb-8 overflow-hidden">
          {/* Decorative section number */}
          <span className="section-number -right-16 -top-10 hidden lg:block">P</span>

          <div className="relative z-10 mx-auto max-w-[1400px]">
            <motion.div
              ref={heroRef}
              initial="hidden"
              animate={isHeroInView ? 'visible' : 'hidden'}
              variants={staggerContainerFast}
              className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
            >
              {/* Title with serif accent */}
              <motion.div variants={fadeInUp} className="flex max-w-2xl flex-col gap-4">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="label-premium inline-block w-fit"
                >
                  {t('projectsPage.label')}
                </motion.span>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
                  <span className="font-serif italic font-normal normal-case text-muted-foreground">
                    {t('projectsPage.title1').split(' ')[0]}{' '}
                  </span>
                  {t('projectsPage.title1').split(' ').slice(1).join(' ')}
                  <br />
                  <span className="text-foreground/20">{t('projectsPage.title2')}</span>
                </h1>
                <p className="text-base sm:text-lg font-light leading-relaxed text-muted-foreground md:max-w-lg">
                  {t('projectsPage.description')}
                </p>
              </motion.div>

              {/* Filters - Premium glass style */}
              <motion.div variants={fadeInUp} className="overflow-x-auto -mx-6 px-6 sm:overflow-visible sm:mx-0 sm:px-0">
                <div className="flex gap-2 sm:gap-3 min-w-max sm:min-w-0 sm:flex-wrap pb-2 sm:pb-0">
                  {filters.map((filter) => (
                    <motion.button
                      key={filter.key}
                      onClick={() => setActiveFilter(filter.key)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'group flex h-11 items-center gap-2 rounded-full border px-6 transition-all duration-300',
                        activeFilter === filter.key
                          ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                          : 'glass-card border-white/10 hover:border-white/20 glow-hover',
                      )}
                    >
                      {filter.icon && <Grid3X3 size={16} />}
                      <span className="text-sm font-medium">{filter.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Projects Grid with Layout Animations */}
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[400px]"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    getCategoryLabel={getCategoryLabel}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-20 flex w-full flex-col items-center justify-center pb-20"
            >
              <Button
                variant="outline"
                size="lg"
                className="group relative flex items-center gap-4 overflow-hidden rounded-full border-border bg-secondary/50 py-6 pl-8 pr-6 hover:bg-secondary/80"
              >
                <span className="text-lg font-bold tracking-wide">
                  {t('projectsPage.loadMore')}
                </span>
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Plus size={20} />
                </motion.div>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                {t('projectsPage.showingCount', {
                  current: filteredProjects.length,
                  total: 24,
                })}
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
  getCategoryLabel: (category: ProjectCategory) => string
}

function ProjectCard({ project, index, getCategoryLabel }: ProjectCardProps) {
  const sizeClasses: Record<Project['size'], string> = {
    large: 'lg:col-span-8 lg:row-span-1',
    tall: 'lg:col-span-4 lg:row-span-2',
    standard: 'lg:col-span-4 lg:row-span-1',
    wide: 'lg:col-span-6 lg:row-span-1',
  }

  const isLarge = project.size === 'large'
  const isTall = project.size === 'tall'
  const isWide = project.size === 'wide'

  return (
    <motion.div
      layout
      layoutId={project.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        ...layoutSpring,
        opacity: { duration: 0.3 },
        delay: index * 0.05,
      }}
      className={cn(sizeClasses[project.size])}
    >
      <Link
        to="/projects/$projectId"
        params={{ projectId: project.id }}
        className="group relative block h-full w-full overflow-hidden rounded-2xl bg-secondary cursor-pointer glow-hover shadow-premium">
        {/* Project index number - decorative */}
        <span className="absolute top-6 left-6 z-30 text-6xl font-serif font-normal text-white/10 group-hover:text-white/25 transition-colors duration-500">
          0{String(index + 1)}
        </span>
        {/* Gradient Overlay */}
        <motion.div
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'absolute inset-0 z-10',
            isWide && index === 4
              ? 'bg-linear-to-r from-black/80 via-transparent to-transparent'
              : 'bg-linear-to-t from-black/80 via-black/20 to-transparent',
          )}
        />

        {/* Image */}
        <motion.img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Top highlight on hover */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

        {/* Video Play Button (for animation projects) */}
        {project.isVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4"
          >
            <motion.div
              className="rounded-full bg-black/50 p-4 backdrop-blur-md"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Play size={32} className="text-white fill-white" />
            </motion.div>
            <h3 className="mt-4 text-xl font-bold text-white">{project.title}</h3>
          </motion.div>
        )}

        {/* Content Overlay */}
        {!project.isVideo && (
          <div
            className={cn(
              'absolute z-20',
              isTall ? 'bottom-0 left-0 p-8 w-full' : 'bottom-0 left-0 p-8',
            )}
          >
            {/* Category Badge */}
            {isLarge && (
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {getCategoryLabel(project.category)}
                </span>
              </div>
            )}

            {/* Title */}
            <h3
              className={cn(
                'font-bold text-white',
                isLarge ? 'text-3xl' : isTall ? 'text-3xl leading-none' : 'text-lg',
              )}
            >
              {isTall ? (
                <>
                  {project.title.split(' ')[0]}
                  <br />
                  {project.title.split(' ').slice(1).join(' ')}
                </>
              ) : (
                project.title
              )}
            </h3>

            {/* Description (for large cards) */}
            {isLarge && project.description && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="mt-2 max-w-md text-sm text-gray-300"
              >
                {project.location} — {project.description}
              </motion.p>
            )}

            {/* Location (for small cards) */}
            {!isLarge && !isTall && !isWide && (
              <p className="text-xs text-gray-400">{project.location}</p>
            )}

            {/* Tags (for wide cards) */}
            {isWide && project.tags && (
              <div className="mt-2 flex items-center gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* View Case Study (for tall cards) */}
            {isTall && (
              <>
                <span className="text-xs font-bold uppercase tracking-widest text-white/60 block mb-1">
                  {getCategoryLabel(project.category)}
                </span>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="mt-6 flex items-center justify-between border-t border-white/20 pt-4"
                >
                  <span className="text-sm text-white">View Case Study</span>
                  <ArrowRight size={16} className="text-primary" />
                </motion.div>
              </>
            )}

            {/* Arrow button for wide cards with location */}
            {isWide && !project.tags && (
              <div className="absolute bottom-8 right-8 flex items-end justify-between">
                <p className="text-sm text-gray-400">{project.location}</p>
              </div>
            )}
          </div>
        )}

        {/* Arrow Button (for large cards) */}
        {isLarge && (
          <motion.button
            className="absolute right-6 top-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
            whileHover={{ backgroundColor: 'hsl(var(--primary))' }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={20} />
          </motion.button>
        )}

        {/* Arrow Button (for last wide card) */}
        {isWide && !project.tags && (
          <motion.span
            className="absolute bottom-8 right-8 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm"
            whileHover={{
              backgroundColor: 'hsl(var(--primary))',
              borderColor: 'hsl(var(--primary))',
            }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight size={16} />
          </motion.span>
        )}
      </Link>
    </motion.div>
  )
}
