"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Video, Square, RefreshCw, Upload, Loader2 } from "lucide-react"

interface VideoRecorderProps {
  onCapture: (url: string) => void
}

export function VideoRecorder({ onCapture }: VideoRecorderProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isPreparing, setIsPreparing] = useState(true)
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const chunksRef = useRef<Blob[]>([])

  useEffect(() => {
    let stream: MediaStream | null = null

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        // Set up media recorder
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data)
          }
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "video/webm" })
          const url = URL.createObjectURL(blob)
          setRecordedVideo(url)
        }

        setIsPreparing(false)
        setError("")
      } catch (err) {
        setError("Unable to access camera or microphone. Please ensure permissions are granted.")
        setIsPreparing(false)
      }
    }

    if (!recordedVideo) {
      startCamera()
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [recordedVideo])

  const startRecording = () => {
    if (mediaRecorderRef.current) {
      chunksRef.current = []
      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }

      // Stop the camera stream
      const stream = videoRef.current?.srcObject as MediaStream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }

  const resetRecording = () => {
    setRecordedVideo(null)
    setRecordingTime(0)
  }

  const uploadVideo = async () => {
    if (!recordedVideo) return

    setIsUploading(true)

    try {
      // In a real app, you would upload the video to your server
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      onCapture(recordedVideo)
    } catch (err) {
      setError("Failed to upload video. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden bg-black aspect-video flex items-center justify-center">
        {!recordedVideo ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={!isRecording} // Only mute during preview
            className="w-full h-full object-cover"
          />
        ) : (
          <video src={recordedVideo} controls className="w-full h-full" />
        )}

        {isPreparing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Preparing camera...</span>
          </div>
        )}

        {isRecording && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md flex items-center">
            <span className="animate-pulse mr-2">●</span>
            <span>{formatTime(recordingTime)}</span>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-center space-x-2">
        {!recordedVideo && !isRecording && !isPreparing && (
          <Button onClick={startRecording}>
            <Video className="mr-2 h-4 w-4" />
            Start Recording
          </Button>
        )}

        {isRecording && (
          <Button variant="destructive" onClick={stopRecording}>
            <Square className="mr-2 h-4 w-4" />
            Stop Recording
          </Button>
        )}

        {recordedVideo && (
          <>
            <Button variant="outline" onClick={resetRecording} disabled={isUploading}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Record Again
            </Button>

            <Button onClick={uploadVideo} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Use This Video
                </>
              )}
            </Button>
          </>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">Record a video explaining your query (max 2 minutes)</p>
    </div>
  )
}

