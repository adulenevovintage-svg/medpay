import { Employee, EmployeeRole, PayGrade, Specialty } from './types';

export const DEPARTMENTS = [
  'Internal Neurology',
  'Surgery',
  'Pediatrics Neurology',
  'Radiology',
  'General Practice',
  'Nursing',
  'OR & ICU',
  'Laboratory',
  'Physiotherapy',
  'Construction',
  'Administrative & Finance',
  'Maintenance & Support'
];

export interface ParameterConfig {
  label: string;
  multiplier: number;
  isFlat: boolean;
}

export const DEPARTMENT_PARAMETERS_CONFIG: Record<string, ParameterConfig[]> = {
  'Internal Neurology': [
    { label: "tew lab pay", multiplier: 0.02, isFlat: false },
    { label: "tew lab credit", multiplier: 0.02, isFlat: false },
    { label: "lideta lab pay", multiplier: 0.02, isFlat: false },
    { label: "lideta lab cretit", multiplier: 0.02, isFlat: false },
    { label: "card pay", multiplier: 900, isFlat: false },
    { label: "card credit", multiplier: 480, isFlat: false },
    { label: "ultrasound", multiplier: 100, isFlat: false },
    { label: "ECG", multiplier: 60, isFlat: false },
    { label: "Echo", multiplier: 200, isFlat: false },
    { label: "doppler", multiplier: 200, isFlat: false },
    { label: "xray", multiplier: 100, isFlat: false },
    { label: "Spiometry", multiplier: 100, isFlat: false },
    { label: "depo", multiplier: 600, isFlat: false },
    { label: "physiotherapy- pay", multiplier: 70, isFlat: false },
    { label: "physiotherapy-credit", multiplier: 50, isFlat: false },
    { label: "EEG send", multiplier: 200, isFlat: false },
    { label: "EEG read", multiplier: 300, isFlat: false },
    { label: "NCS one", multiplier: 500, isFlat: false },
    { label: "NCS two", multiplier: 700, isFlat: false },
    { label: "EMG one", multiplier: 1200, isFlat: false },
    { label: "EMG two", multiplier: 1400, isFlat: false },
    { label: "signature", multiplier: 200, isFlat: false },
    { label: "Evoked Potenial", multiplier: 300, isFlat: false },
    { label: "neuropsychology", multiplier: 1500, isFlat: false },
    { label: "MRI requested", multiplier: 1, isFlat: true },
    { label: "Procedure", multiplier: 1, isFlat: true },
    { label: "Assistant", multiplier: 1, isFlat: true },
    { label: "LP", multiplier: 400, isFlat: false },
    { label: "overtime", multiplier: 1, isFlat: true },
    { label: "Endoscopy", multiplier: 3500, isFlat: false },
    { label: "Colonoscopy", multiplier: 5000, isFlat: false },
    { label: "biopsy", multiplier: 3000, isFlat: false },
    { label: "salary", multiplier: 1, isFlat: true },
    { label: "Headship", multiplier: 1, isFlat: true },
    { label: "Echo pay", multiplier: 1000, isFlat: false },
    { label: "Echo credit", multiplier: 280, isFlat: false },
    { label: "0.3", multiplier: 0.3, isFlat: false },
    { label: "others (last month)", multiplier: 1, isFlat: true }
  ],
  'Surgery': [
    { label: "tew lab pay", multiplier: 0.02, isFlat: false },
    { label: "tew lab credit", multiplier: 0.02, isFlat: false },
    { label: "lideta lab pay", multiplier: 0.02, isFlat: false },
    { label: "lideta lab cretit", multiplier: 0.02, isFlat: false },
    { label: "card pay", multiplier: 900, isFlat: false },
    { label: "card credit", multiplier: 480, isFlat: false },
    { label: "ultrasound", multiplier: 100, isFlat: false },
    { label: "Echo", multiplier: 200, isFlat: false },
    { label: "doppler", multiplier: 200, isFlat: false },
    { label: "ECG", multiplier: 60, isFlat: false },
    { label: "xray", multiplier: 100, isFlat: false },
    { label: "depo", multiplier: 600, isFlat: false },
    { label: "physiotherapy- pay", multiplier: 70, isFlat: false },
    { label: "physiotherapy-credit", multiplier: 50, isFlat: false },
    { label: "EEG send", multiplier: 200, isFlat: false },
    { label: "EEG read", multiplier: 300, isFlat: false },
    { label: "MRI requested", multiplier: 1, isFlat: true },
    { label: "Evoked Potenial", multiplier: 1, isFlat: true },
    { label: "neuropsychology", multiplier: 1, isFlat: true },
    { label: "Spiometry", multiplier: 100, isFlat: false },
    { label: "Procedure", multiplier: 0.8, isFlat: false },
    { label: "Assistant", multiplier: 2000, isFlat: false },
    { label: "consult ansthsa", multiplier: 1, isFlat: true },
    { label: "headship", multiplier: 1, isFlat: true },
    { label: "Salary", multiplier: 1, isFlat: true }
  ],
  'Pediatrics Neurology': [
    { label: "tew lab pay", multiplier: 0.02, isFlat: false },
    { label: "tew lab credit", multiplier: 0.02, isFlat: false },
    { label: "lideta lab pay", multiplier: 0.02, isFlat: false },
    { label: "lideta lab cretit", multiplier: 0.02, isFlat: false },
    { label: "card pay", multiplier: 900, isFlat: false },
    { label: "card credit", multiplier: 480, isFlat: false },
    { label: "ultrasound", multiplier: 100, isFlat: false },
    { label: "Echo", multiplier: 200, isFlat: false },
    { label: "doppler", multiplier: 200, isFlat: false },
    { label: "ECG", multiplier: 60, isFlat: false },
    { label: "xray", multiplier: 100, isFlat: false },
    { label: "depo", multiplier: 600, isFlat: false },
    { label: "physiotherapy- pay", multiplier: 70, isFlat: false },
    { label: "physiotherapy-credit", multiplier: 50, isFlat: false },
    { label: "EEG send", multiplier: 200, isFlat: false },
    { label: "EEG read", multiplier: 300, isFlat: false },
    { label: "MRI requested", multiplier: 1, isFlat: true }
  ],
  'Radiology': [
    { label: "MRI total", multiplier: 1, isFlat: true },
    { label: "ultrasound pay", multiplier: 280, isFlat: false },
    { label: "ultrasound credit", multiplier: 200, isFlat: false },
    { label: "Doppler pay", multiplier: 600, isFlat: false },
    { label: "Doppler Credit", multiplier: 280, isFlat: false },
    { label: "Xray pay", multiplier: 20, isFlat: false },
    { label: "Xray credit", multiplier: 20, isFlat: false },
    { label: "ECHO pay", multiplier: 20, isFlat: false },
    { label: "ECHO credit", multiplier: 20, isFlat: false }
  ],
  'General Practice': [
    { label: "NCS one", multiplier: 250, isFlat: false },
    { label: "NCS two", multiplier: 350, isFlat: false },
    { label: "EMG one", multiplier: 250, isFlat: false },
    { label: "EMG two", multiplier: 350, isFlat: false },
    { label: "signature", multiplier: 200, isFlat: false },
    { label: "Evoked Potenial", multiplier: 1, isFlat: true },
    { label: "neuropsychology", multiplier: 1, isFlat: true },
    { label: "Spiometry", multiplier: 100, isFlat: false },
    { label: "Procedure", multiplier: 1, isFlat: true },
    { label: "Assistant", multiplier: 1, isFlat: true },
    { label: "card", multiplier: 40, isFlat: false },
    { label: "LP", multiplier: 200, isFlat: false },
    { label: "Salary basic", multiplier: 1, isFlat: true },
    { label: "Salary Net", multiplier: 1, isFlat: true }
  ],
  'Nursing': [
    { label: "Vital sign", multiplier: 10, isFlat: false },
    { label: "EKG", multiplier: 60, isFlat: false },
    { label: "U/S Echo/ doppler", multiplier: 40, isFlat: false },
    { label: "Spirometry", multiplier: 100, isFlat: false },
    { label: "Endoscopy", multiplier: 500, isFlat: false },
    { label: "LP", multiplier: 200, isFlat: false },
    { label: "Xray", multiplier: 70, isFlat: false },
    { label: "EEG", multiplier: 1, isFlat: true },
    { label: "MRI", multiplier: 1, isFlat: true },
    { label: "Night Duty", multiplier: 1, isFlat: true },
    { label: "overtime", multiplier: 1, isFlat: true },
    { label: "Headship", multiplier: 1, isFlat: true },
    { label: "OR", multiplier: 1, isFlat: true },
    { label: "Salary net", multiplier: 1, isFlat: true },
    { label: "Salary Gross", multiplier: 1, isFlat: true },
    { label: "0.3", multiplier: 0.3, isFlat: false },
    { label: "evoked", multiplier: 1, isFlat: true },
    { label: "c-arm", multiplier: 100, isFlat: false },
    { label: "x-ray", multiplier: 1, isFlat: true },
    { label: "deductable", multiplier: 1, isFlat: true }
  ],
  'OR & ICU': [
    { label: "OR", multiplier: 1, isFlat: true },
    { label: "Vital sign", multiplier: 10, isFlat: false },
    { label: "EKG", multiplier: 60, isFlat: false },
    { label: "U/S Echo/ doppler", multiplier: 40, isFlat: false },
    { label: "Spirometry", multiplier: 100, isFlat: false },
    { label: "EEG", multiplier: 10, isFlat: false },
    { label: "MRI", multiplier: 10, isFlat: false },
    { label: "Night Duty", multiplier: 1, isFlat: true },
    { label: "overtime", multiplier: 1, isFlat: true },
    { label: "Headship", multiplier: 1, isFlat: true },
    { label: "Salary Gross", multiplier: 1, isFlat: true },
    { label: "Salary net", multiplier: 1, isFlat: true },
    { label: "Xray", multiplier: 10, isFlat: false },
    { label: "ICU", multiplier: 1, isFlat: true },
    { label: "MRI sedation", multiplier: 100, isFlat: false },
    { label: "0.3", multiplier: 0.3, isFlat: false },
    { label: "other ( last month)", multiplier: 1, isFlat: true }
  ],
  'Laboratory': [
    { label: "OR", multiplier: 1, isFlat: true },
    { label: "Night Duty", multiplier: 600, isFlat: false },
    { label: "Evening Duty", multiplier: 400, isFlat: false },
    { label: "Sunday", multiplier: 1, isFlat: true },
    { label: "Holiday", multiplier: 1, isFlat: true },
    { label: "topup", multiplier: 0.2, isFlat: false },
    { label: "salary net", multiplier: 1, isFlat: true },
    { label: "Salary Basic", multiplier: 1, isFlat: true },
    { label: "Headship", multiplier: 1, isFlat: true }
  ],
  'Physiotherapy': [
    { label: "OR", multiplier: 1, isFlat: true },
    { label: "Night Duty", multiplier: 600, isFlat: false },
    { label: "Evening Duty", multiplier: 400, isFlat: false },
    { label: "Sunday", multiplier: 1, isFlat: true },
    { label: "Holiday", multiplier: 1, isFlat: true },
    { label: "topup", multiplier: 1, isFlat: true },
    { label: "Headship", multiplier: 1, isFlat: true },
    { label: "salary net", multiplier: 1, isFlat: true },
    { label: "Salary basic", multiplier: 1, isFlat: true }
  ],
  'Construction': [
    { label: "OR", multiplier: 1, isFlat: true },
    { label: "Night Duty", multiplier: 600, isFlat: false },
    { label: "Evening Duty", multiplier: 400, isFlat: false },
    { label: "Sunday", multiplier: 1, isFlat: true },
    { label: "Holiday", multiplier: 1, isFlat: true },
    { label: "topup", multiplier: 1, isFlat: true },
    { label: "Headship", multiplier: 1, isFlat: true },
    { label: "salary net", multiplier: 1, isFlat: true },
    { label: "Salary basic", multiplier: 1, isFlat: true }
  ],
  'Administrative & Finance': [
    { label: "OR", multiplier: 1, isFlat: true },
    { label: "Night Duty", multiplier: 1, isFlat: true },
    { label: "overtime", multiplier: 1, isFlat: true },
    { label: "0.3", multiplier: 0.3, isFlat: false },
    { label: "Sunday /holiday", multiplier: 1, isFlat: true },
    { label: "Headship", multiplier: 1, isFlat: true },
    { label: "topup", multiplier: 1, isFlat: true },
    { label: "others", multiplier: 1, isFlat: true },
    { label: "Basic Salary", multiplier: 1, isFlat: true },
    { label: "Salary net", multiplier: 1, isFlat: true },
    { label: "Salary basic", multiplier: 1, isFlat: true }
  ],
  'Maintenance & Support': [
    { label: "OR", multiplier: 1, isFlat: true },
    { label: "Night Duty", multiplier: 1, isFlat: true },
    { label: "overtime", multiplier: 1, isFlat: true },
    { label: "0.3", multiplier: 0.3, isFlat: false },
    { label: "Sunday /holiday", multiplier: 1, isFlat: true },
    { label: "Headship", multiplier: 1, isFlat: true },
    { label: "topup", multiplier: 1, isFlat: true },
    { label: "others", multiplier: 1, isFlat: true },
    { label: "Basic Salary", multiplier: 1, isFlat: true },
    { label: "Salary net", multiplier: 1, isFlat: true },
    { label: "Salary basic", multiplier: 1, isFlat: true }
  ]
};

