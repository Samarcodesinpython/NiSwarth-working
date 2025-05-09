"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Search, LogIn, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Mock authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mockUser, setMockUser] = useState(null)

  // Check localStorage for user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo")
    if (storedUser) {
      setMockUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const handleSignOut = () => {
    // Clear user from localStorage
    localStorage.removeItem("userInfo")
    setIsAuthenticated(false)
    setMockUser(null)
    router.push("/")
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Donor", href: "/donor" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "NGO", href: "/ngo" },
    { name: "Find NGOs", href: "/find-ngos" },
    { name: "All NGOs", href: "/all-ngos" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-md dark:bg-background/90"
          : "bg-background dark:bg-background",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-bold gradient-text">Ni-Swarth</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === link.href
                    ? "text-accent dark:text-accent"
                    : "text-foreground/80 hover:text-accent dark:text-foreground/80 dark:hover:text-accent",
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Find nearby NGOs..."
                className="pl-10 pr-4 py-2 w-64 rounded-full bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <ThemeToggle />

            {isAuthenticated && mockUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full">
                    <User className="h-4 w-4 mr-2" />
                    {mockUser.name?.split(" ")[0] || "User"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="w-full">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" className="bg-accent hover:bg-accent-dark text-primary font-medium">
                <Link href="/auth/signin">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-accent focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background dark:bg-background"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    pathname === link.href
                      ? "bg-primary/10 text-accent dark:bg-primary/20"
                      : "text-foreground hover:bg-primary/10 hover:text-accent dark:hover:bg-primary/20",
                  )}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 px-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="Find nearby NGOs..."
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                {isAuthenticated && mockUser ? (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center px-3 py-2 text-sm font-medium text-foreground">
                      <User className="h-4 w-4 mr-2" />
                      Signed in as {mockUser.name}
                    </div>
                    <Link
                      href="/profile"
                      className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-primary/10 hover:text-accent"
                      onClick={closeMenu}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-primary/10 hover:text-accent"
                      onClick={closeMenu}
                    >
                      Dashboard
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => {
                        handleSignOut()
                        closeMenu()
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    asChild
                    variant="default"
                    className="w-full mt-4 bg-accent hover:bg-accent-dark text-primary font-medium"
                  >
                    <Link href="/auth/signin" onClick={closeMenu}>
                      <LogIn className="mr-2 h-4 w-4" /> Sign In
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
