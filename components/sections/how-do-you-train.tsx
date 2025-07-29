import Image from "next/image"
import { Button } from "@/components/ui/button"

const trainingCategories = [
  {
    id: 1,
    title: "LIFTING",
    image: "/placeholder.svg?height=600&width=400",
    description: "Power through your strength training sessions",
  },
  {
    id: 2,
    title: "HIIT",
    image: "/placeholder.svg?height=600&width=400",
    description: "High-intensity interval training gear",
  },
  {
    id: 3,
    title: "RUNNING",
    image: "/placeholder.svg?height=600&width=400",
    description: "Built for speed and endurance",
  },
  {
    id: 4,
    title: "PILATES",
    image: "/placeholder.svg?height=600&width=400",
    description: "Flexible and comfortable for low-impact workouts",
  },
]

export default function HowDoYouTrain() {
  return (
    <section className="py-20 bg-[#212121]">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">HOW DO YOU TRAIN?</h2>
        </div>

        {/* Training Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainingCategories.map((category) => (
            <div key={category.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={`${category.title} workout gear`}
                  width={400}
                  height={600}
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>

              {/* Category Title */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide text-center">{category.title}</h3>
              </div>

              {/* Shop Now Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="border-2 border-[#cbf26c] text-[#cbf26c] hover:bg-[#cbf26c] hover:text-[#212121] bg-transparent font-semibold px-8 py-3 rounded-none transition-all duration-300 hover:scale-105"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
