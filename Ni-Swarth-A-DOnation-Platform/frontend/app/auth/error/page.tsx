"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [errorDescription, setErrorDescription] = useState<string | null>(null)

  useEffect(() => {
    // Get error from URL query parameters
    const errorParam = searchParams.get("error")

    // Set a friendly error message based on the error code
    if (errorParam) {
      setError(errorParam)

      switch (errorParam) {
        case "Configuration":
          setErrorDescription("There is a problem with the server configuration.")
          break
        case "AccessDenied":
          setErrorDescription("You do not have permission to sign in.")
          break
        case "Verification":
          setErrorDescription("The verification token has expired or has already been used.")
          break
        case "OAuthSignin":
          setErrorDescription("Error in the OAuth sign-in process.")
          break
        case "OAuthCallback":
          setErrorDescription("Error in the OAuth callback process.")
          break
        case "OAuthCreateAccount":
          setErrorDescription("Could not create OAuth provider user in the database.")
          break
        case "EmailCreateAccount":
          setErrorDescription("Could not create email provider user in the database.")
          break
        case "Callback":
          setErrorDescription("Error in the OAuth callback handler.")
          break
        case "OAuthAccountNotLinked":
          setErrorDescription("The email on the account is already linked, but not with this OAuth account.")
          break
        case "EmailSignin":
          setErrorDescription("The email could not be sent.")
          break
        case "CredentialsSignin":
          setErrorDescription("The sign in credentials were incorrect.")
          break
        case "SessionRequired":
          setErrorDescription("You must be signed in to access this page.")
          break
        default:
          setErrorDescription("An unknown error occurred.")
      }
    } else {
      setError("Unknown")
      setErrorDescription("An unknown error occurred.")
    }
  }, [searchParams])

  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600 dark:text-red-400">Authentication Error</CardTitle>
          <CardDescription>There was a problem signing you in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <p className="font-semibold mb-2">{error}</p>
            <p className="text-foreground/70">{errorDescription}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/auth/signin">Try Again</Link>
          </Button>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