// Dynamically ensure ALL departments have a Deductions and a Salary parameter if they don't have one
Object.keys(DEPARTMENT_PARAMETERS_CONFIG).forEach(dept => {
  const configs = DEPARTMENT_PARAMETERS_CONFIG[dept];
  
  // Clean duplicates or check presence of deductions parameters
  const hasDeductions = configs.some(c => 
    ["deductable", "deduction", "deductions", "penalty"].includes(c.label.trim().toLowerCase())
  );
  if (!hasDeductions) {
    configs.push({ label: "Deductions", multiplier: 1, isFlat: true });
  }

  // Check presence of salary parameters
  const hasSalary = configs.some(c => 
    ["salary", "basic salary", "salary basic", "salary gross", "salary net"].includes(c.label.trim().toLowerCase())
  );
  if (!hasSalary) {
    configs.push({ label: "Salary", multiplier: 1, isFlat: true });
  }
});

export const DEPARTMENT_PARAMETERS: Record<string, string[]> = Object.keys(DEPARTMENT_PARAMETERS_CONFIG).reduce((acc, key) => {
  acc[key] = DEPARTMENT_PARAMETERS_CONFIG[key].map(p => p.label);
  return acc;
}, {} as Record<string, string[]>);

export const PAY_GRADES: PayGrade[] = [
  {
    id: 'SPECIALIST',
    role: 'Doctor',
    specialty: 'Neurology',
    baseSalary: 0,
    hourlyRate: 450,
    overtimeMultiplier: 1.5,
    nightShiftAllowance: 1200,
    holidayMultiplier: 2.0,
    restDayMultiplier: 2.0
  },
  {
    id: 'GP-BASE',
    role: 'Doctor',
    specialty: 'General',
    baseSalary: 0,
    hourlyRate: 200,
    overtimeMultiplier: 1.5,
    nightShiftAllowance: 800,
    holidayMultiplier: 2.0,
    restDayMultiplier: 2.0
  },
  {
    id: 'NURSE-BASE',
    role: 'Nurse',
    specialty: 'Nursing',
    baseSalary: 0,
    hourlyRate: 100,
    overtimeMultiplier: 1.5,
    nightShiftAllowance: 400,
    holidayMultiplier: 2.0,
    restDayMultiplier: 2.0
  },
  {
    id: 'HO-BASE',
    role: 'Technician',
    specialty: 'Health Officer',
    baseSalary: 0,
    hourlyRate: 150,
    overtimeMultiplier: 1.5,
    nightShiftAllowance: 400,
    holidayMultiplier: 1.5,
    restDayMultiplier: 1.5
  },
  {
    id: 'LAB-TECH',
    role: 'Laboratorist',
    specialty: 'Laboratory',
    baseSalary: 0,
    hourlyRate: 120,
    overtimeMultiplier: 1.5,
    nightShiftAllowance: 400,
    holidayMultiplier: 1.5,
    restDayMultiplier: 1.5
  },
  {
    id: 'CLERK-BASE',
    role: 'Clerk',
    specialty: 'None',
    baseSalary: 0,
    hourlyRate: 80,
    overtimeMultiplier: 1.5,
    nightShiftAllowance: 0,
    holidayMultiplier: 1.5,
    restDayMultiplier: 1.5
  },
  {
    id: 'MAINTENANCE-BASE',
    role: 'Maintenance',
    specialty: 'None',
    baseSalary: 0,
    hourlyRate: 100,
    overtimeMultiplier: 1.5,
    nightShiftAllowance: 0,
    holidayMultiplier: 1.5,
    restDayMultiplier: 1.5
  },
  {
    id: 'PT-BASE',
    role: 'Technician',
    specialty: 'Physiotherapy',
    baseSalary: 0,
    hourlyRate: 120,
    overtimeMultiplier: 1.5,
    nightShiftAllowance: 400,
    holidayMultiplier: 1.5,
    restDayMultiplier: 1.5
  },
  {
    id: 'SUPPORT-BASE',
    role: 'Other',
    specialty: 'None',
    baseSalary: 0,
    hourlyRate: 60,
    overtimeMultiplier: 1.25,
    nightShiftAllowance: 200,
    holidayMultiplier: 1.5,
    restDayMultiplier: 1.5
  }
];

