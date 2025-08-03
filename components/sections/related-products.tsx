"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { getRelatedProducts } from "@/lib/api"
import { useWishlist } from "@/lib/wishlist-context"
import { useState, useEffect } from "react"

export default function RelatedProducts({
  currentProductId,
  category,
}: { currentProductId: string; category: string }) {
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const products = await getRelatedProducts(currentProductId, category)
        setRelatedProducts(products)
      } catch (error) {
        console.error('Error fetching related products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [currentProductId, category])

  const handleWishlistToggle = (product: any) => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace(/[^0-9.]/g, '')),
      image: product.image,
      fit: "Regular Fit"
    }

    if (isInWishlist(wishlistItem.id)) {
      removeFromWishlist(wishlistItem.id)
    } else {
      addToWishlist(wishlistItem)
    }
  }

  return (
    <section className="py-16 bg-[#fafafa]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#212121] mb-4">You May Also Like</h2>
          <p className="text-[#6e6e6e] text-lg max-w-2xl mx-auto">Discover more products that complement your style.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="border-none shadow-none bg-white">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <div className="w-full h-80 bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            relatedProducts.map((product) => (
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
                    <div className="absolute top-4 left-4 bg-[#cbf26c] text-[#212121] px-2 py-1 text-sm font-semibold rounded">
                      Sale
                    </div>
                  )}
                  
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleWishlistToggle(product)
                    }}
                    className={`absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors ${
                      isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-[#6e6e6e] uppercase tracking-wide">{product.category}</p>
                  <h3 className="font-semibold text-[#212121]">{product.name}</h3>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-bold text-[#212121]">{product.price}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-[#6e6e6e] line-through">{product.originalPrice}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
          )}
        </div>
      </div>
    </section>
  )
}
