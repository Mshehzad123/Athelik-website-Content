"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import ProductCard from "@/components/ui/product-card"
import type { Product } from "@/lib/types"
import { SlidersHorizontal, X } from "lucide-react"

export default function ProductCollection({ products }: { products: Product[] }) {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [sortOption, setSortOption] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Get unique categories
  const categories = Array.from(new Set(products.map((product) => product.category)))

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const applyFilters = () => {
    let result = [...products]

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        result = result.sort(
          (a, b) => Number.parseFloat(a.price.replace("$", "")) - Number.parseFloat(b.price.replace("$", "")),
        )
        break
      case "price-high-low":
        result = result.sort(
          (a, b) => Number.parseFloat(b.price.replace("$", "")) - Number.parseFloat(a.price.replace("$", "")),
        )
        break
      case "newest":
        // In a real app, you would sort by date
        break
      default:
        // Featured - keep original order
        break
    }

    setFilteredProducts(result)
    setShowFilters(false)
  }

  const resetFilters = () => {
    setSelectedCategories([])
    setSortOption("featured")
    setFilteredProducts(products)
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </Button>

            {selectedCategories.length > 0 && (
              <Button variant="ghost" onClick={resetFilters} className="text-[#6e6e6e]">
                Clear filters
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6e6e6e]">Sort by:</span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-[#f5f5f5] p-6 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[#212121]">Filters</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <h4 className="font-medium text-[#212121] mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-[#6e6e6e]">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter - would be implemented with a slider in a real app */}
              <div>
                <h4 className="font-medium text-[#212121] mb-3">Price Range</h4>
                <div className="text-[#6e6e6e]">
                  <p>$0 - $200</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
              <Button className="bg-[#212121] text-white hover:bg-black" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={Number.parseFloat(product.price.replace("$", ""))}
              originalPrice={
                product.originalPrice ? Number.parseFloat(product.originalPrice.replace("$", "")) : undefined
              }
              discount={product.isOnSale ? 30 : undefined}
              image={product.image}
              fit="REGULAR FIT"
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-[#212121] mb-2">No products found</h3>
            <p className="text-[#6e6e6e] mb-6">Try adjusting your filters or browse our full collection.</p>
            <Button onClick={resetFilters} className="bg-[#212121] text-white hover:bg-black">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
