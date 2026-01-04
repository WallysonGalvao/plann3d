import { motion } from 'framer-motion'
import { Building2, Eye, Film, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { SectionHeader } from '@/components/section-header'
import { useAnimatedSection } from '@/hooks/useAnimatedSection'
import { scaleIn, staggerContainer } from '@/lib/motion-variants'

const ServicesSection = () => {
  const { t } = useTranslation()
  const { ref: sectionRef, isInView } = useAnimatedSection<HTMLElement>()

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
    <section ref={sectionRef} id="services" className="relative py-24 lg:py-32 bg-secondary/30 overflow-hidden">
      {/* Decorative section number */}
      <span className="section-number -left-8 top-0 hidden lg:block">02</span>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <SectionHeader
          label={t('services.label')}
          title={t('services.title')}
          description={t('services.description')}
          align="center"
          isInView={isInView}
          className="mb-20"
        />

        {/* Services Grid with Glass Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={scaleIn}
              whileHover={{
                y: -8,
                transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              className="group glass-card gradient-border glow-hover p-8 lg:p-10 rounded-2xl transition-all duration-500"
            >
              {/* Card number accent */}
              <span className="absolute top-6 right-6 text-6xl font-serif text-foreground/5 font-normal">
                0{index + 1}
              </span>

              <motion.div
                className="relative w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all duration-500"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <service.icon size={30} className="text-primary" />
                {/* Glow behind icon */}
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              <h3 className="relative text-xl lg:text-2xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="relative text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
