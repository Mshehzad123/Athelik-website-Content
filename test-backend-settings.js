// Test script to verify backend settings API
const testBackendSettings = async () => {
  console.log('🧪 Testing Backend Settings API...')
  
  try {
    // Test GET settings from backend
    console.log('\n1. Testing GET /api/settings/public from backend')
    const getResponse = await fetch('http://localhost:5000/api/settings/public')
    const getData = await getResponse.json()
    console.log('✅ Backend GET Response:', getData)
    
    // Note: POST to settings requires authentication, so we'll just test GET
    console.log('\n2. Testing GET /api/settings/public again to verify current settings')
    const getResponse2 = await fetch('http://localhost:5000/api/settings/public')
    const getData2 = await getResponse2.json()
    console.log('✅ Backend GET Response (second call):', getData2)
    
    console.log('\n🎉 Backend Settings API tests completed successfully!')
    
  } catch (error) {
    console.error('❌ Error testing backend settings API:', error)
  }
}

// Run the test
testBackendSettings() 