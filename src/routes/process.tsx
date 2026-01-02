import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/process')({ component: Process })

function Process() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        <h1 className="text-4xl font-bold mb-4">{t('nav.process')}</h1>
        <p className="text-muted-foreground">
          Process page content coming soon...
        </p>
      </div>
    </div>
  )
}
