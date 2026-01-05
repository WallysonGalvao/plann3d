import { motion } from 'framer-motion'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import type { Project } from '@/types/project'

import { OptimizedBackground } from '@/components/ui/optimized-background'
import { fadeInUp, staggerContainer } from '@/lib/motion-variants'

interface ProjectHeroProps {
  project: Project
  onBackClick: () => void
}

/**
 * Hero section for project detail page
 * Displays hero image with overlay, project title, and scroll indicator
 */
export const ProjectHero = forwardRef<HTMLElement, ProjectHeroProps>(
  ({ project, onBackClick }, ref) => {
    const { t } = useTranslation()

    return (
      <header
        id="project-hero"
        ref={ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image - Optimized with priority loading */}
        <div className="absolute inset-0 z-0">
          <OptimizedBackground
            src={project.heroImage || ''}
            alt={project.title}
            className="absolute inset-0"
            priority={true}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" />
        </div>

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 container mx-auto px-6 lg:px-12 text-center"
        >
          {/* Back Button */}
          <motion.button
            variants={fadeInUp}
            onClick={onBackClick}
            className="absolute top-6 left-6 lg:left-12 flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
            aria-label={t('projectDetail.backToProjects')}
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="hidden sm:inline">{t('projectDetail.backToProjects')}</span>
          </motion.button>

          {/* Subtitle */}
          <motion.span
            variants={fadeInUp}
            className="inline-block text-sm tracking-[0.3em] uppercase text-white/60 mb-4"
          >
            {project.subtitle}
          </motion.span>

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal text-white mb-6"
          >
            {project.title}
          </motion.h1>

          {/* Tagline */}
          <motion.p variants={fadeInUp} className="text-lg text-white/70 mb-8">
            {project.tagline}
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            variants={fadeInUp}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-widest uppercase text-white/50">
              {t('projectDetail.scrollToExplore')}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center p-2"
            >
              <ChevronRight size={12} className="text-white/50 rotate-90" />
            </motion.div>
          </motion.div>
        </motion.div>
      </header>
    )
  },
)

ProjectHero.displayName = 'ProjectHero'
