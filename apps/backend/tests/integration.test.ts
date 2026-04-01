import fs from "node:fs";
import path from "node:path";

const API_URL = "http://localhost:3000/api";
const LOG_DIR = path.join(process.cwd(), "tests", "logs");
const LOG_FILE = path.join(LOG_DIR, `test-dual-${new Date().toISOString().replace(/:/g, '-')}.log`);

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function log(message: string) {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] ${message}\n`;
  console.log(message);
  fs.appendFileSync(LOG_FILE, formattedMessage);
}

async function performAnalysis(token: string, provider: 'google' | 'ollama') {
  log(`\n--- Testing Provider: ${provider.toUpperCase()} ---`);
  
  const response = await fetch(`${API_URL}/analisis`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ preferredProvider: provider })
  });

  if (!response.ok) {
    const errorText = await response.text();
    log(`[ERROR] ${provider} failed with status ${response.status}: ${errorText}`);
    return null;
  }

  const data = await response.json();
  log(`[SUCCESS] ${provider} responded:`);
  log(JSON.stringify(data, null, 2));
  return data;
}

async function runTest() {
  log("Starting Dual Provider Backend Test...");

  try {
    // 1. Login
    log("Step 1: Logging in as Admin...");
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: "admin@tatachio.com",
        password: "admin123",
      })
    });
    
    if (!loginRes.ok) {
      throw new Error(`Login failed with status ${loginRes.status}`);
    }

    const { token } = await loginRes.json() as { token: string };
    log("Login successful.");

    // 2. Test Google
    await performAnalysis(token, 'google');

    // 3. Test Ollama
    await performAnalysis(token, 'ollama');

    log("\nDUAL TEST COMPLETED");
  } catch (error: any) {
    log(`\n[FATAL ERROR] ${error.message}`);
    process.exit(1);
  }
}

runTest();
