"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">Authentication Required</CardTitle>
          <CardDescription>You need to be signed in to access this page</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-foreground/70 mb-6">Please sign in to your account to access this resource.</p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
