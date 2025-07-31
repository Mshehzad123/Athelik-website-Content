import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CollectionHero from "@/components/sections/collection-hero"
import ProductCollection from "@/components/sections/product-collection"
import { getAllProducts as getApiProducts } from "@/lib/api"
import { getAllProducts as getFallbackProducts } from "@/lib/products"

export default async function CollectionPage() {
  let products = []
  
  try {
    // Try to get products from API first
    products = await getApiProducts()
    console.log("Using API products:", products.length)
  } catch (error) {
    console.log("API not available, using fallback data")
    // If API fails, use fallback data
    products = getFallbackProducts()
  }

  // For now, always use fallback data to ensure images work
  if (products.length === 0) {
    products = getFallbackProducts()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CollectionHero title="All Collections" />
        <ProductCollection products={products} />
      </main>
      <Footer />
    </div>
  )
}
