import { saveFile, getFilePath } from "./storage";

// Simple test to verify storage functions work
async function testStorage() {
  console.log("Testing storage functions...");
  
  // Test saveFile
  const testBuffer = Buffer.from("Hello, this is a test file!");
  const result = await saveFile(testBuffer, "test.txt");
  
  console.log("✅ File saved:", result);
  console.log("  - ID:", result.id);
  console.log("  - URI:", result.uri);
  console.log("  - Path:", result.path);
  
  // Test getFilePath
  const filePath = await getFilePath(result.id, ".txt");
  console.log("✅ File path retrieved:", filePath);
  
  console.log("All storage tests passed!");
}

// Run test if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testStorage().catch(console.error);
}
