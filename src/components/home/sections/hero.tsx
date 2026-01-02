import { Link } from '@tanstack/react-router'
import { Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import heroBg from '@/assets/hero-bg.jpg'
import { Button } from '@/components/ui/button'

const HeroSection = () => {
  const { t } = useTranslation()

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <img
        src={heroBg}
        alt="Architectural visualization"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay - lighter for better image visibility */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Gradient overlay for depth - more subtle */}
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-24 pb-16">
        <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-10">
            {/* Status Tag */}
            <div className="animate-fade-up">
              <span className="label-tag">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {t('hero.available')}
              </span>
            </div>

            {/* Headline - refined typography */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.05] tracking-tight animate-fade-up-delay-1">
                {t('hero.headline1')}
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[1.05] tracking-tight animate-fade-up-delay-2">
                <span className="text-gradient">{t('hero.headline2')}</span>
              </h1>
            </div>

            {/* Description - reduced opacity for hierarchy */}
            <div className="max-w-xl animate-fade-up-delay-3">
              <div className="flex gap-4">
                <div className="w-1 bg-primary/80 rounded-full shrink-0" />
                <p className="text-sm md:text-base text-white/60 leading-relaxed">
                  {t('hero.description')}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-up-delay-3">
              <Button variant="outline" size="lg" asChild>
                <Link to="/projects">{t('hero.viewProjects')}</Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="#showreel" className="flex items-center gap-2">
                  <Play size={18} className="fill-current" />
                  {t('hero.showreel')}
                </a>
              </Button>
            </div>
          </div>

          {/* Right Stats - isolated visually with stronger hierarchy */}
          <div className="lg:col-span-5 flex lg:justify-end">
            <div className="space-y-10 animate-fade-up-delay-3">
              <div className="text-right">
                <p className="text-5xl lg:text-6xl font-semibold tracking-tight">50+</p>
                <p className="text-xs tracking-[0.2em] uppercase text-white/40 mt-2">
                  {t('hero.projectsDelivered')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-5xl lg:text-6xl font-semibold tracking-tight">1000+</p>
                <p className="text-xs tracking-[0.2em] uppercase text-white/40 mt-2">
                  {t('hero.renderHours')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 right-6 lg:right-12 hidden lg:flex flex-col items-center gap-3">
          <span className="text-xs tracking-[0.3em] uppercase text-white/40 rotate-90 origin-center translate-x-4">
            {t('hero.scroll')}
          </span>
          <div className="w-px h-20 bg-linear-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
