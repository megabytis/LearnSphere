import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, ChevronLeft } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/courses');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={styles.container}>
      <div style={{ position: 'absolute', top: '5rem', left: '2rem' }}>
        <Link to="/" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={18} /> Back to Home
        </Link>
      </div>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.sub}>Log in to continue your learning journey</p>

        {error && (
          <div style={styles.errorBox}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <Mail size={18} style={styles.icon} />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <Lock size={18} style={styles.icon} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem',
    background: 'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 40%)',
    position: 'relative',
  },
  card: {
    width: '100%',
    maxWidth: '500px',
    padding: '4rem',
    backgroundColor: 'var(--bg-card)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    border: '2px solid var(--border)',
    animation: 'fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '900',
    marginBottom: '1rem',
    textAlign: 'center',
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.05em',
  },
  sub: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    marginBottom: '3rem',
    textAlign: 'center',
    fontWeight: '600',
  },
  errorBox: {
    padding: '1.25rem',
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    color: 'var(--error)',
    borderRadius: 'var(--radius)',
    marginBottom: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '1rem',
    fontWeight: '700',
    border: '2px solid rgba(244, 63, 94, 0.2)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '800',
    color: 'var(--primary)',
    marginLeft: '0.5rem',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: '20px',
    color: 'var(--primary)',
    opacity: 0.5,
  },
  input: {
    width: '100%',
    padding: '1.25rem 1.25rem 1.25rem 3.5rem',
    borderRadius: 'var(--radius)',
    border: '2px solid var(--border)',
    fontSize: '1.1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#f8fafc',
    fontWeight: '500',
  },
  submitBtn: {
    width: '100%',
    padding: '1.25rem',
    marginTop: '1.5rem',
    fontSize: '1.2rem',
    borderRadius: '20px',
  },
  footer: {
    marginTop: '3rem',
    textAlign: 'center',
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  link: {
    color: 'var(--primary)',
    fontWeight: '800',
    marginLeft: '0.5rem',
    textDecoration: 'underline',
  }
};

export default LoginPage;
