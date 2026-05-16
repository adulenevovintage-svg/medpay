import { Employee, EmployeeRole, PayGrade, Specialty } from './types';

export const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Emergency',
  'Diagnostics',
  'Administration',
  'Facilities',
  'Pediatrics',
  'Radiology'
];

export const SPECIALTIES: Specialty[] = [
  'Cardiac',
  'Neurology',
  'Thoracic',
  'Radiology',
  'Emergency',
  'General',
  'Pediatrics',
  'None'
];

export const PAY_GRADES: PayGrade[] = [
  {
    id: 'D-SPECIAL-1',
    role: 'Doctor',
    specialty: 'Cardiac',
    baseSalary: 75000,
    hourlyRate: 450,
    overtimeMultiplier: 1.5,
    nightShiftAllowance: 1200,
    holidayMultiplier: 2.0,
    restDayMultiplier: 2.0
  },
  {
    id: 'D-SPECIAL-2',
    role: 'Doctor',
    specialty: 'Neurology',
    baseSalary: 72000,
    hourlyRate: 430,
    overtimeMultiplier: 1.5,
    nightShiftAllowance: 1100,
    holidayMultiplier: 2.0,
    restDayMultiplier: 2.0
  },
  {
    id: 'N-GENERAL-1',
    role: 'Nurse',
    specialty: 'General',
    baseSalary: 28000,
    hourlyRate: 180,
    overtimeMultiplier: 1.5,
    nightShiftAllowance: 500,
    holidayMultiplier: 2.0,
    restDayMultiplier: 2.0
  },
  {
    id: 'L-TECH-1',
    role: 'Laboratorist',
    specialty: 'None',
    baseSalary: 24000,
    hourlyRate: 150,
    overtimeMultiplier: 1.5,
    nightShiftAllowance: 400,
    holidayMultiplier: 1.5,
    restDayMultiplier: 1.5
  },
  {
    id: 'C-CLEAN-1',
    role: 'Cleaner',
    specialty: 'None',
    baseSalary: 12000,
    hourlyRate: 80,
    overtimeMultiplier: 1.25,
    nightShiftAllowance: 200,
    holidayMultiplier: 1.5,
    restDayMultiplier: 1.5
  },
  {
    id: 'A-CLERK-1',
    role: 'Clerk',
    specialty: 'None',
    baseSalary: 18000,
    hourlyRate: 120,
    overtimeMultiplier: 1.5,
    nightShiftAllowance: 0,
    holidayMultiplier: 1.5,
    restDayMultiplier: 1.5
  }
];

export const generateMockEmployees = (count: number): Employee[] => {
  const roles: EmployeeRole[] = ['Doctor', 'Nurse', 'Laboratorist', 'Clerk', 'Cleaner'];
  const firstNames = ['Abebe', 'Kebede', 'Almaz', 'Tigist', 'Dawit', 'Elias', 'Hanna', 'Marta', 'Solomon', 'Yonas', 'Zelalem', 'Lidet', 'Bruke', 'Fitsum', 'Rahel'];
  const lastNames = ['Bekele', 'Tesfaye', 'Girma', 'Tadesse', 'Wolde', 'Kassa', 'Alemu', 'Desta', 'Haile', 'Mamo', 'Mengistu', 'Adera', 'Zewde', 'Worku', 'Negash'];

  return Array.from({ length: count }, (_, i) => {
    const role = roles[Math.floor(Math.random() * roles.length)];
    const dept = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
    const specialty = role === 'Doctor' ? SPECIALTIES[Math.floor(Math.random() * (SPECIALTIES.length - 1))] : 'None';
    
    // Find matching pay grade or default
    const payGrade = PAY_GRADES.find(pg => pg.role === role && pg.specialty === specialty) || 
                     PAY_GRADES.find(pg => pg.role === role) || 
                     PAY_GRADES[PAY_GRADES.length - 1];

    return {
      id: `EMP-${1000 + i}`,
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      role,
      specialty,
      subSpecialty: role === 'Doctor' ? 'Specialist' : undefined,
      department: dept,
      payGradeId: payGrade.id,
      joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), 1).toISOString().split('T')[0]
    };
  });
};
