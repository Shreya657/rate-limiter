const { ShieldLimit } = require("@esbi/shieldlimit");

async function runTest() {
  // 1. Initialize with your API Key from the Dashboard
  const shield = new ShieldLimit("la_cbe813cffd5a01192d6db9ef917411a2aba05b8ff92752bb", {
    baseUrl: "http://localhost:3000/api/v1" 
  });

  console.log("🛡️ Starting ShieldLimit Test...");

  // 2. Run a loop to test Rate Limiting
  for (let i = 1; i <= 109; i++) {
    const result = await shield.verify();

    if (result.success) {
      console.log(`✅ Request ${i}: Success! Remaining: ${result.remaining}`);
    } else {
      console.log(`❌ Request ${i}: Failed! Error: ${result.error}`);
      console.log(`⏳ Retry after: ${result.retryAfter}s`);
    }
  }
}

runTest();