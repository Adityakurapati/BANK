"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaceAuthentication } from "@/components/face-authentication"

export default function LoginPage() {
  const router = useRouter()
  const [customerId, setCustomerId] = useState("")
  const [showFaceAuth, setShowFaceAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = () => {
    if (customerId.trim()) {
      setShowFaceAuth(true)
    }
  }

  const handleFaceAuthSuccess = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to Your Account</CardTitle>
          <CardDescription>Enter your customer ID and verify your face to login</CardDescription>
        </CardHeader>
        <CardContent>
          {!showFaceAuth ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerId">Customer ID</Label>
                <Input
                  id="customerId"
                  placeholder="Enter your customer ID"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <FaceAuthentication onSuccess={handleFaceAuthSuccess} />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {showFaceAuth && (
            <Button variant="outline" onClick={() => setShowFaceAuth(false)} disabled={isLoading}>
              Back
            </Button>
          )}
          {!showFaceAuth ? (
            <Button onClick={handleContinue} className="ml-auto">
              Continue
            </Button>
          ) : (
            <div className="ml-auto">{isLoading && <p className="text-sm text-muted-foreground">Logging in...</p>}</div>
          )}
        </CardFooter>
      </Card>
    </main>
  )
}

