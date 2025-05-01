"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import ScrollToTop from "@/components/scroll-to-top"
import { MapPin, Search, Phone, Mail, ExternalLink, MapIcon, Loader2, Locate } from "lucide-react"
import dynamic from "next/dynamic"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import("./map"), { ssr: false })

// Mock data for NGOs
const mockNGOs = [
  {
    id: 1,
    name: "Hope Foundation",
    services: ["Food", "Education", "Health"],
    location: "Delhi, India",
    coordinates: { lat: 28.6139, lng: 77.209 },
    distance: 2.3,
    contact: {
      phone: "+91 98765 43210",
      email: "contact@hopefoundation.org",
      website: "https://hopefoundation.org",
    },
  },
  {
    id: 2,
    name: "Care & Share",
    services: ["Clothing", "Shelter", "Education"],
    location: "Mumbai, India",
    coordinates: { lat: 19.076, lng: 72.8777 },
    distance: 3.5,
    contact: {
      phone: "+91 98765 43211",
      email: "info@careandshare.org",
      website: "https://careandshare.org",
    },
  },
  {
    id: 3,
    name: "Helping Hands",
    services: ["Health", "Food", "Elderly Care"],
    location: "Bangalore, India",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    distance: 4.1,
    contact: {
      phone: "+91 98765 43212",
      email: "contact@helpinghands.org",
      website: "https://helpinghands.org",
    },
  },
  {
    id: 4,
    name: "Child Welfare Society",
    services: ["Education", "Child Care", "Nutrition"],
    location: "Hyderabad, India",
    coordinates: { lat: 17.385, lng: 78.4867 },
    distance: 5.2,
    contact: {
      phone: "+91 98765 43213",
      email: "info@childwelfare.org",
      website: "https://childwelfare.org",
    },
  },
  {
    id: 5,
    name: "Green Earth Initiative",
    services: ["Environment", "Education", "Community"],
    location: "Chennai, India",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    distance: 6.7,
    contact: {
      phone: "+91 98765 43214",
      email: "contact@greenearth.org",
      website: "https://greenearth.org",
    },
  },
]

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function FindNGOsPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearbyNGOs, setNearbyNGOs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNGO, setSelectedNGO] = useState<any | null>(null)
  const { toast } = useToast()

  // Function to get user's current location
  const getUserLocation = () => {
    setIsLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })
          findNearbyNGOs({ lat: latitude, lng: longitude })
          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter it manually.",
            variant: "destructive",
          })
          setIsLoading(false)
        },
      )
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation. Please enter your location manually.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Function to find nearby NGOs based on location
  const findNearbyNGOs = async (location: { lat: number; lng: number }) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/nearest-ngos?lat=${location.lat}&lon=${location.lng}`);
      if (!res.ok) throw new Error("Failed to fetch NGOs");
      const data = await res.json();
      // You may need to map/format the data to match your frontend's expected structure
      setNearbyNGOs(
        data.map((ngo: any, idx: number) => ({
          id: idx + 1,
          name: ngo.name,
          services: [], // You can enhance this by returning services from Python if needed
          location: ngo.address,
          coordinates: { lat: null, lng: null }, // You can enhance this by returning lat/lon from Python if needed
          distance: ngo.distance,
          contact: {
            phone: "",
            email: "",
            website: "",
          },
        }))
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not fetch nearby NGOs.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };
  // Function to handle manual location input
  const handleManualLocation = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const latInput = form.elements.namedItem("latitude") as HTMLInputElement
    const lngInput = form.elements.namedItem("longitude") as HTMLInputElement

    const lat = Number.parseFloat(latInput.value)
    const lng = Number.parseFloat(lngInput.value)

    if (isNaN(lat) || isNaN(lng)) {
      toast({
        title: "Invalid Coordinates",
        description: "Please enter valid latitude and longitude values.",
        variant: "destructive",
      })
      return
    }

    setUserLocation({ lat, lng })
    findNearbyNGOs({ lat, lng })
  }

  // Filter NGOs based on search query
  const filteredNGOs = nearbyNGOs.filter((ngo) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      ngo.name.toLowerCase().includes(query) ||
      ngo.location.toLowerCase().includes(query) ||
      ngo.services.some((service: string) => service.toLowerCase().includes(query))
    )
  })

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Find NGOs Near You</h1>
            <p className="text-xl mb-8">
              Discover NGOs in your area that align with your interests and are making a difference in your community.
            </p>
            <Button
              onClick={getUserLocation}
              size="lg"
              className="bg-accent hover:bg-accent-dark text-primary font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Location...
                </>
              ) : (
                <>
                  <Locate className="mr-2 h-4 w-4" />
                  Use My Current Location
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Map and Search Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-primary mb-4">Your Location</h2>

                    <Button
                      onClick={getUserLocation}
                      className="w-full mb-4 bg-accent hover:bg-accent-dark text-primary font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Getting Location...
                        </>
                      ) : (
                        <>
                          <MapPin className="mr-2 h-4 w-4" />
                          Use My Current Location
                        </>
                      )}
                    </Button>

                    <div className="mb-4">
                      <div className="relative flex items-center">
                        <div className="flex-grow border-t border-border"></div>
                        <span className="mx-4 text-foreground/70 text-sm">OR</span>
                        <div className="flex-grow border-t border-border"></div>
                      </div>
                    </div>

                    <form onSubmit={handleManualLocation}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="latitude" className="block text-sm font-medium text-foreground/70 mb-1">
                            Latitude
                          </label>
                          <Input id="latitude" name="latitude" type="text" placeholder="e.g., 28.6139" required />
                        </div>

                        <div>
                          <label htmlFor="longitude" className="block text-sm font-medium text-foreground/70 mb-1">
                            Longitude
                          </label>
                          <Input id="longitude" name="longitude" type="text" placeholder="e.g., 77.2090" required />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary-dark text-white"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Finding NGOs...
                            </>
                          ) : (
                            <>
                              <Search className="mr-2 h-4 w-4" />
                              Find Nearby NGOs
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {nearbyNGOs.length > 0 && (
                <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-primary">Nearby NGOs</h2>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
                          <Input
                            type="text"
                            placeholder="Search NGOs..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                        {filteredNGOs.length > 0 ? (
                          filteredNGOs.map((ngo) => (
                            <Card
                              key={ngo.id}
                              className={`hover:shadow-md transition-shadow cursor-pointer ${
                                selectedNGO?.id === ngo.id ? "border-2 border-primary" : ""
                              }`}
                              onClick={() => setSelectedNGO(ngo)}
                            >
                              <CardContent className="p-4">
                                <h3 className="font-semibold text-primary">{ngo.name}</h3>
                                <div className="flex items-center text-sm text-foreground/70 mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span>{ngo.location}</span>
                                </div>
                                <div className="flex items-center text-sm text-foreground/70 mt-1">
                                  <MapIcon className="h-3 w-3 mr-1" />
                                  <span>{ngo.distance} km away</span>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {ngo.services.map((service: string, index: number) => (
                                    <span
                                      key={index}
                                      className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full"
                                    >
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <div className="text-center py-8 text-foreground/50">No NGOs found matching your search.</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-2">
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className="h-full">
                <Card className="h-full">
                  <CardContent className="p-6 h-full">
                    {userLocation ? (
                      <div className="h-[600px] relative">
                        <Map
                          userLocation={userLocation}
                          ngos={nearbyNGOs}
                          selectedNGO={selectedNGO}
                          setSelectedNGO={setSelectedNGO}
                        />
                      </div>
                    ) : (
                      <div className="h-[600px] flex items-center justify-center bg-muted rounded-lg">
                        <div className="text-center p-6">
                          <MapIcon className="h-16 w-16 text-foreground/30 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-foreground/70 mb-2">No Location Selected</h3>
                          <p className="text-foreground/50 mb-4">
                            Please use your current location or enter coordinates manually to see NGOs on the map.
                          </p>
                          <Button
                            onClick={getUserLocation}
                            className="bg-accent hover:bg-accent-dark text-primary font-medium"
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            Use My Location
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Selected NGO Details */}
          {selectedNGO && (
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-primary mb-2">{selectedNGO.name}</h2>
                      <div className="flex items-center text-foreground/70 mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{selectedNGO.location}</span>
                        <span className="mx-2">•</span>
                        <span>{selectedNGO.distance} km away</span>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <a href={`/ngo/${selectedNGO.id}`}>View Full Profile</a>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-3">Services</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedNGO.services.map((service: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg font-semibold text-primary mb-3">Contact Information</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Phone className="h-4 w-4 text-accent mr-2" />
                          <a
                            href={`tel:${selectedNGO.contact.phone}`}
                            className="text-foreground/70 hover:text-primary"
                          >
                            {selectedNGO.contact.phone}
                          </a>
                        </li>
                        <li className="flex items-center">
                          <Mail className="h-4 w-4 text-accent mr-2" />
                          <a
                            href={`mailto:${selectedNGO.contact.email}`}
                            className="text-foreground/70 hover:text-primary"
                          >
                            {selectedNGO.contact.email}
                          </a>
                        </li>
                        <li className="flex items-center">
                          <ExternalLink className="h-4 w-4 text-accent mr-2" />
                          <a
                            href={selectedNGO.contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/70 hover:text-primary"
                          >
                            {selectedNGO.contact.website.replace(/^https?:\/\//, "")}
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-3">Quick Actions</h3>
                      <div className="space-y-3">
                        <Button asChild className="w-full bg-accent hover:bg-accent-dark text-primary font-medium">
                          <a href={`/donor?ngo=${selectedNGO.id}`}>Donate to this NGO</a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                        >
                          <a href={`/volunteer?ngo=${selectedNGO.id}`}>Volunteer with this NGO</a>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                        >
                          <a href={`mailto:${selectedNGO.contact.email}`}>Contact via Email</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      <ScrollToTop />
    </>
  )
}
