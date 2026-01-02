import Footer from '@/components/footer'
import HeroSection from '@/components/hero-section'
import ProjectsSection from '@/components/projects-section'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <HeroSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  )
}
