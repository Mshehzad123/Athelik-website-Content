export interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  images?: string[]
  category: string
  isOnSale?: boolean
  description?: string
  fullDescription?: string
  details?: string[]
  colors?: { name: string; hex: string }[]
  sizes?: string[]
  rating?: number
  reviewCount?: number
}
