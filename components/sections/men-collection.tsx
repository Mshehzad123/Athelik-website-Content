"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { getAllProducts, type Product } from "@/lib/api"

export default function MenCollection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const allProducts = await getAllProducts()
      // Filter for men's products
      const menProducts = allProducts.filter(product => 
        product.category.toLowerCase().includes('men') || 
        product.name.toLowerCase().includes('men') ||
        product.subCategory?.toLowerCase().includes('men')
      )
      setProducts(menProducts)
    } catch (error) {
      console.error("Failed to fetch men collection products:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 bg-[#212121]">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">MEN COLLECTION</h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Side - Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              // Loading placeholders
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <div className="w-full h-[380px] bg-gray-600 animate-pulse" />
                  </div>
                  <div className="text-white">
                    <div className="h-6 bg-gray-600 rounded mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-600 rounded animate-pulse" />
                  </div>
                </div>
              ))
            ) : products.length > 0 ? (
              // Display actual products
              products.slice(0, 4).map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={product.image || "/placeholder.svg?height=380&width=300"}
                      alt={product.name}
                      width={300}
                      height={380}
                      className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                    {product.isOnSale && (
                      <div className="absolute top-4 left-4 bg-[#cbf26c] text-[#212121] px-3 py-1 rounded-md font-bold text-sm">
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="text-white">
                    <h3 className="text-lg font-bold mb-2 text-[#cbf26c]">{product.name}</h3>
                    <p className="text-lg font-semibold">
                      {product.originalPrice ? (
                        <>
                          <span className="line-through text-gray-400">{product.originalPrice}</span>{" "}
                          <span className="text-[#cbf26c]">{product.price}</span>
                        </>
                      ) : (
                        product.price
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              // Fallback content when no products
              <>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src="/placeholder.svg?height=380&width=300"
                      alt="Golden Era Fresh Legacy - Marvelous"
                      width={300}
                      height={380}
                      className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  </div>
                  <div className="text-white">
                    <h3 className="text-lg font-bold mb-2 text-[#cbf26c]">Golden Era Fresh Legacy - Marvelous</h3>
                    <p className="text-lg font-semibold">$50.00</p>
                  </div>
                </div>

                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src="/placeholder.svg?height=380&width=300"
                      alt="3Jogger Shorts - Navy"
                      width={300}
                      height={380}
                      className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  </div>
                  <div className="text-white">
                    <h3 className="text-lg font-bold mb-2 text-[#cbf26c]">3" Jogger Shorts - Navy</h3>
                    <p className="text-lg font-semibold">$50.00</p>
                  </div>
                </div>

                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src="/placeholder.svg?height=380&width=300"
                      alt="Sweat Tee - Paloma Grey Marl"
                      width={300}
                      height={380}
                      className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  </div>
                  <div className="text-white">
                    <h3 className="text-lg font-bold mb-2 text-[#cbf26c]">Sweat Tee - Paloma Grey Marl</h3>
                    <p className="text-lg font-semibold">$40.00</p>
                  </div>
                </div>

                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src="/placeholder.svg?height=380&width=300"
                      alt="Golden Era Fresh Legacy - Paloma"
                      width={300}
                      height={380}
                      className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  </div>
                  <div className="text-white">
                    <h3 className="text-lg font-bold mb-2 text-[#cbf26c]">Golden Era Fresh Legacy - Paloma</h3>
                    <p className="text-lg font-semibold">$50.00</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Side - Main Image */}
          <div className="relative group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/images/men-collection.png"
                alt="Man in white long-sleeve shirt and black shorts in gym"
                width={600}
                height={800}
                className="w-full h-[900px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
