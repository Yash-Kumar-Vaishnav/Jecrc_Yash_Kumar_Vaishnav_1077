import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback((email, password) => {
    setLoading(true);
    setError(null);
    
    // Simulate API call with validation
    setTimeout(() => {
      if (email && password && email.includes('@')) {
        setUser({
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          role: 'Employee',
          loginTime: new Date()
        });
        setLoading(false);
      } else {
        setError('Invalid email or password');
        setLoading(false);
      }
    }, 1000);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
