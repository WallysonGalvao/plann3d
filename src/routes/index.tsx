import Footer from '@/components/footer'
import HeroSection from '@/components/home/sections/hero'
import ProjectsSection from '@/components/home/sections/projects'
import ServicesSection from '@/components/home/sections/services'
import StudioSection from '@/components/home/sections/studio'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
