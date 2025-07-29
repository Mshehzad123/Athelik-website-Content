import type { Product } from "./types"

// Mock product data
const products: Product[] = [
  {
    id: 1,
    name: "Essential Pro 7 Inch Shorts - Coral",
    price: "$23.00",
    originalPrice: "$46.00",
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-GgWFwr4F7jybMbU2H9fGLI21prsna4.png",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Men",
    isOnSale: true,
    description: "Premium athletic shorts designed for performance and comfort during your most intense workouts.",
    fullDescription:
      "The Essential Pro 7 Inch Shorts are engineered for the modern athlete. Featuring moisture-wicking technology, four-way stretch fabric, and a comfortable 7-inch inseam, these shorts provide the perfect balance of coverage and mobility. The coral colorway adds a vibrant touch to your workout wardrobe.",
    details: [
      "7-inch inseam for optimal coverage",
      "Moisture-wicking fabric technology",
      "Four-way stretch construction",
      "Secure zip pocket for essentials",
      "Elastic waistband with drawstring",
      "Regular fit design",
    ],
    colors: [
      { name: "Coral", hex: "#FF6B6B" },
      { name: "Red", hex: "#FF4444" },
      { name: "Pink", hex: "#FF69B4" },
      { name: "Navy", hex: "#1a237e" },
      { name: "Light Pink", hex: "#FFB6C1" },
      { name: "Cream", hex: "#F5F5DC" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewCount: 507,
  },
  {
    id: 2,
    name: "Training Shorts",
    price: "$35",
    image: "/placeholder.svg?height=400&width=300",
    category: "Men",
    description: "Comfortable, flexible shorts perfect for any training session.",
  },
  {
    id: 3,
    name: "Compression Leggings",
    price: "$55",
    image: "/placeholder.svg?height=400&width=300",
    category: "Women",
    description: "High-waisted compression leggings that support your muscles during workouts.",
  },
  {
    id: 4,
    name: "Athletic Hoodie",
    price: "$75",
    image: "/placeholder.svg?height=400&width=300",
    category: "Unisex",
    description: "Versatile hoodie that keeps you warm before and after your workout.",
  },
  {
    id: 5,
    name: "Essential Training Tee",
    price: "$29",
    originalPrice: "$39",
    image: "/placeholder.svg?height=400&width=300",
    isOnSale: true,
    category: "Men",
    description: "Classic training tee made from soft, breathable cotton blend.",
  },
  {
    id: 6,
    name: "High-Waist Leggings",
    price: "$65",
    image: "/placeholder.svg?height=400&width=300",
    category: "Women",
    description: "Supportive high-waist leggings with pocket for your essentials.",
  },
  {
    id: 7,
    name: "Performance Polo",
    price: "$55",
    image: "/placeholder.svg?height=400&width=300",
    category: "Men",
    description: "Sleek, moisture-wicking polo that transitions from the gym to casual wear.",
  },
  {
    id: 8,
    name: "Sports Bra Set",
    price: "$45",
    originalPrice: "$60",
    image: "/placeholder.svg?height=400&width=300",
    isOnSale: true,
    category: "Women",
    description: "Medium-support sports bra with matching leggings for a coordinated look.",
  },
]

// Get a product by ID
export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

// Get related products (same category, excluding current product)
export function getRelatedProducts(currentProductId: number, category: string): Product[] {
  return products.filter((product) => product.id !== currentProductId && product.category === category).slice(0, 4)
}

// Get all products
export function getAllProducts(): Product[] {
  return products
}

// Get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

// Get featured products
export function getFeaturedProducts(): Product[] {
  return products.slice(0, 4)
}

// Get sale products
export function getSaleProducts(): Product[] {
  return products.filter((product) => product.isOnSale)
}
