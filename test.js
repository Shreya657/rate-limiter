const { ShieldLimit } = require("@esbi/shieldlimit");
  const shield = new ShieldLimit("la_cbe813cffd5a01192d6db9ef917411a2aba05b8ff92752bb");

// async function runTest() {
//   // 1. Initialize with your API Key from the Dashboard

//   console.log("🛡️ Starting ShieldLimit Test...");

//   // 2. Run a loop to test Rate Limiting
//   for (let i = 1; i <= 109; i++) {
//     const result = await shield.verify();

//     if (result.success) {
//       console.log(`✅ Request ${i}: Success! Remaining: ${result.remaining}`);
//     } else {
//       console.log(`❌ Request ${i}: Failed! Error: ${result.error}`);
//       console.log(`⏳ Retry after: ${result.retryAfter}s`);
//     }
//   }
// }


async function runTest() {
  console.log("🛡️ Starting Live Concurrent ShieldLimit Test...");

  // Create an array of 120 verification promises firing at the exact same time
  const promises = Array.from({ length: 120 }, () => shield.verify());

  // Execute them all in parallel
  const results = await Promise.all(promises);

  results.forEach((result, i) => {
    if (result.success) {
      console.log(`✅ Request ${i + 1}: Success! Remaining: ${result.remaining}`);
    } else {
      console.log(`❌ Request ${i + 1}: Failed! Error: ${result.error} | Retry: ${result.retryAfter}s`);
    }
  });
}

runTest();