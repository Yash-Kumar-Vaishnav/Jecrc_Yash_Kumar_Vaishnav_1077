# Employee Portal - Advanced Context API

A production-grade Internal Employee Portal built with React and Advanced Context API patterns. This project demonstrates best practices for global state management, performance optimization, and enterprise-level React architecture.

## 📋 Project Overview

### Features
✅ **Authentication System** - Login/Logout with Context
✅ **Theme Management** - Light/Dark mode toggle
✅ **Employee CRUD** - Create, Read, Update, Delete employees
✅ **Advanced Filtering** - Filter employees by department
✅ **Dashboard Analytics** - Real-time employee statistics
✅ **Settings Management** - User preference management
✅ **Performance Optimized** - Memoization and proper dependency management
✅ **Clean Architecture** - Separation of concerns with multiple contexts

### Technology Stack
- **React 18** - UI framework
- **React Hooks** - useReducer, useContext, useMemo, useCallback
- **Context API** - Global state management
- **Pure CSS** - No external styling libraries

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- VS Code (recommended)

### Step 1: Extract Project Files

```bash
# Navigate to your desired directory
cd ~/projects

# The project folder is ready to use
cd employee-portal-project
```

### Step 2: Install Dependencies

```bash
npm install
```

**What this does:**
- Downloads React and react-scripts
- Creates `node_modules` folder
- Generates `package-lock.json` for dependency tracking

### Step 3: Start Development Server

```bash
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view employee-portal in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

### Step 4: Open in Browser

The app will automatically open at `http://localhost:3000`

### Step 5: Test the Application

1. **Login Page**
   - Enter any email: `user@company.com`
   - Enter any password: `password`
   - Click "Sign In"

2. **Dashboard Features**
   - **Analytics Tab**: View employee statistics and department breakdown
   - **Employees Tab**: Create, edit, delete employees with filtering
   - **Settings Tab**: Toggle notification and auto-save preferences

3. **Theme Toggle**
   - Click the 🌙 moon icon in header to switch to dark mode
   - Click the ☀️ sun icon to switch back to light mode

## 📁 Project Structure

```
employee-portal-project/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── App.jsx                 # Main app component with all contexts
│   └── index.js                # React entry point
├── package.json                # Dependencies and scripts
├── CONTEXT_API_GUIDE.md        # Comprehensive documentation
├── ADVANCED_PATTERNS.js        # Advanced usage patterns (reference)
└── README.md                   # This file
```

## 🏗️ Architecture Overview

### Context Hierarchy
```
App (Root)
├── AuthProvider
│   ├── ThemeProvider
│   │   ├── EmployeeProvider
│   │   │   └── DashboardProvider
│   │   │       └── AppContent (Dashboard/Login)
```

### Contexts Explained

#### 1. **AuthContext** - User Authentication
- **State**: `isAuthenticated`, `user`, `error`
- **Actions**: `login()`, `logout()`
- **Hook**: `useAuth()`

#### 2. **ThemeContext** - Theme Management
- **State**: `isDark` (boolean)
- **Actions**: `toggleTheme()`, `setTheme(isDark)`
- **Hook**: `useTheme()`

#### 3. **EmployeeContext** - Employee Data Management
- **State**: `employees`, `filteredEmployees`, `filter`, `loading`
- **Actions**: `addEmployee()`, `updateEmployee()`, `deleteEmployee()`, `setFilter()`
- **Hook**: `useEmployees()`

#### 4. **DashboardContext** - Dashboard State
- **State**: `activeTab`, `settings`, `analytics`
- **Actions**: `setActiveTab()`, `updateSettings()`
- **Hook**: `useDashboard()`

## 🎯 Key Concepts Demonstrated

### 1. useReducer Pattern
```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```
- Pure, testable state logic
- Predictable state transitions
- Easy to debug

### 2. Performance Optimization
```javascript
// Memoize context value
const value = useMemo(() => ({ ...state, actions }), [state, actions]);

// Memoize callbacks
const addEmployee = useCallback((emp) => {
  dispatch({ type: 'ADD_EMPLOYEE', payload: emp });
}, []);

// Memoize computed values
const filteredEmployees = useMemo(() => {
  return employees.filter(emp => emp.department === filter);
}, [employees, filter]);
```

### 3. Custom Hooks for Context Access
```javascript
function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be within EmployeeProvider');
  }
  return context;
}
```

### 4. Computed State (Analytics)
```javascript
const analytics = useMemo(() => ({
  totalEmployees: employees.length,
  activeEmployees: employees.filter(e => e.status === 'Active').length,
  departments: groupByDepartment(employees),
}), [employees]);
```

## 📚 File Descriptions

### `src/App.jsx`
- **Size**: ~700 lines
- **Contains**:
  - All 4 context definitions
  - All 4 reducer functions
  - All 4 provider components
  - 5 custom hooks (useAuth, useTheme, useEmployees, useDashboard, AppContent)
  - 8 UI components (LoginPage, Header, Dashboard, Analytics, etc.)
  - Inline styles (no CSS files needed)

