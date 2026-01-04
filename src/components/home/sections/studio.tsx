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
    <section ref={sectionRef} id="studio" className="relative py-24 lg:py-32 bg-background overflow-hidden">
      {/* Decorative section number */}
      <span className="section-number right-0 top-0 hidden lg:block">03</span>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.span variants={fadeInLeft} className="label-premium inline-block">
              {t('studioSection.label')}
            </motion.span>
            <motion.h2
              variants={fadeInLeft}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              <span className="font-serif italic font-normal text-muted-foreground">
                {t('studioSection.title').split(' ')[0]}{' '}
              </span>
              {t('studioSection.title').split(' ').slice(1).join(' ')}
            </motion.h2>
            <motion.p
              variants={fadeInLeft}
              className="text-lg text-muted-foreground leading-relaxed max-w-md"
            >
              {t('studioSection.description')}
            </motion.p>

            {/* Decorative divider */}
            <motion.div variants={fadeInLeft} className="divider-fade w-24" />
          </motion.div>

          {/* Right: Process Steps */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-8"
            >
              {t('processSection.label')}
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  custom={index}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  variants={stepVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  className="group glass-card gradient-border glow-hover p-6 lg:p-8 rounded-2xl cursor-default transition-all duration-500"
                >
                  {/* Step number with glow */}
                  <div className="relative mb-4">
                    <span className="text-5xl lg:text-6xl font-serif font-normal text-primary/20 group-hover:text-primary/40 transition-colors duration-500">
                      {step.number}
                    </span>
                    <div className="absolute inset-0 blur-2xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <h4 className="text-base lg:text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h4>

                  {/* Animated underline */}
                  <div className="mt-4 h-px bg-linear-to-r from-primary/50 to-transparent w-0 group-hover:w-full transition-all duration-500" />
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
