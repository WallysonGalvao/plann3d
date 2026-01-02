import { useTranslation } from 'react-i18next'

type VerticalProgressIndicatorProps = {
  items: Array<{
    id: string
    labelKey: string
  }>
  activeSection: string
}

const VerticalProgressIndicator = ({ items, activeSection }: VerticalProgressIndicatorProps) => {
  const { t } = useTranslation()

  // <a href="#spark" className="flex items-center gap-3 group">

  return (
    <div className="fixed left-2 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-start gap-6 z-40 animate-fade-in  px-3 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 transition-all hover:bg-background/90 hover:border-border">
      {items.map((item, index) => {
        const isActive = activeSection === item.id
        const translatedLabel = t(item.labelKey)

        return (
          <a key={item.id} href={`#${item.id}`} className="flex items-center gap-3 group">
            <span
              className={`text-xs tracking-widest transition-colors ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground group-hover:text-primary'}`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={`text-xs transition-colors ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}
            >
              {translatedLabel}
            </span>
          </a>
        )
      })}
    </div>
  )
}

export default VerticalProgressIndicator
