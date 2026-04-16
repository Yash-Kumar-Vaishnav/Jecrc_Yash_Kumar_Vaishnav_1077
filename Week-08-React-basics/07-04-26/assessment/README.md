# Employee Portal - Advanced Context API Application

A comprehensive Internal Employee Portal built with React and Advanced Context API for global state management.

## 🎯 Overview

This application demonstrates enterprise-level React patterns using Context API instead of external state management libraries. It includes authentication, theme switching, employee CRUD operations, and analytics.

### Key Features

✅ **Authentication System**
- Login/Logout functionality
- Session management
- User information persistence

✅ **Theme Management**
- Light/Dark Mode switching
- Persistent theme preference via localStorage
- System preference detection

✅ **Employee Management (CRUD)**
- Create new employees
- Read/List all employees
- Update employee information
- Delete employees
- Search and filter functionality

✅ **Dashboard Features**
- Home dashboard with statistics
- Employee analytics and reports
- Department distribution charts
- Salary analytics
- Settings and preferences

✅ **Modern UI Design**
- Responsive design
- Smooth animations and transitions
- Clean component architecture
- Professional color scheme

## 🏗️ Project Structure

```
src/
├── main.jsx                   # Entry point
├── App.jsx                    # Main app component
│
├── contexts/
│   ├── AuthContext.jsx        # Authentication context
│   ├── ThemeContext.jsx       # Theme management context
│   └── EmployeeContext.jsx    # Employee data context
│
├── pages/
│   ├── LoginPage.jsx          # Login page
│   └── Dashboard.jsx          # Main dashboard layout
│
├── components/
│   ├── HomeSection.jsx        # Home/Dashboard section
│   ├── EmployeesSection.jsx   # Employee list section
│   ├── EmployeeForm.jsx       # Add/Edit employee form
│   ├── AnalyticsSection.jsx   # Analytics and reports
│   └── SettingsSection.jsx    # User settings
│
└── styles/
    ├── App.css                # Global styles
    ├── LoginPage.css          # Login page styles
    ├── Dashboard.css          # Dashboard layout styles
    ├── HomeSection.css        # Home section styles
    ├── EmployeesSection.css   # Employees section styles
    ├── EmployeeForm.css       # Form styles
    ├── AnalyticsSection.css   # Analytics styles
    └── SettingsSection.css    # Settings styles
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to project directory**
   ```bash
   cd assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📚 Context API Architecture

### 1. AuthContext
Manages authentication state including:
- User login/logout
- Session state
- User information
- Loading and error states

```javascript
const { user, login, logout, isAuthenticated, loading } = useAuth();
```

### 2. ThemeContext
Manages application theme:
- Dark/Light mode toggle
- Persistent localStorage storage
- System preference detection
- CSS class application

```javascript
const { isDarkMode, toggleTheme, theme } = useTheme();
```

### 3. EmployeeContext
Manages employee data with CRUD operations:
- Add employees
- Retrieve all employees or single employee
- Update employee information
- Delete employees
- Search functionality
- Statistics generation

```javascript
const { 
  employees, 
  addEmployee, 
  updateEmployee, 
  deleteEmployee,
  getStatistics,
  searchEmployees 
} = useEmployee();
```

## 📋 Features in Detail

### Login System
- Email validation
- Secure password handling
- Simulated API calls with loading states
- Error handling and user feedback
- Theme toggle on login page

**Demo Credentials:**
- Email: any_email@company.com
- Password: any value (just for demo)

### Employee Management
- **Create**: Add new employees with validation
- **Read**: View all employees in table format
- **Update**: Edit employee information
- **Delete**: Remove employees with confirmation
- **Search**: Filter by name, email, department, or position

### Analytics Dashboard
- Total employee count
- Department distribution charts
- Salary range distribution
- Top earners ranking
- Salary statistics
- Department-wise breakdown

### Settings
- Dark/Light theme toggle
- Notification preferences
- Email alert options
- Auto-logout settings
- Session timeout configuration
- Account information display
- Privacy settings

## 🎨 Styling & Design

### Color Scheme
- **Primary**: Indigo (#6366f1)
- **Success**: Emerald (#10b981)
- **Danger**: Red (#ef4444)
- **Warning**: Amber (#f59e0b)

### Dark Mode Support
- Automatic dark mode classes
- CSS variables for theme switching
- Persistent user preference
- System preference detection

### Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop layouts
- Smooth breakpoints

## 🔒 Best Practices Implemented

1. **Context API Best Practices**
   - Separate contexts for different concerns
   - Custom hooks for context consumption
   - Error handling with context checks
   - Performance optimization with useCallback

2. **Component Design**
   - Functional components
   - Composition over inheritance
   - Clear prop interfaces
   - Reusable components

3. **State Management**
   - Local state for component-specific data
   - Global state for shared data
   - Efficient state updates
   - In-memory data storage

4. **Performance**
   - useCallback for function memoization
   - Optimized re-renders
   - Efficient search algorithms
   - Lazy-loaded contexts

5. **User Experience**
   - Loading states with spinners
   - Error messages
   - Form validation
   - Confirmation dialogs
   - Smooth animations

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 1024px
- **Desktop**: > 1024px

## 🎯 Component Specifications

### Page Components
- **LoginPage**: Authentication interface
- **Dashboard**: Main application shell with navigation

### Feature Components
- **HomeSection**: Welcome dashboard with stats
- **EmployeesSection**: Employee list with CRUD
- **EmployeeForm**: Modal form for adding/editing
- **AnalyticsSection**: Data visualization
- **SettingsSection**: User preferences

## 🧪 Testing Scenarios

### Authentication Flow
1. Login with valid email
2. Successful authentication redirect
3. Logout with confirmation

### Employee Management
1. Add employee with validation
2. View employee list
3. Edit employee information
4. Delete employee with confirmation
5. Search employees

### Theme Switching
1. Toggle theme
2. Verify dark mode application
3. Check localStorage persistence
4. Logout and login to verify saved preference

### Analytics
1. View department distribution
2. Check salary statistics
3. Verify calculations
4. Review top earners

## 🔍 Code Quality

- Clean, readable code
- Comprehensive comments
- Proper error handling
- Consistent naming conventions
- Modular structure

## 📦 Dependencies

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Lucide React**: Icon library

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Notes

- In-memory storage (data resets on page refresh)
- No external state management library
- Pure Context API implementation
- Simulated API calls with delays
- localStorage for theme and settings

## 🎓 Learning Outcomes

This project demonstrates:
- Advanced Context API usage
- Global state management patterns
- Component composition
- Custom React hooks
- CSS-in-JS with CSS files
- Responsive design
- Form handling and validation
- Modal components
- Data filtering and searching

## 📞 Support

For issues or questions, refer to the code comments and component documentation.

---

Built with ❤️ using React and Context API
