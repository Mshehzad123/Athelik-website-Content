"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Share2, Star, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { Product } from "@/lib/types"

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>("M")
  const [selectedColor, setSelectedColor] = useState<string>("Coral")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    highlight: true,
    purpose: false,
    features: false,
    materials: false,
    reviews: false,
  })

  // Mock color options for the shorts
  const colorOptions = [
    { name: "Coral", image: "/placeholder.svg?height=80&width=60" },
    { name: "Red", image: "/placeholder.svg?height=80&width=60" },
    { name: "Pink", image: "/placeholder.svg?height=80&width=60" },
    { name: "Navy", image: "/placeholder.svg?height=80&width=60" },
    { name: "Light Pink", image: "/placeholder.svg?height=80&width=60" },
    { name: "Cream", image: "/placeholder.svg?height=80&width=60" },
    { name: "Black", image: "/placeholder.svg?height=80&width=60" },
  ]

  const sizeOptions = ["S", "M", "L", "XL", "XXL"]

  const shopTheLookItems = [
    {
      id: 1,
      name: "Essential Oversized Tee - Pearl White",
      price: "$28.00",
      originalPrice: "$44.00",
      image: "/placeholder.svg?height=300&width=250",
      isNew: false,
    },
    {
      id: 2,
      name: "Crew Socks 3 Pack - Pearl White",
      price: "$26.00",
      image: "/placeholder.svg?height=300&width=250",
      isNew: true,
    },
    {
      id: 3,
      name: "Essential Oversized Tee - Pearl White",
      price: "$28.00",
      originalPrice: "$44.00",
      image: "/placeholder.svg?height=300&width=250",
      isNew: false,
    },
    {
      id: 4,
      name: "Crew Socks 3 Pack - Pearl White",
      price: "$26.00",
      image: "/placeholder.svg?height=300&width=250",
      isNew: true,
    },
    {
      id: 5,
      name: "Essential Oversized Tee - Pearl White",
      price: "$28.00",
      originalPrice: "$44.00",
      image: "/placeholder.svg?height=300&width=250",
      isNew: false,
    },
  ]

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="bg-white">
      {/* Main Product Section - Now Dark */}
      <section className="py-12 bg-[#212121] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-800">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-GgWFwr4F7jybMbU2H9fGLI21prsna4.png"
                  alt="Essential Pro 7 Inch Shorts - Coral"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Navigation arrows */}
                <button className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <ChevronLeft className="h-4 w-4 text-black" />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <ChevronRight className="h-4 w-4 text-black" />
                </button>

                {/* Navigation dots */}
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === 0 ? "bg-[#cbf26c]" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Sale Badge */}
              <div className="flex justify-end">
                <Badge className="bg-white text-[#212121] border border-white font-semibold">50% OFF</Badge>
              </div>

              {/* Product Title */}
              <div className="space-y-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-white uppercase">
                  ESSENTIAL PRO 7 INCH SHORTS - CORAL
                </h1>
                <p className="text-gray-400 uppercase tracking-wide">REGULAR FIT</p>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 line-through text-lg">$46.00</span>
                  <span className="text-2xl font-bold text-white">$23.00</span>
                </div>
                <p className="text-sm text-gray-300">EARN 507 PACK VIP POINTS</p>
              </div>

              {/* Rating and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-white">4.8</span>
                    <Star className="h-4 w-4 text-white fill-white ml-1" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-gray-700">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-gray-700">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{selectedColor}</span>
                </div>
                <div className="flex space-x-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.name}
                      className={`relative w-12 h-16 rounded-md overflow-hidden border-2 ${
                        selectedColor === color.name ? "border-white" : "border-gray-600"
                      }`}
                      onClick={() => setSelectedColor(color.name)}
                    >
                      <Image src={color.image || "/placeholder.svg"} alt={color.name} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Size</span>
                  <button className="text-sm text-white underline hover:no-underline">SIZE GUIDE</button>
                </div>
                <div className="flex space-x-2">
                  {sizeOptions.map((size) => (
                    <button
                      key={size}
                      className={`w-12 h-10 rounded-md border-2 font-medium transition-colors ${
                        selectedSize === size
                          ? "bg-white text-[#212121] border-white"
                          : "bg-transparent text-white border-gray-600 hover:border-white"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-400">Keelan is 6'2" and wears Medium</p>
              </div>

              {/* Add to Cart */}
              <Button
                asChild
                size="lg"
                className="w-full bg-white text-[#212121] hover:bg-gray-100 font-semibold py-4 rounded-md transition-all duration-300"
              >
                <Link href="/cart">ADD TO CART</Link>
              </Button>

              {/* Shop the Look */}
              <div className="space-y-4 pt-8">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium uppercase tracking-wide">SHOP THE LOOK</span>
                  <div className="flex space-x-2">
                    <div className="w-12 h-12 bg-white rounded-md overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt="Shop the look item 1"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-12 h-12 bg-white rounded-md overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt="Shop the look item 2"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#2B2B2B] rounded-full"></div>
                  <span className="text-white text-sm uppercase tracking-wide">ONLINE EXCLUSIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Product Details Section */}
      <section className="bg-[#1a1a1a] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Collapsible Sections */}
            <div className="space-y-4">
              {/* Product Highlight */}
              <Collapsible open={openSections.highlight} onOpenChange={() => toggleSection("highlight")}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-b border-gray-600 hover:border-gray-500 transition-colors">
                  <span className="text-sm font-medium uppercase tracking-wide">PRODUCT HIGHLIGHT</span>
                  {openSections.highlight ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="py-6">
                  <div className="space-y-4">
                    <div className="w-full h-64 bg-[#e8d5d5] rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=256&width=400"
                        alt="Fabric texture"
                        width={400}
                        height={256}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Lightweight woven fabric that is soft against the skin and comfortable during workouts.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Purpose */}
              <Collapsible open={openSections.purpose} onOpenChange={() => toggleSection("purpose")}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-b border-gray-600 hover:border-gray-500 transition-colors">
                  <span className="text-sm font-medium uppercase tracking-wide">PURPOSE</span>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="py-6">
                  <div className="text-gray-300 text-sm leading-relaxed">
                    <p>
                      Designed for high-intensity training, running, and everyday athletic activities. These shorts
                      provide optimal comfort and performance for all your fitness needs.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Features & Fit */}
              <Collapsible open={openSections.features} onOpenChange={() => toggleSection("features")}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-b border-gray-600 hover:border-gray-500 transition-colors">
                  <span className="text-sm font-medium uppercase tracking-wide">FEATURES & FIT</span>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="py-6">
                  <div className="text-gray-300 text-sm leading-relaxed space-y-2">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>7-inch inseam for optimal coverage</li>
                      <li>Regular fit design</li>
                      <li>Elastic waistband with drawstring</li>
                      <li>Secure zip pocket for essentials</li>
                      <li>Four-way stretch construction</li>
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Materials & Care */}
              <Collapsible open={openSections.materials} onOpenChange={() => toggleSection("materials")}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-b border-gray-600 hover:border-gray-500 transition-colors">
                  <span className="text-sm font-medium uppercase tracking-wide">MATERIALS & CARE</span>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="py-6">
                  <div className="text-gray-300 text-sm leading-relaxed space-y-4">
                    <div>
                      <h4 className="font-medium text-white mb-2">Materials:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>88% Polyester, 12% Elastane</li>
                        <li>Moisture-wicking fabric technology</li>
                        <li>Anti-odor treatment</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-2">Care Instructions:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Machine wash cold with like colors</li>
                        <li>Do not bleach</li>
                        <li>Tumble dry low</li>
                        <li>Do not iron</li>
                      </ul>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Reviews */}
              <Collapsible open={openSections.reviews} onOpenChange={() => toggleSection("reviews")}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-b border-gray-600 hover:border-gray-500 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium uppercase tracking-wide">REVIEWS</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="py-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="border-b border-gray-600 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-white">Perfect fit!</span>
                          </div>
                          <span className="text-xs text-gray-400">2 weeks ago</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">
                          These shorts are amazing! The fabric is soft yet supportive, and they stay in place during my
                          workouts.
                        </p>
                        <p className="text-xs text-gray-400">Sarah T. - Verified Buyer</p>
                      </div>

                      <div className="border-b border-gray-600 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              ))}
                              <Star className="h-3 w-3 text-gray-500" />
                            </div>
                            <span className="text-sm font-medium text-white">Great quality</span>
                          </div>
                          <span className="text-xs text-gray-400">1 month ago</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">
                          The material is high quality and feels durable. I've washed it several times and it still
                          looks new.
                        </p>
                        <p className="text-xs text-gray-400">Michael R. - Verified Buyer</p>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Right Side - Large Product Image */}
            <div className="relative">
              <div className="relative h-[600px] overflow-hidden rounded-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled.png-sLs0eMOJM0ysIcvO4cGs2DA7laNfRI.jpeg"
                  alt="Person wearing coral shorts with white socks and sneakers"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop the Look Section */}
      <section className="bg-[#f5f5f5] py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#212121] mb-8 uppercase tracking-wide">SHOP THE LOOK</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {shopTheLookItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {item.isNew && <Badge className="absolute top-2 left-2 bg-[#212121] text-white text-xs">NEW</Badge>}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-[#212121] mb-2 line-clamp-2">{item.name}</h3>
                  <div className="flex items-center space-x-2">
                    {item.originalPrice && (
                      <span className="text-sm text-[#6e6e6e] line-through">{item.originalPrice}</span>
                    )}
                    <span className="text-sm font-bold text-[#212121]">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* You May Also Like Carousel Section */}
      <section className="bg-[#e8e8e8] py-16">
        <div className="container mx-auto px-4">
          <div className="relative">
            {/* Navigation Arrows */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow">
              <ChevronLeft className="h-6 w-6 text-[#212121]" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow">
              <ChevronRight className="h-6 w-6 text-[#212121]" />
            </button>

            {/* Product Carousel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-16">
              {/* Pink Cap */}
              <div className="group cursor-pointer">
                <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="SQUATWOLF Baseball Cap - Pink"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-[#212121] text-white text-xs font-bold px-2 py-1 rounded">
                      -30%
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-bold text-[#212121]">$36.00</p>
                </div>
              </div>

              {/* Coral Athletic Shirt */}
              <div className="group cursor-pointer">
                <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Athletic Training Shirt - Coral"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-[#212121] text-white text-xs font-bold px-2 py-1 rounded">
                      -30%
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-bold text-[#212121]">$48.00</p>
                </div>
              </div>

              {/* Pink Zip Hoodie */}
              <div className="group cursor-pointer">
                <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Zip-Up Hoodie - Coral Pink"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-[#212121] text-white text-xs font-bold px-2 py-1 rounded">
                      -50%
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-bold text-[#212121]">$72.00</p>
                </div>
              </div>

              {/* White Athletic Socks */}
              <div className="group cursor-pointer">
                <div className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="SQUATWOLF Athletic Socks - White"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-[#212121] text-white text-xs font-bold px-2 py-1 rounded">
                      -30%
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-bold text-[#212121]">$26.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Akhlekt Family Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Form */}
            <div className="bg-[#2a2a2a] p-8 lg:p-12 rounded-lg">
              <div className="space-y-8">
                {/* Heading */}
                <div className="space-y-4">
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#cbf26c] leading-tight uppercase tracking-wide">
                    JOIN THE ATHLEKT FAMILY
                  </h2>
                  <p className="text-white text-base leading-relaxed">
                    But I Must Explain To You How All This Mistaken Idea Of Denouncing Pleasure And Praising Pain Was
                    Born...
                  </p>
                </div>

                {/* Form */}
                <form className="space-y-6">
                  {/* First Name */}
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="w-full h-14 px-4 bg-transparent border border-[#4a4a4a] text-white placeholder:text-[#9a9a9a] focus:border-[#cbf26c] focus:ring-0 rounded-none focus:outline-none"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="w-full h-14 px-4 bg-transparent border border-[#4a4a4a] text-white placeholder:text-[#9a9a9a] focus:border-[#cbf26c] focus:ring-0 rounded-none focus:outline-none"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full h-14 px-4 bg-transparent border border-[#4a4a4a] text-white placeholder:text-[#9a9a9a] focus:border-[#cbf26c] focus:ring-0 rounded-none focus:outline-none"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      className="w-full h-14 px-4 bg-transparent border border-[#4a4a4a] text-white placeholder:text-[#9a9a9a] focus:border-[#cbf26c] focus:ring-0 rounded-none focus:outline-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-[#4a4a4a] text-white hover:bg-[#5a5a5a] font-semibold px-8 py-4 h-auto rounded-none border-l-4 border-[#cbf26c] transition-all duration-300 hover:border-l-[#9fcc3b]"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-rVpXn9966PC2lrC2cQk9P8PCAgV8J5.png"
                  alt="Young man in black tank top wearing SQUATWOLF cap in gym"
                  width={600}
                  height={700}
                  className="w-full h-[700px] object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
