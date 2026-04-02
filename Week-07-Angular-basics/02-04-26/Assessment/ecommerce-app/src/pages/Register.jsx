import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    login(email || name, password);
    navigate('/dashboard');
  };

  return (
    <div className="auth-form fade-up">
      <div className="auth-form-header">
        <h1>Create account</h1>
        <p>Join 500K+ members and start shopping</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" className="form-input" placeholder="Jane Doe"
            value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-input" placeholder="you@example.com"
            value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-input" placeholder="Create a strong password"
            value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
          {loading ? <span className="spinner" /> : 'Create Account'}
        </button>
      </form>

      <p className="auth-terms">
        By registering you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.
      </p>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in →</Link>
      </p>
    </div>
  );
}

export default Register;
