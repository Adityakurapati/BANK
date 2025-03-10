"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { CheckCircle, Star } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function FeedbackPage() {
        const [rating, setRating] = useState<number | null>(null)
        const [feedback, setFeedback] = useState("")
        const [queryId, setQueryId] = useState("")
        const [category, setCategory] = useState("general")
        const [isSubmitting, setIsSubmitting] = useState(false)
        const [isSubmitted, setIsSubmitted] = useState(false)

        const handleSubmit = () => {
                if (!rating) return

                setIsSubmitting(true)

                // Simulate API call
                setTimeout(() => {
                        setIsSubmitting(false)
                        setIsSubmitted(true)
                }, 1500)
        }

        return (
                <>
                        <AppSidebar />
                        <SidebarInset>
                                <div className="container mx-auto p-4 md:p-6 max-w-2xl">
                                        <h1 className="text-2xl font-bold mb-6">Feedback</h1>

                                        {isSubmitted ? (
                                                <Card>
                                                        <CardContent className="pt-6 flex flex-col items-center justify-center">
                                                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                                                        <CheckCircle className="h-8 w-8 text-green-600" />
                                                                </div>
                                                                <h2 className="text-xl font-bold">Thank You for Your Feedback!</h2>
                                                                <p className="text-center text-muted-foreground mt-2 mb-4">
                                                                        Your feedback helps us improve our services and provide better banking experiences.
                                                                </p>
                                                                <Button asChild>
                                                                        <a href="/dashboard">Return to Dashboard</a>
                                                                </Button>
                                                        </CardContent>
                                                </Card>
                                        ) : (
                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle>Share Your Experience</CardTitle>
                                                                <CardDescription>Your feedback helps us improve our services</CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="space-y-6">
                                                                <div className="space-y-2">
                                                                        <Label>How would you rate your experience?</Label>
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
                                                                        <Label htmlFor="category">Feedback Category</Label>
                                                                        <RadioGroup value={category} onValueChange={setCategory} className="grid grid-cols-2 gap-2">
                                                                                <div className="flex items-center space-x-2">
                                                                                        <RadioGroupItem value="general" id="general" />
                                                                                        <Label htmlFor="general">General Experience</Label>
                                                                                </div>
                                                                                <div className="flex items-center space-x-2">
                                                                                        <RadioGroupItem value="query" id="query" />
                                                                                        <Label htmlFor="query">Query Resolution</Label>
                                                                                </div>
                                                                                <div className="flex items-center space-x-2">
                                                                                        <RadioGroupItem value="app" id="app" />
                                                                                        <Label htmlFor="app">App Experience</Label>
                                                                                </div>
                                                                                <div className="flex items-center space-x-2">
                                                                                        <RadioGroupItem value="support" id="support" />
                                                                                        <Label htmlFor="support">Customer Support</Label>
                                                                                </div>
                                                                        </RadioGroup>
                                                                </div>

                                                                {category === "query" && (
                                                                        <div className="space-y-2">
                                                                                <Label htmlFor="queryId">Query ID (Optional)</Label>
                                                                                <Input
                                                                                        id="queryId"
                                                                                        placeholder="Enter the query ID (e.g., Q1001)"
                                                                                        value={queryId}
                                                                                        onChange={(e) => setQueryId(e.target.value)}
                                                                                />
                                                                        </div>
                                                                )}

                                                                <div className="space-y-2">
                                                                        <Label htmlFor="feedback">Your Feedback</Label>
                                                                        <Textarea
                                                                                id="feedback"
                                                                                placeholder="Please share your thoughts, suggestions, or concerns..."
                                                                                rows={5}
                                                                                value={feedback}
                                                                                onChange={(e) => setFeedback(e.target.value)}
                                                                        />
                                                                </div>

                                                                <Alert>
                                                                        <AlertTitle>Privacy Notice</AlertTitle>
                                                                        <AlertDescription>
                                                                                Your feedback may be used to improve our services. No personal information will be shared with third
                                                                                parties.
                                                                        </AlertDescription>
                                                                </Alert>
                                                        </CardContent>
                                                        <CardFooter>
                                                                <Button onClick={handleSubmit} disabled={!rating || isSubmitting} className="w-full">
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

