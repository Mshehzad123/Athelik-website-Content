import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CollectionHero from "@/components/sections/collection-hero"
import ProductCollection from "@/components/sections/product-collection"
import { getAllProducts } from "@/lib/products"

export default function TwinsetsPage() {
  // In a real app, you'd filter products by category
  const products = getAllProducts().filter(
    (product) => product.name.toLowerCase().includes("set") || product.name.toLowerCase().includes("twin"),
  )

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CollectionHero title="Twinsets & Sets" />
        <ProductCollection products={products} />
      </main>
      <Footer />
    </div>
  )
}
