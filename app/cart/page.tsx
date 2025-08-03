"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Trash2, Heart, Package, Percent } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { useCurrency } from "@/lib/currency-context"

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
  const { cartItems, removeFromCart, updateQuantity } = useCart()
  const { currency, formatPrice, getCurrencySymbol, refreshCurrency } = useCurrency()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [bundleDiscount, setBundleDiscount] = useState<any>(null)
  const [shippingInfo, setShippingInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Calculate bundle discount when cart items change
  useEffect(() => {
    const calculateBundleDiscount = async () => {
      if (cartItems.length === 0) {
        setBundleDiscount(null)
        return
      }

      setLoading(true)
      try {
        const response = await fetch('/api/bundles/calculate-discount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cartItems: cartItems.map(item => ({
              productId: item.productId,
              price: item.price,
              quantity: item.quantity
            }))
          })
        })

        if (response.ok) {
          const data = await response.json()
          setBundleDiscount(data)
        }
      } catch (error) {
        console.error('Error calculating bundle discount:', error)
      } finally {
        setLoading(false)
      }
    }

    calculateBundleDiscount()
  }, [cartItems])

  // Calculate shipping when cart items change
  useEffect(() => {
    const calculateShipping = async () => {
      if (cartItems.length === 0) {
        setShippingInfo(null)
        return
      }

      try {
        const response = await fetch('/api/shipping/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subtotal: subtotal,
            region: 'US'
          })
        })

        if (response.ok) {
          const data = await response.json()
          setShippingInfo(data)
        }
      } catch (error) {
        console.error('Error calculating shipping:', error)
        // Fallback to default shipping
        setShippingInfo({
          shippingCost: 5,
          isFreeShipping: false,
          remainingForFreeShipping: 70
        })
      }
    }

    calculateShipping()
  }, [cartItems, subtotal])

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "akhlekt10") {
      setPromoApplied(true)
    } else {
      alert("Invalid promo code")
    }
  }

  // Calculate totals
  const promoDiscount = promoApplied ? subtotal * 0.1 : 0
  const bundleDiscountAmount = bundleDiscount?.discountAmount || 0
  const totalDiscount = promoDiscount + bundleDiscountAmount
  const shipping = shippingInfo?.shippingCost || 5 // Dynamic shipping cost
  const total = subtotal - totalDiscount + shipping
  const freeShippingThreshold = shippingInfo?.rule?.freeShippingAt || 75
  const amountForFreeShipping = shippingInfo?.remainingForFreeShipping || Math.max(0, freeShippingThreshold - subtotal)

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
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#cbf26c] uppercase tracking-wide">
                    {getCurrencySymbol()} {amountForFreeShipping} MORE TO GET FREE SHIPPING
                  </h2>
                  <button 
                    onClick={refreshCurrency}
                    className="bg-[#cbf26c] text-[#212121] px-4 py-2 rounded text-sm font-medium"
                  >
                    Refresh Currency
                  </button>
                </div>

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
                        <p className="text-lg font-bold text-white">{formatPrice(parseFloat(product.price.replace('$', '')))}</p>
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
              {shippingInfo && (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-[#212121]">
                      {shippingInfo.isFreeShipping 
                        ? "Free Shipping Applied!" 
                        : `You're $${amountForFreeShipping.toFixed(2)} away from Free Standard Shipping`
                      }
                    </span>
                  </div>
                  {!shippingInfo.isFreeShipping && (
                    <>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>$0</span>
                        <span>${freeShippingThreshold}</span>
                      </div>
                    </>
                  )}
                </div>
              )}

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
                      <p className="font-bold text-[#212121]">{formatPrice(item.price)}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-red-500">
                          <Heart className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-500" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Quantity Selector */}
                      <Select
                        value={(item.quantity || 1).toString()}
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

              {/* Bundle Discount Alert */}
              {bundleDiscount?.hasBundleDiscount && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Package className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Bundle Discount Applied!</span>
                  </div>
                  <p className="text-sm text-green-700 mb-2">
                    You've qualified for the "{bundleDiscount.bundle.name}" bundle
                  </p>
                  <div className="flex items-center space-x-2">
                    <Percent className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700">
                      Save {formatPrice(bundleDiscount.discountAmount)} ({bundleDiscount.discountPercentage}% off)
                    </span>
                  </div>
                </div>
              )}

              {/* Discount Code */}
              {/* <div className="mb-8">
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
              </div> */}























              {/* Order Summary */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                
                {bundleDiscount?.hasBundleDiscount && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center space-x-1">
                      <Package className="h-4 w-4" />
                      <span>Bundle Discount</span>
                    </span>
                    <span>-{formatPrice(bundleDiscount.discountAmount)}</span>
                  </div>
                )}
                
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-{formatPrice(promoDiscount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {shippingInfo?.isFreeShipping ? "Shipping" : "Estimated Shipping"}
                  </span>
                  <span className={`font-medium ${shippingInfo?.isFreeShipping ? 'text-green-600' : ''}`}>
                    {shippingInfo?.isFreeShipping ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipment Promos at the Checkout</span>
                  <span className="font-medium">$0</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#212121]">Total</span>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 mr-2">{currency}</span>
                      <span className="text-xl font-bold text-[#212121]">{formatPrice(total)}</span>
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
