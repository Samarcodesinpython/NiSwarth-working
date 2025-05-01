"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ScrollToTop from "@/components/scroll-to-top"
import { MapPin, Search, Phone, Mail, Star, Grid, List } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

// Add type definition before the allNGOs array
interface NGO {
  id: number;
  name: string;
  services: string[];
  location: string;
  rating: number;
  image: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  description: string;
}

// Mock data for all NGOs
const ngoImages = [
  "/images/ngos/hope-foundation.jpg",
  "/images/ngos/care-share.jpg",
  "/images/ngos/helping-hands.jpg",
  "/images/ngos/child-welfare.jpg",
  "/images/ngos/green-earth.jpg",
  "/images/ngos/women-empowerment.jpg",
  "/images/ngos/rural-development.jpg",
  "/images/ngos/disability-support.jpg",
  "/images/ngos/uttarakhand-asha.jpg",
  "/images/ngos/heads.jpg",
  "/images/ngos/gurukul.jpg",
  "/images/ngos/sanrakshan.jpg",
  "/images/ngos/yuva-shakti.jpg",
  "/images/ngos/kartavya.jpg",
  "/images/ngos/sfid.jpg",
  "/images/ngos/disaster-relief.jpg",
  "/images/ngos/vanvasi.jpg",
  "/images/ngos/mental-wellness.jpg",
  "/images/ngos/samvedna.jpg",
  "/images/ngos/paryavaran.jpg",
  "/images/ngos/bal-sewa.jpg",
  "/images/ngos/elder-aid.jpg",
  "/images/ngos/gramin-sewa.jpg",
  "/images/ngos/digital-literacy.jpg",
  "/images/ngos/clean-water.jpg",
  "/images/ngos/sports-for-change.jpg",
  "/images/ngos/art-for-all.jpg",
  "/images/ngos/tech-for-good.jpg",
  "/images/ngos/green-warriors.jpg",
  "/images/ngos/health-first.jpg",
  "/images/ngos/himalayan-education.jpg",
  "/images/ngos/animal-welfare.jpg",
  "/images/ngos/heritage-trust.jpg",
  "/images/ngos/green-valley.jpg",
  "/images/ngos/women-center.jpg",
  "/images/ngos/youth-foundation.jpg",
  "/images/ngos/rural-society.jpg"
]

