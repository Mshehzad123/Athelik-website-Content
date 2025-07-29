import Image from "next/image"

export default function MenCollection() {
  return (
    <section className="py-20 bg-[#212121]">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">MEN COLLECTION</h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Side - 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Golden Era Fresh Legacy - Marvelous */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=380&width=300"
                  alt="Man in pink Golden Era Fresh Legacy shirt"
                  width={300}
                  height={380}
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="text-white">
                <h3 className="text-lg font-bold mb-2 text-[#cbf26c]">Golden Era Fresh Legacy - Marvelous</h3>
                <p className="text-lg font-semibold">$50.00</p>
              </div>
            </div>

            {/* 3" Jogger Shorts - Navy */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=380&width=300"
                  alt="Man in navy jogger shorts"
                  width={300}
                  height={380}
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="text-white">
                <h3 className="text-lg font-bold mb-2 text-[#cbf26c]">3" Jogger Shorts - Navy</h3>
                <p className="text-lg font-semibold">$56.00</p>
              </div>
            </div>

            {/* Sweat Tee - Paloma Grey Marl */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=380&width=300"
                  alt="Man in dark teal sweat tee"
                  width={300}
                  height={380}
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="text-white">
                <h3 className="text-lg font-bold mb-2 text-[#cbf26c]">Sweat Tee - Paloma Grey Marl</h3>
                <p className="text-lg font-semibold">$48.00</p>
              </div>
            </div>

            {/* Golden Era Fresh Legacy - Paloma */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=380&width=300"
                  alt="Man in light grey Golden Era Fresh Legacy shirt"
                  width={300}
                  height={380}
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="text-white">
                <h3 className="text-lg font-bold mb-2 text-[#cbf26c]">Golden Era Fresh Legacy - Paloma</h3>
                <p className="text-lg font-semibold">$50.00</p>
              </div>
            </div>
          </div>

          {/* Right Side - Main Image */}
          <div className="relative group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/images/men-collection.png"
                alt="Man in white long-sleeve shirt and black shorts in gym"
                width={600}
                height={800}
                className="w-full h-[900px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
