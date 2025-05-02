"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ScrollToTop from "@/components/scroll-to-top"
import { ArrowRight, Heart, Users, Building, MapPin, Star, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

// Mock data for top NGOs
const topNGOs = [
  {
    id: 1,
    name: "Hope Foundation",
    services: ["Food", "Education", "Health"],
    location: "Delhi, India",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Care & Share",
    services: ["Clothing", "Shelter", "Education"],
    location: "Mumbai, India",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Helping Hands",
    services: ["Health", "Food", "Elderly Care"],
    location: "Bangalore, India",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Child Welfare Society",
    services: ["Education", "Child Care", "Nutrition"],
    location: "Hyderabad, India",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Green Earth Initiative",
    services: ["Environment", "Education", "Community"],
    location: "Chennai, India",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Donor",
    content:
      "Ni-Swarth made it so easy to find NGOs that align with my values. I've been able to donate items that I know are going directly to those who need them most.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Volunteer",
    content:
      "The volunteer matching system is incredible! I found an NGO that needed exactly the skills I have to offer, and the experience has been life-changing.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Sunita Patel",
    role: "NGO Director",
    content:
      "As a small NGO, visibility was always our challenge. Since joining Ni-Swarth, we've seen a 200% increase in donations and volunteer applications.",
    image: "/placeholder.svg?height=80&width=80",
  },
]

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Children smiling"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 dark:from-primary/90 dark:to-secondary/90" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="container relative z-10 px-4 text-center"
        >
          <div className="max-w-3xl mx-auto p-8 rounded-2xl backdrop-blur-sm">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
              Helping Hands, <span className="text-accent">Healing Hearts</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-white/90 uppercase tracking-wider mb-6">
              A platform for change, a community for growth
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Empowering communities with smarter donations to create meaningful impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-primary font-bold text-lg group">
                <Link href="#mission">
                  Join Our Mission
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white dark:border-white text-primary dark:text-white hover:bg-white/20 font-bold"
              >
                <Link href="/find-ngos">Find NGOs Near You</Link>
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <a href="#quick-actions" className="text-white/80 hover:text-white">
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
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Quick CTA Section */}
      <section id="quick-actions" className="py-16 bg-background">
        <div className="container px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn}>
              <Card className="hover-lift border-2 border-primary/10 h-full">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Find NGOs</h3>
                  <p className="text-foreground/70 mb-6 flex-grow">
                    Discover NGOs that align with your values and are making a difference in your community.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white group"
                  >
                    <Link href="/find-ngos">
                      Explore NGOs{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="hover-lift border-2 border-primary/10 h-full">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Donate Items</h3>
                  <p className="text-foreground/70 mb-6 flex-grow">
                    Contribute food, clothes, stationery, and more to those who need it most.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white group"
                  >
                    <Link href="/donor">
                      Donate Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="hover-lift border-2 border-primary/10 h-full">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">Volunteer Now</h3>
                  <p className="text-foreground/70 mb-6 flex-grow">
                    Share your time and skills to make a direct impact in your community.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white group"
                  >
                    <Link href="/volunteer">
                      Join as Volunteer{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section id="mission" className="py-16 gradient-bg text-white">
        <div className="container px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-accent">Our Mission</h2>
            <p className="text-xl mb-8">
              Ni-Swarth connects donors and volunteers with NGOs to maximize impact and create sustainable change. We
              believe in transparency, efficiency, and community-driven solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">100+</span>
                </div>
                <h3 className="text-lg font-medium">NGOs Registered</h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">5K+</span>
                </div>
                <h3 className="text-lg font-medium">Donations Made</h3>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">2K+</span>
                </div>
                <h3 className="text-lg font-medium">Active Volunteers</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top NGOs Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">Top NGOs</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              These organizations are making a significant impact in their communities. Connect with them to contribute
              to their mission.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {topNGOs.map((ngo) => (
              <motion.div key={ngo.id} variants={fadeIn}>
                <Card className="hover-lift overflow-hidden h-full">
                  <div className="relative h-48">
                    <Image src={ngo.image || "/placeholder.svg"} alt={ngo.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-primary">{ngo.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-accent fill-accent" />
                        <span className="ml-1 text-sm font-medium">{ngo.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center mb-3 text-sm text-foreground/70">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{ngo.location}</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {ngo.services.map((service, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white group"
                    >
                      <Link href={`/ngo/${ngo.id}`}>
                        View Details{" "}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mt-12"
          >
            <Button asChild variant="default" className="bg-accent hover:bg-accent-dark text-primary font-medium group">
              <Link href="/all-ngos">
                View All NGOs <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-secondary/10 dark:bg-secondary/5">
        <div className="container px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">What People Say</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Hear from our community of donors, volunteers, and NGO partners about their experiences with Ni-Swarth.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.id} variants={fadeIn}>
                <Card className="hover-lift h-full">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">{testimonial.name}</h3>
                        <p className="text-sm text-foreground/70">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-foreground/80 italic flex-grow">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-bg text-white">
        <div className="container px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8">
              Join our community of changemakers and help create a better world for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-primary font-bold group">
                <Link href="/donor">
                  Donate Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20 group">
                <Link href="/volunteer">
                  Become a Volunteer{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ScrollToTop />
    </>
  )
}