function addressToImage(address: string) {
  // Convert address to lowercase, replace spaces with hyphens, remove commas and special chars
  return "/images/ngos/" + address.toLowerCase().replace(/,/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') + ".jpg";
}

const allNGOs: NGO[] = [
  {
    id: 1,
    name: "Hope Foundation",
    services: ["Food", "Education", "Health"],
    location: "Delhi, India",
    rating: 4.9,
    image: "/images/ngos/hope-foundation.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@hopefoundation.org",
      website: "https://hopefoundation.org"
    },
    description: "Hope Foundation works to provide food, education, and healthcare to underprivileged communities in Delhi."
  },
  {
    id: 2,
    name: "Care & Share",
    services: ["Clothing", "Shelter", "Education"],
    location: "Mumbai, India",
    rating: 4.8,
    image: "/images/ngos/care-share.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@careandshare.org",
      website: "https://careandshare.org"
    },
    description: "Care & Share is dedicated to providing clothing, shelter, and education to those in need in Mumbai."
  },
  {
    id: 3,
    name: "Helping Hands",
    services: ["Health", "Food", "Elderly Care"],
    location: "Bangalore, India",
    rating: 4.7,
    image: "/images/ngos/helping-hands.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@helpinghands.org",
      website: "https://helpinghands.org"
    },
    description: "Helping Hands focuses on providing healthcare, food, and elderly care in Bangalore."
  },
  {
    id: 4,
    name: "Child Welfare Society",
    services: ["Education", "Child Care", "Nutrition"],
    location: "Hyderabad, India",
    rating: 4.6,
    image: "/images/ngos/child-welfare.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@childwelfaresociety.org",
      website: "https://childwelfaresociety.org"
    },
    description: "The Child Welfare Society is committed to providing education, child care, and nutrition in Hyderabad."
  },
  {
    id: 5,
    name: "Green Earth Initiative",
    services: ["Environment", "Education", "Community"],
    location: "Chennai, India",
    rating: 4.5,
    image: "/images/ngos/green-earth.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@greenearthinitiative.org",
      website: "https://greenearthinitiative.org"
    },
    description: "Green Earth Initiative works towards environmental conservation and community development in Chennai."
  },
  {
    id: 6,
    name: "Women Empowerment Trust",
    services: ["Women", "Education", "Livelihood"],
    location: "Kolkata, India",
    rating: 4.7,
    image: "/images/ngos/women-empowerment.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@womenempowermenttrust.org",
      website: "https://womenempowermenttrust.org"
    },
    description: "The Women Empowerment Trust is dedicated to empowering women through education and livelihood opportunities in Kolkata."
  },
  {
    id: 7,
    name: "Rural Development Foundation",
    services: ["Rural", "Agriculture", "Education"],
    location: "Lucknow, India",
    rating: 4.6,
    image: "/images/ngos/rural-development.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@ruraldevelopmentfoundation.org",
      website: "https://ruraldevelopmentfoundation.org"
    },
    description: "Rural Development Foundation works towards rural development and agriculture education in Lucknow."
  },
  {
    id: 8,
    name: "Disability Support Network",
    services: ["Disability", "Health", "Education"],
    location: "Pune, India",
    rating: 4.8,
    image: "/images/ngos/disability-support.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@disabilitysupportnetwork.org",
      website: "https://disabilitysupportnetwork.org"
    },
    description: "The Disability Support Network provides support and education to individuals with disabilities in Pune."
  },
  {
    id: 9,
    name: "Uttarakhand Asha Foundation",
    services: ["Education", "Women", "Child Care"],
    location: "Dehradun, India",
    rating: 4.9,
    image: "/images/ngos/uttarakhand-asha.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@uttarakhandasha.org",
      website: "https://uttarakhandasha.org"
    },
    description: "Uttarakhand Asha Foundation focuses on education, women empowerment, and child care in Dehradun."
  },
  {
    id: 10,
    name: "Himalayan Environmental Awareness & Development Org (HEADS)",
    services: ["Environment", "Rural", "Community"],
    location: "Dehradun, India",
    rating: 4.7,
    image: "/images/ngos/heads.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@heads.org",
      website: "https://heads.org"
    },
    description: "Himalayan Environmental Awareness & Development Org (HEADS) works towards environmental awareness and rural development in Dehradun."
  },
  {
    id: 11,
    name: "Gurukul Foundation",
    services: ["Education", "Health", "Youth"],
    location: "Dehradun, India",
    rating: 4.8,
    image: "/images/ngos/gurukul.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@gurukulfoundation.org",
      website: "https://gurukulfoundation.org"
    },
    description: "Gurukul Foundation is dedicated to providing education, health, and youth development in Dehradun."
  },
  {
    id: 12,
    name: "Sanrakshan Foundation",
    services: ["Animal Welfare", "Environment", "Rescue"],
    location: "Dehradun, India",
    rating: 4.6,
    image: "/images/ngos/sanrakshan.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@sanrakshanfoundation.org",
      website: "https://sanrakshanfoundation.org"
    },
    description: "Sanrakshan Foundation is committed to animal welfare, environmental conservation, and rescue in Dehradun."
  },
  {
    id: 13,
    name: "Yuva Shakti Foundation",
    services: ["Youth", "Education", "Skill Development"],
    location: "Dehradun, India",
    rating: 4.7,
    image: "/images/ngos/yuva-shakti.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@yuvasakti.org",
      website: "https://yuvasakti.org"
    },
    description: "Yuva Shakti Foundation focuses on youth education and skill development in Dehradun."
  },
  {
    id: 14,
    name: "Kartavya Foundation",
    services: ["Food", "Education", "Health"],
    location: "Dehradun, India",
    rating: 4.7,
    image: "/images/ngos/kartavya.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@kartavyafoundation.org",
      website: "https://kartavyafoundation.org"
    },
    description: "Kartavya Foundation is dedicated to providing food, education, and healthcare in Dehradun."
  },
  {
    id: 15,
    name: "Society for Inclusive Development (SFID)",
    services: ["Disability", "Inclusion", "Education"],
    location: "Dehradun, India",
    rating: 4.6,
    image: "/images/ngos/sfid.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@sfid.org",
      website: "https://sfid.org"
    },
    description: "Society for Inclusive Development (SFID) works towards disability inclusion and education in Dehradun."
  },
  {
    id: 16,
    name: "Himalayan Disaster Relief Network",
    services: ["Disaster Relief", "Rescue", "Community Support"],
    location: "Dehradun, India",
    rating: 4.9,
    image: "/images/ngos/disaster-relief.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@hdrn.org",
      website: "https://hdrn.org"
    },
    description: "Himalayan Disaster Relief Network provides disaster relief, rescue, and community support in Dehradun."
  },
  {
    id: 17,
    name: "Vanvasi Seva Samiti",
    services: ["Tribal Support", "Healthcare", "Education"],
    location: "Dehradun, India",
    rating: 4.5,
    image: "/images/ngos/vanvasi.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@vanvasiseva.org",
      website: "https://vanvasiseva.org"
    },
    description: "Vanvasi Seva Samiti provides tribal support, healthcare, and education in Dehradun."
  },
  {
    id: 18,
    name: "Mental Wellness Trust",
    services: ["Mental Health", "Counseling", "Awareness"],
    location: "Dehradun, India",
    rating: 4.6,
    image: "/images/ngos/mental-wellness.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@mentalwellnesstrust.org",
      website: "https://mentalwellnesstrust.org"
    },
    description: "Mental Wellness Trust focuses on mental health, counseling, and awareness in Dehradun."
  },
  {
    id: 19,
    name: "Samvedna Foundation",
    services: ["Women", "Health", "Education"],
    location: "Dehradun, India",
    rating: 4.7,
    image: "/images/ngos/samvedna.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@samvednafoundation.org",
      website: "https://samvednafoundation.org"
    },
    description: "Samvedna Foundation works towards women empowerment, health, and education in Dehradun."
  },
  {
    id: 20,
    name: "Paryavaran Chetna Sangathan",
    services: ["Environment", "Tree Plantation", "Awareness"],
    location: "Dehradun, India",
    rating: 4.8,
    image: "/images/ngos/paryavaran.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@paryavaran.org",
      website: "https://paryavaran.org"
    },
    description: "Paryavaran Chetna Sangathan focuses on environment, tree plantation, and awareness in Dehradun."
  },
  {
    id: 21,
    name: "Bal Sewa Trust",
    services: ["Child Care", "Nutrition", "Education"],
    location: "Dehradun, India",
    rating: 4.6,
    image: "/images/ngos/bal-sewa.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@balsewatrust.org",
      website: "https://balsewatrust.org"
    },
    description: "Bal Sewa Trust is dedicated to providing child care, nutrition, and education in Dehradun."
  },
  {
    id: 22,
    name: "Elder Aid Mission",
    services: ["Elderly Care", "Health", "Community"],
    location: "Dehradun, India",
    rating: 4.7,
    image: "/images/ngos/elder-aid.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@elderaidmission.org",
      website: "https://elderaidmission.org"
    },
    description: "Elder Aid Mission focuses on providing elderly care, health, and community support in Dehradun."
  },
  {
    id: 23,
    name: "Gramin Sewa Kendra",
    services: ["Rural", "Livelihood", "Agriculture"],
    location: "Dehradun, India",
    rating: 4.5,
    image: "/images/ngos/gramin-sewa.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@graminsewa.org",
      website: "https://graminsewa.org"
    },
    description: "Gramin Sewa Kendra works towards rural livelihood and agriculture in Dehradun."
  },
  {
    id: 24,
    name: "Digital Literacy Foundation",
    services: ["Education", "Technology", "Skill Development"],
    location: "Bangalore, India",
    rating: 4.8,
    image: "/images/ngos/digital-literacy.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@digitalliteracy.org",
      website: "https://digitalliteracy.org"
    },
    description: "Digital Literacy Foundation focuses on education, technology, and skill development in Bangalore."
  },
  {
    id: 25,
    name: "Clean Water Initiative",
    services: ["Environment", "Health", "Community"],
    location: "Mumbai, India",
    rating: 4.7,
    image: "/images/ngos/clean-water.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@cleanwaterinitiative.org",
      website: "https://cleanwaterinitiative.org"
    },
    description: "Clean Water Initiative works towards environmental conservation and community health in Mumbai."
  },
  {
    id: 26,
    name: "Sports for Change",
    services: ["Youth", "Education", "Community"],
    location: "Chennai, India",
    rating: 4.6,
    image: "/images/ngos/sports-for-change.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@sportsforchange.org",
      website: "https://sportsforchange.org"
    },
    description: "Sports for Change focuses on youth education and community development in Chennai."
  },
  {
    id: 27,
    name: "Art for All",
    services: ["Education", "Arts", "Community"],
    location: "Kolkata, India",
    rating: 4.8,
    image: "/images/ngos/art-for-all.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@artforall.org",
      website: "https://artforall.org"
    },
    description: "Art for All is dedicated to providing education, arts, and community development in Kolkata."
  },
  {
    id: 28,
    name: "Tech for Good",
    services: ["Technology", "Education", "Skill Development"],
    location: "Hyderabad, India",
    rating: 4.7,
    image: "/images/ngos/tech-for-good.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@techforgood.org",
      website: "https://techforgood.org"
    },
    description: "Tech for Good focuses on technology, education, and skill development in Hyderabad."
  },
  {
    id: 29,
    name: "Green Warriors",
    services: ["Environment", "Education", "Community"],
    location: "Pune, India",
    rating: 4.9,
    image: "/images/ngos/green-warriors.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@greenwarriors.org",
      website: "https://greenwarriors.org"
    },
    description: "Green Warriors focuses on environmental conservation and community development in Pune."
  },
  {
    id: 30,
    name: "Health First",
    services: ["Health", "Education", "Community"],
    location: "Ahmedabad, India",
    rating: 4.8,
    image: "/images/ngos/health-first.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@healthfirst.org",
      website: "https://healthfirst.org"
    },
    description: "Health First focuses on providing health, education, and community support in Ahmedabad."
  },
  {
    id: 31,
    name: "Himalayan Education Society",
    services: ["Education", "Youth", "Skill Development"],
    location: "Dehradun, India",
    rating: 4.7,
    image: "/images/ngos/himalayan-education.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@himalayaneducation.org",
      website: "https://himalayaneducation.org"
    },
    description: "Himalayan Education Society focuses on education, youth, and skill development in Dehradun."
  },
  {
    id: 32,
    name: "Dehradun Animal Welfare Society",
    services: ["Animal Welfare", "Rescue", "Community"],
    location: "Dehradun, India",
    rating: 4.8,
    image: "/images/ngos/animal-welfare.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@daws.org",
      website: "https://daws.org"
    },
    description: "Dehradun Animal Welfare Society focuses on animal welfare, rescue, and community support in Dehradun."
  },
  {
    id: 33,
    name: "Himalayan Heritage Trust",
    services: ["Culture", "Education", "Community"],
    location: "Dehradun, India",
    rating: 4.6,
    image: "/images/ngos/heritage-trust.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@himalayanheritage.org",
      website: "https://himalayanheritage.org"
    },
    description: "Himalayan Heritage Trust focuses on culture, education, and community development in Dehradun."
  },
  {
    id: 34,
    name: "Green Valley Foundation",
    services: ["Environment", "Education", "Agriculture"],
    location: "Dehradun, India",
    rating: 4.7,
    image: "/images/ngos/green-valley.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@greenvalley.org",
      website: "https://greenvalley.org"
    },
    description: "Green Valley Foundation focuses on environment, education, and agriculture in Dehradun."
  },
  {
    id: 35,
    name: "Dehradun Women's Empowerment Center",
    services: ["Women", "Education", "Livelihood"],
    location: "Dehradun, India",
    rating: 4.9,
    image: "/images/ngos/women-center.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@dwec.org",
      website: "https://dwec.org"
    },
    description: "Dehradun Women's Empowerment Center focuses on empowering women through education and livelihood in Dehradun."
  },
  {
    id: 36,
    name: "Himalayan Youth Foundation",
    services: ["Youth", "Education", "Sports"],
    location: "Dehradun, India",
    rating: 4.8,
    image: "/images/ngos/youth-foundation.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@himalayanyouth.org",
      website: "https://himalayanyouth.org"
    },
    description: "Himalayan Youth Foundation focuses on youth education and sports in Dehradun."
  },
  {
    id: 37,
    name: "Dehradun Rural Development Society",
    services: ["Rural", "Agriculture", "Education"],
    location: "Dehradun, India",
    rating: 4.7,
    image: "/images/ngos/rural-society.jpg",
    contact: {
      phone: "+91 98765 43210",
      email: "contact@drds.org",
      website: "https://drds.org"
    },
    description: "Dehradun Rural Development Society focuses on rural development and agriculture education in Dehradun."
  }
].map((ngo, idx) => ({
  ...ngo,
  image: ngoImages[idx % ngoImages.length] || "/images/ngos/fallback.jpg"
}))

