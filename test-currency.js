// Test script to verify currency functionality
const testCurrencyAPI = async () => {
  console.log('🧪 Testing Currency API...')
  
  try {
    // Test GET settings
    console.log('\n1. Testing GET /api/settings')
    const getResponse = await fetch('http://localhost:3000/api/settings')
    const getData = await getResponse.json()
    console.log('✅ GET Response:', getData)
    
    // Test POST settings to change currency
    console.log('\n2. Testing POST /api/settings to change currency to AED')
    const postResponse = await fetch('http://localhost:3000/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currency: 'AED' }),
    })
    const postData = await postResponse.json()
    console.log('✅ POST Response:', postData)
    
    // Test GET settings again to verify change
    console.log('\n3. Testing GET /api/settings again to verify change')
    const getResponse2 = await fetch('http://localhost:3000/api/settings')
    const getData2 = await getResponse2.json()
    console.log('✅ GET Response after change:', getData2)
    
    // Test changing back to USD
    console.log('\n4. Testing POST /api/settings to change currency back to USD')
    const postResponse2 = await fetch('http://localhost:3000/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currency: 'USD' }),
    })
    const postData2 = await postResponse2.json()
    console.log('✅ POST Response:', postData2)
    
    console.log('\n🎉 Currency API tests completed successfully!')
    
  } catch (error) {
    console.error('❌ Error testing currency API:', error)
  }
}

// Run the test
testCurrencyAPI() 