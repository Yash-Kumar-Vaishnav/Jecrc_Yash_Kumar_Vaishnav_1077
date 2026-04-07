import React, { 
  createContext, 
  useContext, 
  useReducer, 
  useCallback, 
  useMemo,
  ReactNode 
} from 'react';

// ============================================================================
// CONTEXT DEFINITIONS - Global State Management
// ============================================================================

// Auth Context - Handles authentication state
const AuthContext = createContext(null);

// Theme Context - Handles light/dark theme
const ThemeContext = createContext(null);

// Employee Context - Handles employee data (CRUD operations)
const EmployeeContext = createContext(null);

// Dashboard Context - Handles dashboard state (analytics, settings)
const DashboardContext = createContext(null);

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

const INITIAL_EMPLOYEES = [
  { 
    id: '1', 
    name: 'Alice Johnson', 
    email: 'alice@company.com', 
    role: 'Senior Developer', 
    department: 'Engineering',
    joinDate: '2021-03-15',
    status: 'Active'
  },
  { 
    id: '2', 
    name: 'Bob Smith', 
    email: 'bob@company.com', 
    role: 'Product Manager', 
    department: 'Product',
    joinDate: '2020-07-20',
    status: 'Active'
  },
  { 
    id: '3', 
    name: 'Carol Williams', 
    email: 'carol@company.com', 
    role: 'Designer', 
    department: 'Design',
    joinDate: '2022-01-10',
    status: 'Active'
  },
];

// ============================================================================
// REDUCER FUNCTIONS - Pure, testable state logic
// ============================================================================

// Auth Reducer
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

// Theme Reducer
function themeReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDark: !state.isDark,
      };
    case 'SET_THEME':
      return {
        ...state,
        isDark: action.payload,
      };
    default:
      return state;
  }
}

// Employee Reducer - Handles CRUD operations
function employeeReducer(state, action) {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      return {
        ...state,
        employees: action.payload,
        loading: false,
      };
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
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}

// Dashboard Reducer
function dashboardReducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload,
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    case 'UPDATE_ANALYTICS':
      return {
        ...state,
        analytics: action.payload,
      };
    default:
      return state;
  }
}

// ============================================================================
// CONTEXT PROVIDERS
// ============================================================================

function AuthProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
    error: null,
  });

  const login = useCallback((email, password) => {
    // Simulate login validation
    if (email && password) {
      authDispatch({
        type: 'LOGIN',
        payload: { email, name: 'John Doe' },
      });
    } else {
      authDispatch({
        type: 'SET_ERROR',
        payload: 'Invalid credentials',
      });
    }
  }, []);

  const logout = useCallback(() => {
    authDispatch({ type: 'LOGOUT' });
  }, []);

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
}

