import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import Footer from '@/components/footer'
import Header from '@/components/header'
import HeroSection from '@/components/home/sections/hero'
import ProjectsSection from '@/components/home/sections/projects'
import ServicesSection from '@/components/home/sections/services'
import StudioSection from '@/components/home/sections/studio'
import VerticalProgressIndicator from '@/components/vertical-progress-indicator'

export const Route = createFileRoute('/')({ component: App })

const sections = [
  // { id: 'hero', labelKey: 'nav.home' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'services', labelKey: 'nav.services' },
  { id: 'studio', labelKey: 'nav.studio' },
]

function App() {
  const [activeSection, setActiveSection] = useState('projects')
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const projectsElement = document.getElementById('projects')

      // Show indicator only when scrolled to projects section or below
      if (projectsElement) {
        setShowIndicator(window.scrollY >= projectsElement.offsetTop - window.innerHeight / 2)
      }

      // Update active section
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {showIndicator && <VerticalProgressIndicator items={sections} activeSection={activeSection} />}
      <main>
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <StudioSection />
      </main>
      <Footer />
    </div>
  )
}

