"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { CheckCircle, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function QueryFeedbackPage() {
        const params = useParams()
        const router = useRouter()
        const { id } = params

        const [rating, setRating] = useState<number | null>(null)
        const [feedback, setFeedback] = useState("")
        const [satisfaction, setSatisfaction] = useState<string | null>(null)
        const [isSubmitting, setIsSubmitting] = useState(false)
        const [isSubmitted, setIsSubmitted] = useState(false)

        const handleSubmit = () => {
                if (!rating || !satisfaction) return

                setIsSubmitting(true)

                // Simulate API call
                setTimeout(() => {
                        setIsSubmitting(false)
                        setIsSubmitted(true)

                        // Redirect after showing success message
                        setTimeout(() => {
                                router.push(`/query/${id}`)
                        }, 2000)
                }, 1500)
        }

        return (
                <>
                        <AppSidebar />
                        <SidebarInset>
                                <div className="container mx-auto p-4 md:p-6 max-w-2xl">
                                        <div className="mb-6">
                                                <Button variant="ghost" asChild className="mb-2">
                                                        <Link href={`/query/${id}`}>
                                                                <ArrowLeft className="mr-2 h-4 w-4" />
                                                                Back to Query
                                                        </Link>
                                                </Button>
                                                <h1 className="text-2xl font-bold">Query Feedback</h1>
                                                <p className="text-muted-foreground">Share your feedback about Query #{id}</p>
                                        </div>

                                        {isSubmitted ? (
                                                <Card>
                                                        <CardContent className="pt-6 flex flex-col items-center justify-center">
                                                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                                                        <CheckCircle className="h-8 w-8 text-green-600" />
                                                                </div>
                                                                <h2 className="text-xl font-bold">Thank You for Your Feedback!</h2>
                                                                <p className="text-center text-muted-foreground mt-2 mb-4">
                                                                        Your feedback helps us improve our query resolution process.
                                                                </p>
                                                        </CardContent>
                                                </Card>
                                        ) : (
                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle>Rate Your Query Resolution Experience</CardTitle>
                                                                <CardDescription>Your feedback helps us improve our service quality</CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="space-y-6">
                                                                <div className="space-y-2">
                                                                        <Label>How would you rate the resolution of your query?</Label>
                                                                        <div className="flex justify-center">
                                                                                <div className="flex gap-2">
                                                                                        {[1, 2, 3, 4, 5].map((value) => (
                                                                                                <button
                                                                                                        key={value}
                                                                                                        type="button"
                                                                                                        onClick={() => setRating(value)}
                                                                                                        className={`p-1 rounded-full transition-all ${rating && value <= rating ? "text-yellow-400 scale-110" : "text-muted hover:text-yellow-400"
                                                                                                                }`}
                                                                                                >
                                                                                                        <Star className="h-8 w-8 fill-current" />
                                                                                                </button>
                                                                                        ))}
                                                                                </div>
                                                                        </div>
                                                                        {!rating && <p className="text-xs text-center text-muted-foreground">Please select a rating</p>}
                                                                </div>

                                                                <div className="space-y-2">
                                                                        <Label>Was your query resolved to your satisfaction?</Label>
                                                                        <RadioGroup value={satisfaction || ""} onValueChange={setSatisfaction}>
                                                                                <div className="flex items-center space-x-2">
                                                                                        <RadioGroupItem value="yes" id="yes" />
                                                                                        <Label htmlFor="yes">Yes, completely</Label>
                                                                                </div>
                                                                                <div className="flex items-center space-x-2">
                                                                                        <RadioGroupItem value="partially" id="partially" />
                                                                                        <Label htmlFor="partially">Partially</Label>
                                                                                </div>
                                                                                <div className="flex items-center space-x-2">
                                                                                        <RadioGroupItem value="no" id="no" />
                                                                                        <Label htmlFor="no">No, not resolved</Label>
                                                                                </div>
                                                                        </RadioGroup>
                                                                </div>

                                                                <div className="space-y-2">
                                                                        <Label htmlFor="feedback">Additional Comments</Label>
                                                                        <Textarea
                                                                                id="feedback"
                                                                                placeholder="Please share any additional feedback about your query resolution experience..."
                                                                                rows={4}
                                                                                value={feedback}
                                                                                onChange={(e) => setFeedback(e.target.value)}
                                                                        />
                                                                </div>

                                                                <div className="space-y-2">
                                                                        <Label>What aspects of our service would you like to see improved?</Label>
                                                                        <div className="grid grid-cols-2 gap-2">
                                                                                <div className="flex items-center space-x-2">
                                                                                        <input type="checkbox" id="response-time" className="rounded border-gray-300" />
                                                                                        <Label htmlFor="response-time">Response Time</Label>
                                                                                </div>
                                                                                <div className="flex items-center space-x-2">
                                                                                        <input type="checkbox" id="communication" className="rounded border-gray-300" />
                                                                                        <Label htmlFor="communication">Communication</Label>
                                                                                </div>
                                                                                <div className="flex items-center space-x-2">
                                                                                        <input type="checkbox" id="resolution-quality" className="rounded border-gray-300" />
                                                                                        <Label htmlFor="resolution-quality">Resolution Quality</Label>
                                                                                </div>
                                                                                <div className="flex items-center space-x-2">
                                                                                        <input type="checkbox" id="staff-knowledge" className="rounded border-gray-300" />
                                                                                        <Label htmlFor="staff-knowledge">Staff Knowledge</Label>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                        <CardFooter>
                                                                <Button onClick={handleSubmit} disabled={!rating || !satisfaction || isSubmitting} className="w-full">
                                                                        {isSubmitting ? "Submitting..." : "Submit Feedback"}
                                                                </Button>
                                                        </CardFooter>
                                                </Card>
                                        )}
                                </div>
                        </SidebarInset>
                </>
        )
}

