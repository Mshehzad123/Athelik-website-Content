import { notFound } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ProductDetail from "@/components/sections/product-detail"
import RelatedProducts from "@/components/sections/related-products"
import { getProductById as getApiProduct } from "@/lib/api"
import { getProductById as getFallbackProduct } from "@/lib/products"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let product = null
  
  try {
    // Try to get product from API first
    product = await getApiProduct(id)
  } catch (error) {
    console.log("API not available, using fallback data")
    // If API fails, use fallback data
    product = getFallbackProduct(id)
  }

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ProductDetail product={product} />
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </main>
      <Footer />
    </div>
  )
}
