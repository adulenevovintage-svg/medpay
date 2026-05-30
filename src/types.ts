
export type EmployeeRole = 'Doctor' | 'Nurse' | 'Laboratorist' | 'Technician' | 'Clerk' | 'Cleaner' | 'Admin' | 'Security' | 'Maintenance' | 'Other';

export type Specialty = 
  | 'Neurology' 
  | 'Surgery' 
  | 'Pediatrics' 
  | 'Radiology' 
  | 'General' 
  | 'Nursing'
  | 'Laboratory'
  | 'Physiotherapy'
  | 'Dental'
  | 'Anesthesia'
  | 'Health Officer'
  | 'Radiographer'
  | 'Other'
  | 'None';

export interface PayGrade {
  id: string;
  role: EmployeeRole;
  specialty: Specialty;
  baseSalary: number;
  hourlyRate: number;
  overtimeMultiplier: number; // e.g., 1.5
  nightShiftAllowance: number; // Flat fee or multiplier
  holidayMultiplier: number; // e.g., 2.0
  restDayMultiplier: number; // e.g., 2.0
}

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  specialty: Specialty;
  subSpecialty?: string;
  department: string;
  payGradeId: string;
  joinDate: string;
  baseSalary?: number; // Override pay grade base if needed
  headshipAllowance?: number;
}

export interface MonthlyWorkLog {
  id: string;
  employeeId: string;
  month: number; // 0-11
  year: number;
  parameters: Record<string, number>;
  status: 'Draft' | 'Approved' | 'Paid';
}

export interface SalaryCalculation {
  basePay: number;
  parametersTotal: number;
  totalGross: number;
  deductions: number;
  pensionContribution: number;
  incomeTax: number;
  totalNet: number;
}
