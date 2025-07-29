"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [selectedGender, setSelectedGender] = useState("men") // Track selected gender
  const pathname = usePathname()

  // Function to check if a path is active
  const isActivePath = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  // Get categories based on selected gender
  const getCategories = (gender: string) => {
    if (gender === "women") {
      return [
        { href: "/categories/t-shirts", label: "T-Shirts" },
        { href: "/categories/leggings", label: "Leggings" },
        { href: "/categories/shorts", label: "Shorts" },
        { href: "/categories/tank-tops", label: "Tank Tops" },
        { href: "/categories/sports-bras", label: "Sports Bras" },
      ]
    }
    return [
      { href: "/categories/t-shirts", label: "T-Shirts" },
      { href: "/categories/shorts", label: "Shorts" },
      { href: "/categories/trousers", label: "Trousers" },
      { href: "/categories/twinsets", label: "Twinsets" },
      { href: "/categories/tanks", label: "Tanks" },
    ]
  }

  return (
    <header className="bg-[#0f1013] text-white sticky top-0 z-50">
      {/* Top Utility Bar */}
      <div className="border-b border-[#141619]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end h-8 text-xs">
            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/account" className="text-[#d9d9d9] hover:text-white transition-colors flex items-center">
                <User className="h-3 w-3 mr-1" />
                Account
              </Link>
              <Link href="/accessibility" className="text-[#d9d9d9] hover:text-white transition-colors">
                Accessibility Statement
              </Link>
              <Link href="/help" className="text-[#d9d9d9] hover:text-white transition-colors">
                Help
              </Link>
              <Link href="/signup" className="text-[#d9d9d9] hover:text-white transition-colors">
                Email Sign Up
              </Link>
              <Link href="/blog" className="text-[#d9d9d9] hover:text-white transition-colors">
                Blog
              </Link>
              <div className="flex items-center text-[#d9d9d9] hover:text-white transition-colors cursor-pointer">
                English
                <ChevronDown className="h-3 w-3 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="ATHLEKT" width={140} height={37} className="h-9 w-auto" priority />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            <Link
              href="/"
              className={`transition-colors font-medium tracking-wide uppercase text-sm ${
                isActivePath("/") ? "text-[#cbf26c]" : "text-white hover:text-[#cbf26c]"
              }`}
            >
              HOME
            </Link>
            <Link
              href="/collection"
              className={`transition-colors font-medium tracking-wide uppercase text-sm ${
                isActivePath("/collection") ? "text-[#cbf26c]" : "text-white hover:text-[#cbf26c]"
              }`}
            >
              COLLECTION
            </Link>

            {/* Categories with Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <Link
                href="/categories"
                className={`transition-colors font-medium tracking-wide uppercase text-sm ${
                  isActivePath("/categories") ? "text-[#cbf26c]" : "text-white hover:text-[#cbf26c]"
                }`}
              >
                CATEGORIES
              </Link>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                  isCategoriesOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <div className="bg-white shadow-lg rounded-md overflow-hidden z-50">
                  <div className="grid grid-cols-2 min-w-[400px]">
                    {/* Left Column - Gender Categories */}
                    <div className="bg-white">
                      <button
                        onClick={() => setSelectedGender("men")}
                        className={`block w-full text-left px-6 py-3 transition-colors font-medium ${
                          selectedGender === "men" ? "bg-[#cbf26c] text-[#212121]" : "text-[#212121] hover:bg-gray-50"
                        }`}
                      >
                        Men
                      </button>
                      <button
                        onClick={() => setSelectedGender("women")}
                        className={`block w-full text-left px-6 py-3 transition-colors font-medium ${
                          selectedGender === "women" ? "bg-[#cbf26c] text-[#212121]" : "text-[#212121] hover:bg-gray-50"
                        }`}
                      >
                        Women
                      </button>
                    </div>

                    {/* Right Column - Product Types */}
                    <div className="bg-white border-l border-gray-200">
                      {getCategories(selectedGender).map((category) => (
                        <Link
                          key={category.href}
                          href={`${category.href}?gender=${selectedGender}`}
                          className="block px-6 py-3 text-[#212121] hover:bg-gray-50 transition-colors"
                          onClick={() => setIsCategoriesOpen(false)}
                        >
                          {category.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* View All Categories Link */}
                  <div className="border-t border-gray-200 bg-gray-50">
                    <Link
                      href={`/categories?gender=${selectedGender}`}
                      className="block px-6 py-3 text-center text-[#212121] hover:bg-gray-100 transition-colors font-medium"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      View All {selectedGender === "women" ? "Women's" : "Men's"} Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* <Link
              href="/sale"
              className={`transition-colors font-medium tracking-wide uppercase text-sm ${
                isActivePath("/sale") ? "text-[#cbf26c]" : "text-white hover:text-[#cbf26c]"
              }`}
            >
              SALE
            </Link> */}
          </nav>

          {/* Search and Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6e6e6e] h-4 w-4" />
                <Input
                  type="search"
                  placeholder="What are you looking for to..."
                  className="pl-10 pr-4 w-80 bg-white text-[#212121] border-none rounded-md h-10 placeholder:text-[#6e6e6e]"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-3">
              {/* Wishlist */}
              <Button variant="ghost" size="icon" className="hover:bg-[#141619] text-white">
                <Heart className="h-5 w-5" />
              </Button>

              {/* Account */}
              <Button variant="ghost" size="icon" className="hover:bg-[#141619] text-white">
                <User className="h-5 w-5" />
              </Button>

              {/* Shopping Bag */}
              <Button variant="ghost" size="icon" className="relative hover:bg-[#141619] text-white" asChild>
                <Link href="/cart">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-[#cbf26c] text-[#212121] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </Link>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-[#141619] text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-[#141619]">
            <nav className="flex flex-col space-y-6">
              <Link
                href="/"
                className={`transition-colors font-medium tracking-wide uppercase text-sm ${
                  isActivePath("/") ? "text-[#cbf26c]" : "text-white hover:text-[#cbf26c]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                href="/collection"
                className={`transition-colors font-medium tracking-wide uppercase text-sm ${
                  isActivePath("/collection") ? "text-[#cbf26c]" : "text-white hover:text-[#cbf26c]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                COLLECTION
              </Link>

              {/* Mobile Categories */}
              <div className="space-y-3">
                <span
                  className={`font-medium tracking-wide uppercase text-sm ${
                    isActivePath("/categories") ? "text-[#cbf26c]" : "text-white"
                  }`}
                >
                  CATEGORIES
                </span>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/categories?gender=men"
                    className="block text-[#cbf26c] hover:text-white transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Men
                  </Link>
                  <Link
                    href="/categories?gender=women"
                    className="block text-white hover:text-[#cbf26c] transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Women
                  </Link>
                  <div className="pl-4 space-y-2 border-l border-[#141619]">
                    <Link
                      href="/categories/t-shirts"
                      className="block text-[#d9d9d9] hover:text-[#cbf26c] transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      T-Shirts
                    </Link>
                    <Link
                      href="/categories/leggings"
                      className="block text-[#d9d9d9] hover:text-[#cbf26c] transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Leggings
                    </Link>
                    <Link
                      href="/categories/shorts"
                      className="block text-[#d9d9d9] hover:text-[#cbf26c] transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Shorts
                    </Link>
                    <Link
                      href="/categories/tank-tops"
                      className="block text-[#d9d9d9] hover:text-[#cbf26c] transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Tank Tops
                    </Link>
                    <Link
                      href="/categories/sports-bras"
                      className="block text-[#d9d9d9] hover:text-[#cbf26c] transition-colors text-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sports Bras
                    </Link>
                  </div>
                </div>
              </div>

              {/* <Link
                href="/sale"
                className={`transition-colors font-medium tracking-wide uppercase text-sm ${
                  isActivePath("/sale") ? "text-[#cbf26c]" : "text-white hover:text-[#cbf26c]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                SALE
              </Link> */}

              {/* Mobile Search */}
              <div className="pt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6e6e6e] h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="What are you looking for to..."
                    className="pl-10 bg-white text-[#212121] border-none rounded-md h-10 placeholder:text-[#6e6e6e]"
                  />
                </div>
              </div>

              {/* Mobile Utility Links */}
              <div className="pt-4 border-t border-[#141619] space-y-4">
                <Link
                  href="/account"
                  className="text-[#d9d9d9] hover:text-white transition-colors text-sm flex items-center"
                >
                  <User className="h-3 w-3 mr-2" />
                  Account
                </Link>
                <Link href="/help" className="text-[#d9d9d9] hover:text-white transition-colors text-sm">
                  Help
                </Link>
                <Link href="/blog" className="text-[#d9d9d9] hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
