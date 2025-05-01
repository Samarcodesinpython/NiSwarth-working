"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export default function ForbiddenPage() {
  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-amber-600 dark:text-amber-400">Access Forbidden</CardTitle>
          <CardDescription>You do not have permission to access this resource</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-foreground/70 mb-6">
            You don't have the necessary permissions to view this page. Please contact an administrator if you believe
            this is an error.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
