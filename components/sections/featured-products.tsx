import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCurrency } from "@/lib/currency-context"

const featuredProducts = [
  {
    id: 1,
    name: "Performance Tank Top",
    price: "$45",
    image: "/placeholder.svg?height=400&width=300",
    category: "Women",
  },
  {
    id: 2,
    name: "Training Shorts",
    price: "$35",
    image: "/placeholder.svg?height=400&width=300",
    category: "Men",
  },
  {
    id: 3,
    name: "Compression Leggings",
    price: "$55",
    image: "/placeholder.svg?height=400&width=300",
    category: "Women",
  },
  {
    id: 4,
    name: "Athletic Hoodie",
    price: "$75",
    image: "/placeholder.svg?height=400&width=300",
    category: "Unisex",
  },
]

export default function FeaturedProducts() {
  const { formatPrice } = useCurrency()
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#212121] mb-4">Featured Products</h2>
          <p className="text-[#6e6e6e] text-lg max-w-2xl mx-auto">
            Discover our most popular athletic wear designed for peak performance and style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer border-none shadow-none hover:shadow-lg transition-shadow"
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-[#6e6e6e] uppercase tracking-wide">{product.category}</p>
                  <h3 className="font-semibold text-[#212121]">{product.name}</h3>
                  <p className="text-lg font-bold text-[#212121]">{formatPrice(parseFloat(product.price.replace(/[^0-9.]/g, '')))}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white bg-transparent"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
