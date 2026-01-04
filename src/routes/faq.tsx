import { Link, createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronDown, MessageCircle, Search } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { FaqCategory, FaqItem } from '@/data/faq'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { faqCategories, getFaqs } from '@/data/faq'
import { fadeInUp, staggerContainer } from '@/lib/motion-variants'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/faq')({
  component: FaqPage,
})

function FaqPage() {
  const { t } = useTranslation()
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openItemId, setOpenItemId] = useState<string | null>('1')

  // Get FAQs
  const faqItems = getFaqs()

  const filteredFaqs = faqItems.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      t(faq.questionKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(faq.answerKey).toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        {/* Hero Section */}
        <section id="faq-hero" className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(11, 15, 23, 0.7) 0%, rgba(11, 15, 23, 0.95) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCZE8xH8jhoFMVBBsLF-89nAflbKnsR4nakCtmDSQ388nwkXgMvH3AQPfY8I59SnhZzmIOLt0nDXdXUDU7RXm3OkUpwTCDJKJxglTbnQB_3anBauI-ovl9Dw1WNqlCbpR41ECcu-vrSIY25-Q6A6vSiqcg8i_Yy-RivarbagPxn6j2oHx8hUW0COcWkk4YIgKjChDFZrdyG4RVcJR0K8tm8er9plz6vf073MOT2KQM3vLxKbQBrekcTr98JDcdERQSIgSr75o1HGA")`,
              }}
            />
          </div>

          {/* Grain texture overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={isHeroInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20"
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.span variants={fadeInUp} className="label-premium inline-block mb-6">
                {t('faqPage.label')}
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white"
              >
                <span className="font-serif italic font-normal text-white/80">
                  {t('faqPage.title1').split(' ')[0]}{' '}
                </span>
                {t('faqPage.title1').split(' ').slice(1).join(' ')}
                <br />
                <span className="text-white/20">{t('faqPage.title2')}</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg text-white/70 mb-10">
                {t('faqPage.description')}
              </motion.p>

              {/* Search Bar */}
              <motion.div variants={fadeInUp} className="max-w-xl mx-auto">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 text-muted-foreground" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('faqPage.searchPlaceholder')}
                    className="w-full h-14 pl-12 pr-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Filters Section */}
        <section className="py-6 border-b border-border">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="flex gap-3 flex-wrap justify-center">
              {faqCategories.map((category) => (
                <motion.button
                  key={category.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.key)}
                  className={cn(
                    'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
                    activeCategory === category.key
                      ? 'bg-primary text-white'
                      : 'bg-secondary/50 text-foreground hover:bg-secondary border border-border hover:border-primary/40',
                  )}
                >
                  {t(category.labelKey)}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-3xl mx-auto space-y-4">
              <AnimatePresence mode="wait">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <FaqAccordionItem
                      key={faq.id}
                      faq={faq}
                      isOpen={openItemId === faq.id}
                      onToggle={() => setOpenItemId(openItemId === faq.id ? null : faq.id)}
                      index={index}
                    />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <p className="text-muted-foreground text-lg">{t('faqPage.noResults')}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto glass-card gradient-border rounded-2xl p-8 md:p-12 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('faqPage.cta.title')}</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                {t('faqPage.cta.description')}
              </p>
              <Link to="/contact">
                <Button size="lg" className="btn-premium">
                  <MessageCircle size={18} className="mr-2" />
                  {t('faqPage.cta.button')}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

interface FaqAccordionItemProps {
  faq: FaqItem
  isOpen: boolean
  onToggle: () => void
  index: number
}

function FaqAccordionItem({ faq, isOpen, onToggle, index }: FaqAccordionItemProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'rounded-xl border bg-secondary/30 overflow-hidden transition-all duration-300',
        isOpen ? 'border-primary/40' : 'border-border hover:border-primary/20',
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span className="text-foreground font-semibold">{t(faq.questionKey)}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-primary shrink-0"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 pt-0">
              <div className="border-t border-border pt-4">
                <p className="text-muted-foreground leading-relaxed">{t(faq.answerKey)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
