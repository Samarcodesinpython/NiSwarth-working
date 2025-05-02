"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { FcGoogle } from "react-icons/fc"
import Link from "next/link"

// --- Zod Schemas ---
const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

const registerSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
    role: z.enum(["donor", "volunteer", "ngo"], {
      required_error: "Please select a role.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// --- Form Value Types ---
type LoginFormValues = z.infer<typeof loginSchema>
type RegisterFormValues = z.infer<typeof registerSchema>

// --- User Interface Definition ---
interface User {
  _id?: string; // Optional if backend provides it
  token?: string; // Optional if backend provides it
  email: string;
  name: string;
  role: "donor" | "volunteer" | "ngo" | string; // Use specific roles or general string
}


export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("login")

  // --- Forms Initialization ---
  const loginForm = useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
          email: "",
          password: "",
      },
  })
  const registerForm = useForm<RegisterFormValues>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "donor", // Default role
      },
  })

  // --- Login Submit (with API Call) ---
  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      // Use the response data from the backend
      const user: User = responseData;

      // Store user info (including token if provided by backend)
      localStorage.setItem("userInfo", JSON.stringify(user));

      toast({
        title: "Success",
        description: "Logged in successfully!",
      });

      // Redirect based on role from backend response
      if (user.role === "donor") {
        router.push("/donor");
      } else if (user.role === "volunteer") {
        router.push("/volunteer");
      } else if (user.role === "ngo") {
        router.push("/ngo");
      } else {
        router.push(callbackUrl);
      }
    } catch (error: any) {
      toast({
        title: "Login Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --- Register Submit (with API Call) ---
  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'; // Adjust if needed

    try {
        const response = await fetch(`${apiUrl}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
            }),
         });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
        }

        // Use the response data from the backend
        const registeredUser: User = responseData; // Assuming backend returns User-like object

        // Store user info (including token if provided by backend)
        // Note on Security: Consider httpOnly cookies set by backend for tokens
        localStorage.setItem("userInfo", JSON.stringify(registeredUser));

        toast({
            title: "Success",
            description: "Account created successfully!",
        });

        // Redirect based on role from backend response
        if (registeredUser.role === "donor") {
            router.push("/donor");
        } else if (registeredUser.role === "volunteer") {
            router.push("/volunteer");
        } else if (registeredUser.role === "ngo") {
            router.push("/ngo");
        } else {
            router.push(callbackUrl);
        }

    } catch (error: any) {
        toast({
            title: "Registration Error",
            description: error.message || "Something went wrong. Please try again.",
            variant: "destructive",
        });
    } finally {
      setIsLoading(false)
    }
  }

  // --- Google Sign In (Mock) ---
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // TODO: Implement actual Google Sign-In logic (e.g., using NextAuth.js)
    try {
        // Mock Google user data
        const googleUser: User = {
             name: "Google User",
             email: "google.user@example.com",
             role: "donor" // Example role
        };
        // Use "userInfo" key consistent with registration
        localStorage.setItem("userInfo", JSON.stringify(googleUser));
        router.push("/donor"); // Redirect after mock sign-in
    } catch (error) {
        toast({
            title: "Error",
            description: "Google sign in failed (mock).", // Indicate it's the mock failing
            variant: "destructive"
        });
    } finally {
        setIsLoading(false);
    }
  };

  // --- JSX Rendering ---
  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <Card className="w-full">
        <CardHeader className="text-center">
             <CardTitle className="text-2xl font-bold gradient-text">Welcome to Ni-Swarth</CardTitle>
             <CardDescription>Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
               <TabsTrigger value="login">Sign In</TabsTrigger>
               <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
               {/* Login Form */}
               <Form {...loginForm}>
                 <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                   <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                             <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                   />
                   <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                   />
                   <Button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent-dark text-primary font-medium"
                      disabled={isLoading}
                   >
                     {isLoading ? "Signing in..." : "Sign In"}
                   </Button>
                 </form>
               </Form>
               {/* OR Separator & Google Button */}
               <div className="mt-4">
                  <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-muted" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                      </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4" onClick={handleGoogleSignIn} disabled={isLoading}>
                      <FcGoogle className="mr-2 h-4 w-4" /> Google
                  </Button>
               </div>
            </TabsContent>
            <TabsContent value="register">
                {/* Register Form */}
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                       control={registerForm.control}
                       name="name"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Name</FormLabel>
                           <FormControl>
                              <Input placeholder="Your full name" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                    />
                    <FormField
                       control={registerForm.control}
                       name="email"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Email</FormLabel>
                            <FormControl>
                               <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                         </FormItem>
                       )}
                    />
                    <FormField
                       control={registerForm.control}
                       name="password"
                       render={({ field }) => (
                         <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                               <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                         </FormItem>
                       )}
                    />
                    <FormField
                       control={registerForm.control}
                       name="confirmPassword"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                               <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                    />
                    <FormField
                       control={registerForm.control}
                       name="role"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>I am a</FormLabel>
                           <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                           >
                              <option value="donor">Donor</option>
                              <option value="volunteer">Volunteer</option>
                              <option value="ngo">NGO</option>
                            </select>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                   <Button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent-dark text-primary font-medium"
                      disabled={isLoading}
                   >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-primary">
                    Privacy Policy
                </Link>
                .
            </p>
        </CardFooter>
      </Card>
    </div>
  )
}