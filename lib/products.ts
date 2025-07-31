import type { Product } from "./types"

// Fallback product data when backend is not available
const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Essential Pro 7 Inch Shorts - Coral",
    price: "$23.00",
    originalPrice: "$46.00",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
    ],
    category: "Men",
    isOnSale: true,
    description: "Premium athletic shorts designed for performance and comfort during your most intense workouts.",
    fullDescription:
      "The Essential Pro 7 Inch Shorts are engineered for the modern athlete. Featuring moisture-wicking technology, four-way stretch fabric, and a comfortable 7-inch inseam, these shorts provide the perfect balance of coverage and mobility. The coral colorway adds a vibrant touch to your workout wardrobe.",
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
    id: "2",
    name: "Training Shorts",
    price: "$35",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"],
    category: "Men",
    description: "Comfortable, flexible shorts perfect for any training session.",
  },
  {
    id: "3",
    name: "Compression Leggings",
    price: "$55",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"],
    category: "Women",
    description: "High-waisted compression leggings that support your muscles during workouts.",
  },
  {
    id: "4",
    name: "Athletic Hoodie",
    price: "$75",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"],
    category: "Unisex",
    description: "Versatile hoodie that keeps you warm before and after your workout.",
  },
  {
    id: "5",
    name: "Essential Training Tee",
    price: "$29",
    originalPrice: "$39",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"],
    isOnSale: true,
    category: "Men",
    description: "Classic training tee made from soft, breathable cotton blend.",
  },
  {
    id: "6",
    name: "High-Waist Leggings",
    price: "$65",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"],
    category: "Women",
    description: "Supportive high-waist leggings with pocket for your essentials.",
  },
  {
    id: "7",
    name: "Performance Polo",
    price: "$55",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"],
    category: "Men",
    description: "Sleek, moisture-wicking polo that transitions from the gym to casual wear.",
  },
  {
    id: "8",
    name: "Sports Bra Set",
    price: "$45",
    originalPrice: "$60",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"],
    isOnSale: true,
    category: "Women",
    description: "Medium-support sports bra with matching leggings for a coordinated look.",
  },
]

// Get a product by ID
export function getProductById(id: string): Product | undefined {
  return fallbackProducts.find((product) => product.id === id)
}

// Get related products (same category, excluding current product)
export function getRelatedProducts(currentProductId: string, category: string): Product[] {
  return fallbackProducts.filter((product) => product.id !== currentProductId && product.category === category).slice(0, 4)
}

// Get all products (fallback)
export function getAllProducts(): Product[] {
  return fallbackProducts
}

// Get products by category (fallback)
export function getProductsByCategory(category: string): Product[] {
  return fallbackProducts.filter((product) => product.category === category)
}

// Get featured products (fallback)
export function getFeaturedProducts(): Product[] {
  return fallbackProducts.slice(0, 4)
}

// Get sale products (fallback)
export function getSaleProducts(): Product[] {
  return fallbackProducts.filter((product) => product.isOnSale)
}
