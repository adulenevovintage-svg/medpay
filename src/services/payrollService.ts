import { Employee, MonthlyWorkLog, PayGrade, SalaryCalculation } from '../types';
import { PAY_GRADES, DEPARTMENT_PARAMETERS_CONFIG } from '../constants';

const getParamValue = (parameters: Record<string, number | string> | undefined, label: string): number => {
  if (!parameters) return 0;
  // Exact match
  if (parameters[label] !== undefined) {
    const v = Number(parameters[label]);
    return isNaN(v) ? 0 : v;
  }
  // Case-insensitive, trimmed match
  const cleanLabel = label.trim().toLowerCase();
  const foundKey = Object.keys(parameters).find(k => k.trim().toLowerCase() === cleanLabel);
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
  const baseSalaryKeys = ["salary", "basic salary", "salary basic", "salary gross"];
  const enteredSalaryKey = Object.keys(log.parameters || {}).find(k => 
    baseSalaryKeys.includes(k.trim().toLowerCase())
  );
  
  const enteredSalaryVal = enteredSalaryKey !== undefined ? getParamValue(log.parameters, enteredSalaryKey) : undefined;
  
  // Basic Salary reference for pension / 30% bonus calculation
  const activeBasicSalary = enteredSalaryVal !== undefined 
    ? enteredSalaryVal 
    : (employee.baseSalary || safePayGrade.baseSalary || 0);

  // If they have explicitly entered a basic salary parameter in the work log parameters list,
  // we treat profile basePay as 0 to prevent double-counting.
  const basePay = enteredSalaryVal !== undefined ? 0 : (employee.baseSalary || safePayGrade.baseSalary || 0);

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

  // 1. Mandatory Pension Deduction: 7% of Active Basic Salary (Ethiopia Standard)
  const pensionContribution = activeBasicSalary * 0.07;

  // 2. Taxable Income = Gross Total - Pension Contribution
  // Taxable income shouldn't drop below zero
  const taxableIncome = Math.max(0, totalGross - pensionContribution);

  let incomeTax = 0;

  /**
   * ETHIOPIAN INCOME TAX BRACKETS (Monthly)
   */
  if (taxableIncome <= 600) {
    incomeTax = 0;
  } else if (taxableIncome <= 1650) {
    incomeTax = (taxableIncome * 0.1) - 60;
  } else if (taxableIncome <= 3200) {
    incomeTax = (taxableIncome * 0.15) - 142.5;
  } else if (taxableIncome <= 5250) {
    incomeTax = (taxableIncome * 0.2) - 302.5;
  } else if (taxableIncome <= 7800) {
    incomeTax = (taxableIncome * 0.25) - 565;
  } else if (taxableIncome <= 10900) {
    incomeTax = (taxableIncome * 0.3) - 955;
  } else {
    incomeTax = (taxableIncome * 0.35) - 1500;
  }

  // Cap tax at non-negative value
  incomeTax = Math.max(0, incomeTax);

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
