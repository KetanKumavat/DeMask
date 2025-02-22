"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, Play } from "lucide-react"
import VideoPlayer from "./video-player"
import ResultsVisualization from "./results-visualization"
import DetailedReport from "./detailed-report"

export default function DeepfakeDetector() {
  const [video, setVideo] = useState<File | null>(null)
  const [results, setResults] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setVideo(file)
      setResults([])
    }
  }

  const extractFrames = async () => {
    if (!videoRef.current || !video) return

    const framesToExtract = 10
    const duration = videoRef.current.duration
    const interval = duration / framesToExtract

    setIsProcessing(true)
    setProgress(0)

    for (let i = 0; i < framesToExtract; i++) {
      videoRef.current.currentTime = i * interval
      await new Promise((resolve) => setTimeout(resolve, 100)) // Wait for the video to seek

      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0)

      const frameData = canvas.toDataURL("image/jpeg")
      const result = await processFrame(frameData, i * interval)
      setResults((prev) => [...prev, result])
      setProgress(((i + 1) / framesToExtract) * 100)
    }

    setIsProcessing(false)
  }

  const processFrame = async (frameData: string, timestamp: number) => {
    // Mock deepfake detection model
    const mockDetection = () => {
      const isDeepfake = Math.random() > 0.5
      const confidence = Math.random()
      return {
        timestamp: new Date(timestamp * 1000).toISOString().substr(11, 8),
        modelResult: isDeepfake ? "Deepfake" : "Authentic",
        modelOutput: isDeepfake ? 0.5 + confidence * 0.5 : confidence * 0.5,
        reasonsToFlag: isDeepfake ? ["Unnatural blinking", "Face inconsistencies"].filter(() => Math.random() > 0.5) : [],
        confidenceScore: Math.round(confidence * 100),
      }
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    return mockDetection()
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-center space-x-4">
        <Button
          onClick={() => document.getElementById("file-upload")?.click()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Upload className="mr-2 h-4 w-4" /> Upload Video
        </Button>
        <input id="file-upload" type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
        {video && (
          <Button onClick={extractFrames} disabled={isProcessing} className="bg-blue-600 hover:bg-blue-700">
            <Play className="mr-2 h-4 w-4" /> Process Video
          </Button>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">{video && <VideoPlayer video={video} ref={videoRef} />}</div>
        <div className="w-full md:w-1/2">{results.length > 0 && <ResultsVisualization results={results} />}</div>
      </div>
      {isProcessing && (
        <div className="space-y-2">
          <div className="text-center text-blue-800 font-semibold">Processing video...</div>
          <Progress value={progress} className="w-full h-2 bg-blue-200" indicator="bg-blue-600" />
        </div>
      )}
      {results.length > 0 && <DetailedReport results={results} />}
    </div>
  )
}

