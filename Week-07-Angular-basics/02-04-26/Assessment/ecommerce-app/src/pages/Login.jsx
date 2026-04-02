import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setError(''); setLoading(true);
    await new Promise(r => setTimeout(r, 600)); // simulate API
    const ok = login(email, password);
    if (ok) navigate('/dashboard');
    else { setError('Invalid credentials.'); setLoading(false); }
  };

  return (
    <div className="auth-form fade-up">
      <div className="auth-form-header">
        <h1>Welcome back</h1>
        <p>Sign in to access your dashboard</p>
      </div>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email" className="form-input"
            placeholder="you@example.com"
            value={email} onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            Password
            <a href="#forgot" className="label-link">Forgot?</a>
          </label>
          <input
            type="password" className="form-input"
            placeholder="••••••••"
            value={password} onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
          {loading ? <span className="spinner" /> : 'Sign In'}
        </button>
      </form>

      <div className="auth-hint">
        <span>💡</span>
        <span>Enter any email &amp; password to demo the app</span>
      </div>

      <p className="auth-switch">
        Don't have an account? <Link to="/register">Create one →</Link>
      </p>
    </div>
  );
}

export default Login;
