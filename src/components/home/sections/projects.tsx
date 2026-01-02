import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import project1 from '@/assets/project-1.jpg'
import project2 from '@/assets/project-2.jpg'
import project3 from '@/assets/project-3.jpg'

const ProjectsSection = () => {
  const { t } = useTranslation()

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
    <section id="projects" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
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
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-card group card-lift animate-fade-up opacity-0"
              style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="project-card-overlay transition-all duration-500" />

                {/* Project Number */}
                <span className="absolute top-4 right-4 text-2xl font-bold text-foreground/80 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {project.number}
                </span>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="text-foreground" size={24} />
                </div>
              </div>

              {/* Project Info */}
              <div className="mt-4 transition-transform duration-300 group-hover:translate-x-1">
                <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 transition-colors duration-300 group-hover:text-foreground/80">
                  {project.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
