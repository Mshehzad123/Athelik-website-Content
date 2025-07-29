import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CollectionHero from "@/components/sections/collection-hero"
import ProductCollection from "@/components/sections/product-collection"
import { getAllProducts } from "@/lib/products"

export default function CollectionPage() {
  const products = getAllProducts()

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
