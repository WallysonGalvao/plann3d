import { createFileRoute } from '@tanstack/react-router'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import type {Tool} from '@/data/tools';
import Footer from '@/components/footer'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import {  tools } from '@/data/tools'
import { fadeInUp, staggerContainer } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/tools')({
  component: ToolsPage,
})

function ToolsPage() {
  const { t } = useTranslation()
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        {/* Hero Section */}
        <section id="tools-hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(11, 15, 23, 0.4) 0%, rgba(11, 15, 23, 1) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPduKLwONKr8Bf8KDrl4tGZWtlw7ujO-gsCLQdJoFy6VCBjgdN4_cuTp7031NeSyi4GmPmZpiX6RF6e_MDCR0vr_fcZffZbh5-tOqMFZSBRZEY_kALtQGML55PWv3B3kiYVXUJblf5DwuG6Ht7UzZj3ZZwB10jMZowo-LLE5jVWoIpPTRo-HZpdZ68IRyqcbQpexf4ZooFl_NWnnd5A2l8_0C5_00qudFtinA56lyFupQIBOaIsFva_eFWa3ITS0qa7xEtNzXwgR8")`,
              }}
            />
          </div>

          {/* Decorative section number */}
          <span className="section-number -right-8 top-20 hidden lg:block">T</span>

          {/* Grain texture overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={isHeroInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="label-premium inline-block mb-6"
            >
              {t('toolsPage.label')}
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white"
            >
              <span className="font-serif italic font-normal text-white/80">
                {t('toolsPage.title1').split(' ')[0]}{' '}
              </span>
              {t('toolsPage.title1').split(' ').slice(1).join(' ')}
              <br />
              <span className="text-white/20">{t('toolsPage.title2')}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
            >
              {t('toolsPage.description')}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button size="lg" className="btn-premium">
                {t('toolsPage.exploreCta')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce"
          >
            <ArrowRight className="rotate-90" size={24} />
          </motion.div>
        </section>

        {/* Tools Sections */}
        {tools.map((tool, index) => (
          <ToolSection key={tool.id} tool={tool} index={index} />
        ))}
      </main>

      <Footer />
    </div>
  )
}

interface ToolSectionProps {
  tool: Tool
  index: number
}

function ToolSection({ tool, index }: ToolSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const isReversed = index % 2 === 1

  const CategoryIcon = tool.categoryIcon

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={cn(
        'relative min-h-screen flex items-center py-20 lg:py-32 border-t border-border overflow-hidden',
        isReversed ? 'bg-secondary/30' : 'bg-background',
      )}
    >
      {/* Decorative number - alternates left/right */}
      <span
        className={cn(
          'section-number top-20 hidden lg:block text-white/2',
          isReversed ? '-right-8' : '-left-8',
        )}
      >
        0{index + 1}
      </span>

      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div
          className={cn(
            'grid lg:grid-cols-2 gap-12 lg:gap-20 items-center',
            isReversed && 'lg:[&>*:first-child]:order-2',
          )}
        >
          {/* Content */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-8">
            {/* Category badge */}
            <div className="flex items-center gap-3 text-primary">
              <CategoryIcon size={28} />
              <span className="font-bold tracking-wider uppercase text-sm">
                {tool.category}
              </span>
            </div>

            {/* Title and description */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                <span className="font-serif italic font-normal">{tool.name.split('')[0]}</span>
                {tool.name.slice(1).toUpperCase()}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {tool.description}
              </p>
            </div>

            {/* Features list or grid */}
            {tool.features.length > 0 && (
              <div
                className={cn(
                  'mt-4',
                  tool.features[0].icon
                    ? 'grid grid-cols-2 gap-4'
                    : 'flex flex-col gap-4 border-l-2 border-border pl-6',
                )}
              >
                {tool.features.map((feature, i) =>
                  feature.icon ? (
                    <div
                      key={i}
                      className="glass-card p-4 rounded-xl border border-border"
                    >
                      <feature.icon className="text-primary mb-2" size={24} />
                      <h4 className="text-foreground font-bold">{feature.title}</h4>
                      <p className="text-muted-foreground text-xs mt-1">
                        {feature.description}
                      </p>
                    </div>
                  ) : (
                    <div key={i} className="flex flex-col">
                      <h4 className="text-foreground font-bold text-lg">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  ),
                )}
              </div>
            )}

            {/* Tags */}
            {tool.tags && tool.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full glass-card border border-border text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <motion.button
              whileHover={{ x: 8 }}
              className="w-fit flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors group mt-2"
            >
              <span>{tool.cta.label}</span>
              {tool.cta.icon === 'play_circle' ? (
                <Play size={20} className="group-hover:text-primary transition-colors" />
              ) : (
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </motion.button>
          </motion.div>

          {/* Visual */}
          <motion.div
            variants={fadeInUp}
            className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-premium group"
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${tool.image}")` }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />

            {/* Gradient overlay */}
            <div
              className={cn(
                'absolute inset-0',
                isReversed
                  ? 'bg-gradient-to-r from-black/20 to-transparent'
                  : 'bg-gradient-to-t from-black/60 to-transparent',
              )}
            />

            {/* Play button for Blender */}
            {tool.id === 'blender' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-full glass-card border border-white/20 flex items-center justify-center cursor-pointer group-hover:bg-primary transition-colors"
                >
                  <Play className="text-white ml-1" size={32} fill="white" />
                </motion.div>
              </div>
            )}

            {/* Badge */}
            <div
              className={cn(
                'absolute bottom-6 flex items-center gap-2 px-4 py-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg',
                isReversed ? 'right-6' : 'left-6',
              )}
            >
              <span className="text-white text-sm font-semibold uppercase tracking-wider">
                {tool.badge.label}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
