import { forwardRef } from "react"

interface VideoPlayerProps {
  video: File
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(({ video }, ref) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-blue-400 to-blue-600 p-1">
      <video ref={ref} src={URL.createObjectURL(video)} controls className="w-full rounded-lg" />
    </div>
  )
})

VideoPlayer.displayName = "VideoPlayer"

export default VideoPlayer