function ThemeProvider({ children }) {
  const [themeState, themeDispatch] = useReducer(themeReducer, {
    isDark: false,
  });

  const toggleTheme = useCallback(() => {
    themeDispatch({ type: 'TOGGLE_THEME' });
  }, []);

  const setTheme = useCallback((isDark) => {
    themeDispatch({ type: 'SET_THEME', payload: isDark });
  }, []);

  const value = useMemo(() => ({
    ...themeState,
    toggleTheme,
    setTheme,
  }), [themeState, toggleTheme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function EmployeeProvider({ children }) {
  const [employeeState, employeeDispatch] = useReducer(employeeReducer, {
    employees: INITIAL_EMPLOYEES,
    loading: false,
    filter: 'all',
    lastAction: null,
  });

  const addEmployee = useCallback((employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now().toString(),
    };
    employeeDispatch({ type: 'ADD_EMPLOYEE', payload: newEmployee });
  }, []);

  const updateEmployee = useCallback((employee) => {
    employeeDispatch({ type: 'UPDATE_EMPLOYEE', payload: employee });
  }, []);

  const deleteEmployee = useCallback((id) => {
    employeeDispatch({ type: 'DELETE_EMPLOYEE', payload: id });
  }, []);

  const setFilter = useCallback((filter) => {
    employeeDispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const filteredEmployees = useMemo(() => {
    if (employeeState.filter === 'all') return employeeState.employees;
    return employeeState.employees.filter(emp => 
      emp.department.toLowerCase() === employeeState.filter.toLowerCase()
    );
  }, [employeeState.employees, employeeState.filter]);

  const value = useMemo(() => ({
    ...employeeState,
    filteredEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    setFilter,
  }), [employeeState, filteredEmployees, addEmployee, updateEmployee, deleteEmployee, setFilter]);

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}

function DashboardProvider({ children }) {
  const { employees } = useContext(EmployeeContext);

  const [dashboardState, dashboardDispatch] = useReducer(dashboardReducer, {
    activeTab: 'analytics',
    settings: {
      emailNotifications: true,
      darkMode: false,
      autoSave: true,
    },
    analytics: {
      totalEmployees: 0,
      activeEmployees: 0,
      departments: {},
    },
  });

  const setActiveTab = useCallback((tab) => {
    dashboardDispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  }, []);

  const updateSettings = useCallback((settings) => {
    dashboardDispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  }, []);

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
  }, [employees]);

  const value = useMemo(() => ({
    ...dashboardState,
    analytics,
    setActiveTab,
    updateSettings,
  }), [dashboardState, analytics, setActiveTab, updateSettings]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

// ============================================================================
// CUSTOM HOOKS - Convenient context access
// ============================================================================

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within EmployeeProvider');
  }
  return context;
}

function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}

// ============================================================================
// COMPONENTS
// ============================================================================

// Login Component
function LoginPage() {
  const { login, error } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h1 style={styles.loginTitle}>Employee Portal</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@company.com"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={styles.input}
            />
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <button type="submit" style={styles.loginBtn}>
            Sign In
          </button>
          <p style={styles.hint}>Demo: Use any email and password</p>
        </form>
      </div>
    </div>
  );
}

