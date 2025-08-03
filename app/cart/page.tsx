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
import { useWishlist } from "@/lib/wishlist-context"
import { getAllProducts } from "@/lib/api"
import type { Product } from "@/lib/types"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, showNotification, addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [bundleDiscount, setBundleDiscount] = useState<any>(null)
  const [shippingInfo, setShippingInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  
  // Dynamic product suggestions states
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

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

  // Fetch dynamic product suggestions for free shipping
  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      if (shippingInfo && !shippingInfo.isFreeShipping && shippingInfo.remainingForFreeShipping > 0) {
        setLoadingSuggestions(true);
        try {
          const allProducts = await getAllProducts();
          
          // Filter products that are not already in cart
          const cartProductIds = cartItems.map(item => item.id);
          const availableProducts = allProducts.filter(product => 
            !cartProductIds.includes(product.id)
          );

          // Find products that can help reach free shipping
          const suggestions = availableProducts
            .filter(product => {
              const productPrice = parseFloat(product.price.replace('$', ''));
              // Allow flexibility based on the remaining amount
              const flexibility = Math.min(shippingInfo.remainingForFreeShipping * 0.3, 30); // 30% flexibility
              return productPrice <= shippingInfo.remainingForFreeShipping + flexibility;
            })
            .sort((a, b) => {
              const priceA = parseFloat(a.price.replace('$', ''));
              const priceB = parseFloat(b.price.replace('$', ''));
              // Prioritize products that get closest to free shipping threshold
              const diffA = Math.abs(shippingInfo.remainingForFreeShipping - priceA);
              const diffB = Math.abs(shippingInfo.remainingForFreeShipping - priceB);
              return diffA - diffB;
            })
            .slice(0, 3); // Show max 3 suggestions

          setSuggestedProducts(suggestions);
        } catch (error) {
          console.error('Error fetching suggested products:', error);
        } finally {
          setLoadingSuggestions(false);
        }
      } else {
        setSuggestedProducts([]);
      }
    };

    fetchSuggestedProducts();
  }, [cartItems, shippingInfo]);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "akhlekt10") {
      setPromoApplied(true)
    } else {
      alert("Invalid promo code")
    }
  }

  const handleWishlistToggle = (product: Product | any) => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: typeof product.price === 'string' ? parseFloat(product.price.replace(/[^0-9.]/g, '')) : product.price,
      image: product.image,
      color: product.color || "Default",
      size: product.size || "M",
      fit: product.fit || "Regular Fit"
    }

    if (isInWishlist(wishlistItem.id)) {
      removeFromWishlist(wishlistItem.id)
    } else {
      addToWishlist(wishlistItem)
    }
  }

  // Calculate totals
  const promoDiscount = promoApplied ? subtotal * 0.1 : 0
  const bundleDiscountAmount = bundleDiscount?.discountAmount || 0
  const totalDiscount = promoDiscount + bundleDiscountAmount
  const shipping = shippingInfo?.isFreeShipping ? 0 : (shippingInfo?.shippingCost || 5) // Free shipping = 0
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
                <h2 className="text-2xl lg:text-3xl font-bold text-[#cbf26c] mb-8 uppercase tracking-wide">
                  AED {amountForFreeShipping} MORE TO GET FREE SHIPPING
                </h2>

                {/* Dynamic Product Suggestions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {loadingSuggestions ? (
                    // Loading state
                    Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="group">
                        <div className="relative bg-white rounded-lg overflow-hidden mb-4">
                          <div className="aspect-[3/4] relative bg-gray-200 animate-pulse">
                            <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                              <Heart className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))
                  ) : suggestedProducts.length > 0 ? (
                    // Dynamic suggestions
                    suggestedProducts.map((product) => (
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
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleWishlistToggle(product);
                              }}
                              className={`absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors ${
                                isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600'
                              }`}
                            >
                              <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                            </button>
                            {/* Add to Cart Button */}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                const productPrice = parseFloat(product.price.replace('$', ''));
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: productPrice,
                                  image: product.image,
                                  quantity: 1,
                                  fit: "REGULAR FIT",
                                  color: "Default",
                                  size: "M"
                                });
                                showNotification(`${product.name} added to cart!`);
                              }}
                              className="absolute bottom-3 left-3 right-3 bg-[#cbf26c] text-[#212121] py-2 px-4 rounded-md font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-medium text-white">{product.name}</h3>
                          <p className="text-lg font-bold text-white">{product.price}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    // No suggestions available
                    <div className="col-span-3 text-center py-8">
                      <p className="text-white text-lg">Free shipping achieved! 🎉</p>
                      <p className="text-gray-400 text-sm mt-2">No additional products needed</p>
                    </div>
                  )}
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

              {/* Cart Items Summary */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Items in cart</span>
                  <span className="text-sm font-medium text-gray-600">{cartItems.length} items</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Total quantity</span>
                  <span className="text-sm font-medium text-gray-600">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)} pieces
                  </span>
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
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                        <p className="font-bold text-[#212121]">${(item.price * item.quantity).toFixed(2)} total</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleWishlistToggle(item)}
                          className={`hover:text-red-500 ${
                            isInWishlist(item.id) ? 'text-red-500' : 'text-gray-400'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${isInWishlist(item.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button className="text-gray-400 hover:text-red-500" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Quantity Selector */}
                      <Select
                        value={item.quantity.toString()}
                        onValueChange={(value) => {
                          const newQuantity = Number.parseInt(value);
                          updateQuantity(item.id, newQuantity);
                          showNotification(`${item.name} quantity updated to ${newQuantity}`);
                        }}
                      >
                        <SelectTrigger className="w-20 h-8 text-sm">
                          <SelectValue>
                            Qty: {item.quantity}
                          </SelectValue>
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
                      Save ${bundleDiscount.discountAmount.toFixed(2)} ({bundleDiscount.discountPercentage}% off)
                    </span>
                  </div>
                </div>
              )}

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
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                {bundleDiscount?.hasBundleDiscount && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center space-x-1">
                      <Package className="h-4 w-4" />
                      <span>Bundle Discount</span>
                    </span>
                    <span>-${bundleDiscount.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {shippingInfo?.isFreeShipping ? "Shipping" : "Estimated Shipping"}
                  </span>
                  <span className={`font-medium ${shippingInfo?.isFreeShipping ? 'text-green-600' : ''}`}>
                    {shippingInfo?.isFreeShipping ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#212121]">Total</span>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 mr-2">USD</span>
                      <span className="text-xl font-bold text-[#212121]">${total.toFixed(2)}</span>
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
