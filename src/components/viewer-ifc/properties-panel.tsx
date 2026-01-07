'use client'

/**
 * IFC Properties Panel
 * Displays selected element properties based on reference design
 */

import { useIFCViewerStore } from '@/contexts/ifc-viewer-context'

// ============================================
// PROPERTY ROW
// ============================================

interface PropertyRowProps {
  label: string
  value: string | number | undefined
  unit?: string
}

function PropertyRow({ label, value, unit }: PropertyRowProps) {
  if (value === undefined) return null

  return (
    <div className="p-2 bg-gray-50 rounded-sm border border-gray-100">
      <div className="text-[10px] text-gray-400 uppercase">{label}</div>
      <div className="text-xs font-mono font-medium">
        {value}
        {unit && ` ${unit}`}
      </div>
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export function IFCPropertiesPanel() {
  const selectedElementProps = useIFCViewerStore((state) => state.selectedElementProps)
  const showPropertiesPanel = useIFCViewerStore((state) => state.showPropertiesPanel)
  const togglePropertiesPanel = useIFCViewerStore((state) => state.togglePropertiesPanel)

  if (!showPropertiesPanel) {
    return (
      <button
        onClick={togglePropertiesPanel}
        className="absolute top-20 right-4 bg-white/95 backdrop-blur border border-gray-200 shadow-xl rounded-sm p-2 z-10 hover:bg-gray-50 transition-colors"
        title="Mostrar propriedades"
      >
        <span className="material-symbols-outlined text-[20px] text-gray-600">info</span>
      </button>
    )
  }

  return (
    <div className="absolute top-20 right-4 w-64 bg-white/95 backdrop-blur border border-gray-200 shadow-xl rounded-sm p-3 z-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold uppercase text-gray-500">Propriedades</h3>
        <button
          onClick={togglePropertiesPanel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>

      {/* Content */}
      {selectedElementProps ? (
        <div className="space-y-2">
          {/* Element Name */}
          <div className="p-2 bg-gray-50 rounded-sm border border-gray-100">
            <div className="text-[10px] text-gray-400 uppercase">Elemento</div>
            <div className="text-sm font-bold text-[#111718]">
              {selectedElementProps.name ?? selectedElementProps.type ?? 'Elemento Selecionado'}
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-2 gap-2">
            <PropertyRow
              label="Comprimento"
              value={selectedElementProps.dimensions?.length}
              unit="mm"
            />
            <PropertyRow
              label="Peso"
              value={selectedElementProps.weight}
              unit="kg"
            />
          </div>

          {/* Material */}
          {selectedElementProps.material && (
            <PropertyRow label="Material" value={selectedElementProps.material} />
          )}

          {/* View All Button */}
          <button className="w-full text-center text-xs text-primary font-bold hover:underline py-1">
            Ver todos os atributos
          </button>
        </div>
      ) : (
        <div className="text-center py-6 text-gray-400 text-xs">
          <span className="material-symbols-outlined text-[32px] mb-2 block opacity-50">
            touch_app
          </span>
          Clique em um elemento para ver suas propriedades
        </div>
      )}
    </div>
  )
}