### `CONTEXT_API_GUIDE.md`
- **Comprehensive guide** covering:
  - Architecture overview
  - Each context in detail
  - Reducer patterns
  - Performance optimization techniques
  - Best practices
  - Testing strategies
  - Common pitfalls

### `ADVANCED_PATTERNS.js`
- **Reference file** with 15 advanced patterns:
  1. Devtools integration
  2. Composite contexts
  3. Async actions with thunks
  4. Middleware pattern
  5. Derived state
  6. Selective updates
  7. useImmer integration
  8. Dynamic context creation
  9. Conditional providers
  10. localStorage persistence
  11. Batch updates
  12. Error boundaries
  13. Pre/post hooks
  14. Context composition
  15. Performance splitting

## 🔍 Sample User Data

The app comes pre-loaded with 3 employees:

| ID | Name | Email | Role | Department |
|---|---|---|---|---|
| 1 | Alice Johnson | alice@company.com | Senior Developer | Engineering |
| 2 | Bob Smith | bob@company.com | Product Manager | Product |
| 3 | Carol Williams | carol@company.com | Designer | Design |

You can add, edit, and delete employees freely. Data persists during the session (in-memory).

## 🧪 Testing Commands

```bash
# Run tests (if configured)
npm test

# Build for production
npm build

# Eject configuration (one-way, not recommended)
npm eject
```

## 🐛 Troubleshooting

### Issue: "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org/

### Issue: Port 3000 already in use
**Solution**:
```bash
# Use a different port
PORT=3001 npm start

# Or kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue: "Module not found" errors
**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: App won't start
**Solution**:
```bash
# Check your Node version
node --version  # Should be v14+

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install
```

## 🎓 Learning Path

### Beginner
1. Understand the login flow (AuthContext)
2. Explore theme toggle (ThemeContext)
3. Try adding/deleting employees (EmployeeContext)

### Intermediate
1. Study the reducer functions (pure functions)
2. Understand memoization benefits
3. Examine the filtering logic (useMemo)

### Advanced
1. Read `CONTEXT_API_GUIDE.md` thoroughly
2. Review `ADVANCED_PATTERNS.js` for alternative approaches
3. Try implementing patterns like:
   - localStorage persistence
   - Async actions
   - Middleware
   - Error boundaries

## 💡 Key Learnings

### Why Multiple Contexts?
✅ **Separation of Concerns** - Each context has one responsibility
✅ **Scalability** - Easy to add new features
✅ **Testability** - Can test reducers independently
✅ **Performance** - Components only re-render when their context changes

### Why useReducer?
✅ **Predictability** - All state changes go through defined actions
✅ **Debugging** - Clear action history
✅ **Complexity** - Scales well with complex state logic
✅ **Testing** - Pure functions are easy to test

### Why useMemo & useCallback?
✅ **Performance** - Prevent unnecessary re-renders
✅ **Reference Equality** - Functions/values maintain same reference
✅ **Child Optimization** - Can use React.memo on children
✅ **Large Apps** - Critical for scaling

## 📖 References

### Official Documentation
- [React Context API](https://react.dev/reference/react/useContext)
- [useReducer Hook](https://react.dev/reference/react/useReducer)
- [useMemo Hook](https://react.dev/reference/react/useMemo)
- [useCallback Hook](https://react.dev/reference/react/useCallback)

### Additional Resources
- `CONTEXT_API_GUIDE.md` - In-depth guide in this project
- `ADVANCED_PATTERNS.js` - Code examples of advanced techniques

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

Creates an optimized build in the `build/` folder.

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag-and-drop 'build' folder to netlify.com
```

## 📝 Code Quality

### Naming Conventions
- **Context**: `*Context` (e.g., `AuthContext`)
- **Providers**: `*Provider` (e.g., `AuthProvider`)
- **Hooks**: `use*` (e.g., `useAuth()`)
- **Reducers**: `*Reducer` (e.g., `authReducer`)

### Best Practices Implemented
✅ All contexts are memoized
✅ All callbacks use useCallback
✅ Computed values use useMemo
✅ Custom hooks validate provider existence
✅ Reducers are pure functions
✅ No prop drilling (use contexts instead)
✅ Clear separation of concerns
✅ Inline styles for simplicity (can be extracted to CSS)

## 🤝 Contributing

This is an educational project. Feel free to:
- Modify the components
- Add new contexts
- Implement additional features
- Extract styles to CSS modules
- Add unit tests

## 📄 License

Open source - use freely for learning and projects

## ✅ Checklist: Getting Started

- [ ] Node.js installed (check: `node --version`)
- [ ] Project folder extracted
- [ ] Opened project in VS Code
- [ ] Ran `npm install`
- [ ] Ran `npm start`
- [ ] App opened in browser at http://localhost:3000
- [ ] Successfully logged in
- [ ] Tested adding/editing employees
- [ ] Tested theme toggle
- [ ] Read `CONTEXT_API_GUIDE.md`

## 🎉 You're Ready!

Start exploring the codebase, try modifying components, and learn from the patterns implemented. Happy coding!

---

**Need Help?** Check the troubleshooting section above or review the code comments in `App.jsx`
