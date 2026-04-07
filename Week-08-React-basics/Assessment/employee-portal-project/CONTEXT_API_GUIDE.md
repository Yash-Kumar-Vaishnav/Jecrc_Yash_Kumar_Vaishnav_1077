# Advanced Context API in Enterprise React Application
## Internal Employee Portal Architecture Guide

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Context Structure](#context-structure)
3. [Reducer Pattern](#reducer-pattern)
4. [Performance Optimization](#performance-optimization)
5. [Best Practices](#best-practices)
6. [Implementation Details](#implementation-details)
7. [Testing Strategy](#testing-strategy)

---

## Architecture Overview

### Application Structure
```
App (Root)
├── AuthProvider (Global Auth State)
│   ├── ThemeProvider (Global Theme State)
│   │   ├── EmployeeProvider (Global Employee State)
│   │   │   └── DashboardProvider (Global Dashboard State)
│   │   │       └── AppContent
│   │   │           ├── LoginPage / Header
│   │   │           └── Dashboard
│   │   │               ├── Analytics
│   │   │               ├── EmployeeManagement
│   │   │               └── Settings
```

### Key Principles
- **Separation of Concerns**: Each context handles one domain
- **Composition**: Providers are nested for logical dependency
- **Isolation**: Contexts are independent and testable
- **Performance**: Optimized re-renders with `useMemo` and `useCallback`

---

## Context Structure

### 1. AuthContext
**Responsibility**: Manage user authentication state and actions

```javascript
// State Shape
{
  isAuthenticated: boolean,
  user: { email, name } | null,
  error: string | null,
  login: (email, password) => void,
  logout: () => void
}
```

**Reducer Actions**:
- `LOGIN`: Authenticate user
- `LOGOUT`: Clear authentication
- `SET_ERROR`: Display error message

**Usage Pattern**:
```javascript
const { isAuthenticated, user, login, logout, error } = useAuth();
```

---

### 2. ThemeContext
**Responsibility**: Manage application theme (light/dark mode)

```javascript
// State Shape
{
  isDark: boolean,
  toggleTheme: () => void,
  setTheme: (isDark: boolean) => void
}
```

**Reducer Actions**:
- `TOGGLE_THEME`: Switch between light and dark
- `SET_THEME`: Set specific theme

**Usage Pattern**:
```javascript
const { isDark, toggleTheme, setTheme } = useTheme();
```

---

### 3. EmployeeContext
**Responsibility**: Manage employee CRUD operations and filtering

```javascript
// State Shape
{
  employees: Employee[],
  filteredEmployees: Employee[], // Memoized
  loading: boolean,
  filter: string,
  lastAction: { type, id } | null,
  addEmployee: (employee) => void,
  updateEmployee: (employee) => void,
  deleteEmployee: (id) => void,
  setFilter: (filter) => void
}
```

**Reducer Actions**:
- `ADD_EMPLOYEE`: Create new employee
- `UPDATE_EMPLOYEE`: Modify existing employee
- `DELETE_EMPLOYEE`: Remove employee
- `SET_FILTER`: Filter by department
- `SET_LOADING`: Control loading state

**Usage Pattern**:
```javascript
const { 
  employees, 
  filteredEmployees, 
  addEmployee, 
  updateEmployee, 
  deleteEmployee,
  setFilter 
} = useEmployees();
```

---

### 4. DashboardContext
**Responsibility**: Manage dashboard state (analytics, settings, tabs)

```javascript
// State Shape
{
  activeTab: 'analytics' | 'employees' | 'settings',
  settings: {
    emailNotifications: boolean,
    darkMode: boolean,
    autoSave: boolean
  },
  analytics: {
    totalEmployees: number,
    activeEmployees: number,
    departments: { [key: string]: number }
  },
  setActiveTab: (tab) => void,
  updateSettings: (settings) => void
}
```

**Reducer Actions**:
- `SET_ACTIVE_TAB`: Switch dashboard tabs
- `UPDATE_SETTINGS`: Update user settings
- `UPDATE_ANALYTICS`: Compute analytics

**Usage Pattern**:
```javascript
const { 
  activeTab, 
  setActiveTab, 
  analytics, 
  settings, 
  updateSettings 
} = useDashboard();
```

---

## Reducer Pattern

### Why Reducers?
✅ **Predictable State Updates**: All mutations go through defined actions
✅ **Easier Testing**: Pure functions are easy to test
✅ **Scalability**: Handle complex state logic cleanly
✅ **Debugging**: Clear action history for debugging

### Reducer Structure
```javascript
function contextReducer(state, action) {
  switch (action.type) {
    case 'ACTION_TYPE':
      return {
        ...state,
        changedProperty: newValue
      };
    default:
      return state;
  }
}
```

### Employee Reducer Example
```javascript
function employeeReducer(state, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [...state.employees, action.payload],
        lastAction: { type: 'ADD', id: action.payload.id },
      };
    
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(emp =>
          emp.id === action.payload.id ? action.payload : emp
        ),
        lastAction: { type: 'UPDATE', id: action.payload.id },
      };
    
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter(emp => emp.id !== action.payload),
        lastAction: { type: 'DELETE', id: action.payload },
      };
    
    default:
      return state;
  }
}
```

---

## Performance Optimization

### 1. useMemo for Computed Values
**Problem**: Re-computing expensive values on every render

**Solution**: Use `useMemo` to cache computed values
```javascript
const filteredEmployees = useMemo(() => {
  if (filter === 'all') return employees;
  return employees.filter(emp => 
    emp.department.toLowerCase() === filter.toLowerCase()
  );
}, [employees, filter]); // Only recompute when dependencies change
```

**Benefits**:
- Avoids unnecessary array filtering
- Prevents child re-renders from parent re-renders
- Maintains referential equality

### 2. useCallback for Function Stability
**Problem**: Creating new function references on every render

**Solution**: Use `useCallback` to memoize functions
```javascript
const addEmployee = useCallback((employee) => {
  const newEmployee = {
    ...employee,
    id: Date.now().toString(),
  };
  dispatch({ type: 'ADD_EMPLOYEE', payload: newEmployee });
}, []); // Empty deps = function never changes
```

**Benefits**:
- Functions have stable references
- Prevents unnecessary child re-renders
- Enables optimization with React.memo

### 3. useMemo for Context Value
**Problem**: Context consumers re-render even if values haven't changed

**Solution**: Memoize the entire context value
```javascript
const value = useMemo(() => ({
  ...authState,
  login,
  logout,
}), [authState, login, logout]);

return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);
```

**Critical**: Without this, any parent re-render causes all context consumers to re-render

### 4. Dependency Array Management
```javascript
// ❌ WRONG: Never re-memoizes
useCallback(() => { /* ... */ }, [])

// ✅ CORRECT: Updates when dependencies change
useCallback((email) => {
  login(email);
}, [login]) // Include all external values used inside
```

---

## Best Practices

### 1. Provider Nesting Order
```javascript
// ✅ CORRECT: Logical order
AuthProvider
  └── ThemeProvider (doesn't depend on Auth)
      └── EmployeeProvider (independent data)
          └── DashboardProvider (depends on Employee data)
```

### 2. Custom Hooks for Context Access
```javascript
// ✅ DO THIS
function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be within EmployeeProvider');
  }
  return context;
}

// Use it like:
const { employees, addEmployee } = useEmployees();

// ❌ DON'T DO THIS
const employees = useContext(EmployeeContext);
```

**Benefits**:
- Clear error messages if provider is missing
- Consistent API across all contexts
- Easier refactoring

### 3. Avoid Deep Nesting
```javascript
// ❌ AVOID: Too deep
<A>
  <B>
    <C>
      <D>
        <E>
          <Component />
        </E>
      </D>
    </C>
  </B>
</A>

// ✅ CONSIDER: Multiple providers at same level if independent
<Provider1>
  <Provider2>
    <Component />
  </Provider2>
</Provider1>
```

### 4. Context Splitting
```javascript
// ❌ AVOID: One massive context
<UserContext.Provider value={{
  auth,
  theme,
  employees,
  dashboard,
  // ... everything else
}}>

// ✅ DO THIS: Separate concerns
<AuthContext.Provider value={authState}>
  <ThemeContext.Provider value={themeState}>
    <EmployeeContext.Provider value={employeeState}>
```

### 5. Action Creators (Optional)
```javascript
// For larger apps, create action factories
const employeeActions = {
  addEmployee: (employee) => ({
    type: 'ADD_EMPLOYEE',
    payload: employee
  }),
  deleteEmployee: (id) => ({
    type: 'DELETE_EMPLOYEE',
    payload: id
  }),
};

// Use with dispatch
dispatch(employeeActions.addEmployee(newEmp));
```

---

## Implementation Details

### Initialization Pattern
```javascript
function AuthProvider({ children }) {
  // 1. Combine reducer + initial state
  const [authState, authDispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
    error: null,
  });

  // 2. Create stable action creators
  const login = useCallback((email, password) => {
    if (email && password) {
      authDispatch({
        type: 'LOGIN',
        payload: { email, name: 'John Doe' },
      });
    }
  }, []);

  // 3. Memoize context value
  const value = useMemo(() => ({
    ...authState,
    login,
    logout,
  }), [authState, login, logout]);

  // 4. Return provider with stable value
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Filtering Pattern (EmployeeContext)
```javascript
// Computed state via useMemo
const filteredEmployees = useMemo(() => {
  if (filter === 'all') return employees;
  return employees.filter(emp => 
    emp.department.toLowerCase() === filter.toLowerCase()
  );
}, [employees, filter]); // Recalculate only when inputs change

// Include in context value
const value = useMemo(() => ({
  ...employeeState,
  filteredEmployees, // Memoized computed value
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setFilter,
}), [employeeState, filteredEmployees, /* ... callbacks */]);
```

### Analytics Pattern (DashboardContext)
```javascript
// Dependency: Uses employees from EmployeeContext
function DashboardProvider({ children }) {
  const { employees } = useContext(EmployeeContext);

  // Computed analytics
  const analytics = useMemo(() => {
    const departments = {};
    let activeCount = 0;

    employees.forEach(emp => {
      if (emp.status === 'Active') activeCount++;
      departments[emp.department] = (departments[emp.department] || 0) + 1;
    });

    return {
      totalEmployees: employees.length,
      activeEmployees: activeCount,
      departments,
    };
  }, [employees]); // Recalculate when employees change
}
```

---

## Testing Strategy

### Unit Testing Reducers
```javascript
// Test pure reducer function
describe('employeeReducer', () => {
  it('should add an employee', () => {
    const initialState = { employees: [] };
    const action = {
      type: 'ADD_EMPLOYEE',
      payload: { id: '1', name: 'John' }
    };

    const newState = employeeReducer(initialState, action);

    expect(newState.employees).toHaveLength(1);
    expect(newState.employees[0].name).toBe('John');
  });

  it('should delete an employee', () => {
    const initialState = {
      employees: [{ id: '1', name: 'John' }]
    };
    const action = {
      type: 'DELETE_EMPLOYEE',
      payload: '1'
    };

    const newState = employeeReducer(initialState, action);

    expect(newState.employees).toHaveLength(0);
  });
});
```

### Integration Testing with Providers
```javascript
// Render component with provider wrapper
function renderWithProvider(component) {
  return render(
    <AuthProvider>
      <ThemeProvider>
        <EmployeeProvider>
          <DashboardProvider>
            {component}
          </DashboardProvider>
        </EmployeeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

it('should display employees from context', () => {
  renderWithProvider(<EmployeeManagement />);
  
  const names = screen.getAllByRole('heading', { level: 4 });
  expect(names).toHaveLength(3); // Initial employees
});
```

### Hook Testing
```javascript
// Test custom hooks with React Testing Library
import { renderHook, act } from '@testing-library/react';

it('should update employee', () => {
  const wrapper = ({ children }) => (
    <EmployeeProvider>{children}</EmployeeProvider>
  );

  const { result } = renderHook(() => useEmployees(), { wrapper });

  act(() => {
    result.current.addEmployee({
      name: 'Jane',
      email: 'jane@company.com',
      role: 'Developer',
      department: 'Engineering',
      joinDate: '2024-01-01',
    });
  });

  expect(result.current.employees).toHaveLength(4);
});
```

---

## Performance Checklist

- ✅ Each context memoizes its value with `useMemo`
- ✅ All callbacks wrapped in `useCallback`
- ✅ Computed values (filtered, aggregated) memoized
- ✅ Custom hooks throw errors if provider missing
- ✅ Providers split by concern (not monolithic)
- ✅ Reducer functions are pure
- ✅ Dependency arrays include all external values
- ✅ No unnecessary re-renders via context changes

---

## Common Pitfalls & Solutions

### Pitfall 1: Unstable Context Value
```javascript
// ❌ BAD: Creates new object every render
return (
  <Context.Provider value={{ ...state, action }}>
    {children}
  </Context.Provider>
);

// ✅ GOOD: Memoized value
const value = useMemo(() => ({
  ...state,
  action,
}), [state, action]);

return (
  <Context.Provider value={value}>
    {children}
  </Context.Provider>
);
```

### Pitfall 2: Callback Dependencies
```javascript
// ❌ BAD: Function recreated every render
const addItem = () => {
  dispatch({ type: 'ADD', payload: item });
};

// ✅ GOOD: Memoized with correct dependencies
const addItem = useCallback(() => {
  dispatch({ type: 'ADD', payload: item });
}, [item]); // Include all dependencies
```

### Pitfall 3: Missing Error Boundary
```javascript
// ❌ BAD: No validation
function useEmployees() {
  return useContext(EmployeeContext);
}

// ✅ GOOD: Validate provider
function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within EmployeeProvider');
  }
  return context;
}
```

### Pitfall 4: Over-Engineering
```javascript
// ❌ DON'T: Unnecessary complexity
// Creating 10 separate contexts for slight variations

// ✅ DO: Group related state
// One context per logical domain (Auth, Theme, Employees, Dashboard)
```

---

## Summary

### Key Takeaways
1. **Structure**: Separate contexts by domain (Auth, Theme, Data, UI)
2. **Optimization**: Always memoize context value and callbacks
3. **Patterns**: Use reducers for complex state, custom hooks for access
4. **Testing**: Test reducers in isolation, providers with wrapper
5. **Scale**: This pattern works for small to medium apps (~100K lines)

### When to Consider Alternatives
- **Large apps** (200K+ lines): Consider Redux, Zustand, or Jotai
- **Real-time data**: Consider Tanstack Query or SWR
- **Complex workflows**: Consider state machines (XState)
- **Deep nesting**: Consider atomic state management

---

## Resources

- [React Context API Docs](https://react.dev/reference/react/useContext)
- [useReducer Hook](https://react.dev/reference/react/useReducer)
- [useMemo Hook](https://react.dev/reference/react/useMemo)
- [useCallback Hook](https://react.dev/reference/react/useCallback)
- [Context Performance Tips](https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions)
