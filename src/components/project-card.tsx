import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

import type { Project, ProjectCategory, ProjectSize } from '@/types/project'

import { layoutSpring } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'

// ============================================
// SIZE CONFIGURATION
// ============================================

const sizeClasses: Record<ProjectSize, string> = {
  large: 'lg:col-span-8 lg:row-span-1',
  tall: 'lg:col-span-4 lg:row-span-2',
  standard: 'lg:col-span-4 lg:row-span-1',
  wide: 'lg:col-span-6 lg:row-span-1',
}

// ============================================
// TYPES
// ============================================

export interface ProjectCardProps {
  /** The project data to display */
  project: Project
  /** Index for stagger animation delay and display number */
  index: number
  /** Optional function to get category label - if not provided, uses category directly */
  getCategoryLabel?: (category: ProjectCategory) => string
  /** Visual variant: 'grid' for projects page, 'compact' for home section */
  variant?: 'grid' | 'compact'
}

// ============================================
// COMPONENT
// ============================================

/**
 * Reusable ProjectCard component for displaying projects in grids
 * Supports different sizes (large, tall, standard, wide) and variants (grid, compact)
 */
export function ProjectCard({
  project,
  index,
  getCategoryLabel,
  variant = 'grid',
}: ProjectCardProps) {
  const isLarge = project.size === 'large'
  const isTall = project.size === 'tall'
  const isWide = project.size === 'wide'

  // Decide if we should show category badge
  const showCategory = variant === 'grid' && (isLarge || isTall) && getCategoryLabel

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
      whileHover={variant === 'compact' ? { y: -12 } : undefined}
      className={cn(variant === 'grid' && sizeClasses[project.size])}
    >
      <Link
        to="/projects/$projectId"
        params={{ projectId: project.id }}
        className={cn(
          'group relative block h-full w-full overflow-hidden rounded-2xl bg-secondary cursor-pointer glow-hover shadow-premium',
          variant === 'compact' && 'aspect-3/4',
        )}
      >
        {/* Project index number - decorative */}
        <span className="absolute top-6 left-6 z-30 text-6xl font-serif font-normal text-white/10 group-hover:text-white/25 transition-colors duration-500">
          {String(index + 1).padStart(2, '0')}
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
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-end justify-between">
              <div>
                {/* Category for large/tall cards */}
                {showCategory && (
                  <div className="mb-2 flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>
                )}
                <h3
                  className={cn(
                    'font-semibold text-white mb-1 group-hover:text-primary transition-colors duration-300',
                    isLarge || isTall ? 'text-2xl' : 'text-lg',
                  )}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                  {project.location}
                </p>

                {/* Tags for wide cards */}
                {isWide && project.tags && (
                  <div className="mt-3 flex items-center gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Arrow indicator */}
              <motion.div
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20 shrink-0"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowRight className="text-white" size={18} />
              </motion.div>
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  )
}
