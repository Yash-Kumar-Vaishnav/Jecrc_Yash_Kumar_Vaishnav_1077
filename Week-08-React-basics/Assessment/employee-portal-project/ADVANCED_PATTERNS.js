// ============================================================================
// ADVANCED CONTEXT API PATTERNS & EXAMPLES
// Real-world use cases and advanced techniques
// ============================================================================

/**
 * PATTERN 1: Devtools Integration
 * Enable time-travel debugging for your context state
 */
function useContextDevtools(contextName, state, dispatch) {
  React.useEffect(() => {
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      const extension = window.__REDUX_DEVTOOLS_EXTENSION__;
      const devtools = extension({
        name: contextName,
        trace: true,
      });

      // Initial state
      devtools.init(state);

      // Subscribe to actions (via dispatch wrapper)
      // This would need a custom dispatch implementation
    }
  }, [state, contextName]);
}

/**
 * PATTERN 2: Composite Contexts (Multiple Related States)
 * Group related state management without creating too many contexts
 */

// Instead of separate contexts, combine related domains
const CompositeAppContext = React.createContext(null);

function compositeReducer(state, action) {
  const [auth, theme, employees] = state;

  switch (action.context) {
    case 'AUTH':
      return [authReducer(auth, action), theme, employees];
    case 'THEME':
      return [auth, themeReducer(theme, action), employees];
    case 'EMPLOYEES':
      return [auth, theme, employeeReducer(employees, action)];
    default:
      return state;
  }
}

function CompositeAppProvider({ children }) {
  const [state, dispatch] = useReducer(compositeReducer, [
    { isAuthenticated: false, user: null },
    { isDark: false },
    { employees: [], filter: 'all' },
  ]);

  const [authState, themeState, employeeState] = state;

  const value = useMemo(() => ({
    auth: authState,
    theme: themeState,
    employees: employeeState,
    dispatch,
  }), [authState, themeState, employeeState]);

  return (
    <CompositeAppContext.Provider value={value}>
      {children}
    </CompositeAppContext.Provider>
  );
}

/**
 * PATTERN 3: Async Actions with Thunks
 * Handle async operations (API calls) within context
 */

function createAsyncEmployeeContext() {
  const EmployeeContext = React.createContext(null);

  function employeeReducerWithAsync(state, action) {
    switch (action.type) {
      case 'FETCH_START':
        return { ...state, loading: true, error: null };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, employees: action.payload };
      case 'FETCH_ERROR':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function AsyncEmployeeProvider({ children }) {
    const [state, dispatch] = useReducer(employeeReducerWithAsync, {
      employees: [],
      loading: false,
      error: null,
    });

    // Thunk-style async action
    const fetchEmployees = useCallback(async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        // Simulate API call
        const response = await fetch('/api/employees');
        const data = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    }, []);

    const value = useMemo(() => ({
      ...state,
      fetchEmployees,
    }), [state, fetchEmployees]);

    return (
      <EmployeeContext.Provider value={value}>
        {children}
      </EmployeeContext.Provider>
    );
  }

  return { EmployeeContext, AsyncEmployeeProvider };
}

/**
 * PATTERN 4: Middleware Pattern
 * Intercept and modify actions before they reach the reducer
 */

function createContextWithMiddleware(initialState, reducer, middlewares = []) {
  const Context = React.createContext(null);

  function Provider({ children }) {
    const [state, baseDispatch] = useReducer(reducer, initialState);

    // Create dispatch with middleware
    const dispatch = useCallback((action) => {
      let finalAction = action;

      // Apply middlewares in order
      for (const middleware of middlewares) {
        finalAction = middleware(finalAction, state);
      }

      baseDispatch(finalAction);
    }, [state, middlewares]);

    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    );
  }

  return { Context, Provider };
}

// Example middleware for logging
const loggingMiddleware = (action, state) => {
  console.log('Action:', action.type, 'Payload:', action.payload);
  return action;
};

// Example middleware for validation
const validationMiddleware = (action) => {
  if (!action.type) {
    throw new Error('Action must have a type');
  }
  return action;
};

/**
 * PATTERN 5: Derived State (Computed Context Values)
 * Create computed values that update reactively
 */

function EmployeeContextWithDerivedState() {
  const EmployeeContext = React.createContext(null);

  function EmployeeProvider({ children }) {
    const [state, dispatch] = useReducer(employeeReducer, initialState);

    // Derived state: various computations
    const derivedState = useMemo(() => ({
      // Filtering
      activeEmployees: state.employees.filter(e => e.status === 'Active'),
      
      // Grouping
      employeesByDepartment: state.employees.reduce((acc, emp) => {
        if (!acc[emp.department]) acc[emp.department] = [];
        acc[emp.department].push(emp);
        return acc;
      }, {}),
      
      // Aggregation
      stats: {
        total: state.employees.length,
        active: state.employees.filter(e => e.status === 'Active').length,
        averageTenure: calculateAverageTenure(state.employees),
      },
      
      // Search
      searchResults: state.searchTerm
        ? state.employees.filter(e =>
            e.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            e.email.toLowerCase().includes(state.searchTerm.toLowerCase())
          )
        : [],
    }), [state]);

    const value = useMemo(() => ({
      ...state,
      ...derivedState,
      dispatch,
    }), [state, derivedState]);

    return (
      <EmployeeContext.Provider value={value}>
        {children}
      </EmployeeContext.Provider>
    );
  }

  return { EmployeeContext, EmployeeProvider };
}

