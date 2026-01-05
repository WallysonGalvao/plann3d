import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { Grid3X3, Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { ProjectCategory } from '@/types/project'

import { PageLayout } from '@/components/page-layout'
import { ProjectCard } from '@/components/project-card'
import { SectionHeader } from '@/components/section-header'
import { BackToTop } from '@/components/ui/back-to-top'
import { Button } from '@/components/ui/button'
import { getProjectsCount, projects } from '@/data/projects'
import { useAnimatedSection } from '@/hooks/useAnimatedSection'
import { staggerContainerFast } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/projects/')({ component: ProjectsPage })

function ProjectsPage() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { ref: heroRef, isInView: isHeroInView } = useAnimatedSection<HTMLDivElement>()

  const filters: Array<{ key: ProjectCategory; label: string; icon?: boolean }> = [
    { key: 'all', label: t('projectsPage.filters.all'), icon: true },
    { key: 'exteriors', label: t('projectsPage.filters.exteriors') },
    { key: 'interiors', label: t('projectsPage.filters.interiors') },
    { key: 'animation', label: t('projectsPage.filters.animation') },
  ]

  // Combined filter: category + search
  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    return projects.filter((p) => {
      const matchesCategory = activeFilter === 'all' || p.category === activeFilter
      const matchesSearch =
        query === '' ||
        p.title.toLowerCase().includes(query) ||
        p.location?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [activeFilter, searchQuery])

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
    <PageLayout>
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
            {/* Section Header */}
            <SectionHeader
              label={t('projectsPage.label')}
              title={`${t('projectsPage.title1')} ${t('projectsPage.title2')}`}
              description={t('projectsPage.description')}
              isInView={isHeroInView}
              className="mb-0 max-w-2xl"
            />

            {/* Filters - Premium glass style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              className="flex flex-col gap-4"
            >
              {/* Search Input */}
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder={t('projectsPage.searchPlaceholder', { defaultValue: 'Buscar projetos...' })}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-80 h-11 pl-11 pr-4 rounded-full bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                />
              </div>

              {/* Category Filters */}
              <div className="overflow-x-auto -mx-6 px-6 sm:overflow-visible sm:mx-0 sm:px-0">
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
                  variant="grid"
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
              <span className="text-lg font-bold tracking-wide text-foreground">
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
                total: getProjectsCount(),
              })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Back to Top Button */}
      <BackToTop />
    </PageLayout >
  )
}
