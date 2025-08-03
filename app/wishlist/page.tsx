"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useWishlist } from "@/lib/wishlist-context"
import { Button } from "@/components/ui/button"
import { Heart, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [loading, setLoading] = useState<string | null>(null)

  const handleAddToCart = (item: any) => {
    setLoading(item.id)
    addToCart({
      ...item,
      quantity: 1
    })
    setTimeout(() => setLoading(null), 1000)
  }

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id)
  }

  const handleClearWishlist = () => {
    if (confirm("Are you sure you want to clear your wishlist?")) {
      clearWishlist()
    }
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8">Start adding products to your wishlist to see them here.</p>
            <Link href="/collection">
              <Button className="bg-[#cbf26c] text-[#212121] hover:bg-[#b8e55a]">
                Start Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleClearWishlist}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-lg font-bold text-gray-900 mb-3">${item.price}</p>
                
                {item.color && (
                  <p className="text-sm text-gray-600 mb-1">Color: {item.color}</p>
                )}
                {item.size && (
                  <p className="text-sm text-gray-600 mb-3">Size: {item.size}</p>
                )}
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    disabled={loading === item.id}
                    className="flex-1 bg-[#cbf26c] text-[#212121] hover:bg-[#b8e55a]"
                  >
                    {loading === item.id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#212121]"></div>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
} 