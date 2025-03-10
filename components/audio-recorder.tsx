"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, Square, RefreshCw, Upload, Loader2, Play, Pause } from "lucide-react"

interface AudioRecorderProps {
  onCapture: (url: string) => void
}

export function AudioRecorder({ onCapture }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const chunksRef = useRef<Blob[]>([])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        const url = URL.createObjectURL(blob)
        setRecordedAudio(url)

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
      setError("")

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (err) {
      setError("Unable to access microphone. Please ensure permissions are granted.")
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
    }
  }

  const resetRecording = () => {
    setRecordedAudio(null)
    setRecordingTime(0)
    setIsPlaying(false)
  }

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const uploadAudio = async () => {
    if (!recordedAudio) return

    setIsUploading(true)

    try {
      // In a real app, you would upload the audio to your server
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      onCapture(recordedAudio)
    } catch (err) {
      setError("Failed to upload audio. Please try again.")
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
      <div className="rounded-lg bg-muted p-6 flex flex-col items-center justify-center">
        {isRecording ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-4">
              <Mic className="h-8 w-8 text-white" />
            </div>
            <div className="text-lg font-medium">{formatTime(recordingTime)}</div>
            <div className="text-sm text-muted-foreground mt-1">Recording...</div>
          </div>
        ) : recordedAudio ? (
          <div className="w-full">
            <audio ref={audioRef} src={recordedAudio} onEnded={() => setIsPlaying(false)} className="hidden" />
            <div className="flex items-center justify-center mb-4">
              <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={togglePlayback}>
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">Audio Recording</div>
              <div className="text-xs text-muted-foreground mt-1">Duration: {formatTime(recordingTime)}</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mic className="h-8 w-8 text-primary" />
            </div>
            <div className="text-sm text-muted-foreground">Click start to begin recording</div>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-center space-x-2">
        {!recordedAudio && !isRecording && (
          <Button onClick={startRecording}>
            <Mic className="mr-2 h-4 w-4" />
            Start Recording
          </Button>
        )}

        {isRecording && (
          <Button variant="destructive" onClick={stopRecording}>
            <Square className="mr-2 h-4 w-4" />
            Stop Recording
          </Button>
        )}

        {recordedAudio && (
          <>
            <Button variant="outline" onClick={resetRecording} disabled={isUploading}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Record Again
            </Button>

            <Button onClick={uploadAudio} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Use This Audio
                </>
              )}
            </Button>
          </>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Record an audio message explaining your query (max 2 minutes)
      </p>
    </div>
  )
}

