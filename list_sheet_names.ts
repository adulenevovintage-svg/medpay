import * as XLSX from 'xlsx';
import * as fs from 'fs';

const fileBuffer = fs.readFileSync('payment chart for adonay.xlsx');
const workbook = XLSX.read(fileBuffer);
console.log("Sheet names:", workbook.SheetNames);
