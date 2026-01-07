'use client'

/**
 * IFC Viewer Footer
 * Styled to match viewer-3d patterns - compact, semantic classes
 */

import { useIFCViewerStore } from '@/contexts/ifc-viewer-context'
import { PRESET_VIEWS, IFC_TYPE_FILTERS } from '@/types/ifc-viewer.types'

// ============================================
// PRESET VIEW BUTTON
// ============================================

interface PresetButtonProps {
  id: string
  name: string
  icon: string
  isActive: boolean
  onClick: () => void
}

function PresetButton({ name, icon, isActive, onClick }: PresetButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-8 px-3 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${isActive
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'bg-muted hover:bg-muted/80 border border-border text-foreground'
        }`}
    >
      <span className="material-symbols-outlined text-[14px]">{icon}</span>
      <span className="hidden md:inline">{name}</span>
    </button>
  )
}

// ============================================
// FILTER CHECKBOX
// ============================================

interface FilterCheckboxProps {
  label: string
  checked: boolean
  onChange: () => void
}

function FilterCheckbox({ label, checked, onChange }: FilterCheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer size-4 appearance-none rounded-sm border border-border bg-background checked:bg-primary checked:border-primary transition-all cursor-pointer"
        />
        <span className="absolute inset-0 flex items-center justify-center text-primary-foreground opacity-0 peer-checked:opacity-100 pointer-events-none material-symbols-outlined text-[14px]">
          check
        </span>
      </div>
      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </label>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export function IFCViewerFooter() {
  const activeCameraPreset = useIFCViewerStore((state) => state.activeCameraPreset)
  const setCameraPreset = useIFCViewerStore((state) => state.setCameraPreset)
  const visibleIfcTypes = useIFCViewerStore((state) => state.visibleIfcTypes)
  const toggleIfcTypeVisibility = useIFCViewerStore((state) => state.toggleIfcTypeVisibility)

  return (
    <footer className="h-12 md:h-14 bg-card border-t border-border shrink-0 flex items-center justify-between px-4 md:px-6 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-40 relative">
      {/* Preset Views */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase font-bold text-muted-foreground mr-2 tracking-widest hidden lg:block">
          Vistas
        </span>

        {PRESET_VIEWS.map((preset) => (
          <PresetButton
            key={preset.id}
            id={preset.id}
            name={preset.name}
            icon={preset.icon ?? 'view_in_ar'}
            isActive={activeCameraPreset === preset.id}
            onClick={() => setCameraPreset(activeCameraPreset === preset.id ? null : preset.id)}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 md:gap-4 border-l border-border pl-4 md:pl-6 h-8">
        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest hidden lg:block">
          Filtros
        </span>

        {IFC_TYPE_FILTERS.map((filter) => (
          <FilterCheckbox
            key={filter.key}
            label={filter.name}
            checked={visibleIfcTypes[filter.key] ?? true}
            onChange={() => toggleIfcTypeVisibility(filter.key)}
          />
        ))}
      </div>
    </footer>
  )
}
