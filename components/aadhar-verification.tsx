"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle } from "lucide-react"

interface AadharVerificationProps {
  aadhar: string
  onUpdate: (aadhar: string) => void
}

export function AadharVerification({ aadhar, onUpdate }: AadharVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [otp, setOtp] = useState("")
  const [showOtp, setShowOtp] = useState(false)
  const [error, setError] = useState("")

  const handleSendOtp = () => {
    // Validate Aadhar number (12 digits)
    if (!/^\d{12}$/.test(aadhar)) {
      setError("Please enter a valid 12-digit Aadhar number")
      return
    }

    setError("")
    setIsVerifying(true)

    // Simulate API call to send OTP
    setTimeout(() => {
      setIsVerifying(false)
      setShowOtp(true)
    }, 1500)
  }

  const handleVerifyOtp = () => {
    // Validate OTP (6 digits)
    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setError("")
    setIsVerifying(true)

    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="aadhar">Aadhar Number</Label>
        <Input
          id="aadhar"
          placeholder="Enter your 12-digit Aadhar number"
          value={aadhar}
          onChange={(e) => onUpdate(e.target.value)}
          disabled={showOtp || isVerified}
          maxLength={12}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {!showOtp && !isVerified && (
        <Button onClick={handleSendOtp} disabled={isVerifying || aadhar.length !== 12} className="w-full">
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending OTP
            </>
          ) : (
            "Send OTP"
          )}
        </Button>
      )}

      {showOtp && !isVerified && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              placeholder="Enter the 6-digit OTP sent to your registered mobile"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
          </div>

          <Button onClick={handleVerifyOtp} disabled={isVerifying || otp.length !== 6} className="w-full">
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </div>
      )}

      {isVerified && (
        <div className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-md">
          <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
          <span>Aadhar verification successful</span>
        </div>
      )}
    </div>
  )
}

