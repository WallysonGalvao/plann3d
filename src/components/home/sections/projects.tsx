import { Link } from '@tanstack/react-router'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import project1 from '@/assets/project-1.jpg'
import project2 from '@/assets/project-2.jpg'
import project3 from '@/assets/project-3.jpg'
import { fadeInUp, staggerContainer } from '@/lib/motion-variants'

const ProjectsSection = () => {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const projects = [
    {
      id: 1,
      title: t('projects.nordicRetreat'),
      location: 'Oslo, Norway',
      image: project1,
      number: '01',
    },
    {
      id: 2,
      title: t('projects.voidMuseum'),
      location: 'Berlin, Germany',
      image: project2,
      number: '02',
    },
    {
      id: 3,
      title: t('projects.vertexTower'),
      location: 'New York, USA',
      image: project3,
      number: '03',
    },
  ]

  return (
    <section ref={sectionRef} id="projects" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">{t('projects.title')}</h2>
          <Link
            to="/projects"
            className="group flex flex-row items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 link-underline"
          >
            {t('projects.viewAll')}
            <ArrowRight
              size={16}
              className="transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
            />
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project) => (
            <Link key={project.id} to="/projects/$projectId" params={{ projectId: String(project.id) }}>
              <motion.article
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="project-card group card-lift"
              >
                <div className="relative aspect-3/4 overflow-hidden rounded-lg">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="project-card-overlay transition-all duration-500" />

                {/* Project Number */}
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute top-4 right-4 text-2xl font-bold text-foreground/80 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  {project.number}
                </motion.span>

                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2"
                >
                  <ArrowRight className="text-foreground" size={24} />
                </motion.div>
              </div>

              {/* Project Info */}
              <motion.div
                className="mt-4"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 transition-colors duration-300 group-hover:text-foreground/80">
                  {project.location}
                </p>
              </motion.div>
              </motion.article>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
