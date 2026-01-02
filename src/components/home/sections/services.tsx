import { motion, useInView } from 'framer-motion'
import { Building2, Eye, Film, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { fadeInUp, scaleIn, staggerContainer } from '@/lib/motion-variants'

const ServicesSection = () => {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const services = [
    {
      icon: Eye,
      title: t('services.archViz'),
      description: t('services.archVizDesc'),
    },
    {
      icon: Film,
      title: t('services.animation'),
      description: t('services.animationDesc'),
    },
    {
      icon: Sparkles,
      title: t('services.virtual'),
      description: t('services.virtualDesc'),
    },
    {
      icon: Building2,
      title: t('services.presentation'),
      description: t('services.presentationDesc'),
    },
  ]

  return (
    <section ref={sectionRef} id="services" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label">{t('services.label')}</span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mt-4 mb-6">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('services.description')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={scaleIn}
              whileHover={{
                y: -4,
                transition: { duration: 0.3 },
              }}
              className="group p-8 lg:p-10 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card transition-all duration-500"
            >
              <motion.div
                className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <service.icon size={28} className="text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