/**
 * PATTERN 6: Selective Context Updates
 * Only re-render consumers that use changed parts of state
 * (Multiple contexts approach)
 */

const EmployeeDataContext = React.createContext(null);
const EmployeeActionsContext = React.createContext(null);

function SeparatedEmployeeProvider({ children }) {
  const [employees, dispatch] = useReducer(employeeReducer, []);

  // Stable reference for actions
  const actions = useMemo(() => ({
    addEmployee: (emp) => dispatch({ type: 'ADD_EMPLOYEE', payload: emp }),
    deleteEmployee: (id) => dispatch({ type: 'DELETE_EMPLOYEE', payload: id }),
    updateEmployee: (emp) => dispatch({ type: 'UPDATE_EMPLOYEE', payload: emp }),
  }), []);

  return (
    // Data context can change frequently
    <EmployeeDataContext.Provider value={employees}>
      {/* Actions context has stable reference */}
      <EmployeeActionsContext.Provider value={actions}>
        {children}
      </EmployeeActionsContext.Provider>
    </EmployeeDataContext.Provider>
  );
}

// Components can subscribe to only what they need
function EmployeeList() {
  // Only re-renders when employees change
  const employees = React.useContext(EmployeeDataContext);
  return <div>{employees.map(e => <div key={e.id}>{e.name}</div>)}</div>;
}

function EmployeeActions() {
  // Only uses actions (never changes), doesn't re-render from data changes
  const { addEmployee } = React.useContext(EmployeeActionsContext);
  return <button onClick={() => addEmployee({})}>Add</button>;
}

/**
 * PATTERN 7: Context with useImmer for Immutable Updates
 * Simplified immutable state updates using Immer
 */

function EmployeeContextWithImmer() {
  const EmployeeContext = React.createContext(null);

  function immerReducer(state, action) {
    const produce = (draft) => {
      switch (action.type) {
        case 'ADD_EMPLOYEE':
          draft.employees.push(action.payload);
          break;
        case 'UPDATE_EMPLOYEE':
          const emp = draft.employees.find(e => e.id === action.payload.id);
          if (emp) Object.assign(emp, action.payload);
          break;
        case 'DELETE_EMPLOYEE':
          const index = draft.employees.findIndex(e => e.id === action.payload);
          if (index > -1) draft.employees.splice(index, 1);
          break;
      }
    };

    // Using a hypothetical produce function (would need Immer library)
    return produceState(state, produce);
  }

  // Usage would be cleaner without manual spread operators
}

/**
 * PATTERN 8: Dynamic Context Creation
 * Create multiple contexts on-the-fly (for multi-tenant apps)
 */

function createDynamicContextFactory() {
  const contexts = new Map();

  function getOrCreateContext(tenantId) {
    if (!contexts.has(tenantId)) {
      contexts.set(tenantId, React.createContext(null));
    }
    return contexts.get(tenantId);
  }

  function DynamicProvider({ tenantId, children }) {
    const context = getOrCreateContext(tenantId);
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => ({ state, dispatch }), [state]);

    return (
      <context.Provider value={value}>
        {children}
      </context.Provider>
    );
  }

  function useDynamicContext(tenantId) {
    const context = getOrCreateContext(tenantId);
    return React.useContext(context);
  }

  return { DynamicProvider, useDynamicContext };
}

/**
 * PATTERN 9: Conditional Context Provider
 * Create providers conditionally based on app state
 */

function ConditionalProviders({ children }) {
  const [authMode, setAuthMode] = React.useState('local'); // 'local' or 'remote'

  // Use different providers based on mode
  if (authMode === 'local') {
    return (
      <LocalAuthProvider>
        <DashboardProvider>
          {children}
        </DashboardProvider>
      </LocalAuthProvider>
    );
  }

  return (
    <RemoteAuthProvider>
      <RemoteDashboardProvider>
        {children}
      </RemoteDashboardProvider>
    </RemoteAuthProvider>
  );
}

/**
 * PATTERN 10: Context with localStorage Persistence
 * Persist state to localStorage and restore on mount
 */

function createPersistentContext(key, initialState, reducer) {
  const Context = React.createContext(null);

  function Provider({ children }) {
    // Initialize from localStorage
    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
      try {
        const persisted = localStorage.getItem(key);
        return persisted ? JSON.parse(persisted) : initial;
      } catch {
        return initial;
      }
    });

    // Persist to localStorage on state change
    React.useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    const value = useMemo(() => ({ state, dispatch }), [state]);

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    );
  }

  return { Context, Provider };
}

/**
 * PATTERN 11: Batch Updates with Context
 * Dispatch multiple actions atomically
 */

