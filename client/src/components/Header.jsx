import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User, Menu } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>
          <BookOpen size={24} color="var(--accent)" />
          <span>LearnSphere</span>
        </Link>

        <nav style={styles.nav}>
          <Link to="/courses" style={styles.navLink}>Browse</Link>
          {user ? (
            <>
              <Link to="/my-courses" style={styles.navLink}>My Learning</Link>
              <div style={styles.userSection}>
                <span style={styles.userName}>{user.name}</span>
                <button onClick={handleLogout} style={styles.logoutBtn} title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <div style={styles.authBtns}>
              <Link to="/login" style={styles.loginLink}>Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: '80px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: '1rem',
    margin: '0 1.5rem',
    borderRadius: '24px',
    zIndex: 1000,
    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.6rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.03em',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2.5rem',
  },
  navLink: {
    fontWeight: '700',
    fontSize: '1rem',
    color: 'var(--text-main)',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    paddingLeft: '1.5rem',
    borderLeft: '2px solid var(--border)',
  },
  userName: {
    fontWeight: '800',
    fontSize: '0.95rem',
    color: 'var(--primary)',
  },
  logoutBtn: {
    background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
    color: '#ef4444',
    padding: '0.6rem',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  authBtns: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  loginLink: {
    fontWeight: '800',
    color: 'var(--text-main)',
    fontSize: '1rem',
  }
};

export default Header;
