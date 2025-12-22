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
    height: '72px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
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
    fontSize: '1.5rem',
    fontWeight: '800',
    color: 'var(--primary)',
    letterSpacing: '-0.025em',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navLink: {
    fontWeight: '600',
    fontSize: '0.95rem',
    color: 'var(--text-main)',
    transition: 'color 0.2s',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    paddingLeft: '1.25rem',
    borderLeft: '1px solid var(--border)',
  },
  userName: {
    fontWeight: '700',
    fontSize: '0.9rem',
    color: 'var(--primary)',
  },
  logoutBtn: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: 'var(--error)',
    padding: '0.5rem',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s',
  },
  authBtns: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
  },
  loginLink: {
    fontWeight: '700',
    color: 'var(--text-main)',
    fontSize: '0.95rem',
  }
};

export default Header;
