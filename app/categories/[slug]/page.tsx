"use client"

import { useSearchParams } from "next/navigation"
import { useParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CollectionHero from "@/components/sections/collection-hero"
import ProductCollection from "@/components/sections/product-collection"

interface Product {
  id: string
  name: string
  price: string
  originalPrice?: string
  image: string
  images: string[]
  category: string
  subCategory: string
  collectionType: string
  description: string
  discountPercentage: number
  isOnSale: boolean
  colors: any[]
  sizes: any[]
  variants: any[]
  defaultVariant?: string
}

function CategoryContent() {
  console.log('🚀 CategoryContent function called')
  
  const searchParams = useSearchParams()
  const params = useParams()
  const gender = searchParams.get("gender") || "men"
  const slug = params.slug as string
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  console.log('🎯 CategoryContent rendered with slug:', slug, 'gender:', gender)
  
  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts()
  }, [slug, gender])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      console.log('🔍 Fetching products for sub-category:', slug, 'gender:', gender)
      
      // Convert slug back to readable name
      const subCategoryName = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      console.log('📋 Looking for products in sub-category:', subCategoryName)
      console.log('🌐 Making API call to: http://localhost:5000/api/public/products/public/all')
      
      // Fetch products from backend API
      const response = await fetch('http://localhost:5000/api/public/products/public/all')
      console.log('📡 API Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('📦 API Response:', data)
        
        if (data.success && data.data) {
          console.log('📋 All products from API:', data.data.map((p: Product) => ({ name: p.name, subCategory: p.subCategory, category: p.category })))
          
          // Filter products based on sub-category and gender
          const filteredProducts = data.data.filter((product: Product) => {
            const productSubCategory = product.subCategory || ""
            const productCategory = product.category || ""
            const subCategoryLower = subCategoryName.toLowerCase()
            
            console.log(`🔍 Checking product: ${product.name}`)
            console.log(`   - Product subCategory: ${productSubCategory}`)
            console.log(`   - Product category: ${productCategory}`)
            console.log(`   - Looking for: ${subCategoryLower}`)
            
            // More flexible sub-category matching
            let subCategoryMatch = false
            
            // Convert both to lowercase for comparison
            const productSubCategoryLower = productSubCategory.toLowerCase()
            const subCategoryLowerForComparison = subCategoryName.toLowerCase()
            
            console.log(`   - Comparing: "${productSubCategoryLower}" with "${subCategoryLowerForComparison}"`)
            
            // Direct match
            if (productSubCategoryLower === subCategoryLowerForComparison) {
              subCategoryMatch = true
            }
            // Contains match
            else if (productSubCategoryLower.includes(subCategoryLowerForComparison) || subCategoryLowerForComparison.includes(productSubCategoryLower)) {
              subCategoryMatch = true
            }
            // Handle special cases
            else if (subCategoryLowerForComparison.includes('tank') && (productSubCategoryLower.includes('tank') || product.name.toLowerCase().includes('tank'))) {
              subCategoryMatch = true
            }
            else if (subCategoryLowerForComparison.includes('t-shirt') && (productSubCategoryLower.includes('shirt') || product.name.toLowerCase().includes('shirt') || product.name.toLowerCase().includes('tee'))) {
              subCategoryMatch = true
            }
            else if (subCategoryLowerForComparison.includes('short') && (productSubCategoryLower.includes('short') || product.name.toLowerCase().includes('short'))) {
              subCategoryMatch = true
            }
            else if (subCategoryLowerForComparison.includes('legging') && (productSubCategoryLower.includes('legging') || product.name.toLowerCase().includes('legging'))) {
              subCategoryMatch = true
            }
            else if (subCategoryLowerForComparison.includes('sports bra') && (productSubCategoryLower.includes('bra') || product.name.toLowerCase().includes('bra'))) {
              subCategoryMatch = true
            }
            
            // Check if gender matches
            const genderMatch = gender === 'all' || 
                              product.category?.toLowerCase() === gender.toLowerCase()
            
            console.log(`   - Sub-category match: ${subCategoryMatch}`)
            console.log(`   - Gender match: ${genderMatch}`)
            
            return subCategoryMatch && genderMatch
          })
          
          console.log('✅ Filtered products:', filteredProducts)
          setProducts(filteredProducts)
        } else {
          console.log('⚠️ No products found in API response')
          setProducts([])
        }
      } else {
        console.error('❌ API response not ok:', response.status)
        setProducts([])
      }
    } catch (error) {
      console.error('❌ Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  // Convert URL slug to readable name
  const getSubCategoryName = () => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="min-h-screen">
      <div style={{ padding: '20px', background: 'red', color: 'white', fontSize: '24px' }}>
        🚨 DEBUG: Component rendered - Slug: {slug}, Gender: {gender}
      </div>
      <Header />
      <main>
        <CollectionHero title={`${getSubCategoryName()} Collection`} />
        {loading ? (
          <div style={{ padding: '20px', background: 'yellow', color: 'black' }}>
            <h2>Loading products...</h2>
            <p>Please wait while we fetch products from the backend.</p>
          </div>
        ) : products.length > 0 ? (
          <ProductCollection products={products} loading={loading} />
        ) : (
          <div style={{ padding: '20px', background: 'orange', color: 'black' }}>
            <h2>No products found</h2>
            <p>No products found for {getSubCategoryName()} in {gender} category.</p>
            <p>Products count: {products.length}</p>
          </div>
        )}
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