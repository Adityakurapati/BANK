"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, CheckCircle, RefreshCw } from "lucide-react"

interface FaceRegistrationProps {
  onComplete: () => void
}

export function FaceRegistration({ onComplete }: FaceRegistrationProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let stream: MediaStream | null = null

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user",
          },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        setIsCapturing(true)
        setError("")
      } catch (err) {
        setError("Unable to access camera. Please ensure camera permissions are granted.")
        setIsCapturing(false)
      }
    }

    if (!capturedImage) {
      startCamera()
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [capturedImage])

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = canvas.toDataURL("image/png")
        setCapturedImage(imageData)

        // Stop the camera stream
        const stream = video.srcObject as MediaStream
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }

        setIsCapturing(false)
      }
    }
  }

  const retakeImage = () => {
    setCapturedImage(null)
  }

  const registerFace = async () => {
    if (!capturedImage) return

    setIsUploading(true)

    try {
      // Simulate API call to register face
      // In a real app, you would send the image to your Flask backend
      // const response = await fetch('/api/register/face', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ image: capturedImage })
      // })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsRegistered(true)
      onComplete()
    } catch (err) {
      setError("Failed to register face. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden bg-black aspect-video flex items-center justify-center">
        {isCapturing && <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />}

        {capturedImage && (
          <img src={capturedImage || "/placeholder.svg"} alt="Captured face" className="w-full h-full object-cover" />
        )}

        {!isCapturing && !capturedImage && (
          <div className="text-white flex flex-col items-center justify-center p-4">
            <Camera className="h-10 w-10 mb-2" />
            <p>Camera not available</p>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-center space-x-2">
        {isCapturing && (
          <Button onClick={captureImage}>
            <Camera className="mr-2 h-4 w-4" />
            Capture
          </Button>
        )}

        {capturedImage && !isRegistered && (
          <>
            <Button variant="outline" onClick={retakeImage}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retake
            </Button>

            <Button onClick={registerFace} disabled={isUploading}>
              {isUploading ? "Registering..." : "Register Face"}
            </Button>
          </>
        )}
      </div>

      {isRegistered && (
        <div className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-md">
          <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
          <span>Face registered successfully</span>
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        <p>Please ensure:</p>
        <ul className="list-disc list-inside ml-2 mt-1">
          <li>Your face is clearly visible</li>
          <li>There is good lighting</li>
          <li>You are looking directly at the camera</li>
          <li>No sunglasses or head coverings that obscure your face</li>
        </ul>
      </div>
    </div>
  )
}

