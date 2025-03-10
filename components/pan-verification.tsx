"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle } from "lucide-react"

interface PanVerificationProps {
  pan: string
  onUpdate: (pan: string) => void
}

export function PanVerification({ pan, onUpdate }: PanVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")

  const handleVerify = () => {
    // Validate PAN (10 characters, alphanumeric)
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
      setError("Please enter a valid PAN (e.g., ABCDE1234F)")
      return
    }

    setError("")
    setIsVerifying(true)

    // Simulate API call to verify PAN
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pan">PAN Number</Label>
        <Input
          id="pan"
          placeholder="Enter your PAN (e.g., ABCDE1234F)"
          value={pan}
          onChange={(e) => onUpdate(e.target.value.toUpperCase())}
          disabled={isVerified}
          maxLength={10}
          className="uppercase"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {!isVerified && (
        <Button onClick={handleVerify} disabled={isVerifying || pan.length !== 10} className="w-full">
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying
            </>
          ) : (
            "Verify PAN"
          )}
        </Button>
      )}

      {isVerified && (
        <div className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-md">
          <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
          <span>PAN verification successful</span>
        </div>
      )}
    </div>
  )
}

