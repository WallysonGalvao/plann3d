import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Expand, Play, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface GalleryMediaItem {
  id: string
  type: 'image' | 'video'
  src: string
  phaseNumber: string
  phaseLabel: string
  title: string
  description: string
  badge?: string
  software?: string
}

interface MediaGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  items: GalleryMediaItem[]
  initialIndex?: number
}

export function MediaGalleryModal({
  isOpen,
  onClose,
  items,
  initialIndex = 0,
}: MediaGalleryModalProps) {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Update current index when initialIndex changes or when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
    }
  }, [initialIndex, isOpen])

  // Navigate to previous item
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }, [])

  // Navigate to next item
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev))
  }, [items.length])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    },
    [isOpen, onClose, goToPrevious, goToNext]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!items.length) return null

  const currentItem = items[currentIndex]
  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < items.length - 1

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-100 flex flex-col gallery-modal-backdrop"
        >
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:py-6 md:px-12 gallery-header">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-xs text-white/50 dark:text-white/40 uppercase tracking-widest font-mono">
                  {t('projectDetail.gallery', 'Galeria')}
                </span>
                <h2 className="text-white text-lg font-bold leading-tight tracking-wider uppercase">
                  {currentItem?.title || ''}
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10">
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="size-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white"
              >
                <X size={20} />
              </motion.button>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="grow relative w-full h-full flex items-center justify-center pt-20 pb-24 px-4 md:px-20">
            {/* Left Navigation */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: canGoPrevious ? 1 : 0.3 }}
              whileHover={canGoPrevious ? { scale: 1.1 } : {}}
              whileTap={canGoPrevious ? { scale: 0.95 } : {}}
              onClick={goToPrevious}
              disabled={!canGoPrevious}
              className="absolute left-4 md:left-8 z-40 size-12 md:size-16 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black/50 disabled:hover:border-white/20"
            >
              <ArrowLeft className="size-6 md:size-8" />
            </motion.button>

            {/* Right Navigation */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: canGoNext ? 1 : 0.3 }}
              whileHover={canGoNext ? { scale: 1.1 } : {}}
              whileTap={canGoNext ? { scale: 0.95 } : {}}
              onClick={goToNext}
              disabled={!canGoNext}
              className="absolute right-4 md:right-8 z-40 size-12 md:size-16 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black/50 disabled:hover:border-white/20"
            >
              <ArrowRight className="size-6 md:size-8" />
            </motion.button>

            {/* Current Image Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-6xl h-full flex flex-col"
              >
                {/* Media Card */}
                <div className="relative grow rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${currentItem.src}')` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badge */}
                  {currentItem.badge && (
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1.5 bg-black/60 backdrop-blur border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                      {currentItem.type === 'video' ? (
                        <Play className="size-3 text-primary" />
                      ) : (
                        <Expand className="size-3 text-primary" />
                      )}
                      {currentItem.badge}
                    </div>
                  )}

                  {/* Video Play Overlay */}
                  {currentItem.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center"
                      >
                        <Play size={32} className="text-white ml-1" />
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-primary font-mono text-xs uppercase tracking-widest">
                        {currentItem.phaseNumber}. {currentItem.phaseLabel}
                      </span>
                      <div className="h-px w-8 bg-primary/40" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1 tracking-tight">
                      {currentItem.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed max-w-xl line-clamp-2">
                      {currentItem.description}
                    </p>
                  </div>
                  {currentItem.software && (
                    <div className="hidden md:flex flex-col items-end gap-1 text-right">
                      <span className="text-xs text-white/40 uppercase tracking-widest font-mono">
                        Software
                      </span>
                      <span className="text-sm font-bold text-white uppercase tracking-wider">
                        {currentItem.software}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Footer Progress */}
          <footer className="fixed bottom-0 left-0 right-0 z-50 gallery-footer px-6 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/3 flex items-center gap-4">
              <span className="text-xs font-mono text-white/50">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <div className="h-0.5 bg-white/20 grow rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-xs font-mono text-white/50">
                {String(items.length).padStart(2, '0')}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest font-mono">
              <span>{t('projectDetail.dragOrUseArrows', 'Use as setas para navegar')}</span>
            </div>
            <div className="hidden md:block text-xs text-white/40 font-mono uppercase tracking-widest">
              © 2026 Plann3d.
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Clickable media wrapper component
interface ClickableMediaProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export function ClickableMedia({ onClick, children, className = '' }: ClickableMediaProps) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer group/media ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {children}
      {/* Expand overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover/media:bg-black/30 transition-colors duration-300 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="opacity-0 group-hover/media:opacity-100 transition-opacity duration-300"
        >
          <div className="size-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <Expand size={24} className="text-white" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
