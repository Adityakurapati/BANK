"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Send } from "lucide-react"

interface Message {
        id: string
        content: string
        role: "user" | "assistant"
        timestamp: Date
}

export function Chatbot() {
        const [messages, setMessages] = useState<Message[]>([
                {
                        id: "1",
                        content: "Hello! I'm your BankAssist virtual assistant. How can I help you today?",
                        role: "assistant",
                        timestamp: new Date(),
                },
        ])
        const [input, setInput] = useState("")
        const [isLoading, setIsLoading] = useState(false)
        const messagesEndRef = useRef<HTMLDivElement>(null)

        // Auto-scroll to bottom when messages change
        useEffect(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }, [messages])

        const handleSendMessage = () => {
                if (!input.trim()) return

                // Add user message
                const userMessage: Message = {
                        id: Date.now().toString(),
                        content: input,
                        role: "user",
                        timestamp: new Date(),
                }

                setMessages((prev) => [...prev, userMessage])
                setInput("")
                setIsLoading(true)

                // Simulate AI response
                setTimeout(() => {
                        let response = ""

                        // Simple pattern matching for demo purposes
                        const lowerInput = input.toLowerCase()
                        if (lowerInput.includes("reset password") || lowerInput.includes("forgot password")) {
                                response =
                                        "To reset your password, please go to the login page and click on 'Forgot Password'. We'll send instructions to your registered email address."
                        } else if (
                                lowerInput.includes("face") &&
                                (lowerInput.includes("not recognized") || lowerInput.includes("not working"))
                        ) {
                                response =
                                        "If your face is not being recognized, please try in better lighting conditions. You can also update your facial biometrics in your profile settings."
                        } else if (lowerInput.includes("query status") || lowerInput.includes("check status")) {
                                response =
                                        "You can check the status of your queries on the dashboard. Each query shows its current status and estimated completion time."
                        } else if (lowerInput.includes("contact") || lowerInput.includes("phone") || lowerInput.includes("call")) {
                                response =
                                        "You can reach our customer support at 1800-123-4567, available 24/7. Alternatively, you can email us at support@bankassist.com."
                        } else if (lowerInput.includes("thank")) {
                                response = "You're welcome! Is there anything else I can help you with today?"
                        } else {
                                response =
                                        "I understand you're asking about " +
                                        input.split(" ").slice(0, 3).join(" ") +
                                        "... For more specific assistance, please contact our customer support or visit your nearest branch."
                        }

                        const assistantMessage: Message = {
                                id: Date.now().toString(),
                                content: response,
                                role: "assistant",
                                timestamp: new Date(),
                        }

                        setMessages((prev) => [...prev, assistantMessage])
                        setIsLoading(false)
                }, 1500)
        }

        const handleKeyDown = (e: React.KeyboardEvent) => {
                if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                }
        }

        const formatTime = (date: Date) => {
                return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }

        return (
                <div className="flex flex-col h-full">
                        <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4">
                                        {messages.map((message) => (
                                                <div key={message.id} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                                                        <div className="flex gap-3 max-w-[80%]">
                                                                {message.role === "assistant" && (
                                                                        <Avatar className="h-8 w-8">
                                                                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                                                                                <AvatarFallback>AI</AvatarFallback>
                                                                        </Avatar>
                                                                )}
                                                                <div>
                                                                        <div
                                                                                className={`rounded-lg p-3 ${message.role === "assistant" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                                                                                        }`}
                                                                        >
                                                                                {message.content}
                                                                        </div>
                                                                        <div className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</div>
                                                                </div>
                                                                {message.role === "user" && (
                                                                        <Avatar className="h-8 w-8">
                                                                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                                                                <AvatarFallback>U</AvatarFallback>
                                                                        </Avatar>
                                                                )}
                                                        </div>
                                                </div>
                                        ))}
                                        {isLoading && (
                                                <div className="flex justify-start">
                                                        <div className="flex gap-3 max-w-[80%]">
                                                                <Avatar className="h-8 w-8">
                                                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                                                                        <AvatarFallback>AI</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                        <div className="rounded-lg p-3 bg-muted text-foreground">
                                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                </div>
                        </ScrollArea>

                        <div className="p-4 border-t">
                                <div className="flex gap-2">
                                        <Input
                                                placeholder="Type your message..."
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                disabled={isLoading}
                                        />
                                        <Button size="icon" onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
                                                <Send className="h-4 w-4" />
                                        </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                        This is an AI assistant. For complex issues, please contact customer support.
                                </p>
                        </div>
                </div>
        )
}

