"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, CheckCircle, XCircle, MessageSquare, FileText, Video, AudioLines } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import Link from "next/link"

type QueryStatus = "Requested" | "Under Process" | "Accepted By Manager" | "Rejected" | "Completed"

interface QueryDetails {
  id: string
  title: string
  description: string
  createdAt: string
  status: QueryStatus
  estimatedCompletion: string
  mediaType: "text" | "video" | "audio"
  mediaUrl?: string
  updates: {
    date: string
    status: QueryStatus
    message: string
  }[]
}

export default function QueryDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const [query, setQuery] = useState<QueryDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch query details
    setTimeout(() => {
      if (id === "Q1001") {
        setQuery({
          id: "Q1001",
          title: "Credit Card Statement Issue",
          description:
            "I haven't received my credit card statement for the last month. I've checked my email and mail but couldn't find it. I need this for my tax filing.",
          createdAt: "2023-05-15T10:30:00Z",
          status: "Under Process",
          estimatedCompletion: "2023-05-18",
          mediaType: "video",
          mediaUrl: "/placeholder.svg?height=200&width=320",
          updates: [
            {
              date: "2023-05-15T10:30:00Z",
              status: "Requested",
              message: "Query submitted successfully",
            },
            {
              date: "2023-05-16T09:15:00Z",
              status: "Under Process",
              message: "Your query has been assigned to a representative",
            },
          ],
        })
      } else {
        // Default fallback data
        setQuery({
          id: id as string,
          title: "Query Details",
          description: "Query description not available",
          createdAt: new Date().toISOString(),
          status: "Requested",
          estimatedCompletion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          mediaType: "text",
          updates: [
            {
              date: new Date().toISOString(),
              status: "Requested",
              message: "Query submitted successfully",
            },
          ],
        })
      }
      setIsLoading(false)
    }, 1500)
  }, [id])

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

  const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
      case "video":
        return <Video className="h-5 w-5" />
      case "audio":
        return <AudioLines className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className="container mx-auto p-4 md:p-6 max-w-3xl">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-2">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Query Details</h1>
          </div>

          {isLoading ? (
            <Card className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <Separator />
                <div className="h-20 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ) : query ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{query.title}</CardTitle>
                      <CardDescription>
                        Query ID: {query.id} • Created on {new Date(query.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    {getStatusBadge(query.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Description</h3>
                    <p className="text-sm">{query.description}</p>
                  </div>

                  {query.mediaUrl && (
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        {getMediaIcon(query.mediaType)}
                        <span className="ml-2">Attached {query.mediaType}</span>
                      </h3>
                      {query.mediaType === "video" && (
                        <div className="rounded-md overflow-hidden bg-muted aspect-video flex items-center justify-center">
                          <img
                            src={query.mediaUrl || "/placeholder.svg"}
                            alt="Video thumbnail"
                            className="w-full h-auto"
                          />
                        </div>
                      )}
                      {query.mediaType === "audio" && (
                        <div className="rounded-md overflow-hidden bg-muted p-4 flex items-center justify-center">
                          <AudioLines className="h-10 w-10 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium mb-2">Status</h3>
                    <div className="flex items-center">
                      {getStatusIcon(query.status)}
                      <span className="ml-2">{query.status}</span>
                    </div>
                    {query.status !== "Completed" && query.status !== "Rejected" && (
                      <p className="text-sm mt-1">
                        Estimated completion: {new Date(query.estimatedCompletion).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Updates
                    </h3>
                    <div className="space-y-3">
                      {query.updates.map((update, index) => (
                        <div key={index} className="bg-muted rounded-md p-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              {getStatusIcon(update.status)}
                              <span className="ml-2 font-medium">{update.status}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(update.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{update.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <XCircle className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Query not found</h3>
                <p className="text-muted-foreground mt-2">
                  The query you're looking for doesn't exist or has been removed
                </p>
                <Button asChild className="mt-4">
                  <Link href="/dashboard">Back to Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </SidebarInset>
    </>
  )
}

