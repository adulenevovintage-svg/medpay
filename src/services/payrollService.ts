import { MonthlyWorkLog, PayGrade, SalaryCalculation } from '../types';

export const calculateSalary = (log: MonthlyWorkLog, payGrade: PayGrade): SalaryCalculation => {
  const basePay = payGrade.baseSalary;
  
  // 1. Calculate Gross Components
  const overtimePay = log.overtimeHours * payGrade.hourlyRate * payGrade.overtimeMultiplier;
  const nightShiftPay = log.nightShifts * payGrade.nightShiftAllowance;
  const holidayPay = log.holidaysWorked * 8 * payGrade.hourlyRate * payGrade.holidayMultiplier;
  const restDayPay = log.restDaysWorked * 8 * payGrade.hourlyRate * payGrade.restDayMultiplier;
  
  const totalGross = basePay + overtimePay + nightShiftPay + holidayPay + restDayPay;

  // 2. Mandatory Deductions (Ethiopia Standard)
  
  // Pension: 7% of Base Salary (typically calculated on base salary in Ethiopia)
  const pensionContribution = basePay * 0.07;
  
  // Taxable Income = Gross Total - Pension Contribution (in some cases)
  // For this formula, we'll follow the standard: Income Tax is applied to Taxable Income
  const taxableIncome = totalGross - pensionContribution;
  
  let incomeTax = 0;
  
  /**
   * ETHIOPIAN INCOME TAX BRACKETS (Monthly)
   * 0 - 600: 0%
   * 601 - 1,650: 10% (minus 60)
   * 1,651 - 3,200: 15% (minus 142.50)
   * 3,201 - 5,250: 20% (minus 302.50)
   * 5,251 - 7,800: 25% (minus 565.00)
   * 7,801 - 10,900: 30% (minus 955.00)
   * Over 10,900: 35% (minus 1,500.00)
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

  const deductions = incomeTax + pensionContribution;
  const totalNet = totalGross - deductions;

  return {
    basePay,
    overtimePay,
    nightShiftPay,
    holidayPay,
    restDayPay,
    totalGross,
    deductions,
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
