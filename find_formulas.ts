import * as XLSX from 'xlsx';
import * as fs from 'fs';

const fileBuffer = fs.readFileSync('payment chart for adonay.xlsx');
const workbook = XLSX.read(fileBuffer);

workbook.SheetNames.forEach(sheetName => {
  console.log(`\n========================================`);
  console.log(`SHEET: ${sheetName}`);
  console.log(`========================================`);
  const worksheet = workbook.Sheets[sheetName];
  
  // Find the dimensions of the sheet
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:A1');
  
  // Let's print out the row labels (Column A / cell info)
  console.log("Row Names (Column A):");
  const rowLabels: string[] = [];
  for (let r = range.s.r; r <= range.e.r; r++) {
    const cellRef = XLSX.utils.encode_cell({ r, c: 0 });
    const cell = worksheet[cellRef];
    const val = cell ? cell.v : '';
    console.log(`  Row ${r}: ${val}`);
    rowLabels.push(String(val).trim());
  }

  // Let's find some columns that represent employees and inspect their formulas
  // Wait, let's print cell info for columns B (index 1) and C (index 2)
  console.log("\nSample Employee Column B and C Formulas/Values:");
  for (let r = range.s.r; r <= range.e.r; r++) {
    const valA = rowLabels[r] || '';
    const cellRefB = XLSX.utils.encode_cell({ r, c: 1 });
    const cellRefC = XLSX.utils.encode_cell({ r, c: 2 });
    
    const cellB = worksheet[cellRefB];
    const cellC = worksheet[cellRefC];
    
    const bStr = cellB ? (cellB.f ? `F: =${cellB.f}` : `V: ${cellB.v}`) : 'empty';
    const cStr = cellC ? (cellC.f ? `F: =${cellC.f}` : `V: ${cellC.v}`) : 'empty';
    
    if (cellB || cellC) {
      console.log(`  Row ${r} (${valA}): Col B -> ${bStr} | Col C -> ${cStr}`);
    }
  }
});
