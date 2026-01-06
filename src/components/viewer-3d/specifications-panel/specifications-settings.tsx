import { motion, AnimatePresence } from 'framer-motion'
import { Settings } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { SectionSettings } from './types'

interface SpecificationsSettingsProps {
  settings: SectionSettings
  onSettingsChange: (settings: SectionSettings) => void
}

export function SpecificationsSettings({
  settings,
  onSettingsChange,
}: SpecificationsSettingsProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSetting = (key: keyof SectionSettings) => {
    console.log('Toggle clicked:', key, 'current:', settings[key], 'new:', !settings[key])
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    }
    console.log('Calling onSettingsChange with:', newSettings)
    onSettingsChange(newSettings)
  }

  const sections = [
    { key: 'geometry' as const, label: t('viewer3d.geometry'), description: t('viewer3d.geometryDesc', 'Triangles, vertices, objects, detail level') },
    { key: 'resources' as const, label: t('viewer3d.resources'), description: t('viewer3d.resourcesDesc', 'Materials, textures, animations') },
    { key: 'physicalMeasures' as const, label: t('viewer3d.physicalMeasures'), description: t('viewer3d.physicalMeasuresDesc', 'Dimensions, area, volume') },
    { key: 'file' as const, label: t('viewer3d.file'), description: t('viewer3d.fileDesc', 'Format, file size') },
    { key: 'performance' as const, label: t('viewer3d.performance', 'Performance'), description: t('viewer3d.performanceDesc', 'FPS, draw calls, memory usage') },
    { key: 'lighting' as const, label: t('viewer3d.lighting', 'Lighting'), description: t('viewer3d.lightingDesc', 'Light sources and shadows') },
    { key: 'quality' as const, label: t('viewer3d.quality', 'Quality'), description: t('viewer3d.qualityDesc', 'Render quality settings') },
    { key: 'projectInfo' as const, label: t('viewer3d.projectInfo', 'Project Info'), description: t('viewer3d.projectInfoDesc', 'Author, date, version') },
    { key: 'optimization' as const, label: t('viewer3d.optimization', 'Optimization'), description: t('viewer3d.optimizationDesc', 'Compression, LOD, instances') },
  ]

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label={t('viewer3d.settings', 'Settings')}
        title={t('viewer3d.settingsTooltip', 'Configure visible sections')}
      >
        <Settings size={20} className={isOpen ? 'text-primary' : ''} />
      </button>

      {/* Settings Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Settings Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-12 right-0 z-50 w-80 bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-border bg-muted/5">
                <div className="flex items-center gap-2 mb-1">
                  <Settings size={16} className="text-primary" />
                  <h3 className="text-sm font-bold text-foreground">
                    {t('viewer3d.settingsTitle', 'Panel Settings')}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('viewer3d.settingsDescription', 'Choose which sections to display')}
                </p>
              </div>

              {/* Settings List */}
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                <div className="p-2 space-y-1">
                  {sections.map((section) => (
                    <label
                      key={section.key}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/10 cursor-pointer transition-colors group"
                    >
                      {/* Toggle Switch */}
                      <div className="relative flex-shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          checked={settings[section.key]}
                          onChange={() => toggleSetting(section.key)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-muted border border-border rounded-full peer-checked:bg-primary transition-colors">
                          <div
                            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-background rounded-full shadow-sm transition-transform ${
                              settings[section.key] ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Label and Description */}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {section.label}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {section.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-border bg-muted/5 flex items-center justify-between">
                <button
                  onClick={() => {
                    // Enable all sections
                    const allEnabled = Object.keys(settings).reduce(
                      (acc, key) => ({ ...acc, [key]: true }),
                      {} as SectionSettings,
                    )
                    onSettingsChange(allEnabled)
                  }}
                  className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {t('viewer3d.enableAll', 'Enable All')}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
                >
                  {t('viewer3d.close', 'Close')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
