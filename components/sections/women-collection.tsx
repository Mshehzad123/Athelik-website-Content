import Image from "next/image"

export default function WomenCollection() {
  return (
    <section className="py-20 bg-[#212121]">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">WOMEN COLLECTION</h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Side - Main Image */}
          <div className="relative group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/images/women-collection-main.jpg"
                alt="Woman in pink sports bra working out with dumbbells"
                width={600}
                height={800}
                className="w-full h-[900px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            </div>
          </div>

          {/* Right Side - 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* T-Shirts & Tops */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=380&width=300"
                  alt="Two women in sports bras and leggings"
                  width={300}
                  height={380}
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="text-white">
                <h3 className="text-lg font-bold mb-2 uppercase text-[#cbf26c]">T-Shirts & Tops</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Get ready for the ultimate style and performance combo with our women's gym t-shirts.
                </p>
              </div>
            </div>

            {/* Running */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=380&width=300"
                  alt="Woman in navy athletic wear stretching"
                  width={300}
                  height={380}
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="text-white">
                <h3 className="text-lg font-bold mb-2 uppercase text-[#cbf26c]">Running</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Running stuff so good it'll (almost) make you want to do cardio.
                </p>
              </div>
            </div>

            {/* Ready for Lift(ing) Off */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=380&width=300"
                  alt="Woman in white crop top and gray shorts"
                  width={300}
                  height={380}
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
              <div className="text-white">
                <h3 className="text-lg font-bold mb-2 uppercase text-[#cbf26c]">Ready for Lift(ing) Off</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  These new rest day essentials make for perfect travel fits.
                </p>
              </div>
            </div>

            {/* Extra 30% Off Last Chance Looks */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src="/placeholder.svg?height=380&width=300"
                  alt="Woman in black sports bra"
                  width={300}
                  height={380}
                  className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                {/* Sale Badge */}
                <div className="absolute top-4 left-4 bg-[#cbf26c] text-[#212121] px-3 py-1 rounded-md font-bold text-sm">
                  30% OFF
                </div>
              </div>
              <div className="text-white">
                <h3 className="text-lg font-bold mb-2 uppercase text-[#cbf26c]">Extra 30% Off Last Chance Looks</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  This bank holiday grab your new season staples and make it the kit you wear when you hit a PB.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
