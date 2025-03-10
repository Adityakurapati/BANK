import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Shield, UserPlus, LogIn } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">BankAssist</h1>
          <p className="mt-2 text-muted-foreground">Secure banking query resolution with facial authentication</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to BankAssist</CardTitle>
            <CardDescription>Resolve your banking queries securely with facial authentication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium">Secure Authentication</h3>
                <p className="text-sm text-muted-foreground">Aadhar OTP, PAN verification, and facial recognition</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
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
                className="h-6 w-6 text-primary"
              >
                <path d="M12 9v4"></path>
                <path d="M12 16h.01"></path>
                <path d="M5.93 19H18a2 2 0 0 0 1.66-3.07l-6-9.02a2 2 0 0 0-3.32 0l-6 9.02A2 2 0 0 0 5.93 19Z"></path>
              </svg>
              <div>
                <h3 className="font-medium">Query Management</h3>
                <p className="text-sm text-muted-foreground">Submit and track your banking queries</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href="/register">
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

