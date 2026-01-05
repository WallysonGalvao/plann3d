import { useEffect, useState } from 'react'

interface Tool {
  id: string
  taglineKey: string
  headline2Key: string
  descriptionKey: string
  stat1ValueKey: string
  stat1LabelKey: string
  stat2ValueKey: string
  stat2LabelKey: string
}

/**
 * Hook for rotating through tools with automatic transitions
 * @param tools Array of tool objects with translation keys
 * @param interval Time in milliseconds between rotations (default: 4000ms)
 */
export const useToolRotation = (tools: Array<Tool>, interval = 4000) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (tools.length === 0) return

    const timer = setInterval(() => {
      setIsAnimating(true)

      // Wait for exit animation before changing index
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tools.length)
        setIsAnimating(false)
      }, 300) // Half of the animation duration
    }, interval)

    return () => clearInterval(timer)
  }, [tools.length, interval])

  return {
    currentTool: tools[currentIndex],
    currentIndex,
    isAnimating,
    totalTools: tools.length,
  }
}
