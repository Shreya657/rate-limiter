import { ShieldLimit } from "@esbi/shieldlimit";

// Use your actual API Key from your database
const apiKey = "la_cbe813cffd5a01192d6db9ef917411a2aba05b8ff92752bb";

// Even though it's an NPM package, since you are developing locally,
// you MUST point it to your local server so it hits your Redis.
const shield = new ShieldLimit(apiKey, {
  baseUrl: "http://localhost:3000/api/v1" 
});

async function runTest() {
  console.log("🛡️ Initializing ShieldLimit Stress Test...");

  // We will send 110 requests. 
  // Since your limit is 100, we expect 100 Successes and 10 Blocks.
  for (let i = 0; i < 110; i++) {
    const res = await shield.verify();
    
    if (res.success) {
      console.log(`[${i+1}] ✅ Request Allowed. Remaining: ${res.remaining}`);
    } else {
      console.log(`[${i+1}] ❌ Rate Limit Hit: ${res.error}`);
    }

    // Optional: add a tiny delay so you can watch it happen
    // await new Promise(r => setTimeout(r, 10)); 
  }

  console.log("\n✨ Test Complete! Refresh your Usage Stats page.");
}

runTest();