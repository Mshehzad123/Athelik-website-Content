import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { getRelatedProducts } from "@/lib/products"

export default function RelatedProducts({
  currentProductId,
  category,
}: { currentProductId: number; category: string }) {
  const relatedProducts = getRelatedProducts(currentProductId, category)

  return (
    <section className="py-16 bg-[#fafafa]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#212121] mb-4">You May Also Like</h2>
          <p className="text-[#6e6e6e] text-lg max-w-2xl mx-auto">Discover more products that complement your style.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer border-none shadow-none hover:shadow-lg transition-shadow bg-white"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isOnSale && (
                    <div className="absolute top-4 left-4 bg-[#cbf26c] text-[#212121] px-2 py-1 text-sm font-semibold rounded">
                      Sale
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-[#6e6e6e] uppercase tracking-wide">{product.category}</p>
                  <h3 className="font-semibold text-[#212121]">{product.name}</h3>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-bold text-[#212121]">{product.price}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-[#6e6e6e] line-through">{product.originalPrice}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