// Header Component
function Header() {
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div style={{...styles.header, backgroundColor: isDark ? '#1a1a1a' : '#fff'}}>
      <div style={styles.headerContent}>
        <h1 style={styles.logo}>📊 Portal</h1>
        <div style={styles.headerRight}>
          <span style={{...styles.userInfo, color: isDark ? '#fff' : '#000'}}>
            {user?.name}
          </span>
          <button
            onClick={toggleTheme}
            style={{...styles.themeBtn, backgroundColor: isDark ? '#333' : '#f0f0f0'}}
            title="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <button onClick={logout} style={styles.logoutBtn}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// Analytics Component
function Analytics() {
  const { analytics } = useDashboard();

  return (
    <div style={styles.analyticsContainer}>
      <h2 style={styles.sectionTitle}>Analytics Dashboard</h2>
      <div style={styles.metricsGrid}>
        <MetricCard 
          label="Total Employees" 
          value={analytics.totalEmployees}
          icon="👥"
        />
        <MetricCard 
          label="Active Employees" 
          value={analytics.activeEmployees}
          icon="✅"
        />
        <MetricCard 
          label="Departments" 
          value={Object.keys(analytics.departments).length}
          icon="🏢"
        />
      </div>
      
      <div style={styles.departmentSection}>
        <h3 style={styles.subsectionTitle}>Employees by Department</h3>
        <div style={styles.departmentList}>
          {Object.entries(analytics.departments).map(([dept, count]) => (
            <div key={dept} style={styles.departmentItem}>
              <span style={{fontWeight: 500}}>{dept}</span>
              <span style={styles.departmentBadge}>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon }) {
  return (
    <div style={styles.metricCard}>
      <div style={styles.metricIcon}>{icon}</div>
      <div style={styles.metricLabel}>{label}</div>
      <div style={styles.metricValue}>{value}</div>
    </div>
  );
}

// Employee Management Component
function EmployeeManagement() {
  const { 
    filteredEmployees, 
    addEmployee, 
    updateEmployee, 
    deleteEmployee,
    setFilter,
    filter 
  } = useEmployees();
  
  const [isAddingEmployee, setIsAddingEmployee] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    role: '',
    department: '',
    joinDate: '',
  });

  const departments = ['Engineering', 'Product', 'Design', 'Sales', 'HR'];

  const handleAddClick = () => {
    setIsAddingEmployee(true);
    setFormData({
      name: '',
      email: '',
      role: '',
      department: '',
      joinDate: '',
    });
  };

  const handleSave = () => {
    if (editingId) {
      updateEmployee({ ...formData, id: editingId, status: 'Active' });
      setEditingId(null);
    } else {
      addEmployee({ ...formData, status: 'Active' });
    }
    setIsAddingEmployee(false);
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setEditingId(employee.id);
    setIsAddingEmployee(true);
  };

  return (
    <div style={styles.employeeSection}>
      <div style={styles.employeeHeader}>
        <h2 style={styles.sectionTitle}>Employee Records</h2>
        <button onClick={handleAddClick} style={styles.addBtn}>
          + Add Employee
        </button>
      </div>

      {isAddingEmployee && (
        <div style={styles.form}>
          <h3>{editingId ? 'Edit Employee' : 'New Employee'}</h3>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                style={styles.input}
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Join Date</label>
              <input
                type="date"
                value={formData.joinDate}
                onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.formButtons}>
            <button onClick={handleSave} style={styles.saveBtn}>
              {editingId ? 'Update' : 'Create'}
            </button>
            <button
              onClick={() => {
                setIsAddingEmployee(false);
                setEditingId(null);
              }}
              style={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div style={styles.filterButtons}>
        <button
          onClick={() => setFilter('all')}
          style={{
            ...styles.filterBtn,
            backgroundColor: filter === 'all' ? '#2c3e50' : '#ecf0f1',
            color: filter === 'all' ? '#fff' : '#000',
          }}
        >
          All
        </button>
        {departments.map(dept => (
          <button
            key={dept}
            onClick={() => setFilter(dept)}
            style={{
              ...styles.filterBtn,
              backgroundColor: filter === dept ? '#2c3e50' : '#ecf0f1',
              color: filter === dept ? '#fff' : '#000',
            }}
          >
            {dept}
          </button>
        ))}
      </div>

      <div style={styles.employeeList}>
        {filteredEmployees.map(employee => (
          <div key={employee.id} style={styles.employeeCard}>
            <div style={styles.employeeInfo}>
              <h4 style={styles.employeeName}>{employee.name}</h4>
              <p style={styles.employeeDetail}>{employee.role}</p>
              <p style={styles.employeeDetail}>{employee.email}</p>
              <p style={styles.employeeDetail}>
                <strong>Department:</strong> {employee.department}
              </p>
              <p style={styles.employeeDetail}>
                <strong>Joined:</strong> {new Date(employee.joinDate).toLocaleDateString()}
              </p>
            </div>
            <div style={styles.employeeActions}>
              <button
                onClick={() => handleEdit(employee)}
                style={styles.editBtn}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteEmployee(employee.id)}
                style={styles.deleteBtn}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Settings Component
function Settings() {
  const { settings, updateSettings } = useDashboard();

  const handleToggleSetting = (key) => {
    updateSettings({
      [key]: !settings[key],
    });
  };

  return (
    <div style={styles.settingsSection}>
      <h2 style={styles.sectionTitle}>Settings</h2>
      <div style={styles.settingsList}>
        <div style={styles.settingItem}>
          <div style={styles.settingLabel}>
            <h4>Email Notifications</h4>
            <p style={styles.settingDescription}>
              Receive email updates about employee changes
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={() => handleToggleSetting('emailNotifications')}
            style={styles.checkbox}
          />
        </div>

        <div style={styles.settingItem}>
          <div style={styles.settingLabel}>
            <h4>Auto-save</h4>
            <p style={styles.settingDescription}>
              Automatically save changes as you edit
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.autoSave}
            onChange={() => handleToggleSetting('autoSave')}
            style={styles.checkbox}
          />
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  const { activeTab, setActiveTab } = useDashboard();

  return (
    <div style={styles.dashboard}>
      <div style={styles.tabs}>
        {['analytics', 'employees', 'settings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tab,
              borderBottomColor: activeTab === tab ? '#2c3e50' : 'transparent',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div style={styles.tabContent}>
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'employees' && <EmployeeManagement />}
        {activeTab === 'settings' && <Settings />}
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <EmployeeProvider>
          <DashboardProvider>
            <AppContent />
          </DashboardProvider>
        </EmployeeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();

  const containerStyle = {
    ...styles.container,
    backgroundColor: isDark ? '#0f0f0f' : '#fff',
    color: isDark ? '#fff' : '#000',
  };

  return (
    <div style={containerStyle}>
      {!isAuthenticated ? (
        <LoginPage />
      ) : (
        <>
          <Header />
          <div style={styles.mainContent}>
            <Dashboard />
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = {
  container: {
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    transition: 'all 0.3s ease',
  },

  // Login Styles
  loginContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  loginBox: {
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '10px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
  },
  loginTitle: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '2rem',
    fontSize: '28px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#2c3e50',
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #bdc3c7',
    borderRadius: '5px',
    fontSize: '14px',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s',
  },
  error: {
    color: '#e74c3c',
    fontSize: '14px',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#fadbd8',
    borderRadius: '5px',
  },
  loginBtn: {
    padding: '12px 16px',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '0.5rem',
  },
  hint: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#7f8c8d',
    margin: '0.5rem 0 0',
  },

  // Header Styles
  header: {
    borderBottom: '1px solid #ecf0f1',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    color: '#667eea',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  userInfo: {
    fontSize: '14px',
    fontWeight: '500',
  },
  themeBtn: {
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'all 0.3s',
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.3s',
  },

  // Main Content Styles
  mainContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  dashboard: {
    backgroundColor: 'transparent',
  },
  tabs: {
    display: 'flex',
    gap: '2rem',
    borderBottom: '1px solid #ecf0f1',
    marginBottom: '2rem',
  },
  tab: {
    padding: '1rem 0',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
    color: '#7f8c8d',
    transition: 'all 0.3s',
  },
  tabContent: {
    animation: 'fadeIn 0.3s ease-in',
  },

  // Analytics Styles
  analyticsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: '0 0 1rem',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  metricCard: {
    padding: '1.5rem',
    backgroundColor: '#ecf0f1',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  metricIcon: {
    fontSize: '32px',
    marginBottom: '0.5rem',
  },
  metricLabel: {
    fontSize: '13px',
    color: '#7f8c8d',
    marginBottom: '0.5rem',
  },
  metricValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  departmentSection: {
    marginTop: '1.5rem',
  },
  subsectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  departmentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  departmentItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    borderLeft: '4px solid #667eea',
  },
  departmentBadge: {
    backgroundColor: '#667eea',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },

  // Employee Management Styles
  employeeSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  employeeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addBtn: {
    padding: '10px 20px',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.3s',
  },
  filterButtons: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  filterBtn: {
    padding: '8px 16px',
    border: '1px solid #bdc3c7',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.3s',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem',
  },
  formButtons: {
    display: 'flex',
    gap: '1rem',
  },
  saveBtn: {
    padding: '10px 20px',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  cancelBtn: {
    padding: '10px 20px',
    backgroundColor: '#95a5a6',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  employeeList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  employeeCard: {
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    borderLeft: '4px solid #667eea',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  employeeName: {
    margin: '0 0 0.5rem',
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c3e50',
  },
  employeeDetail: {
    margin: '0.25rem 0',
    fontSize: '13px',
    color: '#7f8c8d',
  },
  employeeInfo: {
    flex: 1,
  },
  employeeActions: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.5rem',
  },
  editBtn: {
    flex: 1,
    padding: '8px 12px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
  },
  deleteBtn: {
    flex: 1,
    padding: '8px 12px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
  },

  // Settings Styles
  settingsSection: {
    maxWidth: '600px',
  },
  settingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  settingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    gap: '1rem',
  },
  settingLabel: {
    flex: 1,
  },
  settingDescription: {
    margin: '0.25rem 0 0',
    fontSize: '13px',
    color: '#7f8c8d',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    marginTop: '0.25rem',
  },
};
