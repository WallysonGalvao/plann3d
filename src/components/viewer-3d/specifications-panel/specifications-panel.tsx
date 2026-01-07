import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GeometrySection } from './geometry-section'
import { ResourcesSection } from './resources-section'
import { PhysicalMeasuresSection } from './physical-measures-section'
import { FileSection } from './file-section'
import { PlaceholderSection } from './placeholder-section'
import { SpecificationsSettings } from './specifications-settings'
import { DEFAULT_SECTION_SETTINGS } from './types'
import type { ModelMetadata, SectionSettings } from './types'

interface SpecificationsPanelProps {
  /** Model metadata extracted from 3D model */
  metadata: ModelMetadata | null
  /** Current locale for number formatting */
  locale: string
  /** Whether the panel is visible */
  isVisible: boolean
  /** Callback when user toggles panel visibility */
  onToggleVisibility: () => void
  /** Display variant: side-panel (desktop) or bottom-sheet (mobile) */
  variant?: 'side-panel' | 'bottom-sheet'
}

const STORAGE_KEY = 'plann3d_specifications_settings'

/**
 * Modular Specifications Panel for 3D Viewer
 *
 * Features:
 * - Configurable sections via settings gear icon
 * - localStorage persistence for user preferences
 * - Conditional rendering based on available metadata
 * - Smooth animations and glass-morphism design
 * - Mobile bottom-sheet variant
 */
export function SpecificationsPanel({
  metadata,
  locale,
  isVisible,
  onToggleVisibility,
  variant = 'side-panel',
}: SpecificationsPanelProps) {
  const { t } = useTranslation()
  const [settings, setSettings] = useState<SectionSettings>(DEFAULT_SECTION_SETTINGS)

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as SectionSettings
        setSettings(parsed)
      }
    } catch (error) {
      console.error('Failed to load specifications settings:', error)
    }
  }, [])

  // Save settings to localStorage when changed
  const handleSettingsChange = (newSettings: SectionSettings) => {
    setSettings(newSettings)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings))
    } catch (error) {
      console.error('Failed to save specifications settings:', error)
    }
  }

  // Responsive positioning based on variant
  const panelClasses = variant === 'bottom-sheet'
    ? `fixed inset-x-0 bottom-0 h-[60vh] rounded-t-2xl z-40 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'
    }`
    : `absolute top-6 bottom-20 right-6 w-96 rounded-xl z-20 transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-[calc(100%+1.5rem)]'
    }`

  return (
    <aside
      className={`glass-panel flex flex-col shadow-2xl border border-border ${panelClasses}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-muted/5 rounded-t-xl relative">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
            {t('viewer3d.keySpecs')}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Settings Button */}
          <SpecificationsSettings settings={settings} onSettingsChange={handleSettingsChange} />

          {/* Close Button */}
          <button
            onClick={onToggleVisibility}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={t('viewer3d.closePanel')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 custom-scrollbar ${variant === 'bottom-sheet' ? 'pb-8' : ''
        }`}>
        {metadata ? (
          <>
            {/* Geometry Section */}
            {settings.geometry && <GeometrySection metadata={metadata} locale={locale} />}

            {/* Resources Section */}
            {settings.resources && <ResourcesSection metadata={metadata} />}

            {/* Physical Measures Section */}
            {settings.physicalMeasures && (
              <PhysicalMeasuresSection metadata={metadata} locale={locale} />
            )}

            {/* File Section */}
            {settings.file && <FileSection metadata={metadata} />}

            {/* Performance Section (placeholder) */}
            {settings.performance && (
              <PlaceholderSection
                title={t('viewer3d.performance')}
                icon={<ActivityIcon />}
                description={t('viewer3d.performanceDesc')}
              />
            )}

            {/* Lighting Section (placeholder) */}
            {settings.lighting && (
              <PlaceholderSection
                title={t('viewer3d.lighting')}
                icon={<LightbulbIcon />}
                description={t('viewer3d.lightingDesc')}
              />
            )}

            {/* Quality Section (placeholder) */}
            {settings.quality && (
              <PlaceholderSection
                title={t('viewer3d.quality')}
                icon={<SparklesIcon />}
                description={t('viewer3d.qualityDesc')}
              />
            )}

            {/* Project Info Section (placeholder) */}
            {settings.projectInfo && (
              <PlaceholderSection
                title={t('viewer3d.projectInfo')}
                icon={<InfoIcon />}
                description={t('viewer3d.projectInfoDesc')}
              />
            )}

            {/* Optimization Section (placeholder) */}
            {settings.optimization && (
              <PlaceholderSection
                title={t('viewer3d.optimization')}
                icon={<GaugeIcon />}
                description={t('viewer3d.optimizationDesc')}
              />
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground">{t('viewer3d.analyzing')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

// Icon components for placeholder sections
const ActivityIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
)

const LightbulbIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
)

const SparklesIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
)

const InfoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const GaugeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
)
