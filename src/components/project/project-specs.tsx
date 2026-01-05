import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import type { Project } from '@/types/project'

import { fadeInUp, scaleIn, staggerContainer } from '@/lib/motion-variants'

interface ProjectSpecsProps {
  specs: Project['specs']
  isInView: boolean
}

/**
 * Technical specifications section for project detail page
 * Displays year, location, client, and status
 */
export function ProjectSpecs({ specs, isInView }: ProjectSpecsProps) {
  const { t } = useTranslation()

  if (!specs) return null

  const specItems = [
    { label: t('projectDetail.year'), value: specs.year },
    { label: t('projectDetail.location'), value: specs.location },
    { label: t('projectDetail.client'), value: specs.client },
    { label: t('projectDetail.status'), value: specs.status },
  ].filter((item) => item.value)

  return (
    <motion.section
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="py-16 lg:py-24 bg-secondary/30"
      aria-label="Especificações técnicas"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          variants={fadeInUp}
          className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-12 text-center"
        >
          {t('projectDetail.vizArtDirection')}
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {specItems.map((spec, index) => (
            <motion.div
              key={spec.label}
              variants={scaleIn}
              className="text-center"
              custom={index}
            >
              <span className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">
                {spec.label}
              </span>
              <span className="text-lg font-medium text-foreground">
                {spec.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
