import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import heroBg from '@/assets/hero-bg.jpg'
import { Button } from '@/components/ui/button'

const HeroSection = () => {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }

  const statsVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src={heroBg}
          alt="Architectural visualization"
          className="w-full h-full object-cover"
        />
        {/* Overlay - lighter for better image visibility */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Gradient overlay for depth - more subtle */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />
      </motion.div>

      {/* Content with fade on scroll */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 container mx-auto px-6 lg:px-12 pt-24 pb-16"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[70vh] lg:min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 lg:space-y-10"
          >
            {/* Status Tag - Premium */}
            <motion.div variants={itemVariants}>
              <span className="label-premium">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {t('hero.available')}
              </span>
            </motion.div>

            {/* Headline with Serif Accent */}
            <motion.div variants={itemVariants} className="space-y-1 sm:space-y-2">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.1] sm:leading-[1.05] tracking-tight">
                <span className="font-serif italic font-normal opacity-80">
                  {t('hero.headline1').split(' ')[0]}{' '}
                </span>
                {t('hero.headline1').split(' ').slice(1).join(' ')}
              </h1>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.1] sm:leading-[1.05] tracking-tight">
                <span className="text-gradient">{t('hero.headline2')}</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="max-w-xl">
              <div className="flex gap-4">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="w-1 bg-primary/80 rounded-full shrink-0"
                />
                <p className="text-sm md:text-base text-white/60 leading-relaxed">
                  {t('hero.description')}
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button variant="outline" size="lg" asChild>
                <Link to="/projects">{t('hero.viewProjects')}</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="#showreel" className="flex items-center gap-2">
                  <Play size={18} className="fill-current" />
                  {t('hero.showreel')}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Stats */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.8,
                },
              },
            }}
            className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0"
          >
            <div className="flex flex-row lg:flex-col gap-6 lg:gap-8">
              <motion.div
                variants={statsVariants}
                className="p-4 lg:p-6 rounded-2xl text-center lg:text-right"
              >
                <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-white">
                  50<span className="text-foreground/40">+</span>
                </p>
                <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-foreground/50 mt-2">
                  {t('hero.projectsDelivered')}
                </p>
              </motion.div>
              <motion.div
                variants={statsVariants}
                className="p-4 lg:p-6 rounded-2xl text-center lg:text-right"
              >
                <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-white">
                  1000<span className="text-foreground/40">+</span>
                </p>
                <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-foreground/50 mt-2">
                  {t('hero.renderHours')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 right-6 lg:right-12 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground rotate-90 origin-center translate-x-4">
            {t('hero.scroll')}
          </span>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 64 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="w-px bg-gradient-to-b from-muted-foreground to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
