import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, LogIn } from 'lucide-react';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');

    if (!email || !password) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setLocalError('Please enter a valid email');
      return;
    }

    login(email, password);
  };

  return (
    <div className="login-page">
      <div className="login-background"></div>
      
      <div className="login-container">
        <div className="theme-toggle">
          <button 
            onClick={toggleTheme}
            className="theme-btn"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <Sun size={24} />
            ) : (
              <Moon size={24} />
            )}
          </button>
        </div>

        <div className="login-card">
          <div className="login-header">
            <div className="logo">EP</div>
            <h1>Employee Portal</h1>
            <p>Internal Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="form-input"
              />
            </div>

            {(error || localError) && (
              <div className="error-message">
                ⚠️ {error || localError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="login-btn"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Login
                </>
              )}
            </button>
          </form>

          <div className="login-demo">
            <p>Demo Credentials:</p>
            <code>any_email@company.com</code>
            <code>any_password</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
