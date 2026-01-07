import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { ProjectCard } from '@/components/project-card'
import { SectionHeader } from '@/components/section-header'
import { projects } from '@/data/projects'
import { useAnimatedSection } from '@/hooks/useAnimatedSection'
import { staggerContainer } from '@/lib/motion-variants'

const ProjectsSection = () => {
  const { t } = useTranslation()
  const { ref: sectionRef, isInView } = useAnimatedSection<HTMLElement>()

  const viewAllLink = (
    <Link
      to="/projects"
      className="group flex flex-row items-center gap-3 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300 link-premium"
    >
      {t('projects.viewAll')}
      <motion.span
        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300"
        whileHover={{ scale: 1.1, x: 4 }}
      >
        <ArrowRight size={14} className="text-primary" />
      </motion.span>
    </Link>
  )

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 lg:py-32 bg-background overflow-hidden"
    >
      {/* Decorative section number */}
      <span className="section-number -right-8 top-0 hidden lg:block">01</span>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Section Header with "View All" link */}
        <SectionHeader
          label={t('projects.label')}
          title={t('projects.title')}
          isInView={isInView}
          rightContent={viewAllLink}
        />

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} variant="compact" />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
