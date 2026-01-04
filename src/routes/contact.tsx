import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { motion, useInView } from 'framer-motion'
import debounce from 'lodash.debounce'
import { ArrowRight } from 'lucide-react'
import { useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { z } from 'zod'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { fadeInLeft, fadeInUp, staggerContainer } from '@/lib/motion-variants'

export const Route = createFileRoute('/contact')({ component: Contact })

function Contact() {
  const { t } = useTranslation()
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const isLeftInView = useInView(leftRef, { once: true, margin: '-100px' })
  const isRightInView = useInView(rightRef, { once: true, margin: '-100px' })

  const contactSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, t('contactPage.form.errors.nameRequired'))
      .max(100, t('contactPage.form.errors.nameMax')),
    email: z
      .string()
      .trim()
      .email(t('contactPage.form.errors.invalidEmail'))
      .max(255, t('contactPage.form.errors.emailMax')),
    projectType: z.string().min(1, t('contactPage.form.errors.selectProjectType')),
    details: z
      .string()
      .trim()
      .min(1, t('contactPage.form.errors.detailsRequired'))
      .max(2000, t('contactPage.form.errors.detailsMax')),
  })

  type ContactFormValues = z.infer<typeof contactSchema>

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      projectType: '',
      details: '',
    },
  })

  const handleSubmit = async (data: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast.success(t('contactPage.form.successTitle'), {
      description: t('contactPage.form.successDesc'),
    })
    form.reset()
    // eslint-disable-next-line no-console
    console.log('Form submitted:', data)
  }

  const debouncedSubmit = useMemo(
    () =>
      debounce((data: ContactFormValues) => {
        void handleSubmit(data)
      }, 500),
    [t],
  )

  const projectTypes = [
    { value: 'archViz', label: t('contactPage.form.archViz') },
    { value: 'interiorViz', label: t('contactPage.form.interiorViz') },
    { value: 'animation', label: t('contactPage.form.animation') },
    { value: 'twinmotion', label: t('contactPage.form.twinmotion') },
    { value: 'bimModel', label: t('contactPage.form.bimModel') },
    { value: 'conceptDesign', label: t('contactPage.form.conceptDesign') },
    { value: 'cinematicVideo', label: t('contactPage.form.cinematicVideo') },
    { value: 'virtualExp', label: t('contactPage.form.virtualExp') },
    { value: 'competition', label: t('contactPage.form.competition') },
    { value: 'other', label: t('contactPage.form.other') },
  ]

  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <div className="relative min-h-[calc(100vh-5rem)] grid lg:grid-cols-2 overflow-hidden">
          {/* Decorative background number */}
          <span className="section-number left-0 top-20 hidden lg:block">C</span>
          {/* Left Column */}
          <motion.div
            ref={leftRef}
            initial="hidden"
            animate={isLeftInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="relative z-10 bg-background px-6 lg:px-12 xl:px-20 py-16 lg:py-24 flex flex-col justify-center"
          >
            <div className="max-w-lg">
              <motion.span variants={fadeInLeft} className="label-premium mb-8 inline-block">
                {t('contactPage.label')}
              </motion.span>
              <motion.h1
                variants={fadeInLeft}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight mb-8"
              >
                <span className="font-serif italic font-normal text-muted-foreground">
                  {t('contactPage.title1').split(' ')[0]}{' '}
                </span>
                {t('contactPage.title1').split(' ').slice(1).join(' ')}
                <span className="block text-gradient">{t('contactPage.title2')}</span>
              </motion.h1>
              <motion.p
                variants={fadeInLeft}
                className="text-lg text-muted-foreground leading-relaxed mb-12"
              >
                {t('contactPage.description')}
              </motion.p>

              {/* Decorative divider */}
              <motion.div variants={fadeInLeft} className="divider-fade w-32" />
            </div>
          </motion.div>

          {/* Right Column - Form with Glass Effect */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 40 }}
            animate={isRightInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 glass-card px-6 lg:px-12 xl:px-20 py-16 lg:py-24 flex items-center"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(debouncedSubmit)}
                className="w-full max-w-xl mx-auto space-y-8">
                {/* Form header */}
                <div className="text-center lg:text-left mb-8">
                  <h2 className="text-2xl font-semibold mb-2">
                    <span className="font-serif italic font-normal text-muted-foreground">{t('contactPage.form.headerTitle').split(' ')[0]}</span> {t('contactPage.form.headerTitle').split(' ').slice(1).join(' ')}
                  </h2>
                  <p className="text-sm text-muted-foreground">{t('contactPage.form.headerSubtitle')}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <motion.div custom={0} variants={formFieldVariants} initial="hidden" animate="visible">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contactPage.form.name')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('contactPage.form.namePlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div custom={1} variants={formFieldVariants} initial="hidden" animate="visible">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contactPage.form.email')}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t('contactPage.form.emailPlaceholder')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </div>
                <motion.div custom={2} variants={formFieldVariants} initial="hidden" animate="visible">
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contactPage.form.projectType')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('contactPage.form.selectProjectType')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {projectTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div custom={3} variants={formFieldVariants} initial="hidden" animate="visible">
                  <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contactPage.form.projectDetails')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('contactPage.form.projectDetailsPlaceholder')}
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div custom={4} variants={formFieldVariants} initial="hidden" animate="visible">
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        t('contactPage.form.sending')
                      ) : (
                        <>
                          {t('contactPage.form.sendInquiry')}
                          <motion.span
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight size={18} />
                          </motion.span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.p
                  custom={5}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-xs text-center text-muted-foreground"
                >
                  {t('contactPage.form.privacyNote')}{' '}
                  <a
                    href="#"
                    className="underline hover:text-foreground transition-colors"
                  >
                    {t('contactPage.form.privacyPolicy')}
                  </a>
                  .
                </motion.p>
              </form>
            </Form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
