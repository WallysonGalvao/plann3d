import { Link } from '@tanstack/react-router'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { featuredProjects } from '@/data/projects'
import { fadeInUp, staggerContainer } from '@/lib/motion-variants'

const ProjectsSection = () => {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Use centralized data with translated titles
  const projects = featuredProjects.map((project) => ({
    ...project,
    title: project.titleKey ? t(project.titleKey) : project.title,
  }))

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 lg:py-32 bg-background overflow-hidden">
      {/* Decorative section number */}
      <span className="section-number -right-8 top-0 hidden lg:block">01</span>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Section Header with serif accent */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="label-premium mb-4 inline-block">{t('projects.label')}</span>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              <span className="font-serif italic font-normal text-muted-foreground">
                {t('projects.title').split(' ')[0]}{' '}
              </span>
              {t('projects.title').split(' ').slice(1).join(' ')}
            </h2>
          </div>
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
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <Link key={project.id} to="/projects/$projectId" params={{ projectId: String(project.id) }}>
              <motion.article
                variants={fadeInUp}
                whileHover={{ y: -12 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group cursor-pointer"
              >
                {/* Image Container with premium effects */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl image-reveal shadow-premium">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Project Number - large decorative */}
                  <span className="absolute top-6 left-6 text-7xl font-serif font-normal text-white/10 group-hover:text-white/20 transition-colors duration-500">
                    {project.number}
                  </span>

                  {/* Bottom info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                          {project.location}
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      <motion.div
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ArrowRight className="text-white" size={18} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Top gradient line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
