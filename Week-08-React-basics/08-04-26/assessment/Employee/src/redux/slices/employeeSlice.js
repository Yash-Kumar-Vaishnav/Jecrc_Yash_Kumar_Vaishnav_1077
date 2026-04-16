import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
  },
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    editEmployee: (state, action) => {
      const { id, updatedEmployee } = action.payload;
      const index = state.employees.findIndex(emp => emp.id === id);
      if (index !== -1) {
        state.employees[index] = { ...state.employees[index], ...updatedEmployee };
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    },
  },
});

export const { addEmployee, editEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;