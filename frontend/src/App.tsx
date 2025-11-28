import { Header } from '@/components/panels/Header'
import { StatusBar } from '@/components/panels/StatusBar'
import { LearningObjectives } from '@/components/panels/LearningObjectives'
import { CourseInformation } from '@/components/panels/CourseInformation'
import { CourseDescription } from '@/components/panels/CourseDescription'
import { ManagerButtons } from '@/components/panels/ManagerButtons'
import { GeneratePanel } from '@/components/panels/GeneratePanel'
import { AIChat } from '@/components/panels/AIChat'
import { ConnectionLines } from '@/components/ui/ConnectionLines'

function App() {
  return (
    <div className="min-h-screen bg-prometheus-bg-primary text-prometheus-text-primary">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-dark opacity-50 pointer-events-none" />

      {/* Connection lines SVG background */}
      <ConnectionLines />

      {/* Main content */}
      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Course Configuration */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <StatusBar />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CourseInformation />
                <LearningObjectives />
              </div>

              <CourseDescription />

              <ManagerButtons />
            </div>

            {/* Right Column - Generation & AI */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <GeneratePanel />
              <AIChat />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
