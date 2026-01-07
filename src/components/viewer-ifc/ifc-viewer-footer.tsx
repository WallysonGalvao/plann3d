'use client'

/**
 * IFC Viewer Footer
 * Preset views and filters based on reference design
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
      className={`h-9 px-4 rounded-sm text-xs font-bold flex items-center gap-2 transition-colors ${isActive
          ? 'bg-primary text-[#111718] border border-primary shadow-sm'
          : 'bg-gray-100 hover:bg-gray-200 border border-gray-300 text-[#111718]'
        }`}
    >
      <span className="material-symbols-outlined text-[16px]">{icon}</span>
      {name}
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
          className="peer size-4 appearance-none rounded-sm border border-gray-300 checked:bg-[#111718] checked:border-[#111718] transition-all cursor-pointer"
        />
        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 pointer-events-none material-symbols-outlined text-[14px]">
          check
        </span>
      </div>
      <span className="text-xs font-medium text-gray-600 group-hover:text-[#111718]">
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
    <footer className="h-16 bg-white border-t border-gray-200 shrink-0 flex items-center justify-between px-6 shadow-[-10px_0_30px_rgba(0,0,0,0.05)] z-40 relative">
      {/* Preset Views */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase font-bold text-gray-400 mr-2 tracking-widest">
          Vistas Predefinidas
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
      <div className="flex items-center gap-4 border-l border-gray-200 pl-6 h-10">
        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
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
