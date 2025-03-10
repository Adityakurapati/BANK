"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stepper } from "@/components/stepper"
import { FaceRegistration } from "@/components/face-registration"
import { AadharVerification } from "@/components/aadhar-verification"
import { PanVerification } from "@/components/pan-verification"
import { PersonalDetails } from "@/components/personal-details"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    aadhar: "",
    pan: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    faceRegistered: false,
  })

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const handleSubmit = async () => {
    // In a real app, you would submit the data to your backend
    console.log("Form submitted:", formData)
    router.push("/registration-success")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Complete the steps below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Stepper steps={["Verification", "Face Registration", "Personal Details", "Complete"]} currentStep={step} />

          <div className="mt-6">
            {step === 1 && (
              <Tabs defaultValue="aadhar">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="aadhar">Aadhar Verification</TabsTrigger>
                  <TabsTrigger value="pan">PAN Verification</TabsTrigger>
                </TabsList>
                <TabsContent value="aadhar">
                  <AadharVerification aadhar={formData.aadhar} onUpdate={(aadhar) => updateFormData({ aadhar })} />
                </TabsContent>
                <TabsContent value="pan">
                  <PanVerification pan={formData.pan} onUpdate={(pan) => updateFormData({ pan })} />
                </TabsContent>
              </Tabs>
            )}

            {step === 2 && <FaceRegistration onComplete={() => updateFormData({ faceRegistered: true })} />}

            {step === 3 && <PersonalDetails formData={formData} onUpdate={updateFormData} />}

            {step === 4 && (
              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="font-medium">Registration Summary</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {formData.name}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {formData.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {formData.phone}
                    </p>
                    <p>
                      <span className="font-medium">Aadhar:</span> {formData.aadhar.substring(0, 4)}XXXX
                      {formData.aadhar.substring(8, 12)}
                    </p>
                    <p>
                      <span className="font-medium">PAN:</span> {formData.pan.substring(0, 2)}XXXXX
                      {formData.pan.substring(7, 10)}
                    </p>
                    <p>
                      <span className="font-medium">Face Registration:</span>{" "}
                      {formData.faceRegistered ? "Completed" : "Not Completed"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          )}
          {step < 4 ? (
            <Button onClick={nextStep}>Continue</Button>
          ) : (
            <Button onClick={handleSubmit}>Complete Registration</Button>
          )}
        </CardFooter>
      </Card>
    </main>
  )
}

