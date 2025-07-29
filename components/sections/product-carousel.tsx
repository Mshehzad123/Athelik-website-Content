"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Performance Leggings",
    image: "/placeholder.svg?height=600&width=400",
    category: "VITAL EVERY TIME",
  },
  {
    id: 2,
    name: "Training Jacket",
    image: "/placeholder.svg?height=600&width=400",
    category: "HOODIES & JACKETS",
  },
  {
    id: 3,
    name: "Crop Top Set",
    image: "/placeholder.svg?height=600&width=400",
    category: "LEGGINGS",
  },
  {
    id: 4,
    name: "Athletic Wear",
    image: "/placeholder.svg?height=600&width=400",
    category: "T-SHIRTS",
  },
  {
    id: 5,
    name: "Oversized Tee",
    image: "/placeholder.svg?height=600&width=400",
    category: "NEW ARRIVAL",
  },
  {
    id: 6,
    name: "Sport Shorts",
    image: "/placeholder.svg?height=600&width=400",
    category: "SHORTS",
  },
  {
    id: 7,
    name: "Yoga Set",
    image: "/placeholder.svg?height=600&width=400",
    category: "YOGA WEAR",
  },
]

export default function ProductCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280 // Width of one item plus gap
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScrollButtons, 300)
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280 // Width of one item plus gap
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScrollButtons, 300)
    }
  }

  return (
    <section className="py-20 bg-[#212121] relative">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide">
            FEATURED COLLECTIONS MEN & WOMEN
          </h2>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute left-8 top-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-transparent hover:bg-black/20 transition-all duration-300 ${
            !canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <Image src="/icons/arrow-left.svg" alt="Previous" width={24} height={40} className="w-6 h-10" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-8 top-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full bg-transparent hover:bg-black/20 transition-all duration-300 ${
            !canScrollRight ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <Image src="/icons/arrow-right.svg" alt="Next" width={24} height={40} className="w-6 h-10" />
        </Button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-16"
          onScroll={checkScrollButtons}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64 group cursor-pointer">
              <div className="relative overflow-hidden bg-white p-1 shadow-lg hover:shadow-xl transition-all duration-300">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={256}
                  height={400}
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>

              {/* Product Category Label */}
              <div className="mt-4 text-center">
                <p className="text-white text-sm font-medium uppercase tracking-wide">{product.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
