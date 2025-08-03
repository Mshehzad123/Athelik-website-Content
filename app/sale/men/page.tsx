"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

// Custom CSS for radio buttons
const radioButtonStyles = `
  .custom-radio {
    appearance: none;
    width: 16px;
    height: 16px;
    border: 2px solid #9ca3af;
    border-radius: 50%;
    margin-right: 12px;
    position: relative;
    cursor: pointer;
  }
  
  .custom-radio:checked {
    background-color: white;
    border-color: white;
  }
  
  .custom-radio:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background-color: #1f2937;
    border-radius: 50%;
  }
`

export default function MenSalePage() {
  const [sortBy, setSortBy] = useState("Relevancy")
  const [expandedSections, setExpandedSections] = useState({
    sortBy: false,
    productType: false,
    size: false,
    features: false,
    fit: false,
    activity: false,
    collection: false,
    color: false,
    pattern: false,
    discount: false,
    price: false
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }))
  }

  return (
    <div className="min-h-screen bg-[#212121]">
      <style dangerouslySetInnerHTML={{ __html: radioButtonStyles }} />
      <Header />
      
      {/* Header Section */}
      <div className="flex flex-col items-start w-470px h-36px top-334px left-64px px-8 py-6 ml-8">
  <h1 className="text-white text-4xl font-bold">Mens Best Sellers</h1>
        <p className="text-white">Comfortable, reliable, and loved by gym lovers.</p>
      </div>


<div className="flex flex-row justify-between items-center gap-4 px-8 py-12 w-full">
    <div className="flex flex-col items-center p-0 flex-1">
        <div className="w-48 h-64 rounded-lg overflow-hidden flex items-center justify-center">
            <img src="/images/WomenBestSellers/1.png" alt="EVERYDAY SEAMLESS LEGGINGS" className="w-full h-full object-cover" />
        </div>
        <p className="text-white text-sm mt-2 text-center">EVERYDAY SEAMLESS LEGGINGS</p>
    </div>
    
    <div className="flex flex-col items-center p-0 flex-1">
        <div className="w-48 h-64 rounded-lg overflow-hidden flex items-center justify-center">
            <img src="/images/WomenBestSellers/1.png" alt="EVERYDAY SEAMLESS LEGGINGS" className="w-full h-full object-cover" />
        </div>
        <p className="text-white text-sm mt-2 text-center">EVERYDAY SEAMLESS LEGGINGS</p>
    </div>
    
    <div className="flex flex-col items-center p-0 flex-1">
        <div className="w-48 h-64 rounded-lg overflow-hidden flex items-center justify-center">
            <img src="/images/WomenBestSellers/1.png" alt="EVERYDAY SEAMLESS LEGGINGS" className="w-full h-full object-cover" />
        </div>
        <p className="text-white text-sm mt-2 text-center">EVERYDAY SEAMLESS LEGGINGS</p>
    </div>
    
    <div className="flex flex-col items-center p-0 flex-1">
        <div className="w-48 h-64 rounded-lg overflow-hidden flex items-center justify-center">
            <img src="/images/WomenBestSellers/1.png" alt="EVERYDAY SEAMLESS LEGGINGS" className="w-full h-full object-cover" />
        </div>
        <p className="text-white text-sm mt-2 text-center">EVERYDAY SEAMLESS LEGGINGS</p>
    </div>
    
    <div className="flex flex-col items-center p-0 flex-1">
        <div className="w-48 h-64 rounded-lg overflow-hidden flex items-center justify-center">
            <img src="/images/WomenBestSellers/1.png" alt="EVERYDAY SEAMLESS LEGGINGS" className="w-full h-full object-cover" />
        </div>
        <p className="text-white text-sm mt-2 text-center">EVERYDAY SEAMLESS LEGGINGS</p>
    </div>
    
    <div className="flex flex-col items-center p-0 flex-1">
        <div className="w-48 h-64 rounded-lg overflow-hidden flex items-center justify-center">
            <img src="/images/WomenBestSellers/1.png" alt="EVERYDAY SEAMLESS LEGGINGS" className="w-full h-full object-cover" />
        </div>
        <p className="text-white text-sm mt-2 text-center">EVERYDAY SEAMLESS LEGGINGS</p>
    </div>
</div>

      {/* Main Content with Sidebar and Products */}
      <div className="flex flex-row gap-px px-8 pb-12">
        {/* Sidebar */}
        <div className="w-64 bg-[#212121] p-6 rounded-lg h-fit sticky top-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-xl font-bold">BEST SELLERS</h2>
            <span className="text-white text-sm">WOMEN</span>
 </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">FILTER & SORT</h3>
              <button className="text-blue-400 text-sm hover:underline">Clear All</button>
            </div>
          </div>

          {/* Filter Categories */}
          <div className="space-y-4">
            {/* SORT BY Section */}
            <div className="border-b border-gray-700 pb-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('sortBy')}
              >
                <span className="text-white font-medium">SORT BY</span>
                <span className="text-white text-lg font-bold">
                  {expandedSections.sortBy ? '⌃' : '⌵'}
                </span>
              </div>
              {expandedSections.sortBy && (
                <div className="mt-3 space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sortBy"
                      value="Price: Low to High"
                      checked={sortBy === "Price: Low to High"}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="custom-radio"
                    />
                    <span className={`text-sm ${sortBy === "Price: Low to High" ? "text-white" : "text-gray-300"}`}>
                      Price: Low to High
                    </span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sortBy"
                      value="Price: High to Low"
                      checked={sortBy === "Price: High to Low"}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="custom-radio"
                    />
                    <span className={`text-sm ${sortBy === "Price: High to Low" ? "text-white" : "text-gray-300"}`}>
                      Price: High to Low
                    </span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sortBy"
                      value="Relevancy"
                      checked={sortBy === "Relevancy"}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="custom-radio"
                    />
                    <span className={`text-sm ${sortBy === "Relevancy" ? "text-white" : "text-gray-300"}`}>
                      Relevancy
                    </span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sortBy"
                      value="Newest"
                      checked={sortBy === "Newest"}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="custom-radio"
                    />
                    <span className={`text-sm ${sortBy === "Newest" ? "text-white" : "text-gray-300"}`}>
                      Newest
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* PRODUCT TYPE Section */}
            <div className="border-b border-gray-700 pb-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('productType')}
              >
                <span className="text-white font-medium">PRODUCT TYPE</span>
                <span className="text-white text-lg font-bold">
                  {expandedSections.productType ? '⌄' : '⌵'}
                </span>
              </div>
            </div>

            {/* SIZE Section */}
            <div className="border-b border-gray-700 pb-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('size')}
              >
                <span className="text-white font-medium">SIZE</span>
                <span className="text-white text-lg font-bold">
                  {expandedSections.size ? '⌄' : '⌵'}
                </span>
              </div>
            </div>

            {/* FEATURES Section */}
            <div className="border-b border-gray-700 pb-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('features')}
              >
                <span className="text-white font-medium">FEATURES</span>
                <span className="text-white text-lg font-bold">
                  {expandedSections.features ? '^' : '⌵'}
                </span>
              </div>
            </div>

            {/* FIT Section */}
            <div className="border-b border-gray-700 pb-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('fit')}
              >
                <span className="text-white font-medium">FIT</span>
                <span className="text-white text-lg font-bold">
                  {expandedSections.fit ? '^' : '⌵'}
                </span>
              </div>
            </div>

            {/* ACTIVITY Section */}
            <div className="border-b border-gray-700 pb-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('activity')}
              >
                <span className="text-white font-medium">ACTIVITY</span>
                <span className="text-white text-lg font-bold">
                  {expandedSections.activity ? '^' : '⌵'}
                </span>
              </div>
            </div>

            {/* COLLECTION Section */}
            <div className="border-b border-gray-700 pb-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('collection')}
              >
                <span className="text-white font-medium">COLLECTION</span>
                <span className="text-white text-lg font-bold">
                  {expandedSections.collection ? '^' : '⌵'}
                </span>
              </div>
            </div>

            {/* COLOR Section */}
            <div className="border-b border-gray-700 pb-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('color')}
              >
                <span className="text-white font-medium">COLOR</span>
                <span className="text-white text-lg font-bold">
                  {expandedSections.color ? '^' : '⌵'}
                </span>
              </div>
            </div>

            {/* PATTERN Section */}
            <div className="border-b border-gray-700 pb-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('pattern')}
              >
                <span className="text-white font-medium">PATTERN</span>
                <span className="text-white text-lg font-bold">
                  {expandedSections.pattern ? '^' : '⌵'}
                </span>
              </div>
            </div>

            {/* DISCOUNT Section */}
            <div className="border-b border-gray-700 pb-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('discount')}
              >
                <span className="text-white font-medium">DISCOUNT</span>
                <span className="text-white text-lg font-bold">
                  {expandedSections.discount ? '^' : '⌵'}
                </span>
              </div>
            </div>

            {/* PRICE Section */}
            <div className="border-b border-gray-700 pb-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('price')}
              >
                <span className="text-white font-medium">PRICE</span>
                <span className="text-white text-lg font-bold">
                  {expandedSections.price ? '^' : '⌵'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-5 gap-1
          ">
            {/* Product 1 */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/1.png" alt="Vital Seamless Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Vital Seamless Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.5</span>
                </div>
              </div>
              <p className="text-white font-bold">$54</p>
            </div>

            {/* Product 2 */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/2.png" alt="Training Oversized T-Shirt" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Training Oversized T-Shirt</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <p className="text-white font-bold">$34</p>
            </div>

            {/* Product 3 */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/3.png" alt="Flared Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Flared Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.7</span>
                </div>
              </div>
              <p className="text-white font-bold">$48</p>
            </div>

            {/* Product 4 */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/4.png" alt="Seamless Sports Bra" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Seamless Sports Bra</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.4</span>
                </div>
              </div>
              <p className="text-white font-bold">$32</p>
            </div>

            {/* Product 5 */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/5.png" alt="Athletic Jumpsuit" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Athletic Jumpsuit</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.8</span>
                </div>
              </div>
              <p className="text-white font-bold">$68</p>
            </div>

            {/* Product 6 */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/6.png" alt="High-Waist Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">High-Waist Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <p className="text-white font-bold">$52</p>
            </div>

            {/* Product 7 */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/7.png" alt="Cropped Tank Top" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Cropped Tank Top</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.5</span>
                </div>
              </div>
              <p className="text-white font-bold">$28</p>
            </div>

            {/* Product 8 */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/8.png" alt="Compression Shorts" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Compression Shorts</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.3</span>
                </div>
              </div>
              <p className="text-white font-bold">$36</p>
            </div>

            {/* Product 9 */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/9.png" alt="Performance Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Performance Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.7</span>
                </div>
              </div>
              <p className="text-white font-bold">$56</p>
            </div>

            {/* Product 10 */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/10.png" alt="Athletic Hoodie" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Athletic Hoodie</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.4</span>
                </div>
              </div>
              <p className="text-white font-bold">$42</p>
            </div>
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/10.png" alt="Athletic Hoodie" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Athletic Hoodie</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.4</span>
                </div>
              </div>
              <p className="text-white font-bold">$42</p>
            </div>
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/10.png" alt="Athletic Hoodie" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Athletic Hoodie</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.4</span>
                </div>
              </div>
              <p className="text-white font-bold">$42</p>
            </div>
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/10.png" alt="Athletic Hoodie" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Athletic Hoodie</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.4</span>
                </div>
              </div>
              <p className="text-white font-bold">$42</p>
            </div>
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/10.png" alt="Athletic Hoodie" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Athletic Hoodie</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.4</span>
                </div>
              </div>
              <p className="text-white font-bold">$42</p>
            </div>
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/10.png" alt="Athletic Hoodie" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Athletic Hoodie</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.4</span>
                </div>
              </div>
              <p className="text-white font-bold">$42</p>
            </div>

            {/* Product 11 - Second Row */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/11.png" alt="Performance Tank Top" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Performance Tank Top</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <p className="text-white font-bold">$38</p>
            </div>

            {/* Product 12 */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/12.png" alt="Seamless Shorts" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Seamless Shorts</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.5</span>
                </div>
              </div>
              <p className="text-white font-bold">$44</p>
            </div>

            {/* Product 13 */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/13.png" alt="Athletic Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Athletic Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.7</span>
                </div>
              </div>
              <p className="text-white font-bold">$58</p>
            </div>

            {/* Product 14 */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/14.png" alt="Training Bra" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Training Bra</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.4</span>
                </div>
              </div>
              <p className="text-white font-bold">$36</p>
            </div>

            {/* Product 15 */}
            <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/15.png" alt="Athletic Jumpsuit" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">Athletic Jumpsuit</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.8</span>
                </div>
              </div>
              <p className="text-white font-bold">$72</p>
            </div>
          </div>
        </div>
      </div>

           {/* Large Banner Section */}
           <div className="w-full px-8 py-12">
        <div className="w-full h-auto max-w-full">
          <img 
            src="/images\WomenBestSellers\large2.png.png" 
            alt="Women's Best Sellers Banner" 
            className="w-full h-auto object-cover rounded-lg"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>


             {/* Bundle Section */}
       <div className="w-full px-4 sm:px-6 py-8 lg:py-10 bg-[#212121]">
         <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
           {/* BUNDLE-01 */}
           <div className="w-full lg:w-[40%] bg-[#1a1a1a] rounded-lg p-4 lg:p-6">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#CBF26C' }}>BUNDLE-01</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-6">
              {/* Product 1 */}
              <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/6.png" alt="High-Waist Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">High-Waist Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <p className="text-white font-bold">$52</p>
            </div>
              {/* Product 2 */}
              <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/6.png" alt="High-Waist Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">High-Waist Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <p className="text-white font-bold">$52</p>
            </div>
              {/* Product 3 */}
              <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/6.png" alt="High-Waist Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">High-Waist Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <p className="text-white font-bold">$52</p>
            </div>

              {/* Product 4 */}
              <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/6.png" alt="High-Waist Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">High-Waist Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <p className="text-white font-bold">$52</p>
            </div>
            </div>

            {/* Savings Bar */}
            <div className="rounded-lg p-4 text-center" style={{ backgroundColor: '#CBF26C' }}>
              <span className="font-bold text-lg text-black">SAVE $45</span>
            </div>
          </div>

                     {/* BUNDLE-02 */}
           <div className="w-full lg:w-[60%] bg-[#1a1a1a] rounded-lg p-4 lg:p-6">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#CBF26C' }}>BUNDLE-02</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3 mb-6">
              {/* Product 1 */}
              <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/6.png" alt="High-Waist Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">High-Waist Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <p className="text-white font-bold">$52</p>
            </div>

              {/* Product 2 */}
              <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/6.png" alt="High-Waist Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">High-Waist Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <p className="text-white font-bold">$52</p>
            </div>

              {/* Product 3 */}
              <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/6.png" alt="High-Waist Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">High-Waist Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <p className="text-white font-bold">$52</p>
            </div>

              {/* Product 4 */}
              <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/6.png" alt="High-Waist Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">High-Waist Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <p className="text-white font-bold">$52</p>
            </div>

              {/* Product 5 */}
              <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/6.png" alt="High-Waist Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">High-Waist Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <p className="text-white font-bold">$52</p>
            </div>

              {/* Product 6 */}
              <div className=" rounded-lg p-0">
              <img src="/images/WomenBestSellers/6.png" alt="High-Waist Leggings" className="w-full h-64 object-cover rounded-lg mb-3" />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium text-sm">High-Waist Leggings</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm ml-1">4.6</span>
                </div>
              </div>
              <p className="text-white font-bold">$52</p>
            </div>
            </div>
            {/* Savings Bar */}
            <div className="rounded-lg p-4 text-center" style={{ backgroundColor: '#CBF26C' }}>
              <span className="font-bold text-lg text-black">SAVE $60</span>
            </div>
          </div>
        </div>
      </div>

 
      <Footer />
    </div>
  )
} 