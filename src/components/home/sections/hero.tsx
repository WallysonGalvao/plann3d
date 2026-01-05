import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import heroBg from '@/assets/hero-bg.jpg'
import { Button } from '@/components/ui/button'
import { useToolRotation } from '@/hooks/useToolRotation'
import {
  heroItemVariants,
  staggerContainerSlow,
  statsContainerVariants,
  statsVariants,
} from '@/lib/motion-variants'

const HeroSection = () => {
  const { t } = useTranslation()

  // Define tools for rotation
  const tools = [
    {
      id: 'twinmotion',
      taglineKey: 'hero.tools.twinmotion.tagline',
      headline2Key: 'hero.tools.twinmotion.headline2',
      descriptionKey: 'hero.tools.twinmotion.description',
      stat1ValueKey: 'hero.tools.twinmotion.stats.value1',
      stat1LabelKey: 'hero.tools.twinmotion.stats.label1',
      stat2ValueKey: 'hero.tools.twinmotion.stats.value2',
      stat2LabelKey: 'hero.tools.twinmotion.stats.label2',
    },
    {
      id: 'tekla',
      taglineKey: 'hero.tools.tekla.tagline',
      headline2Key: 'hero.tools.tekla.headline2',
      descriptionKey: 'hero.tools.tekla.description',
      stat1ValueKey: 'hero.tools.tekla.stats.value1',
      stat1LabelKey: 'hero.tools.tekla.stats.label1',
      stat2ValueKey: 'hero.tools.tekla.stats.value2',
      stat2LabelKey: 'hero.tools.tekla.stats.label2',
    },
    {
      id: 'sketchup',
      taglineKey: 'hero.tools.sketchup.tagline',
      headline2Key: 'hero.tools.sketchup.headline2',
      descriptionKey: 'hero.tools.sketchup.description',
      stat1ValueKey: 'hero.tools.sketchup.stats.value1',
      stat1LabelKey: 'hero.tools.sketchup.stats.label1',
      stat2ValueKey: 'hero.tools.sketchup.stats.value2',
      stat2LabelKey: 'hero.tools.sketchup.stats.label2',
    },
    {
      id: 'blender',
      taglineKey: 'hero.tools.blender.tagline',
      headline2Key: 'hero.tools.blender.headline2',
      descriptionKey: 'hero.tools.blender.description',
      stat1ValueKey: 'hero.tools.blender.stats.value1',
      stat1LabelKey: 'hero.tools.blender.stats.label1',
      stat2ValueKey: 'hero.tools.blender.stats.value2',
      stat2LabelKey: 'hero.tools.blender.stats.label2',
    },
    {
      id: 'autocad',
      taglineKey: 'hero.tools.autocad.tagline',
      headline2Key: 'hero.tools.autocad.headline2',
      descriptionKey: 'hero.tools.autocad.description',
      stat1ValueKey: 'hero.tools.autocad.stats.value1',
      stat1LabelKey: 'hero.tools.autocad.stats.label1',
      stat2ValueKey: 'hero.tools.autocad.stats.value2',
      stat2LabelKey: 'hero.tools.autocad.stats.label2',
    },
    {
      id: 'premiere',
      taglineKey: 'hero.tools.premiere.tagline',
      headline2Key: 'hero.tools.premiere.headline2',
      descriptionKey: 'hero.tools.premiere.description',
      stat1ValueKey: 'hero.tools.premiere.stats.value1',
      stat1LabelKey: 'hero.tools.premiere.stats.label1',
      stat2ValueKey: 'hero.tools.premiere.stats.value2',
      stat2LabelKey: 'hero.tools.premiere.stats.label2',
    },
    {
      id: 'lumion',
      taglineKey: 'hero.tools.lumion.tagline',
      headline2Key: 'hero.tools.lumion.headline2',
      descriptionKey: 'hero.tools.lumion.description',
      stat1ValueKey: 'hero.tools.lumion.stats.value1',
      stat1LabelKey: 'hero.tools.lumion.stats.label1',
      stat2ValueKey: 'hero.tools.lumion.stats.value2',
      stat2LabelKey: 'hero.tools.lumion.stats.label2',
    },
  ]

  const { currentTool } = useToolRotation(tools, 4000)

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src={heroBg}
          alt="Architectural visualization"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover"
        />
        {/* Overlay - lighter for better image visibility */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Gradient overlay for depth - more subtle */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-24 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[70vh] lg:min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 lg:space-y-10"
          >
            {/* Headline with Dynamic Tool Rotation */}
            <motion.div variants={heroItemVariants} className="space-y-1 sm:space-y-2 relative">
              <div className="relative min-h-[1.2em]">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentTool.id}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.2] sm:leading-[1.15] tracking-tight text-white"
                  >
                    {t(currentTool.taglineKey)}
                  </motion.h1>
                </AnimatePresence>
              </div>
              <div className="relative min-h-[1.2em]">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`${currentTool.id}-headline2`}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.2] sm:leading-[1.15] tracking-tight text-white"
                  >
                    <span className="bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
                      {t(currentTool.headline2Key)}
                    </span>
                  </motion.h1>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Description with Dynamic Content */}
            <motion.div variants={heroItemVariants} className="max-w-xl">
              <div className="flex gap-4">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="w-1 bg-primary/80 rounded-full shrink-0"
                />
                <div className="overflow-hidden relative min-h-12">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentTool.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="text-sm md:text-base text-white/70 leading-relaxed"
                    >
                      {t(currentTool.descriptionKey)}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={heroItemVariants} className="flex flex-wrap gap-4">
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

          {/* Right Stats - Dynamic */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={statsContainerVariants}
            className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0"
          >
            <div className="flex flex-row lg:flex-col gap-6 lg:gap-8">
              <motion.div
                variants={statsVariants}
                className="p-4 lg:p-6 rounded-2xl text-center lg:text-right min-w-35"
              >
                <div className="overflow-hidden relative min-h-12">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${currentTool.id}-stat1`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-white"
                    >
                      {t(currentTool.stat1ValueKey)}
                      <span className="text-white/40">+</span>
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="overflow-hidden relative min-h-8 mt-2">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${currentTool.id}-stat1-label`}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                      className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/50"
                    >
                      {t(currentTool.stat1LabelKey)}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
              <motion.div
                variants={statsVariants}
                className="p-4 lg:p-6 rounded-2xl text-center lg:text-right min-w-35"
              >
                <div className="overflow-hidden relative min-h-12">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${currentTool.id}-stat2`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-white"
                    >
                      {t(currentTool.stat2ValueKey)}
                      <span className="text-white/40">+</span>
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="overflow-hidden relative min-h-8 mt-2">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${currentTool.id}-stat2-label`}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                      className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/50"
                    >
                      {t(currentTool.stat2LabelKey)}
                    </motion.p>
                  </AnimatePresence>
                </div>
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
            className="w-px bg-linear-to-b from-muted-foreground to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
