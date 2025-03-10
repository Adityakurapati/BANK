"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, CheckCircle, RefreshCw, Loader2 } from "lucide-react"

interface FaceAuthenticationProps {
  onSuccess: () => void
}

export function FaceAuthentication({ onSuccess }: FaceAuthenticationProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
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
    setError("")
  }

  const verifyFace = async () => {
    if (!capturedImage) return

    setIsVerifying(true)

    try {
      // Simulate API call to verify face
      // In a real app, you would send the image to your Flask backend
      // const response = await fetch('/api/auth/face', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ image: capturedImage })
      // })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsVerified(true)

      // Notify parent component of successful authentication
      setTimeout(() => {
        onSuccess()
      }, 1000)
    } catch (err) {
      setError("Face verification failed. Please try again.")
    } finally {
      setIsVerifying(false)
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

        {capturedImage && !isVerified && (
          <>
            <Button variant="outline" onClick={retakeImage} disabled={isVerifying}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Retake
            </Button>

            <Button onClick={verifyFace} disabled={isVerifying}>
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying
                </>
              ) : (
                "Verify Face"
              )}
            </Button>
          </>
        )}
      </div>

      {isVerified && (
        <div className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-md">
          <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
          <span>Face verified successfully</span>
        </div>
      )}
    </div>
  )
}