// All available service categories
const serviceCategories = [
  "All",
  "Food",
  "Education",
  "Health",
  "Clothing",
  "Shelter",
  "Environment",
  "Child Care",
  "Elderly Care",
  "Women",
  "Disability",
  "Rural",
  "Agriculture",
  "Nutrition",
  "Livelihood",
  "Community",
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
      staggerChildren: 0.1,
    },
  },
}

// Add fallback image path
const fallbackImage = "/images/ngos/fallback.jpg"

export default function AllNGOsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter NGOs based on search query and selected service
  const filteredNGOs = allNGOs.filter((ngo) => {
    const matchesSearch = searchQuery
      ? ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    const matchesService = selectedService === "All" || ngo.services.includes(selectedService)

    return matchesSearch && matchesService
  })

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">All NGOs</h1>
            <p className="text-xl mb-8">
              Browse through our directory of NGOs and find the ones that align with your interests and values.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="w-full md:w-1/2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground/40" />
              <Input
                type="text"
                placeholder="Search NGOs by name, location, or description..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full md:w-1/4">
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-primary text-white" : ""}
              >
                <Grid className="h-4 w-4 mr-1" /> Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-primary text-white" : ""}
              >
                <List className="h-4 w-4 mr-1" /> List
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NGOs Listing Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          {filteredNGOs.length > 0 ? (
            <>
              {viewMode === "grid" ? (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredNGOs.map((ngo) => (
                    <motion.div key={ngo.id} variants={fadeIn}>
                      <Card className="hover-lift overflow-hidden h-full">
                        <div className="relative h-48 w-full">
                          <Image
                            src={ngo.image}
                            alt={ngo.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={false}
                            onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                          />
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
                          <p className="text-foreground/70 text-sm mb-2">{ngo.description}</p>
                          <a href={`tel:${ngo.contact.phone}`} className="text-primary hover:underline block">{ngo.contact.phone}</a>
                          <a href={`mailto:${ngo.contact.email}`} className="text-primary hover:underline block mb-2">{ngo.contact.email}</a>
                          <Button asChild className="w-full mt-2 bg-accent hover:bg-accent-dark text-primary font-medium">
                            <a href={ngo.contact.website} target="_blank" rel="noopener noreferrer">View Details</a>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  {filteredNGOs.map((ngo) => (
                    <motion.div key={ngo.id} variants={fadeIn}>
                      <Card className="hover-lift">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="relative h-48 w-full md:w-48 flex-shrink-0">
                              <Image
                                src={ngo.image}
                                alt={ngo.name}
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 768px) 100vw, 192px"
                                priority={false}
                                onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
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
                              <p className="text-foreground/70 mb-2">{ngo.description}</p>
                              <a href={`tel:${ngo.contact.phone}`} className="text-primary hover:underline block">{ngo.contact.phone}</a>
                              <a href={`mailto:${ngo.contact.email}`} className="text-primary hover:underline block mb-2">{ngo.contact.email}</a>
                              <Button asChild className="w-full mt-2 bg-accent hover:bg-accent-dark text-primary font-medium">
                                <a href={ngo.contact.website} target="_blank" rel="noopener noreferrer">View Details</a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-foreground/30" />
              </div>
              <h3 className="text-xl font-semibold text-foreground/70 mb-2">No NGOs Found</h3>
              <p className="text-foreground/50 mb-6">
                We couldn't find any NGOs matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedService("All")
                }}
                className="bg-primary hover:bg-primary-dark text-white"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <ScrollToTop />
    </>
  )
}
