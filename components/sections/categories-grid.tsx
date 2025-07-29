"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Grid3X3, SlidersHorizontal } from "lucide-react"
import ProductCard from "@/components/ui/product-card"

const categoryProducts = [
  {
    id: 1,
    name: "Essential Active Tee - Marsala Print",
    price: 33.0,
    originalPrice: 48.0,
    discount: 30,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-23%20at%2010.11.08%E2%80%AFAM-0nqmpga1D2FECtk7NbbMGML8wdULAr.png",
    fit: "REGULAR FIT",
  },
  {
    id: 2,
    name: "LAGUNA ACTIVE Graphic Tee - Silver Lining",
    price: 54.6,
    originalPrice: 78.0,
    discount: 30,
    image: "/placeholder.svg?height=600&width=450",
    fit: "ATHLETIC FIT",
  },
  {
    id: 3,
    name: "Essential Straight Gym Tee - Marsala",
    price: 25.2,
    originalPrice: 36.0,
    discount: 30,
    image: "/placeholder.svg?height=800&width=450",
    fit: "ATHLETIC FIT",
  },
  {
    id: 4,
    name: "Premium Workout Tee - Navy",
    price: 42.0,
    originalPrice: 60.0,
    discount: 30,
    image: "/placeholder.svg?height=600&width=450",
    fit: "SLIM FIT",
  },
  // Second row products
  {
    id: 5,
    name: "Golden Era Authentic Oversized Tee",
    price: 35.0,
    originalPrice: 50.0,
    discount: 30,
    image: "/placeholder.svg?height=600&width=450",
    fit: "OVERSIZED FIT",
  },
  {
    id: 6,
    name: "Golden Era Lightweight Oversized Tee",
    price: 28.0,
    originalPrice: 40.0,
    discount: 30,
    image: "/placeholder.svg?height=600&width=450",
    fit: "OVERSIZED FIT",
  },
  {
    id: 7,
    name: "Straight Joggers - Dust White",
    price: 45.0,
    originalPrice: 65.0,
    discount: 30,
    image: "/placeholder.svg?height=600&width=450",
    fit: "REGULAR FIT",
  },
  {
    id: 8,
    name: "Windbreak Regular Joggers - Paloma",
    price: 52.0,
    originalPrice: 75.0,
    discount: 30,
    image: "/placeholder.svg?height=600&width=450",
    fit: "REGULAR FIT",
  },
]

const categoryTabs = [
  { id: "all", label: "ALL", active: true },
  { id: "t-shirts", label: "T-SHIRTS", active: false },
  { id: "shorts", label: "SHORTS", active: false },
  { id: "trousers", label: "TROUSERS", active: false },
  { id: "trainsets", label: "TRAINSETS", active: false },
  { id: "tanks", label: "TANKS", active: false },
]

interface CategoriesGridProps {
  selectedGender?: string | null
}

export default function CategoriesGrid({ selectedGender }: CategoriesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  // Update the heading based on selected gender
  const getHeading = () => {
    if (selectedGender === "men") return "MEN | ALL PRODUCTS"
    if (selectedGender === "women") return "WOMEN | ALL PRODUCTS"
    return "MEN | ALL PRODUCTS" // Default
  }

  // Filter products based on gender (you can expand this logic)
  const getFilteredProducts = () => {
    if (selectedGender === "women") {
      // Return women's products - you can modify this based on your product data structure
      return categoryProducts.map((product) => ({
        ...product,
        name: product.name.replace("Tee", "Top").replace("Joggers", "Leggings"),
      }))
    }
    return categoryProducts // Default to men's products
  }

  const filteredProducts = getFilteredProducts()

  return (
    <div className="bg-[#212121]">
      {/* Header Section - Dark Background */}
      <div className="bg-[#212121] text-white py-12">
        <div className="container mx-auto px-4">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide">{getHeading()}</h1>
          </div>

          {/* Rest of the component remains the same, but use filteredProducts instead of categoryProducts */}
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div className="flex flex-wrap items-center gap-1">
              {categoryTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={`px-4 py-2 text-sm font-medium uppercase tracking-wide rounded-none border-b-2 transition-colors ${selectedCategory === tab.id
                      ? "bg-[#cbf26c] text-[#212121] border-[#cbf26c] hover:bg-[#9fcc3b]"
                      : "bg-transparent text-white border-transparent hover:bg-gray-800 hover:text-[#cbf26c]"
                    }`}
                  onClick={() => setSelectedCategory(tab.id)}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <div className="flex items-center gap-2">
                <span className="text-sm uppercase tracking-wide">GRID</span>
                <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm uppercase tracking-wide">FILTER & SORT</span>
                <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Load Previous Button */}
          <div className="text-center">
            <Button className="bg-[#cbf26c] text-[#212121] hover:bg-[#9fcc3b] font-medium px-8 py-3 text-sm uppercase tracking-wide rounded-md">
              LOAD PREVIOUS
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* First Grid - 2x2 with tall right card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mb-8">
            {/* Top Left */}
            <div className="lg:col-span-1">
              <ProductCard
                key={filteredProducts[0].id}
                id={filteredProducts[0].id}
                name={filteredProducts[0].name}
                price={filteredProducts[0].price}
                originalPrice={filteredProducts[0].originalPrice}
                discount={filteredProducts[0].discount}
                image={filteredProducts[0].image}
                fit={filteredProducts[0].fit}
                className="h-full"
              />
            </div>

            {/* Top Center */}
            <div className="lg:col-span-1">
              <ProductCard
                key={filteredProducts[1].id}
                id={filteredProducts[1].id}
                name={filteredProducts[1].name}
                price={filteredProducts[1].price}
                originalPrice={filteredProducts[1].originalPrice}
                discount={filteredProducts[1].discount}
                image={filteredProducts[1].image}
                fit={filteredProducts[1].fit}
                className="h-full"
              />
            </div>

            {/* Tall Right Card - spans 2 rows */}
            <div className="lg:col-span-1 lg:row-span-2">
              <ProductCard
                key={filteredProducts[2].id}
                id={filteredProducts[2].id}
                name={filteredProducts[2].name}
                price={filteredProducts[2].price}
                originalPrice={filteredProducts[2].originalPrice}
                discount={filteredProducts[2].discount}
                image={filteredProducts[2].image}
                fit={filteredProducts[2].fit}
                className="h-full"
                tall={true}
              />
            </div>

            {/* Bottom Center */}
            {/* <div className="lg:col-span-1">
              <ProductCard
                key={filteredProducts[3].id}
                id={filteredProducts[3].id}
                name={filteredProducts[3].name}
                price={filteredProducts[3].price}
                originalPrice={filteredProducts[3].originalPrice}
                discount={filteredProducts[3].discount}
                image={filteredProducts[3].image}
                fit={filteredProducts[3].fit}
                className="h-full"
              />
            </div> */}
          </div>

          {/* Second Grid - Horizontal row of 4 products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mb-12">
            {filteredProducts.slice(4, 8).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                image={product.image}
                fit={product.fit}
                className="h-full"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mb-12">
            {filteredProducts.slice(4, 8).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                image={product.image}
                fit={product.fit}
                className="h-full"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mb-12">
            {filteredProducts.slice(4, 8).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                image={product.image}
                fit={product.fit}
                className="h-full"
              />
            ))}
          </div>

          {/* Load More Section */}
          <div className="text-center">
            <Button className="bg-[#cbf26c] text-[#212121] hover:bg-[#9fcc3b] font-semibold px-8 py-3 text-sm uppercase tracking-wide rounded-md">
              LOAD MORE PRODUCTS
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
