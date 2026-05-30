/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, 
  LayoutDashboard, 
  Calculator, 
  Settings, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  ChevronRight,
  ChevronDown,
  Stethoscope,
  UserCircle,
  Briefcase,
  TrendingUp,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Employee, EmployeeRole, MonthlyWorkLog, SalaryCalculation } from './types';
import { generateMockEmployees, PAY_GRADES, DEPARTMENTS, DEPARTMENT_PARAMETERS, DEPARTMENT_PARAMETERS_CONFIG } from './constants';
import { calculateSalary, formatCurrency } from './services/payrollService';

type View = 'dashboard' | 'employees' | 'payroll' | 'reports';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [employees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('medpay_employees_v3');
    if (saved) return JSON.parse(saved);
    const generated = generateMockEmployees(300);
    localStorage.setItem('medpay_employees_v3', JSON.stringify(generated));
    return generated;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [viewingEmployeeId, setViewingEmployeeId] = useState<string | null>(null);
  
  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  // Mock monthly logs store with persistence
  const [monthlyLogs, setMonthlyLogs] = useState<Record<string, MonthlyWorkLog[]>>(() => {
    const saved = localStorage.getItem('medpay_monthly_logs');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('medpay_monthly_logs', JSON.stringify(monthlyLogs));
  }, [monthlyLogs]);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const isEmployeePaidInPeriod = (employeeId: string, month: number, year: number) => {
    const logs = monthlyLogs[employeeId] || [];
    return logs.some(log => log.month === month && log.year === year && log.status === 'Paid');
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  const stats = useMemo(() => {
    const paidByMonthCount = employees.filter(e => isEmployeePaidInPeriod(e.id, selectedMonth, selectedYear)).length;
    
    return {
      totalEmployees: employees.length,
      doctors: employees.filter(e => e.role === 'Doctor').length,
      nurses: employees.filter(e => e.role === 'Nurse').length,
      avgSalary: 45000, 
      pendingPayroll: employees.length - paidByMonthCount
    };
  }, [employees, monthlyLogs, selectedMonth, selectedYear]);

  const SidebarItem = ({ id, icon: Icon, label }: { id: View, icon: any, label: string }) => (
    <button
      onClick={() => setCurrentView(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        currentView === id 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'text-gray-500 hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  const selectedEmployee = employees.find(e => e.id === selectedEmployeeId);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Stethoscope size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-800">MedPay</h1>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem id="employees" icon={Users} label="Employees" />
          <SidebarItem id="payroll" icon={Calculator} label="Monthly Payroll" />
          <SidebarItem id="reports" icon={Briefcase} label="Finance Reports" />
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-xl transition-all">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
          <div className="bg-blue-50 p-4 rounded-2xl">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">System Status</p>
            <p className="text-sm text-blue-800 font-medium italic">All systems active</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-bottom border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight capitalize">
                {currentView}
              </h2>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Yehulushet Neurological Clinic</p>
          </div>
          <div className="flex items-center gap-6">
            <MonthYearPicker 
              selectedMonth={selectedMonth} 
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              months={months}
            />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search staff, ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
               <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=250&auto=format&fit=crop" alt="User" />
            </div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {currentView === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard icon={Users} label="Total Staff" value={stats.totalEmployees} trend="+4 this month" color="blue" />
                  <StatCard icon={Stethoscope} label="Doctors" value={stats.doctors} trend="12 Specialty" color="emerald" />
                  <StatCard icon={Briefcase} label="Avg. Monthly Net" value={formatCurrency(45000)} color="purple" />
                  <StatCard icon={AlertCircle} label="Pending Payroll" value={stats.pendingPayroll} color="orange" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold">Payroll Distribution by Role</h3>
                      <button className="text-blue-600 text-sm font-semibold flex items-center gap-1">
                        View Detailed <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="h-64 flex items-end justify-around gap-4 px-4 pb-4">
                      <Bar label="Doctors" value={85} color="bg-blue-500" />
                      <Bar label="Nurses" value={65} color="bg-emerald-500" />
                      <Bar label="Lab Techs" value={45} color="bg-purple-500" />
                      <Bar label="Clerks" value={30} color="bg-orange-500" />
                      <Bar label="Cleaners" value={20} color="bg-gray-400" />
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">Staff Groups</h3>
                    <div className="space-y-4">
                      <GroupItem label="Cardiology" count={24} color="bg-red-100 text-red-600" />
                      <GroupItem label="Neurology" count={18} color="bg-blue-100 text-blue-600" />
                      <GroupItem label="Emergency" count={45} color="bg-orange-100 text-orange-600" />
                      <GroupItem label="Radiology" count={12} color="bg-purple-100 text-purple-600" />
                      <GroupItem label="General Care" count={112} color="bg-emerald-100 text-emerald-600" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentView === 'employees' && (
              <motion.div
                key="employees"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
                      <Filter size={16} /> Filters
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
                      <Download size={16} /> Export CSV
                    </button>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-md shadow-blue-100 hover:bg-blue-700 transition-all">
                    <Plus size={18} /> New Employee
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 text-xs font-bold uppercase tracking-widest">
                        <th className="px-6 py-4">Employee</th>
                        <th className="px-6 py-4">Specialty & Role</th>
                        <th className="px-6 py-4">Department</th>
                        <th className="px-6 py-4">Salary Grade</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((emp) => {
                        const isPaid = isEmployeePaidInPeriod(emp.id, selectedMonth, selectedYear);
                        return (
                          <tr 
                            key={emp.id} 
                            onClick={() => setViewingEmployeeId(emp.id)}
                            className={`transition-colors group cursor-pointer ${isPaid ? 'bg-emerald-50 hover:bg-emerald-100/50' : 'hover:bg-blue-50/30'}`}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isPaid ? 'bg-emerald-200 text-emerald-700' : 'bg-blue-100 text-blue-600'}`}>
                                  {emp.name.charAt(0)}
                                </div>
                                <div>
                                  <p className={`font-bold ${isPaid ? 'text-emerald-900' : 'text-gray-800'}`}>{emp.name}</p>
                                  <p className="text-xs text-gray-500 font-mono">ID: {emp.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm font-medium text-gray-700">{emp.role}</span>
                              <p className="text-xs text-gray-400 italic">
                                {emp.specialty !== 'None' ? emp.specialty : 'General'}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                                {emp.department}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm font-mono text-blue-600 font-semibold">{emp.payGradeId}</span>
                            </td>
                            <td className="px-6 py-4">
                              {isPaid ? (
                                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Paid
                                </span>
                              ) : (
                                <span className="flex items-center gap-1.5 text-xs font-bold text-orange-600">
                                  <span className="w-2 h-2 rounded-full bg-orange-500" /> Pending
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEmployeeId(emp.id);
                                  setCurrentView('payroll');
                                }}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all opacity-0 group-hover:opacity-100 ${
                                  isPaid 
                                  ? 'bg-emerald-600 text-white' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white'
                                }`}
                              >
                                {isPaid ? 'View Payslip' : 'Process Payroll'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                   <p>Showing <span className="font-bold text-gray-800">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-gray-800">{Math.min(currentPage * itemsPerPage, filteredEmployees.length)}</span> of <span className="font-bold text-gray-800">{filteredEmployees.length}</span> employees</p>
                   <div className="flex gap-2">
                     <button 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-200 rounded-xl font-bold bg-white hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                     <button 
                        onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredEmployees.length / itemsPerPage), prev + 1))}
                        disabled={currentPage >= Math.ceil(filteredEmployees.length / itemsPerPage)}
                        className="px-4 py-2 border border-gray-200 rounded-xl font-bold bg-white hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                   </div>
                </div>
              </motion.div>
            )}

            {currentView === 'payroll' && (
              <motion.div
                key="payroll"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-4xl mx-auto"
              >
                {!selectedEmployeeId ? (
                  <div className="bg-white rounded-3xl p-12 border-2 border-dashed border-gray-200 text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mx-auto">
                      <Search size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Search an Employee to Begin</h3>
                      <p className="text-gray-500">Select an employee from the list to process their monthly salary calculation.</p>
                    </div>
                    <button 
                      onClick={() => setCurrentView('employees')}
                      className="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
                    >
                      Go to Employee List
                    </button>
                  </div>
                ) : (
                  <PayrollForm 
                    employee={selectedEmployee!} 
                    onCancel={() => setSelectedEmployeeId(null)}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    existingLogs={monthlyLogs[selectedEmployee!.id] || []}
                    onSave={(logData) => {
                      const newLog: MonthlyWorkLog = {
                        ...logData,
                        id: `LOG-${Date.now()}`,
                        employeeId: selectedEmployee!.id,
                        status: 'Paid'
                      };
                      
                      setMonthlyLogs(prev => ({
                        ...prev,
                        [selectedEmployee!.id]: [
                          ...(prev[selectedEmployee!.id] || []).filter(l => !(l.month === newLog.month && l.year === newLog.year)),
                          newLog
                        ]
                      }));
                      
                      setSelectedEmployeeId(null);
                      setCurrentView('dashboard');
                    }}
                  />
                )}
              </motion.div>
            )}

            {currentView === 'reports' && (
              <motion.div
                key="reports"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                 <div className="bg-blue-900 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10 space-y-2">
                      <h2 className="text-3xl font-bold">Monthly Financial Summary</h2>
                      <p className="text-blue-200">Aggregate view of hospital payroll across all departments.</p>
                      <div className="pt-4 flex gap-8">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-blue-300 font-bold">Total Gross Outflow</p>
                          <p className="text-2xl font-mono font-bold">{formatCurrency(12542500)}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-blue-300 font-bold">Tax Withholding</p>
                          <p className="text-2xl font-mono font-bold">{formatCurrency(2508500)}</p>
                        </div>
                      </div>
                    </div>
                    <Briefcase className="absolute -right-8 -bottom-8 text-white/5" size={240} />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-bold mb-4">Departmental Budgets</h3>
                      <div className="space-y-3">
                        {DEPARTMENTS.slice(0, 5).map(dept => (
                          <div key={dept} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50">
                             <span className="text-sm font-semibold">{dept}</span>
                             <span className="font-mono text-sm font-bold">{formatCurrency(Math.random() * 5000000 + 1000000)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-bold mb-4">Top Overtime Earners</h3>
                      <div className="space-y-4 text-sm font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-orange-100 text-orange-600 flex items-center justify-center font-bold">1</div>
                          <span>Dr. Kindu</span>
                          <span className="ml-auto font-mono text-orange-600">+42.5 hrs</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-gray-100 text-gray-600 flex items-center justify-center font-bold">2</div>
                          <span>Sr. Almaz</span>
                          <span className="ml-auto font-mono text-orange-600">+38.0 hrs</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-gray-100 text-gray-600 flex items-center justify-center font-bold">3</div>
                          <span>Dr. Samson</span>
                          <span className="ml-auto font-mono text-orange-600">+35.2 hrs</span>
                        </div>
                      </div>
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      {/* Modals */}
      <AnimatePresence>
        {viewingEmployeeId && (
          <EmployeeDetailsModal 
            employee={employees.find(e => e.id === viewingEmployeeId)!} 
            onClose={() => setViewingEmployeeId(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function EmployeeDetailsModal({ employee, onClose }: { employee: Employee, onClose: () => void }) {
  const payGrade = PAY_GRADES.find(pg => pg.id === employee.payGradeId) || PAY_GRADES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden"
      >
        <div className="bg-blue-600 h-32 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md"
          >
            <Plus size={24} className="rotate-45" />
          </button>
        </div>
        
        <div className="px-8 pb-8 -mt-12 relative">
          <div className="flex items-end gap-6 mb-8">
            <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-xl">
              <div className="w-full h-full rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-extrabold">
                {employee.name.charAt(0)}
              </div>
            </div>
            <div className="flex-1 pb-2">
              <h3 className="text-3xl font-extrabold text-gray-900">{employee.name}</h3>
              <p className="text-gray-500 font-medium">{employee.role} • {employee.specialty !== 'None' ? employee.specialty : 'General'} Specialist</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Employee ID</p>
                <p className="font-mono font-bold text-gray-800 bg-gray-50 px-3 py-1.5 rounded-lg inline-block border border-gray-100">{employee.id}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Department</p>
                <div className="flex items-center gap-2 text-gray-800 font-semibold italic">
                  <Briefcase size={16} className="text-blue-500" />
                  {employee.department}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Join Date</p>
                <div className="flex items-center gap-2 text-gray-800 font-medium">
                  <Calendar size={16} className="text-emerald-500" />
                  {new Date(employee.joinDate).toLocaleDateString('en-ET', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Salary Structure ({payGrade.id})</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
                   <span className="text-xs font-semibold text-gray-500">Base Monthly</span>
                   <span className="font-mono font-bold text-blue-600">{formatCurrency(payGrade.baseSalary)}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-xs font-semibold text-gray-500">Hourly Rate</span>
                   <span className="text-sm font-bold text-gray-800">{formatCurrency(payGrade.hourlyRate)}/hr</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                   <span className="text-gray-500">Overtime Multiplier</span>
                   <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded-md font-bold">{payGrade.overtimeMultiplier}x</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                   <span className="text-gray-500">Shift Allowance</span>
                   <span className="font-medium text-emerald-600">+{formatCurrency(payGrade.nightShiftAllowance)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                   <span className="text-gray-500">Holiday Rate</span>
                   <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-md font-bold">{payGrade.holidayMultiplier}x</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all"
            >
              Close Profile
            </button>
            <div className="flex-1" />
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 transition-all flex items-center gap-2">
              <Download size={18} /> Download Records
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MonthYearPicker({ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, months }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm hover:border-blue-400 transition-all group"
      >
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-blue-600" />
          <span className="text-sm font-bold text-gray-700">
            {months[selectedMonth]} {selectedYear}
          </span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-30 p-4"
            >
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Period</span>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  {[2025, 2026].map(y => (
                    <button
                      key={y}
                      onClick={() => setSelectedYear(y)}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${selectedYear === y ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {months.map((m: string, i: number) => (
                  <button
                    key={m}
                    onClick={() => {
                      setSelectedMonth(i);
                      setIsOpen(false);
                    }}
                    className={`py-2 text-[11px] font-bold rounded-lg transition-all ${
                      selectedMonth === i 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-blue-50 text-gray-600'
                    }`}
                  >
                    {m.substring(0, 3)}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function PayrollForm({ 
  employee, 
  onCancel, 
  onSave, 
  selectedMonth: initialMonth, 
  selectedYear: initialYear,
  existingLogs = []
}: { 
  employee: Employee, 
  onCancel: () => void, 
  onSave: (log: any) => void, 
  selectedMonth: number, 
  selectedYear: number,
  existingLogs?: MonthlyWorkLog[]
}) {
  const deptParams = useMemo(() => {
    return DEPARTMENT_PARAMETERS[employee.department] || DEPARTMENT_PARAMETERS['Others'] || [];
  }, [employee.department]);
  
  const [log, setLog] = useState<Omit<MonthlyWorkLog, 'id' | 'employeeId' | 'status'>>({
    parameters: deptParams.reduce((acc, param) => ({ ...acc, [param]: 0 }), {} as Record<string, number>),
    month: initialMonth,
    year: initialYear
  });

  // Synced state retrieval if previously saved parameters exist for selected month/year
  useEffect(() => {
    const existing = existingLogs.find(l => l.month === log.month && l.year === log.year);
    setLog(prev => {
      const freshParams = deptParams.reduce((acc, param) => ({ ...acc, [param]: 0 }), {} as Record<string, number>);
      const mergedParams = existing ? { ...freshParams, ...existing.parameters } : freshParams;
      
      const isIdentical = Object.keys(freshParams).every(
        k => Number(mergedParams[k] || 0) === Number(prev.parameters[k] || 0)
      );
      if (isIdentical && prev.month === log.month && prev.year === log.year) {
        return prev;
      }
      
      return {
        ...prev,
        parameters: mergedParams
      };
    });
  }, [log.month, log.year, existingLogs, deptParams]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const payGrade = PAY_GRADES.find(pg => pg.id === employee.payGradeId) || PAY_GRADES[0];
  
  const calculation = calculateSalary({
    id: 'temp',
    employeeId: employee.id,
    status: 'Draft',
    ...log
  }, payGrade, employee);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
      <div className="bg-blue-600 p-8 text-white relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight">{employee.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold uppercase">{employee.department}</span>
              <span className="text-blue-100 text-sm font-medium">{employee.role}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-blue-200 font-bold">Month Base</p>
            <p className="text-2xl font-mono font-bold">{formatCurrency(employee.baseSalary || payGrade.baseSalary)}</p>
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 px-1">Dept. Special Parameters (Excel Based)</h4>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200">
              {deptParams.map((param) => {
                const config = (DEPARTMENT_PARAMETERS_CONFIG[employee.department] || []).find(p => p.label === param);
                return (
                  <InputItem 
                    key={param} 
                    label={param} 
                    value={(log.parameters[param] as number) || 0} 
                    onChange={(v: number) => setLog({
                      ...log, 
                      parameters: { ...log.parameters, [param]: v }
                    })} 
                    icon={param.toLowerCase().includes('overtime') ? TrendingUp : param.toLowerCase().includes('headship') ? Briefcase : Clock} 
                    multiplier={config?.multiplier}
                    isFlat={config?.isFlat}
                  />
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl space-y-4">
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Selected Period</h5>
            <div className="flex flex-col gap-3">
               <div className="flex gap-2">
                 {[2025, 2026].map(y => (
                    <button
                      key={y}
                      onClick={() => setLog({...log, year: y})}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all border ${log.year === y ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' : 'bg-white text-gray-500 border-gray-200'}`}
                    >
                      {y}
                    </button>
                  ))}
               </div>
               <div className="grid grid-cols-4 gap-2">
                 {months.map((m, i) => (
                    <button
                      key={m}
                      onClick={() => setLog({...log, month: i})}
                      className={`py-2 text-[10px] font-bold rounded-lg transition-all border ${log.month === i ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                    >
                      {m.substring(0, 3)}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 text-white self-start space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">Live Calculation Summary</h4>
          
          <div className="space-y-3">
             <CalcRow label="Base Salary" value={calculation.basePay} />
             <CalcRow label="Parameters Total" value={calculation.parametersTotal} />
             <div className="pt-3 border-t border-white/10" />
             <CalcRow label="Gross Total" value={calculation.totalGross} isBold />
             
             <div className="pt-2 space-y-1">
               <div className="flex justify-between text-[11px] text-gray-500 uppercase font-bold px-1">Deductions Detail</div>
               <CalcRow label="Employee Pension (7%)" value={-calculation.pensionContribution} isNegative />
               <CalcRow label="Income Tax" value={-calculation.incomeTax} isNegative />
             </div>
          </div>

          <div className="mt-6 p-4 bg-blue-600 rounded-xl">
             <div className="flex justify-between items-center mb-1">
               <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Net Payable</p>
               <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white font-bold">ETB</span>
             </div>
             <p className="text-3xl font-mono font-bold">{formatCurrency(calculation.totalNet)}</p>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={onCancel}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all text-sm"
            >
              Back
            </button>
            <button 
              onClick={() => {
                alert(`Payroll finalized for ${employee.name}. Monthly records updated.`);
                onSave(log);
              }}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-bold flex-1 transition-all"
            >
              Approve & Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InputItemProps {
  key?: string | number;
  label: string;
  value: number;
  onChange: (v: number) => void;
  icon: any;
  multiplier?: number;
  isFlat?: boolean;
}

function InputItem({ label, value, onChange, icon: Icon, multiplier = 1, isFlat = true }: InputItemProps) {
  const isNegative = ["deductable", "deduction", "deductions", "penalty"].includes(label.toLowerCase());
  const sign = isNegative ? -1 : 1;
  // Calculate subtotal lived row payout
  const payout = isFlat ? (value * sign) : (value * multiplier * sign);

  return (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">{label}</label>
          <span className="text-[9px] font-mono font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase">
            {isFlat ? 'Flat (1x)' : `Rate: ${multiplier}x`}
          </span>
         </div>
         <div className="flex items-center justify-between gap-3">
           <div className="flex items-center gap-3">
             <input 
               type="number" 
               value={value === 0 ? '' : value}
               placeholder="0"
               onChange={(e) => {
                 const v = e.target.value === '' ? 0 : Number(e.target.value);
                 if (!isNaN(v)) {
                   onChange(v);
                 }
               }}
               className="w-24 bg-white border border-gray-200 p-2 rounded-lg font-mono font-bold outline-none focus:ring-2 focus:ring-blue-500 text-sm"
             />
             <div className="flex gap-1">
               <button onClick={() => onChange(Math.max(0, value - 1))} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600">-</button>
               <button onClick={() => onChange(value + 1)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600">+</button>
             </div>
           </div>
           <span className={`text-xs font-mono font-bold ${isNegative ? 'text-red-500' : 'text-green-600'}`}>
             {formatCurrency(payout)}
           </span>
         </div>
       </div>
     </div>
  );
}

function CalcRow({ label, value, isBold, isNegative }: { label: string, value: number, isBold?: boolean, isNegative?: boolean }) {
  return (
    <div className={`flex justify-between items-center text-sm ${isBold ? 'text-lg font-bold' : 'text-gray-400'}`}>
      <span>{label}</span>
      <span className={`font-mono ${isNegative ? 'text-red-400' : isBold ? 'text-white' : 'text-gray-200'}`}>
        {formatCurrency(value)}
      </span>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend, color }: { icon: any, label: string, value: string | number, trend?: string, color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl ${colors[color]} flex items-center justify-center`}>
          <Icon size={24} />
        </div>
        {trend && <span className="text-xs font-bold text-gray-400">{trend}</span>}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function Bar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: `${value}%` }} 
        className={`w-full rounded-t-xl ${color} opacity-80 hover:opacity-100 transition-opacity`}
      />
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">{label}</span>
    </div>
  );
}

function GroupItem({ label, count, color }: { label: string, count: number, color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>{count}</span>
    </div>
  );
}
