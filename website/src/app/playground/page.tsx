import DeepfakeDetector from "@/components/deepfake-detector"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-blue-800 text-center">Deepfake Detection Playground</h1>
        <DeepfakeDetector />
      </div>
    </main>
  )
}
