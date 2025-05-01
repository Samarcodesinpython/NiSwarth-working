"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function SignOutPage() {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      // Remove user from localStorage
      localStorage.removeItem("user")

      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
      setIsSigningOut(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold gradient-text">Sign Out</CardTitle>
          <CardDescription>Are you sure you want to sign out?</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-foreground/70 mb-6">You will need to sign in again to access your account.</p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button variant="outline" onClick={handleCancel} disabled={isSigningOut}>
            Cancel
          </Button>
          <Button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="bg-accent hover:bg-accent-dark text-primary font-medium"
          >
            {isSigningOut ? "Signing Out..." : "Sign Out"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
