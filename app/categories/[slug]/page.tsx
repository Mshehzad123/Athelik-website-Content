"use client"

import { useSearchParams } from "next/navigation"
import { useParams } from "next/navigation"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CollectionHero from "@/components/sections/collection-hero"
import ProductCollection from "@/components/sections/product-collection"
import { getAllProducts } from "@/lib/products"

function CategoryContent() {
  const searchParams = useSearchParams()
  const params = useParams()
  const gender = searchParams.get("gender") || "men"
  const slug = params.slug as string

  // Check if this is a main category (Men, Women, Unisex)
  const validCategories = ["Men", "Women", "Unisex"]
  const isMainCategory = validCategories.includes(slug)

  if (isMainCategory) {
    // Handle main category
    const products = getAllProducts().filter(product => 
      product.category?.toLowerCase() === slug.toLowerCase()
    )

    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <CollectionHero title={`${slug}'s Collection`} />
          <ProductCollection products={products} />
        </main>
        <Footer />
      </div>
    )
  }

  // Handle subcategory
  const subCategory = slug

  // Convert URL slug to readable name
  const getSubCategoryName = () => {
    return subCategory
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Filter products based on sub-category
  const getFilteredProducts = () => {
    const products = getAllProducts()
    const subCategoryName = getSubCategoryName().toLowerCase()
    
    return products.filter((product) => {
      const productName = product.name.toLowerCase()
      const productCategory = product.category?.toLowerCase() || ""
      
      // Filter based on sub-category name in product name or category
      if (subCategoryName.includes('t-shirt') || subCategoryName.includes('shirt')) {
        return productName.includes('tee') || productName.includes('shirt') || productName.includes('top')
      }
      
      if (subCategoryName.includes('short')) {
        return productName.includes('short')
      }
      
      if (subCategoryName.includes('trouser')) {
        return productName.includes('trouser') || productName.includes('pant')
      }
      
      if (subCategoryName.includes('legging')) {
        return productName.includes('legging')
      }
      
      if (subCategoryName.includes('tank')) {
        return productName.includes('tank')
      }
      
      if (subCategoryName.includes('sports bra')) {
        return productName.includes('bra') || productName.includes('sports')
      }
      
      if (subCategoryName.includes('twin')) {
        return productName.includes('twin') || productName.includes('set')
      }
      
      // Default: check if sub-category name appears in product name
      return productName.includes(subCategoryName) || productCategory.includes(subCategoryName)
    })
  }

  const products = getFilteredProducts()

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

export default function CategoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryContent />
    </Suspense>
  )
} 