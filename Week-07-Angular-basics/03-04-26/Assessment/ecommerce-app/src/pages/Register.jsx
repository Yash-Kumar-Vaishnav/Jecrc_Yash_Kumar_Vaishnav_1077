import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import './AuthPages.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLang();
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
        <h1>{t.auth.createAccount}</h1>
        <p>{t.auth.registerSub}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group"><label>{t.auth.nameLabel}</label><input type="text" className="form-input" placeholder="Jane Doe" value={name} onChange={e => setName(e.target.value)} /></div>
        <div className="form-group"><label>{t.auth.emailLabel}</label><input type="email" className="form-input" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div className="form-group"><label>{t.auth.passwordLabel}</label><input type="password" className="form-input" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} /></div>
        <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
          {loading ? <span className="spinner" /> : t.auth.createBtn}
        </button>
      </form>
      <p className="auth-terms">{t.auth.terms} <a href="#terms">{t.auth.termsLink}</a> {t.auth.and} <a href="#privacy">{t.auth.privacyLink}</a>.</p>
      <p className="auth-switch">{t.auth.haveAccount} <Link to="/login">{t.auth.signInLink}</Link></p>
    </div>
  );
}

export default Register;
