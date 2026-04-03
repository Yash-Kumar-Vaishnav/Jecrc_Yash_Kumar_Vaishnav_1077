import { createContext, useContext, useState } from 'react';
import { initialEmployees } from '../utils/employees';
import { useAuth } from './AuthContext';

const EmployeeContext = createContext(undefined);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const addEmployee = (emp) => {
    if (user?.role !== 'admin') return;
    setLoading(true);
    setTimeout(() => {
      const newEmp = { ...emp, id: Date.now().toString() };
      setEmployees(prev => [...prev, newEmp]);
      setLoading(false);
    }, 500); // simulate async
  };

  const updateEmployee = (id, emp) => {
    if (user?.role !== 'admin' && user?.id !== employees.find(e => e.id === id)?.userId) return;
    setLoading(true);
    setTimeout(() => {
      setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...emp } : e));
      setLoading(false);
    }, 500);
  };

  const deleteEmployee = (id) => {
    if (user?.role !== 'admin') return;
    setLoading(true);
    setTimeout(() => {
      setEmployees(prev => prev.filter(e => e.id !== id));
      setLoading(false);
    }, 500);
  };

  const getEmployee = (id) => {
    const emp = employees.find(e => e.id === id);
    if (user?.role === 'admin' || emp?.userId === user?.id) return emp;
    return undefined;
  };

  const filteredEmployees = user?.role === 'admin' ? employees : employees.filter(e => e.userId === user?.id);

  return (
    <EmployeeContext.Provider value={{
      employees: filteredEmployees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      getEmployee,
      loading
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error('useEmployees must be used within EmployeeProvider');
  return context;
};