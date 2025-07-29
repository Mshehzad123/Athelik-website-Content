import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  id: number
  name: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  fit?: string
  href?: string
  className?: string
  tall?: boolean
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  discount,
  image,
  fit,
  href = `/product/${id}`,
  className,
  tall = false,
}: ProductCardProps) {
  return (
    <Link href={href} className={cn("group block", className)}>
      <div className="relative overflow-hidden bg-white hover:shadow-md transition-shadow duration-300">
        {/* Product Image */}
        <div className={cn("relative overflow-hidden", tall ? "aspect-[3/5]" : "aspect-[3/4]")}>
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Fit Label */}
          {fit && (
            <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1.5 text-xs font-medium uppercase tracking-wider">
              {fit}
            </div>
          )}

          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-4 right-4 bg-white text-black px-2 py-1 text-xs font-bold">{discount}%</div>
          )}
        </div>

        {/* Product Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#212121] text-white p-4">
          {/* Product Name */}
          <h3 className="text-sm font-medium mb-2 leading-tight">{name}</h3>

          {/* Pricing */}
          <div className="flex items-center space-x-2">
            {originalPrice && <span className="text-sm text-gray-300 line-through">${originalPrice.toFixed(2)}</span>}
            <span className="text-lg font-bold text-white">${price.toFixed(2)}</span>
            {discount && <span className="bg-white text-black px-2 py-0.5 text-xs font-bold">{discount}%</span>}
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
    </Link>
  )
}