function createBatchableContext(initialState, reducer) {
  const Context = React.createContext(null);

  function Provider({ children }) {
    const [state, baseDispatch] = useReducer(reducer, initialState);
    const [batchQueue, setBatchQueue] = React.useState([]);
    const [isBatching, setIsBatching] = React.useState(false);

    const dispatch = useCallback((action) => {
      if (isBatching) {
        setBatchQueue(prev => [...prev, action]);
      } else {
        baseDispatch(action);
      }
    }, [isBatching]);

    const batch = useCallback((callback) => {
      setIsBatching(true);
      callback(dispatch);
      setIsBatching(false);

      // Flush all queued actions
      batchQueue.forEach(action => baseDispatch(action));
      setBatchQueue([]);
    }, [batchQueue, dispatch]);

    const value = useMemo(() => ({
      state,
      dispatch,
      batch,
    }), [state, dispatch, batch]);

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    );
  }

  return { Context, Provider };
}

// Usage:
// const { batch, dispatch } = useContext(MyContext);
// batch((dispatch) => {
//   dispatch({ type: 'ACTION_1' });
//   dispatch({ type: 'ACTION_2' });
//   dispatch({ type: 'ACTION_3' });
// }); // All three actions processed together

/**
 * PATTERN 12: Error Boundary with Context
 * Capture errors in context and display them
 */

class ContextErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Context Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * PATTERN 13: useReducer with Pre/Post Hooks
 * Execute side effects before/after state updates
 */

function createContextWithHooks(initialState, reducer) {
  const Context = React.createContext(null);

  function Provider({ children, onBeforeAction, onAfterAction }) {
    const [state, baseDispatch] = useReducer(reducer, initialState);

    const dispatch = useCallback((action) => {
      // Pre-dispatch hook
      onBeforeAction?.(action, state);

      // Update state
      const newState = reducer(state, action);

      // Post-dispatch hook
      onAfterAction?.(action, state, newState);

      baseDispatch(action);
    }, [reducer, state, onBeforeAction, onAfterAction]);

    const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
      <Context.Provider value={value}>
        {children}
      </Context.Provider>
    );
  }

  return { Context, Provider };
}

/**
 * PATTERN 14: Context Composition (Wrapper Pattern)
 * Combine multiple contexts into a single provider
 */

function createComposedProvider(...providers) {
  return function ComposedProvider({ children }) {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    );
  };
}

// Usage:
// const AppProvider = createComposedProvider(
//   AuthProvider,
//   ThemeProvider,
//   EmployeeProvider,
//   DashboardProvider
// );
//
// <AppProvider>
//   <App />
// </AppProvider>

/**
 * PATTERN 15: Context Splitting for Performance
 * Split large contexts to avoid unnecessary re-renders
 */

// Instead of one large context:
// { user, theme, employees, dashboard }

// Create separate contexts:
const UserContext = React.createContext(null);
const ThemeContext = React.createContext(null);
const EmployeeDataContext = React.createContext(null);
const DashboardContext = React.createContext(null);

function OptimizedProvider({ children }) {
  // User rarely changes
  const [user] = useReducer(userReducer, null);
  const userValue = useMemo(() => user, [user]);

  // Theme changes independently
  const [theme, themeDispatch] = useReducer(themeReducer, {});
  const themeValue = useMemo(() => ({ ...theme, dispatch: themeDispatch }), [theme]);

  // Employees change frequently
  const [employees, employeeDispatch] = useReducer(employeeReducer, []);
  const employeeValue = useMemo(() => ({ employees, dispatch: employeeDispatch }), [employees]);

  return (
    <UserContext.Provider value={userValue}>
      <ThemeContext.Provider value={themeValue}>
        <EmployeeDataContext.Provider value={employeeValue}>
          {children}
        </EmployeeDataContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// Components only subscribe to what they need:
function UserGreeting() {
  const user = React.useContext(UserContext); // Re-renders only when user changes
  return <h1>Welcome, {user?.name}</h1>;
}

function ThemeToggle() {
  const { isDark, dispatch } = React.useContext(ThemeContext); // Re-renders on theme change only
  return <button onClick={() => dispatch({ type: 'TOGGLE' })}>Theme</button>;
}

function EmployeeList() {
  const { employees } = React.useContext(EmployeeDataContext); // Re-renders on employee changes only
  return <ul>{employees.map(e => <li key={e.id}>{e.name}</li>)}</ul>;
}

/**
 * HELPER: Calculate average tenure
 */
function calculateAverageTenure(employees) {
  if (employees.length === 0) return 0;

  const total = employees.reduce((sum, emp) => {
    const joinDate = new Date(emp.joinDate);
    const now = new Date();
    const years = (now - joinDate) / (1000 * 60 * 60 * 24 * 365);
    return sum + years;
  }, 0);

  return (total / employees.length).toFixed(1);
}

export {
  createAsyncEmployeeContext,
  createContextWithMiddleware,
  createPersistentContext,
  createBatchableContext,
  createDynamicContextFactory,
  createComposedProvider,
  CompositeAppProvider,
  SeparatedEmployeeProvider,
  ConditionalProviders,
  OptimizedProvider,
  ContextErrorBoundary,
  loggingMiddleware,
  validationMiddleware,
};
