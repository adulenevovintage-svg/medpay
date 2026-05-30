import * as XLSX from 'xlsx';
import * as fs from 'fs';

try {
  const fileBuffer = fs.readFileSync('payment chart for adonay.xlsx');
  const workbook = XLSX.read(fileBuffer);
  
  console.log("=== SHEET NAMES ===");
  console.log(workbook.SheetNames);
  
  workbook.SheetNames.forEach(sheetName => {
    console.log(`\n=== SHEET: ${sheetName} ===`);
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Print first 10 rows
    console.log("First 10 rows:");
    json.slice(0, 10).forEach((row: any, i) => {
      console.log(`  Row ${i}:`, JSON.stringify(row).substring(0, 300));
    });
  });
} catch (error) {
  console.error("Error analyzing excel file:", error);
}
