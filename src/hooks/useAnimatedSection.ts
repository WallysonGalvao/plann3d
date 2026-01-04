import type { RefObject } from 'react'
import { useRef } from 'react'

import { useInView } from 'framer-motion'

interface UseAnimatedSectionOptions {
  /** Margin around the element for intersection calculation */
  margin?: string
  /** Whether to only trigger once */
  once?: boolean
}

interface UseAnimatedSectionResult<T extends HTMLElement> {
  /** Ref to attach to the section element */
  ref: RefObject<T | null>
  /** Whether the section is currently in view */
  isInView: boolean
}

/**
 * Hook that combines useRef + useInView for animated sections
 * Reduces boilerplate in section components
 *
 * @example
 * const { ref, isInView } = useAnimatedSection<HTMLElement>()
 *
 * return (
 *   <section ref={ref}>
 *     <motion.div animate={isInView ? 'visible' : 'hidden'}>
 *       Content
 *     </motion.div>
 *   </section>
 * )
 */
export function useAnimatedSection<T extends HTMLElement = HTMLElement>(
  options: UseAnimatedSectionOptions = {},
): UseAnimatedSectionResult<T> {
  const { margin = '-100px', once = true } = options
  const ref = useRef<T>(null)
  // Type assertion needed as framer-motion's MarginType is overly strict for string values
  const isInView = useInView(ref, { once, margin: margin as unknown as undefined })

  return { ref, isInView }
}
