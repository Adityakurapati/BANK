"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { CheckCircle, Shield, User, CreditCard, Home, Briefcase, AlertTriangle, Camera } from "lucide-react"
import { FaceRegistration } from "@/components/face-registration"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ProfilePage() {
        const [isLoading, setIsLoading] = useState(true)
        const [isEditing, setIsEditing] = useState(false)
        const [showFaceUpdate, setShowFaceUpdate] = useState(false)
        const [successMessage, setSuccessMessage] = useState("")

        const [profileData, setProfileData] = useState({
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "+91 9876543210",
                address: "123 Main Street, Bangalore, Karnataka, 560001",
                income: "₹8,50,000 per annum",
                cibilScore: "750",
                aadharVerified: true,
                panVerified: true,
                faceRegistered: true,
                aadharNumber: "XXXX XXXX 1234",
                panNumber: "ABCDE1234F",
                accountNumber: "XXXX XXXX XXXX 5678",
                customerSince: "January 2020",
        })

        useEffect(() => {
                // Simulate API call to fetch profile data
                setTimeout(() => {
                        setIsLoading(false)
                }, 1500)
        }, [])

        const handleSave = () => {
                setIsLoading(true)

                // Simulate API call to update profile
                setTimeout(() => {
                        setIsLoading(false)
                        setIsEditing(false)
                        setSuccessMessage("Profile updated successfully")

                        // Clear success message after 3 seconds
                        setTimeout(() => {
                                setSuccessMessage("")
                        }, 3000)
                }, 1500)
        }

        const handleFaceUpdateSuccess = () => {
                setShowFaceUpdate(false)
                setSuccessMessage("Face biometrics updated successfully")

                // Clear success message after 3 seconds
                setTimeout(() => {
                        setSuccessMessage("")
                }, 3000)
        }

        return (
                <>
                        <AppSidebar />
                        <SidebarInset>
                                <div className="container mx-auto p-4 md:p-6 max-w-4xl">
                                        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

                                        {successMessage && (
                                                <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                        <AlertTitle>Success</AlertTitle>
                                                        <AlertDescription>{successMessage}</AlertDescription>
                                                </Alert>
                                        )}

                                        {isLoading ? (
                                                <div className="space-y-6">
                                                        <Card className="animate-pulse">
                                                                <CardHeader className="pb-2">
                                                                        <div className="h-6 bg-muted rounded w-1/4 mb-2"></div>
                                                                        <div className="h-4 bg-muted rounded w-1/2"></div>
                                                                </CardHeader>
                                                                <CardContent className="space-y-4">
                                                                        <div className="h-4 bg-muted rounded w-full"></div>
                                                                        <div className="h-4 bg-muted rounded w-full"></div>
                                                                        <div className="h-4 bg-muted rounded w-3/4"></div>
                                                                </CardContent>
                                                        </Card>

                                                        <Card className="animate-pulse">
                                                                <CardHeader className="pb-2">
                                                                        <div className="h-6 bg-muted rounded w-1/4 mb-2"></div>
                                                                        <div className="h-4 bg-muted rounded w-1/2"></div>
                                                                </CardHeader>
                                                                <CardContent className="space-y-4">
                                                                        <div className="h-4 bg-muted rounded w-full"></div>
                                                                        <div className="h-4 bg-muted rounded w-full"></div>
                                                                        <div className="h-4 bg-muted rounded w-3/4"></div>
                                                                </CardContent>
                                                        </Card>
                                                </div>
                                        ) : showFaceUpdate ? (
                                                <Card>
                                                        <CardHeader>
                                                                <CardTitle>Update Face Biometrics</CardTitle>
                                                                <CardDescription>Please register your face again to update your biometric data</CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <FaceRegistration onComplete={handleFaceUpdateSuccess} />
                                                        </CardContent>
                                                        <CardFooter>
                                                                <Button variant="outline" onClick={() => setShowFaceUpdate(false)}>
                                                                        Cancel
                                                                </Button>
                                                        </CardFooter>
                                                </Card>
                                        ) : (
                                                <div className="space-y-6">
                                                        <Tabs defaultValue="personal">
                                                                <TabsList className="grid w-full grid-cols-3">
                                                                        <TabsTrigger value="personal">Personal Info</TabsTrigger>
                                                                        <TabsTrigger value="security">Security & Verification</TabsTrigger>
                                                                        <TabsTrigger value="banking">Banking Details</TabsTrigger>
                                                                </TabsList>

                                                                <TabsContent value="personal" className="space-y-4 mt-4">
                                                                        <Card>
                                                                                <CardHeader>
                                                                                        <div className="flex justify-between items-start">
                                                                                                <div>
                                                                                                        <CardTitle>Personal Information</CardTitle>
                                                                                                        <CardDescription>Your personal details and contact information</CardDescription>
                                                                                                </div>
                                                                                                {!isEditing ? (
                                                                                                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                                                                                                                Edit
                                                                                                        </Button>
                                                                                                ) : (
                                                                                                        <div className="flex space-x-2">
                                                                                                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                                                                                                        Cancel
                                                                                                                </Button>
                                                                                                                <Button onClick={handleSave}>Save</Button>
                                                                                                        </div>
                                                                                                )}
                                                                                        </div>
                                                                                </CardHeader>
                                                                                <CardContent className="space-y-4">
                                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                                <div className="space-y-2">
                                                                                                        <Label htmlFor="name">Full Name</Label>
                                                                                                        {isEditing ? (
                                                                                                                <Input
                                                                                                                        id="name"
                                                                                                                        value={profileData.name}
                                                                                                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                                                                                />
                                                                                                        ) : (
                                                                                                                <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-background">
                                                                                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                                                                                        <span>{profileData.name}</span>
                                                                                                                </div>
                                                                                                        )}
                                                                                                </div>

                                                                                                <div className="space-y-2">
                                                                                                        <Label htmlFor="email">Email Address</Label>
                                                                                                        {isEditing ? (
                                                                                                                <Input
                                                                                                                        id="email"
                                                                                                                        type="email"
                                                                                                                        value={profileData.email}
                                                                                                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                                                                                />
                                                                                                        ) : (
                                                                                                                <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-background">
                                                                                                                        <svg
                                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                                width="24"
                                                                                                                                height="24"
                                                                                                                                viewBox="0 0 24 24"
                                                                                                                                fill="none"
                                                                                                                                stroke="currentColor"
                                                                                                                                strokeWidth="2"
                                                                                                                                strokeLinecap="round"
                                                                                                                                strokeLinejoin="round"
                                                                                                                                className="h-4 w-4 text-muted-foreground"
                                                                                                                        >
                                                                                                                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                                                                                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                                                                                                        </svg>
                                                                                                                        <span>{profileData.email}</span>
                                                                                                                </div>
                                                                                                        )}
                                                                                                </div>

                                                                                                <div className="space-y-2">
                                                                                                        <Label htmlFor="phone">Phone Number</Label>
                                                                                                        {isEditing ? (
                                                                                                                <Input
                                                                                                                        id="phone"
                                                                                                                        value={profileData.phone}
                                                                                                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                                                                                />
                                                                                                        ) : (
                                                                                                                <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-background">
                                                                                                                        <svg
                                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                                width="24"
                                                                                                                                height="24"
                                                                                                                                viewBox="0 0 24 24"
                                                                                                                                fill="none"
                                                                                                                                stroke="currentColor"
                                                                                                                                strokeWidth="2"
                                                                                                                                strokeLinecap="round"
                                                                                                                                strokeLinejoin="round"
                                                                                                                                className="h-4 w-4 text-muted-foreground"
                                                                                                                        >
                                                                                                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                                                                                                        </svg>
                                                                                                                        <span>{profileData.phone}</span>
                                                                                                                </div>
                                                                                                        )}
                                                                                                </div>

                                                                                                <div className="space-y-2">
                                                                                                        <Label htmlFor="income">Annual Income</Label>
                                                                                                        {isEditing ? (
                                                                                                                <Input
                                                                                                                        id="income"
                                                                                                                        value={profileData.income}
                                                                                                                        onChange={(e) => setProfileData({ ...profileData, income: e.target.value })}
                                                                                                                />
                                                                                                        ) : (
                                                                                                                <div className="flex items-center gap-2 h-10 px-3 rounded-md border bg-background">
                                                                                                                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                                                                                                                        <span>{profileData.income}</span>
                                                                                                                </div>
                                                                                                        )}
                                                                                                </div>

                                                                                                <div className="space-y-2 md:col-span-2">
                                                                                                        <Label htmlFor="address">Address</Label>
                                                                                                        {isEditing ? (
                                                                                                                <Textarea
                                                                                                                        id="address"
                                                                                                                        rows={3}
                                                                                                                        value={profileData.address}
                                                                                                                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                                                                                                />
                                                                                                        ) : (
                                                                                                                <div className="flex gap-2 p-3 rounded-md border bg-background">
                                                                                                                        <Home className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                                                                                        <span>{profileData.address}</span>
                                                                                                                </div>
                                                                                                        )}
                                                                                                </div>
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>
                                                                </TabsContent>

                                                                <TabsContent value="security" className="space-y-4 mt-4">
                                                                        <Card>
                                                                                <CardHeader>
                                                                                        <CardTitle>Security & Verification</CardTitle>
                                                                                        <CardDescription>Your identity verification status and security settings</CardDescription>
                                                                                </CardHeader>
                                                                                <CardContent className="space-y-6">
                                                                                        <div className="space-y-4">
                                                                                                <h3 className="text-lg font-medium">Verification Status</h3>

                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                                        <div className="flex items-start gap-3 p-3 rounded-md border">
                                                                                                                <div className="mt-0.5">
                                                                                                                        {profileData.aadharVerified ? (
                                                                                                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                                                                                        ) : (
                                                                                                                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                                                                                                        )}
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                        <h4 className="font-medium">Aadhar Verification</h4>
                                                                                                                        <p className="text-sm text-muted-foreground">
                                                                                                                                {profileData.aadharVerified ? `Verified • ${profileData.aadharNumber}` : "Not verified"}
                                                                                                                        </p>
                                                                                                                </div>
                                                                                                        </div>

                                                                                                        <div className="flex items-start gap-3 p-3 rounded-md border">
                                                                                                                <div className="mt-0.5">
                                                                                                                        {profileData.panVerified ? (
                                                                                                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                                                                                        ) : (
                                                                                                                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                                                                                                        )}
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                        <h4 className="font-medium">PAN Verification</h4>
                                                                                                                        <p className="text-sm text-muted-foreground">
                                                                                                                                {profileData.panVerified ? `Verified • ${profileData.panNumber}` : "Not verified"}
                                                                                                                        </p>
                                                                                                                </div>
                                                                                                        </div>

                                                                                                        <div className="flex items-start gap-3 p-3 rounded-md border md:col-span-2">
                                                                                                                <div className="mt-0.5">
                                                                                                                        {profileData.faceRegistered ? (
                                                                                                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                                                                                        ) : (
                                                                                                                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                                                                                                        )}
                                                                                                                </div>
                                                                                                                <div className="flex-1">
                                                                                                                        <div className="flex justify-between items-center">
                                                                                                                                <h4 className="font-medium">Face Biometrics</h4>
                                                                                                                                {profileData.faceRegistered && (
                                                                                                                                        <Button variant="outline" size="sm" onClick={() => setShowFaceUpdate(true)}>
                                                                                                                                                <Camera className="h-3 w-3 mr-1" />
                                                                                                                                                Update
                                                                                                                                        </Button>
                                                                                                                                )}
                                                                                                                        </div>
                                                                                                                        <p className="text-sm text-muted-foreground">
                                                                                                                                {profileData.faceRegistered
                                                                                                                                        ? "Registered • Used for secure authentication"
                                                                                                                                        : "Not registered"}
                                                                                                                        </p>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>

                                                                                        <Separator />

                                                                                        <div className="space-y-4">
                                                                                                <h3 className="text-lg font-medium">Security Settings</h3>

                                                                                                <div className="space-y-2">
                                                                                                        <div className="flex justify-between items-center">
                                                                                                                <div>
                                                                                                                        <h4 className="font-medium">Two-Factor Authentication</h4>
                                                                                                                        <p className="text-sm text-muted-foreground">
                                                                                                                                Add an extra layer of security to your account
                                                                                                                        </p>
                                                                                                                </div>
                                                                                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                                                                                        Enabled
                                                                                                                </Badge>
                                                                                                        </div>
                                                                                                </div>

                                                                                                <div className="space-y-2">
                                                                                                        <div className="flex justify-between items-center">
                                                                                                                <div>
                                                                                                                        <h4 className="font-medium">Biometric Login</h4>
                                                                                                                        <p className="text-sm text-muted-foreground">
                                                                                                                                Use face recognition to log in to your account
                                                                                                                        </p>
                                                                                                                </div>
                                                                                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                                                                                        Enabled
                                                                                                                </Badge>
                                                                                                        </div>
                                                                                                </div>

                                                                                                <div className="space-y-2">
                                                                                                        <div className="flex justify-between items-center">
                                                                                                                <div>
                                                                                                                        <h4 className="font-medium">Transaction Alerts</h4>
                                                                                                                        <p className="text-sm text-muted-foreground">
                                                                                                                                Receive alerts for all transactions on your account
                                                                                                                        </p>
                                                                                                                </div>
                                                                                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                                                                                        Enabled
                                                                                                                </Badge>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>
                                                                </TabsContent>

                                                                <TabsContent value="banking" className="space-y-4 mt-4">
                                                                        <Card>
                                                                                <CardHeader>
                                                                                        <CardTitle>Banking Details</CardTitle>
                                                                                        <CardDescription>Your banking information and credit score</CardDescription>
                                                                                </CardHeader>
                                                                                <CardContent className="space-y-6">
                                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                                <div className="flex items-start gap-3 p-3 rounded-md border">
                                                                                                        <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                                                                                                        <div>
                                                                                                                <h4 className="font-medium">Account Number</h4>
                                                                                                                <p className="text-sm text-muted-foreground">{profileData.accountNumber}</p>
                                                                                                        </div>
                                                                                                </div>

                                                                                                <div className="flex items-start gap-3 p-3 rounded-md border">
                                                                                                        <svg
                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                width="24"
                                                                                                                height="24"
                                                                                                                viewBox="0 0 24 24"
                                                                                                                fill="none"
                                                                                                                stroke="currentColor"
                                                                                                                strokeWidth="2"
                                                                                                                strokeLinecap="round"
                                                                                                                strokeLinejoin="round"
                                                                                                                className="h-5 w-5 text-muted-foreground mt-0.5"
                                                                                                        >
                                                                                                                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                                                                                                                <line x1="2" x2="22" y1="10" y2="10"></line>
                                                                                                        </svg>
                                                                                                        <div>
                                                                                                                <h4 className="font-medium">Customer Since</h4>
                                                                                                                <p className="text-sm text-muted-foreground">{profileData.customerSince}</p>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>

                                                                                        <Separator />

                                                                                        <div className="space-y-4">
                                                                                                <h3 className="text-lg font-medium">Credit Score</h3>

                                                                                                <div className="p-4 rounded-md border">
                                                                                                        <div className="flex justify-between items-center mb-2">
                                                                                                                <h4 className="font-medium">CIBIL Score</h4>
                                                                                                                <span className="text-lg font-bold">{profileData.cibilScore}</span>
                                                                                                        </div>

                                                                                                        <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                                                                                                                <div
                                                                                                                        className="bg-green-500 h-2.5 rounded-full"
                                                                                                                        style={{ width: `${(Number.parseInt(profileData.cibilScore) / 900) * 100}%` }}
                                                                                                                ></div>
                                                                                                        </div>

                                                                                                        <div className="flex justify-between text-xs text-muted-foreground">
                                                                                                                <span>Poor</span>
                                                                                                                <span>Fair</span>
                                                                                                                <span>Good</span>
                                                                                                                <span>Excellent</span>
                                                                                                        </div>

                                                                                                        <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md flex items-start gap-2">
                                                                                                                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                                                                                                                <div>
                                                                                                                        <p className="font-medium">Credit Health Analysis</p>
                                                                                                                        <p className="text-sm mt-1">
                                                                                                                                Your credit score is good. You may be eligible for personal loans up to ₹10,00,000 at
                                                                                                                                competitive interest rates.
                                                                                                                        </p>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                        </div>
                                                                                </CardContent>
                                                                        </Card>
                                                                </TabsContent>
                                                        </Tabs>
                                                </div>
                                        )}
                                </div>
                        </SidebarInset>
                </>
        )
}

