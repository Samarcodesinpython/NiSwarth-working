"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for products
const products = [
  {
    id: 1,
    name: "Handwoven Bamboo Basket",
    description: "Eco-friendly bamboo basket handcrafted by tribal artisans from Assam.",
    price: "₹850",
    image: "/placeholder.svg?height=200&width=200",
    seller: "Tribal Crafts Collective",
    tags: ["Handmade", "Eco-friendly", "Tribal"],
  },
  {
    id: 2,
    name: "Organic Honey",
    description: "Pure organic honey harvested from the forests of Uttarakhand by local beekeepers.",
    price: "₹450",
    image: "/placeholder.svg?height=200&width=200",
    seller: "Mountain Honey Co-op",
    tags: ["Organic", "Food", "Rural"],
  },
  {
    id: 3,
    name: "Hand-painted Pottery",
    description: "Traditional pottery items hand-painted by women artisans from Rajasthan.",
    price: "₹1,200",
    image: "/placeholder.svg?height=200&width=200",
    seller: "Women's Pottery Collective",
    tags: ["Handmade", "Women-led", "Art"],
  },
  {
    id: 4,
    name: "Cotton Handloom Scarf",
    description: "Handwoven cotton scarf made using traditional techniques by rural weavers.",
    price: "₹650",
    image: "/placeholder.svg?height=200&width=200",
    seller: "Village Weavers Association",
    tags: ["Handmade", "Textile", "Rural"],
  },
  {
    id: 5,
    name: "Coconut Shell Crafts",
    description: "Eco-friendly home decor items made from coconut shells by coastal communities.",
    price: "₹550",
    image: "/placeholder.svg?height=200&width=200",
    seller: "Coastal Craft Initiative",
    tags: ["Eco-friendly", "Upcycled", "Handmade"],
  },
  {
    id: 6,
    name: "Tribal Jewelry Set",
    description: "Handcrafted jewelry set made by tribal artisans using traditional designs and techniques.",
    price: "₹1,500",
    image: "/placeholder.svg?height=200&width=200",
    seller: "Tribal Women's Collective",
    tags: ["Handmade", "Women-led", "Tribal"],
  },
  {
    id: 7,
    name: "Organic Spice Box",
    description: "Set of organic spices grown by small-scale farmers using sustainable practices.",
    price: "₹750",
    image: "/placeholder.svg?height=200&width=200",
    seller: "Farmers' Cooperative",
    tags: ["Organic", "Food", "Sustainable"],
  },
  {
    id: 8,
    name: "Handmade Paper Products",
    description: "Eco-friendly stationery made from recycled paper by rural artisans.",
    price: "₹350",
    image: "/placeholder.svg?height=200&width=200",
    seller: "Paper Craft Collective",
    tags: ["Eco-friendly", "Recycled", "Handmade"],
  },
]

export default function MarketPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAdmin, setIsAdmin] = useState(false)

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase())

    if (categoryFilter === "all") return matchesSearch
    return matchesSearch && product.tags.some((tag) => tag.toLowerCase() === categoryFilter.toLowerCase())
  })

  // Get unique categories from products
  const categories = ["all", ...new Set(products.flatMap((product) => product.tags))]

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Cottage Market</h1>
          <p className="text-muted-foreground">
            Support small businesses and artisans while making a positive impact on local communities.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products, sellers, or descriptions..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden bg-background border-border hover:border-primary/50 transition-all duration-300 rounded-2xl"
          >
            <div className="aspect-square w-full overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{product.seller}</p>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/10 text-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="font-bold text-lg">{product.price}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full">Support Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Floating Add Button for Admins */}
      {isAdmin && (
        <Button
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
