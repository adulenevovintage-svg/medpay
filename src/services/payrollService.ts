import { Employee, MonthlyWorkLog, PayGrade, SalaryCalculation } from '../types';
import { PAY_GRADES, DEPARTMENT_PARAMETERS_CONFIG } from '../constants';

const getParamValue = (parameters: Record<string, number | string> | undefined, label: string): number => {
  if (!parameters) return 0;
  
  const normalize = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/cretit/g, 'credit')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ');
  };

  const cleanLabel = normalize(label);

  // Exact match first
  if (parameters[label] !== undefined) {
    const v = Number(parameters[label]);
    return isNaN(v) ? 0 : v;
  }

  // Case-insensitive & spelling-insensitive match
  const foundKey = Object.keys(parameters).find(k => normalize(k) === cleanLabel);
  if (foundKey !== undefined) {
    const v = Number(parameters[foundKey]);
    return isNaN(v) ? 0 : v;
  }
  return 0;
};

export const calculateSalary = (
  log: MonthlyWorkLog,
  payGrade: PayGrade | undefined,
  employee: Employee
): SalaryCalculation => {
  const safePayGrade = payGrade || PAY_GRADES[0];
  
  // Find if there is an entered basic salary in the dynamic parameters
  const baseSalaryKeys = ["salary", "basic salary", "salary basic", "salary gross", "salary net"];
  const enteredSalaryKey = Object.keys(log.parameters || {}).find(k => 
    baseSalaryKeys.includes(k.trim().toLowerCase())
  );
  
  const enteredSalaryVal = enteredSalaryKey !== undefined ? getParamValue(log.parameters, enteredSalaryKey) : undefined;
  
  // Basic Salary reference for pension / 30% bonus calculation
  const activeBasicSalary = (enteredSalaryVal !== undefined && enteredSalaryVal > 0)
    ? enteredSalaryVal 
    : (employee.baseSalary || safePayGrade.baseSalary || 0);

  // If they have explicitly entered a basic salary parameter in the work log parameters list,
  // we treat profile basePay as 0 to prevent double-counting.
  const basePay = (enteredSalaryVal !== undefined && enteredSalaryVal > 0) ? 0 : (employee.baseSalary || safePayGrade.baseSalary || 0);

  // Gather configs for employee department
  const deptConfigs = DEPARTMENT_PARAMETERS_CONFIG[employee.department] || [];
  
  let parametersTotal = 0;

  // Process payouts for each configured parameter
  deptConfigs.forEach(config => {
    const rawVal = getParamValue(log.parameters, config.label);
    let payout = 0;

    const labelLower = config.label.trim().toLowerCase();

    if (labelLower === "0.3") {
      // 30% Bonus is based on basic salary
      payout = activeBasicSalary * config.multiplier;
    } else if (labelLower === "topup" && config.multiplier === 0.2) {
      // Laboratory topup (20% of basic salary)
      payout = activeBasicSalary * 0.2;
    } else {
      // Negative parameters (e.g. deductable) should subtract from the gross payout
      const isNegative = ["deductable", "deduction", "deductions", "penalty"].includes(labelLower);
      const sign = isNegative ? -1 : 1;
      
      if (config.isFlat) {
        payout = rawVal * sign;
      } else {
        payout = rawVal * config.multiplier * sign;
      }
    }

    parametersTotal += payout;
  });

  const totalGross = basePay + parametersTotal;

  // 1. Mandatory Pension Deduction: Disabled (0) as requested by user
  const pensionContribution = 0;

  // 2. Taxable Income = Gross Total - Pension Contribution
  const taxableIncome = Math.max(0, totalGross - pensionContribution);

  // 3. Monthly Income Tax: Disabled (0) as requested by user
  const incomeTax = 0;

  const deductions = incomeTax + pensionContribution;
  const totalNet = Math.max(0, totalGross - deductions);

  return {
    basePay,
    parametersTotal,
    totalGross,
    deductions,
    pensionContribution,
    incomeTax,
    totalNet
  };
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    maximumFractionDigits: 0,
  }).format(amount);
};
