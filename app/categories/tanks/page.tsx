import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CollectionHero from "@/components/sections/collection-hero"
import ProductCollection from "@/components/sections/product-collection"
import { getAllProducts } from "@/lib/products"

export default function TanksPage() {
  // In a real app, you'd filter products by category
  const products = getAllProducts().filter(
    (product) => product.name.toLowerCase().includes("tank") || product.name.toLowerCase().includes("vest"),
  )

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CollectionHero title="Tank Tops & Vests" />
        <ProductCollection products={products} />
      </main>
      <Footer />
    </div>
  )
}
