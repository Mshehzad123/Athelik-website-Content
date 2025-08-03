"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CollectionHero from "@/components/sections/collection-hero"
import ProductCollection from "@/components/sections/product-collection"
import { getAllProducts } from "@/lib/products"

function TwinsetsContent() {
  const searchParams = useSearchParams()
  const gender = searchParams.get("gender") || "women"

  // Filter products based on gender and sub-category
  const products = getAllProducts().filter((product) => {
    const nameMatch = product.name.toLowerCase().includes("twin") ||
                     product.name.toLowerCase().includes("set")
    
    // You can add more specific filtering logic here based on your product structure
    return nameMatch
  })

  // Always show the correct sub-category name
  const getSubCategoryName = () => {
    return "Twinsets"
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

export default function TwinsetsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TwinsetsContent />
    </Suspense>
  )
}