export const generateMockEmployees = (count: number): Employee[] => {
  const staff = [
    // Internal Neurology
    { name: 'Dr. bereket senshaw', dept: 'Internal Neurology', role: 'Doctor', specialty: 'Neurology' },
    { name: 'Rahel T/Birhan', dept: 'Internal Neurology', role: 'Nurse', specialty: 'Nursing' },
    { name: 'Dr Samson', dept: 'Internal Neurology', role: 'Doctor', specialty: 'Neurology' },
    { name: 'Biruk ketema', dept: 'Internal Neurology', role: 'Doctor', specialty: 'Neurology' },
    { name: 'Dr Tedla', dept: 'Internal Neurology', role: 'Doctor', specialty: 'Neurology' },
    { name: 'Dr Solomie', dept: 'Internal Neurology', role: 'Doctor', specialty: 'Neurology' },
    { name: 'Dr Mehila', dept: 'Internal Neurology', role: 'Doctor', specialty: 'Neurology', head: 30000 },
    { name: 'Dr Abenet', dept: 'Internal Neurology', role: 'Doctor', specialty: 'Neurology' },
    { name: 'Prof Getahun neuro', dept: 'Internal Neurology', role: 'Doctor', specialty: 'Neurology' },
    { name: 'Dr Elsabeth birhanu', dept: 'Internal Neurology', role: 'Doctor', specialty: 'Neurology' },
    { name: 'Dr Getahun tarekegne', dept: 'Internal Neurology', role: 'Doctor', specialty: 'Neurology' },
    { name: 'Dr Selamawit wale', dept: 'Internal Neurology', role: 'Doctor', specialty: 'Neurology' },
    { name: 'Dr Kidist Yemaneh', dept: 'Internal Neurology', role: 'Doctor', specialty: 'Neurology' },
    { name: 'Dr Yetagesu', dept: 'Internal Neurology', role: 'Doctor', specialty: 'Neurology' },
    { name: 'Dr Nebiyou', dept: 'Internal Neurology', role: 'Doctor', specialty: 'Neurology' },

    // Surgery
    { name: 'Dr Eskindir', dept: 'Surgery', role: 'Doctor', specialty: 'Surgery' },
    { name: 'Prof Lukman', dept: 'Surgery', role: 'Doctor', specialty: 'Surgery' },
    { name: 'Dr Abenezer', dept: 'Surgery', role: 'Doctor', specialty: 'Surgery' },
    { name: 'Dr. Geteye', dept: 'Surgery', role: 'Doctor', specialty: 'Surgery' },
    { name: 'Dr. Ermias', dept: 'Surgery', role: 'Doctor', specialty: 'Surgery' },
    { name: 'Dr Abat', dept: 'Surgery', role: 'Doctor', specialty: 'Surgery' },
    { name: 'Dr Amanuel', dept: 'Surgery', role: 'Doctor', specialty: 'Surgery' },
    { name: 'Dr Fistum', dept: 'Surgery', role: 'Doctor', specialty: 'Surgery' },
    { name: 'Dr Bekin', dept: 'Surgery', role: 'Doctor', specialty: 'Surgery' },
    { name: 'Dr Bereket Bogale', dept: 'Surgery', role: 'Doctor', specialty: 'Surgery' },

    // Pediatrics Neurology
    { name: 'Dr Kindu', dept: 'Pediatrics Neurology', role: 'Doctor', specialty: 'Pediatrics' },
    { name: 'Dr Endayen', dept: 'Pediatrics Neurology', role: 'Doctor', specialty: 'Pediatrics' },
    { name: 'Dr Meskerem', dept: 'Pediatrics Neurology', role: 'Doctor', specialty: 'Pediatrics' },
    { name: 'Dr Behailu', dept: 'Pediatrics Neurology', role: 'Doctor', specialty: 'Pediatrics' },
    { name: 'Dr Ayalew', dept: 'Pediatrics Neurology', role: 'Doctor', specialty: 'Pediatrics' },

    // General Practice
    { name: 'Dr Yoseph', dept: 'General Practice', role: 'Doctor', specialty: 'General' },
    { name: 'Dr Eyerus', dept: 'General Practice', role: 'Doctor', specialty: 'General' },
    { name: 'Dr Yemesrach', dept: 'General Practice', role: 'Doctor', specialty: 'General' },
    { name: 'Dr Yamrot', dept: 'General Practice', role: 'Doctor', specialty: 'General' },
    { name: 'Dr Rediet', dept: 'General Practice', role: 'Doctor', specialty: 'General' },
    { name: 'Dr Kidist Nega', dept: 'General Practice', role: 'Doctor', specialty: 'General' },

    // Radiology
    { name: 'Dr Yonas', dept: 'Radiology', role: 'Doctor', specialty: 'Radiology' },
    { name: 'Dr Tequam', dept: 'Radiology', role: 'Doctor', specialty: 'Radiology' },
    { name: 'Dr Samson ashene', dept: 'Radiology', role: 'Doctor', specialty: 'Radiology' },
    { name: 'Dr elsabeth', dept: 'Radiology', role: 'Doctor', specialty: 'Radiology' },
    { name: 'Prof Daniel', dept: 'Radiology', role: 'Doctor', specialty: 'Radiology' },

    // Nursing
    { name: 'Sr. Almaz', dept: 'Nursing', role: 'Nurse', specialty: 'Nursing' },
    { name: 'Sr. Meaza', dept: 'Nursing', role: 'Nurse', specialty: 'Nursing' },
    { name: 'Sr. Biruktawit A', dept: 'Nursing', role: 'Nurse', specialty: 'Nursing' },
    { name: 'Sr. Lia', dept: 'Nursing', role: 'Nurse', specialty: 'Nursing' },
    { name: 'Sr. Meseret Nigusu', dept: 'Nursing', role: 'Nurse', specialty: 'Nursing' },
    { name: 'Sr. Amen tsgay', dept: 'Nursing', role: 'Nurse', specialty: 'Nursing' },
    { name: 'Sr. Atsede', dept: 'Nursing', role: 'Nurse', specialty: 'Nursing' },
    { name: 'Sr. kbebush timrega', dept: 'Nursing', role: 'Nurse', specialty: 'Nursing' },
    { name: 'Sr. Afomina Zeleke', dept: 'Nursing', role: 'Nurse', specialty: 'Nursing' },
    { name: 'Nurse kasahun', dept: 'Nursing', role: 'Nurse', specialty: 'Nursing' },
    { name: 'Sr. helina tilah', dept: 'Nursing', role: 'Nurse', specialty: 'Nursing' },
    { name: 'Ato Fasika HO', dept: 'Nursing', role: 'Technician', specialty: 'Health Officer' },
    { name: 'Eyerus HO', dept: 'Nursing', role: 'Technician', specialty: 'Health Officer' },
    { name: 'Sr. Genet MRI', dept: 'Nursing', role: 'Nurse', specialty: 'Nursing' },

    // Laboratory
    { name: 'Sentayhu Zelke', dept: 'Laboratory', role: 'Laboratorist', specialty: 'Laboratory' },
    { name: 'Desta shiferaw', dept: 'Laboratory', role: 'Laboratorist', specialty: 'Laboratory' },
    { name: 'Biruk Selshi', dept: 'Laboratory', role: 'Laboratorist', specialty: 'Laboratory' },
    { name: 'Fetehalew Kibret', dept: 'Laboratory', role: 'Laboratorist', specialty: 'Laboratory' },
    { name: 'Getnet Kidane', dept: 'Laboratory', role: 'Laboratorist', specialty: 'Laboratory' },
    { name: 'Getahun Seleshi', dept: 'Laboratory', role: 'Laboratorist', specialty: 'Laboratory' },
    { name: 'Biruktawit Gezahegne', dept: 'Laboratory', role: 'Laboratorist', specialty: 'Laboratory' },

    // Physiotherapy
    { name: 'Seminew Lakew', dept: 'Physiotherapy', role: 'Technician', specialty: 'Physiotherapy' },
    { name: 'Dawit Tibebu', dept: 'Physiotherapy', role: 'Technician', specialty: 'Physiotherapy' },
    { name: 'Hanna worknh', dept: 'Physiotherapy', role: 'Technician', specialty: 'Physiotherapy' },

    // Maintenance & Support
    { name: 'Kinfe', dept: 'Maintenance & Support', role: 'Maintenance', specialty: 'None' },
    { name: 'Abenet', dept: 'Maintenance & Support', role: 'Maintenance', specialty: 'None' },
    { name: 'Fikru a', dept: 'Maintenance & Support', role: 'Maintenance', specialty: 'None' },

    // Others (mostly support staff)
    { name: 'Ehete H/selass', dept: 'Maintenance & Support', role: 'Other', specialty: 'None' },
    { name: 'Bethlem Taye', dept: 'Maintenance & Support', role: 'Other', specialty: 'None' },
    { name: 'Kalkidan Mezgebu', dept: 'Maintenance & Support', role: 'Other', specialty: 'None' },
    { name: 'Sosina Ewnetu', dept: 'Maintenance & Support', role: 'Other', specialty: 'None' },
    { name: 'Yewbdar', dept: 'Administrative & Finance', role: 'Clerk', specialty: 'None' },
    { name: 'Yoseph Girma', dept: 'Administrative & Finance', role: 'Clerk', specialty: 'None' }
  ];

  return staff.map((n, i) => {
    const payGrade = PAY_GRADES.find(pg => pg.role === n.role && pg.specialty === n.specialty) || 
                     PAY_GRADES.find(pg => pg.role === n.role) || 
                     PAY_GRADES[0];
    
    return {
      id: `EMP-${1000 + i}`,
      name: n.name,
      role: n.role as any,
      specialty: n.specialty as any,
      department: n.dept,
      payGradeId: payGrade.id,
      joinDate: '2022-01-01',
      baseSalary: (n as any).base || 0,
      headshipAllowance: (n as any).head
    };
  });
};
