"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CollectionHero from "@/components/sections/collection-hero"
import ProductCollection from "@/components/sections/product-collection"
import { getAllProducts } from "@/lib/products"

function ShortsContent() {
  const searchParams = useSearchParams()
  const gender = searchParams.get("gender") || "men"

  // Filter products based on gender and sub-category
  const products = getAllProducts().filter((product) => {
    const nameMatch = product.name.toLowerCase().includes("short")
    
    // You can add more specific filtering logic here based on your product structure
    return nameMatch
  })

  // Always show the correct sub-category name
  const getSubCategoryName = () => {
    return "Shorts"
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CollectionHero title={getSubCategoryName()} />
        <ProductCollection products={products} />
      </main>
      <Footer />
    </div>
  )
}

export default function ShortsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShortsContent />
    </Suspense>
  )
}
