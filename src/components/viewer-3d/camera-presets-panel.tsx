import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Save, Trash2, Download, Upload, X } from 'lucide-react'
import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useCameraPresets, type CameraPreset } from '@/hooks/useCameraPresets'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import * as THREE from 'three'

interface CameraPresetsPanelProps {
  /** Project ID for storage key */
  projectId: string
  /** Current camera position */
  cameraPosition: THREE.Vector3
  /** Current camera target */
  cameraTarget: THREE.Vector3
  /** Callback when user loads a preset */
  onLoadPreset: (preset: CameraPreset) => void
}

/**
 * UI Panel for managing camera presets
 *
 * Allows users to save, load, delete, and export camera positions
 */
export function CameraPresetsPanel({
  projectId,
  cameraPosition,
  cameraTarget,
  onLoadPreset,
}: CameraPresetsPanelProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [presetName, setPresetName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    presets,
    savePreset,
    loadPreset,
    deletePreset,
    clearAllPresets,
    exportPresets,
    importPresets,
  } = useCameraPresets({ storageKey: projectId })

  const handleSave = () => {
    if (!presetName.trim()) return

    savePreset(presetName, cameraPosition, cameraTarget)
    setPresetName('')
    setIsSaving(false)
  }

  const handleLoad = (name: string) => {
    const preset = loadPreset(name)
    if (preset) {
      onLoadPreset(preset)
    }
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = event.target?.result as string
        importPresets(json)
      } catch (error) {
        console.error('Import failed:', error)
      }
    }
    reader.readAsText(file)
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-24 right-4 z-20 p-3 bg-background/80 backdrop-blur-sm border border-border rounded-lg hover:bg-background transition-colors shadow-lg"
        aria-label="Camera Presets"
      >
        <Camera size={20} className="text-foreground" />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute bottom-24 right-16 z-20 w-80 max-h-96 overflow-hidden"
          >
            <div className="bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Camera size={16} />
                  {t('viewer3d.cameraPresets.title', 'Camera Presets')}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
                {/* Save New Preset */}
                {!isSaving ? (
                  <Button
                    onClick={() => setIsSaving(true)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Save size={14} className="mr-2" />
                    {t('viewer3d.cameraPresets.saveNew', 'Save Current View')}
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder={t('viewer3d.cameraPresets.namePlaceholder', 'Enter name...')}
                      value={presetName}
                      onChange={(e) => setPresetName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                      autoFocus
                      className="flex-1"
                    />
                    <Button onClick={handleSave} size="sm" disabled={!presetName.trim()}>
                      {t('viewer3d.cameraPresets.save', 'Save')}
                    </Button>
                    <Button onClick={() => setIsSaving(false)} variant="ghost" size="sm">
                      {t('viewer3d.cameraPresets.cancel', 'Cancel')}
                    </Button>
                  </div>
                )}

                {/* Saved Presets */}
                {presets.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      {t('viewer3d.cameraPresets.saved', 'Saved Presets')} ({presets.length})
                    </p>
                    {presets.map((preset) => (
                      <div
                        key={preset.timestamp}
                        className="flex items-center justify-between p-2 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <button
                          onClick={() => handleLoad(preset.name)}
                          className="flex-1 text-left text-sm font-medium text-foreground"
                        >
                          {preset.name}
                        </button>
                        <button
                          onClick={() => deletePreset(preset.name)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
                        >
                          <Trash2 size={14} className="text-destructive" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-center text-muted-foreground py-4">
                    {t('viewer3d.cameraPresets.empty', 'No saved presets')}
                  </p>
                )}

                {/* Actions */}
                {presets.length > 0 && (
                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Button onClick={exportPresets} variant="ghost" size="sm" className="flex-1">
                      <Download size={14} className="mr-2" />
                      {t('viewer3d.cameraPresets.export', 'Export')}
                    </Button>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="ghost"
                      size="sm"
                      className="flex-1"
                    >
                      <Upload size={14} className="mr-2" />
                      {t('viewer3d.cameraPresets.import', 'Import')}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </div>
                )}

                {presets.length > 0 && (
                  <Button
                    onClick={() => {
                      if (confirm(t('viewer3d.cameraPresets.confirmClear', 'Clear all presets?'))) {
                        clearAllPresets()
                      }
                    }}
                    variant="ghost"
                    size="sm"
                    className="w-full text-destructive hover:text-destructive"
                  >
                    <Trash2 size={14} className="mr-2" />
                    {t('viewer3d.cameraPresets.clearAll', 'Clear All')}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
