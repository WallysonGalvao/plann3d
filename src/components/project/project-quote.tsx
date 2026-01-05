import { motion } from 'framer-motion'
import { forwardRef } from 'react'

import { fadeInUp } from '@/lib/motion-variants'

interface ProjectQuoteProps {
  quote: string
  isInView: boolean
}

/**
 * Quote section for project detail page
 * Displays a stylized quote from the project
 */
export const ProjectQuote = forwardRef<HTMLElement, ProjectQuoteProps>(
  ({ quote, isInView }, ref) => {
    return (
      <section
        ref={ref}
        className="py-24 lg:py-32 bg-background"
        aria-label="Citação do projeto"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <motion.blockquote
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-foreground/90 leading-relaxed">
              {quote}
            </p>
          </motion.blockquote>
        </div>
      </section>
    )
  },
)

ProjectQuote.displayName = 'ProjectQuote'
