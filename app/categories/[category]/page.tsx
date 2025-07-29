import { notFound } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CollectionHero from "@/components/sections/collection-hero"
import ProductCollection from "@/components/sections/product-collection"
import { getProductsByCategory } from "@/lib/products"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category)
  const validCategories = ["Men", "Women", "Unisex"]

  // Check if category is valid
  if (!validCategories.includes(category)) {
    notFound()
  }

  const products = getProductsByCategory(category)

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CollectionHero title={`${category}'s Collection`} />
        <ProductCollection products={products} />
      </main>
      <Footer />
    </div>
  )
}
