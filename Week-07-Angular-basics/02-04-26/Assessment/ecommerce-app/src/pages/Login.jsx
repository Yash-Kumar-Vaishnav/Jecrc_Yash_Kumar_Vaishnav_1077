import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import './AuthPages.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError(t.auth.errorFill); return; }
    setError(''); setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(email, password);
    if (ok) navigate('/dashboard');
    else { setError(t.auth.errorInvalid); setLoading(false); }
  };

  return (
    <div className="auth-form fade-up">
      <div className="auth-form-header">
        <h1>{t.auth.welcomeBack}</h1>
        <p>{t.auth.signInSub}</p>
      </div>
      {error && <div className="auth-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t.auth.emailLabel}</label>
          <input type="email" className="form-input" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label style={{ display:'flex', justifyContent:'space-between' }}>
            {t.auth.passwordLabel}
            <a href="#forgot" className="label-link">{t.auth.forgot}</a>
          </label>
          <input type="password" className="form-input" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
          {loading ? <span className="spinner" /> : t.auth.signInBtn}
        </button>
      </form>
      <div className="auth-hint"><span>💡</span><span>{t.auth.demoHint}</span></div>
      <p className="auth-switch">{t.auth.noAccount} <Link to="/register">{t.auth.createOne}</Link></p>
    </div>
  );
}

export default Login;
