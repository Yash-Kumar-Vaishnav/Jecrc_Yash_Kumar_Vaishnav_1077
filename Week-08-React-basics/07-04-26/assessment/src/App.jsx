import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { EmployeeProvider } from './contexts/EmployeeContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import './styles/App.css';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-container">
      {isAuthenticated ? <Dashboard /> : <LoginPage />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EmployeeProvider>
          <AppContent />
        </EmployeeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
