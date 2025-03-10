import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function RegistrationSuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Registration Successful!</CardTitle>
            <CardDescription>Your account has been created successfully</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p>
            Thank you for registering with BankAssist. You can now log in to your account and start submitting your
            banking queries.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/login">Proceed to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

