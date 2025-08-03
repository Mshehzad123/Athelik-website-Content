"use client"

import { useSearchParams } from "next/navigation"
import { useParams } from "next/navigation"
import { Suspense, useState, useEffect } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CollectionHero from "@/components/sections/collection-hero"
import ProductCollection from "@/components/sections/product-collection"
import { apiService } from "@/lib/api"

function SubCategoryContent() {
  const searchParams = useSearchParams()
  const params = useParams()
  const gender = searchParams.get("gender") || "men"
  const subCategory = params.subcategory as string
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Convert URL slug to readable name
  const getSubCategoryName = () => {
    return subCategory
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Filter products based on sub-category
  const getFilteredProducts = async () => {
    try {
      const allProducts = await apiService.getProducts()
      const subCategoryName = getSubCategoryName().toLowerCase()
      
      console.log('🔍 Filtering products for sub-category:', subCategoryName)
      console.log('📦 Total products from API:', allProducts.length)
      
      // Log all products for debugging
      allProducts.forEach(product => {
        console.log(`📋 Product: ${product.name}, Category: ${product.category}, SubCategory: ${product.subCategory}`)
      })
      
      // Only use real products from backend, no mock data fallback
      const filtered = allProducts.filter((product) => {
        const productName = product.name.toLowerCase()
        const productCategory = product.category?.toLowerCase() || ""
        const productSubCategory = product.subCategory?.toLowerCase() || ""
        
        // Handle special cases for sub-category matching
        let shouldMatch = false
        
        // Case 1: Exact subCategory match
        if (productSubCategory === subCategoryName) {
          console.log(`✅ Exact subCategory match: ${product.name}`)
          shouldMatch = true
        }
        // Case 2: SubCategory contains the sub-category name
        else if (productSubCategory && productSubCategory.includes(subCategoryName)) {
          console.log(`✅ SubCategory contains match: ${product.name}`)
          shouldMatch = true
        }
        // Case 3: Product name contains the sub-category name
        else if (productName.includes(subCategoryName)) {
          console.log(`✅ Product name contains match: ${product.name}`)
          shouldMatch = true
        }
        // Case 4: Special handling for "tanks" -> "tank tops"
        else if (subCategoryName === "tanks" && productSubCategory === "tank tops") {
          console.log(`✅ Special tanks -> tank tops match: ${product.name}`)
          shouldMatch = true
        }
        // Case 5: Special handling for "t-shirts" -> "t-shirts"
        else if (subCategoryName === "t-shirts" && productSubCategory === "t-shirts") {
          console.log(`✅ Special t-shirts match: ${product.name}`)
          shouldMatch = true
        }
        // Case 6: Special handling for "shorts"
        else if (subCategoryName === "shorts" && productSubCategory === "shorts") {
          console.log(`✅ Special shorts match: ${product.name}`)
          shouldMatch = true
        }
        // Case 7: Special handling for "leggings"
        else if (subCategoryName === "leggings" && productSubCategory === "leggings") {
          console.log(`✅ Special leggings match: ${product.name}`)
          shouldMatch = true
        }
        // Case 8: Special handling for "sports bras"
        else if (subCategoryName === "sports bras" && productSubCategory === "sports bras") {
          console.log(`✅ Special sports bras match: ${product.name}`)
          shouldMatch = true
        }
        // Case 9: Special handling for "trousers"
        else if (subCategoryName === "trousers" && productSubCategory === "trousers") {
          console.log(`✅ Special trousers match: ${product.name}`)
          shouldMatch = true
        }
        
        return shouldMatch
      })
      
      console.log(`🎯 Found ${filtered.length} products for sub-category: ${subCategoryName}`)
      setProducts(filtered)
    } catch (error) {
      console.error('❌ Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFilteredProducts()
  }, [subCategory])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <CollectionHero title={getSubCategoryName()} />
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">Loading products...</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CollectionHero title={getSubCategoryName()} />
        {products.length === 0 ? (
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[#212121] mb-2">No products found for {getSubCategoryName()}</h3>
              <p className="text-[#6e6e6e] mb-6">We couldn't find any products in this category. Please check back later or browse our other collections.</p>
              <div className="flex justify-center gap-4">
                <a href="/collection" className="bg-[#212121] text-white px-6 py-2 rounded hover:bg-black transition-colors">
                  Browse All Collections
                </a>
                <a href="/categories" className="border border-[#212121] text-[#212121] px-6 py-2 rounded hover:bg-[#212121] hover:text-white transition-colors">
                  View Categories
                </a>
              </div>
            </div>
          </div>
        ) : (
          <ProductCollection products={products} />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default function SubCategoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubCategoryContent />
    </Suspense>
  )
} 