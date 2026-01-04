import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { fadeInLeft, staggerContainer } from '@/lib/motion-variants'

const StudioSection = () => {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const processSteps = [
    { number: '01', title: t('processSection.step1Title') },
    { number: '02', title: t('processSection.step2Title') },
    { number: '03', title: t('processSection.step3Title') },
    { number: '04', title: t('processSection.step4Title') },
  ]

  const stepVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    }),
  }

  return (
    <section ref={sectionRef} id="studio" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInLeft} className="space-y-4">
              <span className="section-label">{t('about.label')}</span>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {t('about.title')}
              </h2>
            </motion.div>

            {/* Single focused paragraph */}
            <motion.p
              variants={fadeInLeft}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              {t('about.desc1')}
            </motion.p>
          </motion.div>

          {/* Right: Process Steps */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6"
            >
              {t('processSection.label')}
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  variants={stepVariants}
                  whileHover={{
                    scale: 1.03,
                    borderColor: 'hsl(var(--primary) / 0.5)',
                    transition: { duration: 0.2 },
                  }}
                  className="p-5 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-all duration-300 cursor-default"
                >
                  <motion.span
                    className="text-2xl font-bold text-primary/60 block mb-2"
                    initial={{ scale: 0.8 }}
                    animate={isInView ? { scale: 1 } : { scale: 0.8 }}
                    transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                  >
                    {step.number}
                  </motion.span>
                  <h4 className="text-sm font-medium leading-tight">
                    {step.title}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudioSection
