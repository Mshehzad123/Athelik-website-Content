"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCurrency } from "@/lib/currency-context"

const products = [
  {
    id: 1,
    name: "Essential Training Tee",
    price: "$29",
    originalPrice: "$39",
    image: "/placeholder.svg?height=400&width=300",
    isOnSale: true,
    category: "Men",
  },
  {
    id: 2,
    name: "High-Waist Leggings",
    price: "$65",
    image: "/placeholder.svg?height=400&width=300",
    isOnSale: false,
    category: "Women",
  },
  {
    id: 3,
    name: "Performance Polo",
    price: "$55",
    image: "/placeholder.svg?height=400&width=300",
    isOnSale: false,
    category: "Men",
  },
  {
    id: 4,
    name: "Sports Bra Set",
    price: "$45",
    originalPrice: "$60",
    image: "/placeholder.svg?height=400&width=300",
    isOnSale: true,
    category: "Women",
  },
  {
    id: 5,
    name: "Jogger Pants",
    price: "$70",
    image: "/placeholder.svg?height=400&width=300",
    isOnSale: false,
    category: "Unisex",
  },
  {
    id: 6,
    name: "Windbreaker Jacket",
    price: "$95",
    originalPrice: "$120",
    image: "/placeholder.svg?height=400&width=300",
    isOnSale: true,
    category: "Unisex",
  },
]

export default function ProductGrid() {
  const { formatPrice } = useCurrency()
  
  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#212121] mb-4">New Arrivals</h2>
          <p className="text-[#6e6e6e] text-lg max-w-2xl mx-auto">
            Fresh styles for your active lifestyle. Discover the latest additions to our collection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer border-none shadow-none hover:shadow-lg transition-shadow bg-white"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isOnSale && (
                    <Badge className="absolute top-4 left-4 bg-[#cbf26c] text-[#212121] hover:bg-[#cbf26c]">Sale</Badge>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-[#6e6e6e] uppercase tracking-wide">{product.category}</p>
                  <h3 className="font-semibold text-[#212121]">{product.name}</h3>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-bold text-[#212121]">{formatPrice(parseFloat(product.price.replace(/[^0-9.]/g, '')))}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-[#6e6e6e] line-through">{formatPrice(parseFloat(product.originalPrice.replace(/[^0-9.]/g, '')))}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
