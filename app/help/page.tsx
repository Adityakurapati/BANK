"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
// import { Chatbot } from "@/components/chatbot"
import { Search, Phone, Mail, MessageSquare, HelpCircle, FileText, CreditCard, Shield, ArrowRight } from "lucide-react"

export default function HelpPage() {
        const [searchQuery, setSearchQuery] = useState("")

        const faqs = [
                {
                        question: "How do I reset my password?",
                        answer:
                                "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your registered email address to create a new password.",
                },
                {
                        question: "How secure is facial authentication?",
                        answer:
                                "Our facial authentication system uses advanced biometric technology with liveness detection to ensure high security. Your facial data is encrypted and stored securely, and cannot be used to recreate your face.",
                },
                {
                        question: "What happens if my face is not recognized?",
                        answer:
                                "If your face is not recognized after multiple attempts, you can use alternative authentication methods like OTP verification. You can also update your facial biometrics in your profile settings.",
                },
                {
                        question: "How long does it take to resolve a query?",
                        answer:
                                "Most queries are resolved within 24-48 hours. Complex queries may take up to 5 business days. You can check the status of your query in the dashboard, which includes an estimated completion time.",
                },
                {
                        question: "Can I update my Aadhar or PAN details?",
                        answer:
                                "Yes, you can update your Aadhar or PAN details by visiting your nearest branch with the updated documents. For security reasons, these updates cannot be made online.",
                },
                {
                        question: "How do I submit a new query?",
                        answer:
                                "To submit a new query, go to your dashboard and click on the 'New Query' button. You can then record a video or audio explaining your query, or type it as text.",
                },
        ]

        const filteredFaqs = searchQuery
                ? faqs.filter(
                        (faq) =>
                                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                : faqs

        return (
                <>
                        <AppSidebar />
                        <SidebarInset>
                                <div className="container mx-auto p-4 md:p-6 max-w-4xl">
                                        <h1 className="text-2xl font-bold mb-6">Help & Support</h1>

                                        <div className="mb-6">
                                                <div className="relative">
                                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                                placeholder="Search for help topics..."
                                                                className="pl-10"
                                                                value={searchQuery}
                                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                        />
                                                </div>
                                        </div>

                                        <Tabs defaultValue="faq">
                                                <TabsList className="grid w-full grid-cols-3">
                                                        <TabsTrigger value="faq">FAQs</TabsTrigger>
                                                        <TabsTrigger value="contact">Contact Us</TabsTrigger>
                                                        <TabsTrigger value="chatbot">Chat Support</TabsTrigger>
                                                </TabsList>

                                                <TabsContent value="faq" className="mt-6">
                                                        <Card>
                                                                <CardHeader>
                                                                        <CardTitle>Frequently Asked Questions</CardTitle>
                                                                        <CardDescription>Find answers to common questions about our banking services</CardDescription>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        {filteredFaqs.length > 0 ? (
                                                                                <Accordion type="single" collapsible className="w-full">
                                                                                        {filteredFaqs.map((faq, index) => (
                                                                                                <AccordionItem key={index} value={`item-${index}`}>
                                                                                                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                                                                                                        <AccordionContent>{faq.answer}</AccordionContent>
                                                                                                </AccordionItem>
                                                                                        ))}
                                                                                </Accordion>
                                                                        ) : (
                                                                                <div className="text-center py-6">
                                                                                        <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                                                                                        <h3 className="text-lg font-medium">No results found</h3>
                                                                                        <p className="text-muted-foreground mt-1">
                                                                                                Try searching with different keywords or browse our help categories below
                                                                                        </p>
                                                                                </div>
                                                                        )}
                                                                </CardContent>
                                                        </Card>

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                                                <Card>
                                                                        <CardHeader className="pb-2">
                                                                                <div className="flex items-center gap-2">
                                                                                        <CreditCard className="h-5 w-5 text-primary" />
                                                                                        <CardTitle className="text-base">Account Management</CardTitle>
                                                                                </div>
                                                                        </CardHeader>
                                                                        <CardContent className="text-sm">
                                                                                <p>Learn about managing your accounts, statements, and transactions</p>
                                                                        </CardContent>
                                                                        <CardFooter>
                                                                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                                                                        View Articles
                                                                                        <ArrowRight className="h-4 w-4" />
                                                                                </Button>
                                                                        </CardFooter>
                                                                </Card>

                                                                <Card>
                                                                        <CardHeader className="pb-2">
                                                                                <div className="flex items-center gap-2">
                                                                                        <Shield className="h-5 w-5 text-primary" />
                                                                                        <CardTitle className="text-base">Security & Privacy</CardTitle>
                                                                                </div>
                                                                        </CardHeader>
                                                                        <CardContent className="text-sm">
                                                                                <p>Information about securing your account and protecting your data</p>
                                                                        </CardContent>
                                                                        <CardFooter>
                                                                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                                                                        View Articles
                                                                                        <ArrowRight className="h-4 w-4" />
                                                                                </Button>
                                                                        </CardFooter>
                                                                </Card>

                                                                <Card>
                                                                        <CardHeader className="pb-2">
                                                                                <div className="flex items-center gap-2">
                                                                                        <FileText className="h-5 w-5 text-primary" />
                                                                                        <CardTitle className="text-base">Query Resolution</CardTitle>
                                                                                </div>
                                                                        </CardHeader>
                                                                        <CardContent className="text-sm">
                                                                                <p>Guidance on submitting and tracking your banking queries</p>
                                                                        </CardContent>
                                                                        <CardFooter>
                                                                                <Button variant="ghost" size="sm" className="w-full justify-between">
                                                                                        View Articles
                                                                                        <ArrowRight className="h-4 w-4" />
                                                                                </Button>
                                                                        </CardFooter>
                                                                </Card>
                                                        </div>
                                                </TabsContent>

                                                <TabsContent value="contact" className="mt-6">
                                                        <Card>
                                                                <CardHeader>
                                                                        <CardTitle>Contact Information</CardTitle>
                                                                        <CardDescription>Reach out to us through any of the following channels</CardDescription>
                                                                </CardHeader>
                                                                <CardContent className="space-y-6">
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                                <div className="flex items-start gap-4">
                                                                                        <div className="rounded-full bg-primary/10 p-3">
                                                                                                <Phone className="h-5 w-5 text-primary" />
                                                                                        </div>
                                                                                        <div>
                                                                                                <h3 className="font-medium">Phone Support</h3>
                                                                                                <p className="text-muted-foreground mt-1">24/7 Customer Support</p>
                                                                                                <p className="font-medium mt-2">1800-123-4567</p>
                                                                                                <p className="text-sm text-muted-foreground">Toll-free from any network in India</p>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="flex items-start gap-4">
                                                                                        <div className="rounded-full bg-primary/10 p-3">
                                                                                                <Mail className="h-5 w-5 text-primary" />
                                                                                        </div>
                                                                                        <div>
                                                                                                <h3 className="font-medium">Email Support</h3>
                                                                                                <p className="text-muted-foreground mt-1">Response within 24 hours</p>
                                                                                                <p className="font-medium mt-2">support@bankassist.com</p>
                                                                                                <p className="text-sm text-muted-foreground">For general inquiries and support</p>
                                                                                        </div>
                                                                                </div>
                                                                        </div>

                                                                        <div className="border rounded-lg p-4">
                                                                                <h3 className="font-medium mb-2">Branch Locator</h3>
                                                                                <p className="text-sm text-muted-foreground mb-4">
                                                                                        Find your nearest branch for in-person assistance
                                                                                </p>
                                                                                <div className="grid grid-cols-2 gap-2">
                                                                                        <Input placeholder="Enter your pincode" />
                                                                                        <Button>Find Branches</Button>
                                                                                </div>
                                                                        </div>

                                                                        <div className="border rounded-lg p-4">
                                                                                <h3 className="font-medium mb-2">Send Us a Message</h3>
                                                                                <div className="space-y-3">
                                                                                        <Input placeholder="Your Name" />
                                                                                        <Input placeholder="Email Address" type="email" />
                                                                                        <Input placeholder="Subject" />
                                                                                        <textarea
                                                                                                className="w-full min-h-[100px] p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                                                                                                placeholder="Your message..."
                                                                                        ></textarea>
                                                                                        <Button className="w-full">Send Message</Button>
                                                                                </div>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                </TabsContent>

                                                <TabsContent value="chatbot" className="mt-6">
                                                        <Card className="h-[600px] flex flex-col">
                                                                <CardHeader>
                                                                        <div className="flex items-center gap-2">
                                                                                <MessageSquare className="h-5 w-5 text-primary" />
                                                                                <CardTitle>Chat with BankAssist</CardTitle>
                                                                        </div>
                                                                        <CardDescription>Our AI assistant can help answer your questions instantly</CardDescription>
                                                                </CardHeader>
                                                                <CardContent className="flex-1 overflow-hidden">
                                                                        {/* <Chatbot /> */}
                                                                        <p> ChatBOT</p>
                                                                </CardContent>
                                                        </Card>
                                                </TabsContent>
                                        </Tabs>
                                </div>
                        </SidebarInset>
                </>
        )
}

