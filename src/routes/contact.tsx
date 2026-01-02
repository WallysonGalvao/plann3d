import { useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import debounce from 'lodash.debounce'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { z } from 'zod'

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

export const Route = createFileRoute('/contact')({ component: Contact })

function Contact() {
  const { t } = useTranslation()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  )

  const projectTypes = [
    { value: "archViz", label: t("contactPage.form.archViz") },
    { value: "interiorViz", label: t("contactPage.form.interiorViz") },
    { value: "animation", label: t("contactPage.form.animation") },
    { value: "virtualExp", label: t("contactPage.form.virtualExp") },
    { value: "competition", label: t("contactPage.form.competition") },
    { value: "other", label: t("contactPage.form.other") },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <div className="min-h-[calc(100vh-5rem)] grid lg:grid-cols-2">
          {/* Left Column */}
          <div className="bg-background px-6 lg:px-12 xl:px-20 py-16 lg:py-24 flex flex-col justify-center">
            <div className="max-w-lg">
              <span className="label-tag mb-8 inline-block">{t("contactPage.label")}</span>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight mb-8">
                {t("contactPage.title1")}<span className="block text-gradient">{t("contactPage.title2")}</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">{t("contactPage.description")}</p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-secondary/30 px-6 lg:px-12 xl:px-20 py-16 lg:py-24 flex items-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(debouncedSubmit)} className="w-full max-w-xl mx-auto space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contactPage.form.name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("contactPage.form.namePlaceholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contactPage.form.email")}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t("contactPage.form.emailPlaceholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contactPage.form.projectType")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("contactPage.form.selectProjectType")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contactPage.form.projectDetails")}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t("contactPage.form.projectDetailsPlaceholder")} rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? t("contactPage.form.sending") : <>{t("contactPage.form.sendInquiry")}<ArrowRight size={18} /></>}
                </Button>
                <p className="text-xs text-center text-muted-foreground">{t("contactPage.form.privacyNote")} <a href="#" className="underline hover:text-foreground transition-colors">{t("contactPage.form.privacyPolicy")}</a>.</p>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}
