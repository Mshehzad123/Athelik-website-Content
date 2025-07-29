"use client"

import { useState } from "react"
import Image from "next/image"
import { Trash2, Heart } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Geo Seamless T-Shirt",
    price: 36,
    image: "/placeholder.svg?height=200&width=150",
    color: "Black/Charcoal",
    size: "L",
    quantity: 1,
    fit: "Slim Fit",
  },
]

// Recommended products for free shipping
const recommendedProducts = [
  {
    id: 1,
    name: "Golden Era Fresh Legacy - Marvelous",
    price: "$50.00",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    name: '3" Jogger Shorts - Navy',
    price: "$55.00",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    name: "Sweat Tee - Paloma Grey Marl",
    price: "$48.00",
    image: "/placeholder.svg?height=400&width=300",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "akhlekt10") {
      setPromoApplied(true)
    } else {
      alert("Invalid promo code")
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = 5 // Fixed shipping cost
  const total = subtotal - discount + shipping
  const freeShippingThreshold = 75
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left Side - Dark Background with Recommendations */}
          <div className="bg-[#212121] text-white p-8 lg:p-12">
            <div className="max-w-2xl mx-auto">
              {/* Free Shipping Banner */}
              <div className="mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#cbf26c] mb-8 uppercase tracking-wide">
                  AED {amountForFreeShipping} MORE TO GET FREE SHIPPING
                </h2>

                {/* Recommended Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {recommendedProducts.map((product) => (
                    <div key={product.id} className="group cursor-pointer">
                      <div className="relative bg-white rounded-lg overflow-hidden mb-4">
                        <div className="aspect-[3/4] relative">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Heart Icon */}
                          <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                            <Heart className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-white">{product.name}</h3>
                        <p className="text-lg font-bold text-white">{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shop Now Button */}
                <div className="text-center">
                  <Button
                    size="lg"
                    className="bg-[#cbf26c] text-[#212121] hover:bg-[#9fcc3b] font-semibold px-12 py-4 text-lg rounded-md"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Light Background with Cart Summary */}
          <div className="bg-white p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              {/* Free Shipping Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-[#212121]">
                    You're ${amountForFreeShipping} away from Free Standard Shipping
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>$75</span>
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-6 mb-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold text-[#212121]">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.fit}</p>
                      <p className="text-sm text-gray-600">
                        {item.color} | {item.size}
                      </p>
                      <p className="font-bold text-[#212121]">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-red-500">
                          <Heart className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-500" onClick={() => removeItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Quantity Selector */}
                      <Select
                        value={item.quantity.toString()}
                        onValueChange={(value) => updateQuantity(item.id, Number.parseInt(value))}
                      >
                        <SelectTrigger className="w-20 h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              Qty: {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="mb-8">
                <p className="text-sm font-medium text-[#212121] mb-3">Discount code?</p>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 h-12 border-gray-300 rounded-md"
                  />
                  <Button
                    onClick={applyPromoCode}
                    className="bg-[#212121] text-white hover:bg-black px-6 h-12 rounded-md font-semibold"
                  >
                    APPLY
                  </Button>
                </div>
                {promoApplied && <p className="text-sm text-green-600 mt-2">Promo code applied!</p>}
              </div>

              {/* Order Summary */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Shipping</span>
                  <span className="font-medium">${shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipment Promos at the Checkout</span>
                  <span className="font-medium">$0</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#212121]">Total</span>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 mr-2">USD</span>
                      <span className="text-xl font-bold text-[#212121]">${total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                asChild
                className="w-full bg-[#212121] text-white hover:bg-black font-semibold py-4 text-lg rounded-md mb-6"
              >
                <Link href="/checkout">CHECKOUT</Link>
              </Button>

              {/* Payment Methods */}
              <div className="flex justify-center space-x-2">
                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div className="w-10 h-6 bg-red-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">MC</span>
                </div>
                <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PP</span>
                </div>
                <div className="w-10 h-6 bg-black rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AP</span>
                </div>
                <div className="w-10 h-6 bg-pink-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">K</span>
                </div>
                <div className="w-10 h-6 bg-blue-400 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AE</span>
                </div>
                <div className="w-10 h-6 bg-teal-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
