import Footer from '@/components/footer'
import AboutSection from '@/components/home/sections/about'
import ContactSection from '@/components/home/sections/contact'
import HeroSection from '@/components/home/sections/hero'
import ProcessSection from '@/components/home/sections/process'
import ProjectsSection from '@/components/home/sections/projects'
import ServicesSection from '@/components/home/sections/services'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <HeroSection />
        <ProjectsSection />
        <ProcessSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
