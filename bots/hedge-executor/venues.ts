export async function executeHedge(venue: string, hedgeRatio: number) {
  // TODO: Replace with real API calls to venue perps
  console.log(`🛠️ Executing ${hedgeRatio}% hedge on ${venue}...`);

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulate success
  console.log(`✅ Hedge executed on ${venue}`);
}
