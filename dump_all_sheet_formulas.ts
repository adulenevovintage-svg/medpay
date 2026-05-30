import * as XLSX from 'xlsx';
import * as fs from 'fs';

const fileBuffer = fs.readFileSync('payment chart for adonay.xlsx');
const workbook = XLSX.read(fileBuffer);

const output: any = {};

workbook.SheetNames.forEach(sheetName => {
  const worksheet = workbook.Sheets[sheetName];
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:A1');
  const sheetRows: any[] = [];
  
  // We'll read first few employees to find the exact formulas
  for (let r = range.s.r; r <= range.e.r; r++) {
    const labelCell = worksheet[XLSX.utils.encode_cell({ r, c: 0 })];
    const label = labelCell ? String(labelCell.v).trim() : '';
    
    // Look for formulas or values across the first couple of employee columns
    // Typically, col B (index 1) is raw input, col C (index 2) is output.
    // Sometimes there are multiple employees. Let's find columns with data
    let foundColIdxVal = -1;
    let foundColIdxFormula = -1;
    let exampleVal = '';
    let exampleFormula = '';
    
    for (let c = 1; c <= range.e.c; c++) {
      const cell = worksheet[XLSX.utils.encode_cell({ r, c })];
      if (cell) {
        if (cell.f) {
          foundColIdxFormula = c;
          exampleFormula = cell.f;
        } else if (cell.v !== undefined && cell.v !== "") {
          foundColIdxVal = c;
          exampleVal = String(cell.v);
        }
      }
    }
    
    if (label || exampleFormula || exampleVal) {
      sheetRows.push({
        rowIndex: r,
        label: label,
        exampleVal: exampleVal,
        exampleFormula: exampleFormula,
        valCol: foundColIdxVal,
        formulaCol: foundColIdxFormula
      });
    }
  }
  output[sheetName] = sheetRows;
});

fs.writeFileSync('excel_structure.json', JSON.stringify(output, null, 2));
console.log("Structure written to excel_structure.json");
