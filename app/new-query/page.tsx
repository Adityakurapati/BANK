"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaceAuthentication } from "@/components/face-authentication"
import { VideoRecorder } from "@/components/video-recorder"
import { AudioRecorder } from "@/components/audio-recorder"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function NewQueryPage() {
  const router = useRouter()
  const [step, setStep] = useState<"auth" | "details" | "media" | "submit">("auth")
  const [mediaType, setMediaType] = useState<"video" | "audio" | "text">("text")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mediaUrl: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleFaceAuthSuccess = () => {
    setStep("details")
  }

  const handleDetailsSubmit = () => {
    if (!formData.title.trim()) {
      setError("Please enter a query title")
      return
    }
    setError("")
    setStep("media")
  }

  const handleMediaSubmit = () => {
    setStep("submit")
  }

  const handleMediaCapture = (url: string) => {
    setFormData((prev) => ({ ...prev, mediaUrl: url }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError("")

    // Simulate API call
    try {
      // In a real app, you would submit to your backend
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess(true)

      // Redirect to dashboard after showing success message
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (err) {
      setError("Failed to submit query. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className="container mx-auto p-4 md:p-6 max-w-3xl">
          <h1 className="text-2xl font-bold mb-6">Create New Query</h1>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === "auth" && "Verify Your Identity"}
                {step === "details" && "Query Details"}
                {step === "media" && "Attach Media"}
                {step === "submit" && "Review & Submit"}
              </CardTitle>
              <CardDescription>
                {step === "auth" && "Please verify your identity to continue"}
                {step === "details" && "Provide details about your query"}
                {step === "media" && "Attach a video, audio, or text description"}
                {step === "submit" && "Review your query before submitting"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Your query has been submitted successfully!</AlertDescription>
                </Alert>
              )}

              {step === "auth" && <FaceAuthentication onSuccess={handleFaceAuthSuccess} />}

              {step === "details" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Query Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter a title for your query"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your query in detail"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </div>
              )}

              {step === "media" && (
                <div className="space-y-4">
                  <Tabs defaultValue="text" onValueChange={(value) => setMediaType(value as any)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="text">Text Only</TabsTrigger>
                      <TabsTrigger value="video">Record Video</TabsTrigger>
                      <TabsTrigger value="audio">Record Audio</TabsTrigger>
                    </TabsList>

                    <TabsContent value="text">
                      <div className="p-4 text-center bg-muted rounded-md">
                        <p>Continue with text description only</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="video">
                      <VideoRecorder onCapture={handleMediaCapture} />
                    </TabsContent>

                    <TabsContent value="audio">
                      <AudioRecorder onCapture={handleMediaCapture} />
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {step === "submit" && (
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="font-medium">Query Summary</h3>
                    <div className="mt-2 space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Title:</span> {formData.title}
                      </p>
                      <p>
                        <span className="font-medium">Description:</span> {formData.description}
                      </p>
                      <p>
                        <span className="font-medium">Media Type:</span>{" "}
                        {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
                      </p>
                      {formData.mediaUrl && (
                        <p>
                          <span className="font-medium">Media:</span> Attached
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              {step !== "auth" && (
                <Button
                  variant="outline"
                  onClick={() => {
                    if (step === "details") setStep("auth")
                    if (step === "media") setStep("details")
                    if (step === "submit") setStep("media")
                  }}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              )}

              {step === "details" && <Button onClick={handleDetailsSubmit}>Continue</Button>}

              {step === "media" && <Button onClick={handleMediaSubmit}>Continue</Button>}

              {step === "submit" && (
                <Button onClick={handleSubmit} disabled={isSubmitting || success}>
                  {isSubmitting ? "Submitting..." : "Submit Query"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </SidebarInset>
    </>
  )
}

