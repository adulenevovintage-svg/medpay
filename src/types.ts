
export type EmployeeRole = 'Doctor' | 'Nurse' | 'Laboratorist' | 'Clerk' | 'Cleaner' | 'Admin';

export type Specialty = 
  | 'Cardiac' 
  | 'Neurology' 
  | 'Thoracic' 
  | 'Radiology' 
  | 'Emergency' 
  | 'General' 
  | 'Pediatrics' 
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
}

export interface MonthlyWorkLog {
  id: string;
  employeeId: string;
  month: number; // 0-11
  year: number;
  regularHours: number;
  overtimeHours: number;
  nightShifts: number;
  holidaysWorked: number;
  restDaysWorked: number;
  status: 'Draft' | 'Approved' | 'Paid';
}

export interface SalaryCalculation {
  basePay: number;
  overtimePay: number;
  nightShiftPay: number;
  holidayPay: number;
  restDayPay: number;
  totalGross: number;
  deductions: number;
  totalNet: number;
}
