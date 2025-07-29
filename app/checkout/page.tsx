"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    email: "",
    country: "United States",
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "Kentucky",
    zipCode: "",
    phone: "",
  })

  const [discountCode, setDiscountCode] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const orderItem = {
    id: 1,
    name: "Geo Seamless T-Shirt - Black/Charcoal Grey",
    size: "Large",
    price: 36.0,
    image: "/placeholder.svg?height=80&width=80",
  }

  const subtotal = orderItem.price
  const shipping = 0 // Will be calculated after address
  const total = subtotal + shipping
  const freeShippingThreshold = 50
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Left Side - Checkout Form */}
            <div className="space-y-8">
              {/* Express Checkout */}
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">Express checkout</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button className="bg-[#5a31f4] hover:bg-[#4c28d4] text-white font-semibold py-3 rounded-md">
                    <span className="text-sm">Shop</span>
                    <span className="text-sm font-bold ml-1">Pay</span>
                  </Button>
                  <Button className="bg-[#ffc439] hover:bg-[#e6b033] text-[#003087] font-semibold py-3 rounded-md">
                    PayPal
                  </Button>
                  <Button className="bg-[#000000] hover:bg-[#333333] text-white font-semibold py-3 rounded-md">
                    <span className="text-sm mr-1">G</span>
                    <span className="text-sm">Pay</span>
                  </Button>
                  <Button className="bg-[#009cde] hover:bg-[#0088c7] text-white font-semibold py-3 rounded-md">
                    venmo
                  </Button>
                </div>
                <div className="text-center">
                  <span className="text-gray-500 text-sm">OR</span>
                </div>
              </div>

              {/* Contact Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#212121] uppercase tracking-wide">CONTACT</h2>
                  <Link href="/login" className="text-sm text-[#212121] underline hover:no-underline">
                    Log in
                  </Link>
                </div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full h-12 border-gray-300 rounded-md"
                />
              </div>

              {/* Delivery Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#212121] uppercase tracking-wide">DELIVERY</h2>

                {/* Country/Region */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Country/Region</label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger className="w-full h-12 border-gray-300 rounded-md">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="h-12 border-gray-300 rounded-md"
                  />
                  <Input
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="h-12 border-gray-300 rounded-md"
                  />
                </div>

                {/* Address Fields */}
                <Input
                  type="text"
                  placeholder="Address Line 1"
                  value={formData.addressLine1}
                  onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                  className="h-12 border-gray-300 rounded-md"
                />
                <Input
                  type="text"
                  placeholder="Address Line 2"
                  value={formData.addressLine2}
                  onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                  className="h-12 border-gray-300 rounded-md"
                />

                {/* City, State, ZIP */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="h-12 border-gray-300 rounded-md"
                  />
                  <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                    <SelectTrigger className="h-12 border-gray-300 rounded-md">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kentucky">Kentucky</SelectItem>
                      <SelectItem value="California">California</SelectItem>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Texas">Texas</SelectItem>
                      <SelectItem value="Florida">Florida</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    placeholder="ZIP code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    className="h-12 border-gray-300 rounded-md"
                  />
                </div>

                {/* Phone */}
                <Input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="h-12 border-gray-300 rounded-md"
                />
              </div>

              {/* Shipping Method Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#212121] uppercase tracking-wide">SHIPPING METHOD</h2>
                <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
                  <p className="text-gray-600 text-center">
                    Enter your shipping address to view available shipping methods.
                  </p>
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-[#212121] uppercase tracking-wide">PAYMENT</h2>
                  <p className="text-sm text-gray-600">All transactions are secure and encrypted.</p>
                </div>

                {/* Credit/Debit Card Option */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md bg-white">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="credit-card"
                        name="payment-method"
                        value="credit-card"
                        defaultChecked
                        className="w-4 h-4 text-[#212121] border-gray-300 focus:ring-[#212121]"
                      />
                      <label htmlFor="credit-card" className="text-sm font-medium text-[#212121]">
                        Credit/Debit Card
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">VISA</span>
                      </div>
                      <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">MC</span>
                      </div>
                      <div className="w-8 h-5 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">AE</span>
                      </div>
                      <div className="w-8 h-5 bg-orange-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">DC</span>
                      </div>
                      <span className="text-sm text-gray-500">+4</span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-4 pl-7">
                    <Input type="text" placeholder="Card number" className="h-12 border-gray-300 rounded-md" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        placeholder="Expiration date (MM / YY)"
                        className="h-12 border-gray-300 rounded-md"
                      />
                      <Input type="text" placeholder="Security code" className="h-12 border-gray-300 rounded-md" />
                    </div>
                    <Input type="text" placeholder="Name on card" className="h-12 border-gray-300 rounded-md" />

                    {/* Billing Address Checkbox */}
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="billing-address"
                        defaultChecked
                        className="w-4 h-4 text-[#212121] border-gray-300 rounded focus:ring-[#212121]"
                      />
                      <label htmlFor="billing-address" className="text-sm text-[#212121]">
                        Use shipping address as billing address
                      </label>
                    </div>
                  </div>
                </div>

                {/* PayPal Option */}
                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="paypal"
                      name="payment-method"
                      value="paypal"
                      className="w-4 h-4 text-[#212121] border-gray-300 focus:ring-[#212121]"
                    />
                    <label htmlFor="paypal" className="text-sm font-medium text-[#212121] cursor-pointer">
                      PayPal
                    </label>
                  </div>
                  <div className="bg-[#ffc439] px-3 py-1 rounded">
                    <span className="text-[#003087] text-sm font-bold">PayPal</span>
                  </div>
                </div>

                {/* Afterpay Option */}
                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="afterpay"
                      name="payment-method"
                      value="afterpay"
                      className="w-4 h-4 text-[#212121] border-gray-300 focus:ring-[#212121]"
                    />
                    <label htmlFor="afterpay" className="text-sm font-medium text-[#212121] cursor-pointer">
                      Afterpay
                    </label>
                  </div>
                  <div className="bg-[#b2fce4] px-3 py-1 rounded">
                    <span className="text-[#212121] text-sm font-bold">afterpay</span>
                  </div>
                </div>

                {/* Klarna Option */}
                <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="klarna"
                      name="payment-method"
                      value="klarna"
                      className="w-4 h-4 text-[#212121] border-gray-300 focus:ring-[#212121]"
                    />
                    <label htmlFor="klarna" className="text-sm font-medium text-[#212121] cursor-pointer">
                      Klarna - Flexible payments
                    </label>
                  </div>
                  <div className="bg-[#ffb3c7] px-3 py-1 rounded">
                    <span className="text-[#212121] text-sm font-bold">Klarna</span>
                  </div>
                </div>
              </div>

              {/* Remember Me Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[#212121] uppercase tracking-wide">REMEMBER ME</h2>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="save-info"
                    className="w-4 h-4 text-[#212121] border-gray-300 rounded focus:ring-[#212121] mt-1"
                  />
                  <label htmlFor="save-info" className="text-sm text-[#212121] leading-relaxed">
                    Save my information for a faster checkout with a Shop account
                  </label>
                </div>

                <div className="relative">
                  <Input
                    type="tel"
                    placeholder="Mobile phone number"
                    className="h-12 border-gray-300 rounded-md pl-12"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">+1</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Secure and encrypted</span>
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-black">shop</span>
                  <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs">Pay</span>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="text-xs text-gray-600 leading-relaxed">
                <p>
                  By placing your order you agree to Gymshark's{" "}
                  <Link href="/terms" className="underline hover:no-underline">
                    Terms and Conditions
                  </Link>
                  ,{" "}
                  <Link href="/privacy" className="underline hover:no-underline">
                    Privacy Notice
                  </Link>{" "}
                  and{" "}
                  <Link href="/cookies" className="underline hover:no-underline">
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>

              {/* Pay Now Button */}
              <Button className="w-full bg-[#212121] text-white hover:bg-black font-semibold py-4 text-lg rounded-md">
                PAY NOW
              </Button>

              {/* Shop Account Notice */}
              <div className="text-xs text-gray-600 leading-relaxed">
                <p>
                  Your info will be saved to a Shop account. By continuing, you agree to Shop's{" "}
                  <Link href="/terms-of-service" className="underline hover:no-underline">
                    Terms of Service
                  </Link>{" "}
                  and acknowledge the{" "}
                  <Link href="/privacy-policy" className="underline hover:no-underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="bg-gray-50 p-8 rounded-lg h-fit">
              <div className="space-y-6">
                {/* Order Item */}
                <div className="flex items-start space-x-4 pb-6 border-b border-gray-200">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden">
                      <Image
                        src={orderItem.image || "/placeholder.svg"}
                        alt={orderItem.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#212121] text-sm">{orderItem.name}</h3>
                    <p className="text-sm text-gray-600">{orderItem.size}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#212121]">${orderItem.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Discount Code */}
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Discount code or gift card"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 h-12 border-gray-300 rounded-md"
                    />
                    <Button className="bg-gray-300 text-gray-700 hover:bg-gray-400 px-6 h-12 rounded-md font-semibold">
                      APPLY
                    </Button>
                  </div>
                  <Link href="#" className="text-sm text-[#212121] underline hover:no-underline">
                    Been referred by a friend?
                  </Link>
                </div>

                {/* Order Summary */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-500 text-sm">Enter shipping address</span>
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

                {/* Free Shipping Banner */}
                {amountForFreeShipping > 0 && (
                  <div className="text-center py-4 bg-white rounded-md border border-gray-200">
                    <p className="font-semibold text-[#212121]">AED {amountForFreeShipping} To Get Free Shipping</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
