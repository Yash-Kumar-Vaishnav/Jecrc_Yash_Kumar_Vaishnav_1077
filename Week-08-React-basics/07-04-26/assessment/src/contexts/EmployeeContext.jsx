import React, { createContext, useContext, useState, useCallback } from 'react';

const EmployeeContext = createContext();

// Initial mock data
const initialEmployees = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 120000,
    joinDate: '2021-03-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    department: 'HR',
    position: 'HR Manager',
    salary: 95000,
    joinDate: '2020-06-20'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    department: 'Sales',
    position: 'Sales Executive',
    salary: 85000,
    joinDate: '2022-01-10'
  }
];

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [loading, setLoading] = useState(false);

  // CREATE - Add new employee
  const addEmployee = useCallback((employeeData) => {
    setLoading(true);
    setTimeout(() => {
      const newEmployee = {
        id: Math.random().toString(36).substr(2, 9),
        ...employeeData,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setEmployees(prev => [...prev, newEmployee]);
      setLoading(false);
      return newEmployee;
    }, 500);
  }, []);

  // READ - Get all employees
  const getEmployees = useCallback(() => {
    return employees;
  }, [employees]);

  // READ - Get single employee
  const getEmployeeById = useCallback((id) => {
    return employees.find(emp => emp.id === id);
  }, [employees]);

  // UPDATE - Update employee
  const updateEmployee = useCallback((id, updates) => {
    setLoading(true);
    setTimeout(() => {
      setEmployees(prev =>
        prev.map(emp =>
          emp.id === id ? { ...emp, ...updates } : emp
        )
      );
      setLoading(false);
    }, 500);
  }, []);

  // DELETE - Remove employee
  const deleteEmployee = useCallback((id) => {
    setLoading(true);
    setTimeout(() => {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      setLoading(false);
    }, 500);
  }, []);

  // Get statistics
  const getStatistics = useCallback(() => {
    const total = employees.length;
    const departments = [...new Set(employees.map(e => e.department))];
    const avgSalary = Math.round(
      employees.reduce((sum, e) => sum + e.salary, 0) / total
    );
    const highestSalary = Math.max(...employees.map(e => e.salary));

    return {
      totalEmployees: total,
      totalDepartments: departments.length,
      averageSalary: avgSalary,
      highestSalary: highestSalary,
      departments: departments
    };
  }, [employees]);

  // Search employees
  const searchEmployees = useCallback((query) => {
    const lowerQuery = query.toLowerCase();
    return employees.filter(emp =>
      emp.name.toLowerCase().includes(lowerQuery) ||
      emp.email.toLowerCase().includes(lowerQuery) ||
      emp.department.toLowerCase().includes(lowerQuery) ||
      emp.position.toLowerCase().includes(lowerQuery)
    );
  }, [employees]);

  const value = {
    employees,
    loading,
    addEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getStatistics,
    searchEmployees
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within EmployeeProvider');
  }
  return context;
};
