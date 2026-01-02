import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import heroBg from '@/assets/hero-bg.jpg'

const HeroSection = () => {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroBg}
          alt="Architectural visualization"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Status Tag */}
            <div className="animate-fade-up">
              <span className="label-tag">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {t('hero.available')}
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight animate-fade-up-delay-1">
                {t('hero.headline1')}
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight animate-fade-up-delay-2">
                <span className="text-gradient">{t('hero.headline2')}</span>
              </h1>
            </div>

            {/* Description */}
            <div className="max-w-lg animate-fade-up-delay-3">
              <div className="flex gap-4">
                <div className="w-1 bg-primary rounded-full" />
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t('hero.description')}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-up-delay-3">
              <Button variant="outline" size="lg" asChild>
                <a href="#projects">{t('hero.viewProjects')}</a>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="#showreel" className="flex items-center gap-2">
                  <Play size={18} className="fill-current" />
                  {t('hero.showreel')}
                </a>
              </Button>
            </div>
          </div>

          {/* Right Stats */}
          <div className="lg:col-span-5 flex lg:justify-end">
            <div className="space-y-8 animate-fade-up-delay-3">
              <div className="text-right">
                <p className="text-5xl lg:text-6xl font-bold">50+</p>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">
                  {t('hero.projectsDelivered')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-5xl lg:text-6xl font-bold">1000+</p>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">
                  {t('hero.renderHours')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-6 lg:right-12 hidden lg:flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground rotate-90 origin-center translate-x-4">
            {t('hero.scroll')}
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
