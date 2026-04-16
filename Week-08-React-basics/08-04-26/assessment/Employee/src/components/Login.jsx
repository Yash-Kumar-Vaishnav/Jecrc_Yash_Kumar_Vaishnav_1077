import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    if (username === 'admin' && password === 'admin') {
      dispatch(login({ username, loginTime: new Date().toISOString() }));
    } else {
      setError('Invalid credentials. Use admin/admin');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>👨‍💼 Employee Management System</h1>
          <p>Redux State Management Demo</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="hint">
            📝 <strong>Test Credentials:</strong>
            <br />
            Username: <code>admin</code>
            <br />
            Password: <code>admin</code>
          </div>
          
          <button type="submit" className="btn-login">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;