import * as fs from 'fs';

const data = JSON.parse(fs.readFileSync('excel_structure.json', 'utf8'));

Object.keys(data).forEach(sheetName => {
  console.log(`\n========================================`);
  console.log(`DEPARTMENT/SHEET: ${sheetName}`);
  console.log(`========================================`);
  
  const rows = data[sheetName];
  rows.forEach((row: any) => {
    const label = row.label || `(Row ${row.rowIndex})`;
    let details = '';
    if (row.exampleFormula) {
      details += `Formula: =${row.exampleFormula}`;
    }
    if (row.exampleVal) {
      details += details ? ` / Value: ${row.exampleVal}` : `Value: ${row.exampleVal}`;
    }
    console.log(`  - ${label.padEnd(25)} : ${details}`);
  });
});
