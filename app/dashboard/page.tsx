"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
        PlusCircle,
        Clock,
        CheckCircle,
        XCircle,
        AlertCircle,
        TrendingUp,
        CreditCard,
        PiggyBank,
        ArrowUpRight,
} from "lucide-react"
import Link from "next/link"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { SpendingChart } from "@/components/spending-chart"

type QueryStatus = "Requested" | "Under Process" | "Accepted By Manager" | "Rejected" | "Completed"

interface Query {
        id: string
        title: string
        description: string
        createdAt: string
        status: QueryStatus
        estimatedCompletion: string
}

export default function DashboardPage() {
        const [queries, setQueries] = useState<Query[]>([])
        const [isLoading, setIsLoading] = useState(true)
        const [userName, setUserName] = useState("John")

        useEffect(() => {
                // Simulate API call to fetch queries
                setTimeout(() => {
                        setQueries([
                                {
                                        id: "Q1001",
                                        title: "Credit Card Statement Issue",
                                        description: "I haven't received my credit card statement for the last month",
                                        createdAt: "2023-05-15T10:30:00Z",
                                        status: "Under Process",
                                        estimatedCompletion: "2023-05-18",
                                },
                                {
                                        id: "Q1002",
                                        title: "Loan Application Status",
                                        description: "I applied for a home loan last week and want to check the status",
                                        createdAt: "2023-05-10T14:20:00Z",
                                        status: "Accepted By Manager",
                                        estimatedCompletion: "2023-05-17",
                                },
                                {
                                        id: "Q1003",
                                        title: "Account Statement Request",
                                        description: "I need my account statement for the last 6 months for visa application",
                                        createdAt: "2023-05-05T09:15:00Z",
                                        status: "Completed",
                                        estimatedCompletion: "2023-05-12",
                                },
                                {
                                        id: "Q1004",
                                        title: "Debit Card Replacement",
                                        description: "My debit card is damaged and I need a replacement",
                                        createdAt: "2023-05-01T11:45:00Z",
                                        status: "Rejected",
                                        estimatedCompletion: "N/A",
                                },
                        ])
                        setIsLoading(false)
                }, 1500)
        }, [])

        const getStatusBadge = (status: QueryStatus) => {
                switch (status) {
                        case "Requested":
                                return (
                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                Requested
                                        </Badge>
                                )
                        case "Under Process":
                                return (
                                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                                Under Process
                                        </Badge>
                                )
                        case "Accepted By Manager":
                                return (
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                Accepted
                                        </Badge>
                                )
                        case "Rejected":
                                return (
                                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                                Rejected
                                        </Badge>
                                )
                        case "Completed":
                                return (
                                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                                Completed
                                        </Badge>
                                )
                }
        }

        const getStatusIcon = (status: QueryStatus) => {
                switch (status) {
                        case "Requested":
                                return <Clock className="h-5 w-5 text-blue-500" />
                        case "Under Process":
                                return <Clock className="h-5 w-5 text-yellow-500" />
                        case "Accepted By Manager":
                                return <CheckCircle className="h-5 w-5 text-green-500" />
                        case "Rejected":
                                return <XCircle className="h-5 w-5 text-red-500" />
                        case "Completed":
                                return <CheckCircle className="h-5 w-5 text-purple-500" />
                }
        }

        return (
                <>
                        <AppSidebar />
                        <SidebarInset>
                                <div className="container mx-auto p-4 md:p-6">
                                        <div className="mb-6">
                                                <h1 className="text-2xl font-bold">Welcome back, {userName}</h1>
                                                <p className="text-muted-foreground">Here's an overview of your banking queries and insights</p>
                                        </div>

                                        <Tabs defaultValue="queries">
                                                <TabsList className="mb-4">
                                                        <TabsTrigger value="queries">My Queries</TabsTrigger>
                                                        <TabsTrigger value="insights">Banking Insights</TabsTrigger>
                                                </TabsList>

                                                <TabsContent value="queries">
                                                        <div className="flex justify-between items-center mb-6">
                                                                <h2 className="text-xl font-semibold">Recent Queries</h2>
                                                                <Button asChild>
                                                                        <Link href="/new-query">
                                                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                                                New Query
                                                                        </Link>
                                                                </Button>
                                                        </div>

                                                        {isLoading ? (
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        {[1, 2, 3, 4].map((i) => (
                                                                                <Card key={i} className="animate-pulse">
                                                                                        <CardHeader className="pb-2">
                                                                                                <div className="h-5 bg-muted rounded w-3/4"></div>
                                                                                                <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
                                                                                        </CardHeader>
                                                                                        <CardContent>
                                                                                                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                                                                                                <div className="h-4 bg-muted rounded w-5/6"></div>
                                                                                        </CardContent>
                                                                                        <CardFooter className="flex justify-between">
                                                                                                <div className="h-4 bg-muted rounded w-1/4"></div>
                                                                                                <div className="h-6 bg-muted rounded w-1/4"></div>
                                                                                        </CardFooter>
                                                                                </Card>
                                                                        ))}
                                                                </div>
                                                        ) : (
                                                                <>
                                                                        {queries.length === 0 ? (
                                                                                <Card>
                                                                                        <CardContent className="flex flex-col items-center justify-center py-10">
                                                                                                <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
                                                                                                <h3 className="text-lg font-medium">No queries found</h3>
                                                                                                <p className="text-muted-foreground mt-2">Create your first query to get started</p>
                                                                                                <Button asChild className="mt-4">
                                                                                                        <Link href="/new-query">
                                                                                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                                                                                New Query
                                                                                                        </Link>
                                                                                                </Button>
                                                                                        </CardContent>
                                                                                </Card>
                                                                        ) : (
                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        {queries.map((query) => (
                                                                                                <Link href={`/query/${query.id}`} key={query.id} className="block">
                                                                                                        <Card className="h-full transition-shadow hover:shadow-md">
                                                                                                                <CardHeader className="pb-2">
                                                                                                                        <div className="flex justify-between items-start">
                                                                                                                                <CardTitle className="text-lg">{query.title}</CardTitle>
                                                                                                                                {getStatusIcon(query.status)}
                                                                                                                        </div>
                                                                                                                        <CardDescription>Query ID: {query.id}</CardDescription>
                                                                                                                </CardHeader>
                                                                                                                <CardContent>
                                                                                                                        <p className="text-sm line-clamp-2">{query.description}</p>
                                                                                                                        <div className="mt-2 text-xs text-muted-foreground">
                                                                                                                                Created on {new Date(query.createdAt).toLocaleDateString()}
                                                                                                                        </div>
                                                                                                                </CardContent>
                                                                                                                <CardFooter className="flex justify-between">
                                                                                                                        <div className="text-sm">
                                                                                                                                {query.status !== "Completed" && query.status !== "Rejected" && (
                                                                                                                                        <span>
                                                                                                                                                Est. completion: {new Date(query.estimatedCompletion).toLocaleDateString()}
                                                                                                                                        </span>
                                                                                                                                )}
                                                                                                                        </div>
                                                                                                                        {getStatusBadge(query.status)}
                                                                                                                </CardFooter>
                                                                                                        </Card>
                                                                                                </Link>
                                                                                        ))}
                                                                                </div>
                                                                        )}
                                                                </>
                                                        )}
                                                </TabsContent>

                                                <TabsContent value="insights">
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                                <Card>
                                                                        <CardHeader className="pb-2">
                                                                                <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="text-2xl font-bold">₹1,24,350.75</div>
                                                                                <p className="text-xs text-muted-foreground mt-1">
                                                                                        <span className="text-green-600 font-medium flex items-center">
                                                                                                <TrendingUp className="h-3 w-3 mr-1" /> +2.5%
                                                                                        </span>
                                                                                        from last month
                                                                                </p>
                                                                        </CardContent>
                                                                </Card>

                                                                <Card>
                                                                        <CardHeader className="pb-2">
                                                                                <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="text-2xl font-bold">750</div>
                                                                                <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                                                                                        <div className="bg-green-500 h-1.5 rounded-full w-[83%]"></div>
                                                                                </div>
                                                                                <p className="text-xs text-muted-foreground mt-1">Excellent</p>
                                                                        </CardContent>
                                                                </Card>

                                                                <Card>
                                                                        <CardHeader className="pb-2">
                                                                                <CardTitle className="text-sm font-medium">Loan Eligibility</CardTitle>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="text-2xl font-bold">₹10,00,000</div>
                                                                                <p className="text-xs text-muted-foreground mt-1">at 8.5% interest rate</p>
                                                                        </CardContent>
                                                                </Card>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <Card className="md:col-span-2">
                                                                        <CardHeader>
                                                                                <CardTitle>Monthly Spending Analysis</CardTitle>
                                                                                <CardDescription>Your spending patterns over the last 6 months</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <SpendingChart />
                                                                        </CardContent>
                                                                </Card>

                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle>Personalized Recommendations</CardTitle>
                                                                                <CardDescription>Based on your banking activity</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">
                                                                                <div className="flex gap-3">
                                                                                        <div className="rounded-full bg-blue-100 p-2 h-fit">
                                                                                                <PiggyBank className="h-4 w-4 text-blue-600" />
                                                                                        </div>
                                                                                        <div>
                                                                                                <h3 className="font-medium text-sm">Savings Opportunity</h3>
                                                                                                <p className="text-sm text-muted-foreground">
                                                                                                        You could save ₹2,500 monthly by optimizing your subscription services.
                                                                                                </p>
                                                                                                <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                                                                                                        View Details <ArrowUpRight className="h-3 w-3 ml-1" />
                                                                                                </Button>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="flex gap-3">
                                                                                        <div className="rounded-full bg-green-100 p-2 h-fit">
                                                                                                <CreditCard className="h-4 w-4 text-green-600" />
                                                                                        </div>
                                                                                        <div>
                                                                                                <h3 className="font-medium text-sm">Credit Card Upgrade</h3>
                                                                                                <p className="text-sm text-muted-foreground">
                                                                                                        You're eligible for our premium credit card with 3x rewards on travel.
                                                                                                </p>
                                                                                                <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                                                                                                        Learn More <ArrowUpRight className="h-3 w-3 ml-1" />
                                                                                                </Button>
                                                                                        </div>
                                                                                </div>

                                                                                <div className="flex gap-3">
                                                                                        <div className="rounded-full bg-purple-100 p-2 h-fit">
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
                                                                                                        className="h-4 w-4 text-purple-600"
                                                                                                >
                                                                                                        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                                                                                                        <path d="M13 5v2"></path>
                                                                                                        <path d="M13 17v2"></path>
                                                                                                        <path d="M13 11v2"></path>
                                                                                                </svg>
                                                                                        </div>
                                                                                        <div>
                                                                                                <h3 className="font-medium text-sm">Investment Portfolio</h3>
                                                                                                <p className="text-sm text-muted-foreground">
                                                                                                        Based on your risk profile, we recommend a balanced investment portfolio.
                                                                                                </p>
                                                                                                <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                                                                                                        Explore Options <ArrowUpRight className="h-3 w-3 ml-1" />
                                                                                                </Button>
                                                                                        </div>
                                                                                </div>
                                                                        </CardContent>
                                                                </Card>

                                                                <Card>
                                                                        <CardHeader>
                                                                                <CardTitle>Recent Transactions</CardTitle>
                                                                                <CardDescription>Your latest account activity</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent>
                                                                                <div className="space-y-4">
                                                                                        <div className="flex justify-between items-center">
                                                                                                <div className="flex items-center gap-3">
                                                                                                        <div className="rounded-full bg-muted p-2 h-8 w-8 flex items-center justify-center">
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
                                                                                                                        className="h-4 w-4"
                                                                                                                >
                                                                                                                        <path d="m7 10 5 5 5-5"></path>
                                                                                                                        <path d="M21 10V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"></path>
                                                                                                                        <path d="M3 10v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6"></path>
                                                                                                                </svg>
                                                                                                        </div>
                                                                                                        <div>
                                                                                                                <h4 className="text-sm font-medium">Salary Credit</h4>
                                                                                                                <p className="text-xs text-muted-foreground">May 1, 2023</p>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <span className="text-green-600 font-medium">+₹75,000</span>
                                                                                        </div>

                                                                                        <div className="flex justify-between items-center">
                                                                                                <div className="flex items-center gap-3">
                                                                                                        <div className="rounded-full bg-muted p-2 h-8 w-8 flex items-center justify-center">
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
                                                                                                                        className="h-4 w-4"
                                                                                                                >
                                                                                                                        <path d="M19.45 13.11a2.78 2.78 0 0 0-1.6-3.56l-2.35-1.05L12 12l-3.5-3.5-2.35 1.05a2.78 2.78 0 0 0-1.6 3.56c.58 1.24 2.1 1.94 3.5 1.44l1.45-.66 1.45.66c1.4.5 2.92-.2 3.5-1.44Z"></path>
                                                                                                                        <path d="M9.5 15.5 12 17l2.5-1.5"></path>
                                                                                                                        <path d="M12 17v4"></path>
                                                                                                                        <path d="M4 21h16"></path>
                                                                                                                        <path d="M12 7V3"></path>
                                                                                                                        <path d="M8 5h8"></path>
                                                                                                                </svg>
                                                                                                        </div>
                                                                                                        <div>
                                                                                                                <h4 className="text-sm font-medium">Restaurant</h4>
                                                                                                                <p className="text-xs text-muted-foreground">May 3, 2023</p>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <span className="text-red-600 font-medium">-₹2,450</span>
                                                                                        </div>

                                                                                        <div className="flex justify-between items-center">
                                                                                                <div className="flex items-center gap-3">
                                                                                                        <div className="rounded-full bg-muted p-2 h-8 w-8 flex items-center justify-center">
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
                                                                                                                        className="h-4 w-4"
                                                                                                                >
                                                                                                                        <path d="M21 7v6h-6"></path>
                                                                                                                        <path d="M3 17v-6h6"></path>
                                                                                                                        <path d="m13 7-6 6"></path>
                                                                                                                        <path d="m11 17 6-6"></path>
                                                                                                                </svg>
                                                                                                        </div>
                                                                                                        <div>
                                                                                                                <h4 className="text-sm font-medium">Fund Transfer</h4>
                                                                                                                <p className="text-xs text-muted-foreground">May 5, 2023</p>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <span className="text-red-600 font-medium">-₹15,000</span>
                                                                                        </div>

                                                                                        <div className="flex justify-between items-center">
                                                                                                <div className="flex items-center gap-3">
                                                                                                        <div className="rounded-full bg-muted p-2 h-8 w-8 flex items-center justify-center">
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
                                                                                                                        className="h-4 w-4"
                                                                                                                >
                                                                                                                        <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z"></path>
                                                                                                                        <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z"></path>
                                                                                                                        <line x1="12" x2="12" y1="22" y2="13"></line>
                                                                                                                        <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5"></path>
                                                                                                                </svg>
                                                                                                        </div>
                                                                                                        <div>
                                                                                                                <h4 className="text-sm font-medium">Online Shopping</h4>
                                                                                                                <p className="text-xs text-muted-foreground">May 7, 2023</p>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <span className="text-red-600 font-medium">-₹3,200</span>
                                                                                        </div>
                                                                                </div>

                                                                                <Button variant="outline" className="w-full mt-4">
                                                                                        View All Transactions
                                                                                </Button>
                                                                        </CardContent>
                                                                </Card>
                                                        </div>
                                                </TabsContent>
                                        </Tabs>
                                </div>
                        </SidebarInset>
                </>
        )
}

