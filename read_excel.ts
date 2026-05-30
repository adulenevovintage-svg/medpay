import * as XLSX from 'xlsx';
import * as fs from 'fs';

try {
  const fileBuffer = fs.readFileSync('payment chart for adonay.xlsx');
  const workbook = XLSX.read(fileBuffer);
  
  const result: any = {};
  workbook.SheetNames.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    result[sheetName] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
  });
  
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error("Error reading excel file:", error);
}
