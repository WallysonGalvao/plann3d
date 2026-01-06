'use client'

import { ModelQuality } from '@/hooks/useProgressiveModel'

interface QualityStatus {
  available: boolean
  loading: boolean
  loaded: boolean
}

interface QualitySelectorProps {
  /** Current quality level */
  currentQuality: ModelQuality
  /** Status of each quality level */
  qualityStatus: Record<ModelQuality, QualityStatus>
  /** Callback when quality is selected */
  onQualityChange: (quality: ModelQuality) => void
  /** Loading progress 0-100 */
  progress: number
}

const qualityLabels: Record<ModelQuality, { label: string; description: string }> = {
  low: { label: 'Baixa', description: 'Carregamento rápido' },
  medium: { label: 'Média', description: 'Balanceado' },
  high: { label: 'Alta', description: 'Máxima qualidade' },
}

const qualityOrder: ModelQuality[] = ['low', 'medium', 'high']

/**
 * Quality selector component for choosing LOD level.
 * Displays available, loading, and locked states for each quality.
 */
export function QualitySelector({
  currentQuality,
  qualityStatus,
  onQualityChange,
  progress,
}: QualitySelectorProps) {
  return (
    <div className="glass-panel p-4 rounded-xl shadow-2xl w-56">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-foreground uppercase tracking-wide">
          Qualidade
        </h4>
        <span className="text-xs text-muted-foreground font-mono">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted/30 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Quality options */}
      <div className="space-y-2">
        {qualityOrder.map((q) => {
          const status = qualityStatus[q]
          const isSelected = currentQuality === q
          const canSelect = status.available && status.loaded
          const isLoading = status.loading

          return (
            <button
              key={q}
              onClick={() => canSelect && onQualityChange(q)}
              disabled={!canSelect}
              className={`
                w-full flex items-center justify-between px-3 py-2.5 rounded-lg
                transition-all duration-200 group
                ${isSelected
                  ? 'bg-primary/20 border border-primary/50 text-primary'
                  : canSelect
                    ? 'bg-muted/10 hover:bg-muted/20 text-foreground border border-transparent'
                    : 'bg-muted/5 text-muted-foreground/50 cursor-not-allowed border border-transparent'
                }
              `}
            >
              <div className="flex items-center gap-3">
                {/* Status indicator */}
                <div className="relative">
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  ) : status.loaded ? (
                    <div className={`w-4 h-4 rounded-full ${isSelected ? 'bg-primary' : 'bg-green-500'
                      }`}>
                      <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30">
                      <svg className="w-4 h-4 text-muted-foreground/30" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1a2 2 0 00-2 2v4H4a2 2 0 00-2 2v5a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2h-2V3a2 2 0 00-2-2zm0 2v4h2V3H8z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Label */}
                <div className="text-left">
                  <div className="text-sm font-medium">{qualityLabels[q].label}</div>
                  <div className="text-xs text-muted-foreground">
                    {isLoading ? 'Baixando...' : qualityLabels[q].description}
                  </div>
                </div>
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>

      {/* Help text */}
      <p className="mt-3 text-xs text-muted-foreground text-center">
        Modelos de maior qualidade são baixados em segundo plano
      </p>
    </div>
  )
}
