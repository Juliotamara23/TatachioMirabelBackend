// Testing connectivity to backend using native fetch

const API_URL = "http://localhost:3000";

async function testConnectivity() {
  console.log("Testing connectivity to backend...");

  try {
    const response = await fetch(`${API_URL}/test`);
    const text = await response.text();
    console.log("GET /test response:", text);
    
    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }
    
    const loginRes = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: "admin@tatachio.com",
        password: "admin123",
      })
    });
    
    console.log("Login status:", loginRes.status);
    const loginData = await loginRes.json();
    console.log("Login response:", JSON.stringify(loginData, null, 2));
    
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

testConnectivity();
