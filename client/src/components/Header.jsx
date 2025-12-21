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
    height: '64px',
    backgroundColor: 'var(--bg-card)',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
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
    gap: '0.5rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'var(--primary)',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  navLink: {
    fontWeight: '500',
    color: 'var(--primary-light)',
    transition: 'color 0.2s',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    paddingLeft: '1rem',
    borderLeft: '1px solid var(--border)',
  },
  userName: {
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  logoutBtn: {
    background: 'none',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
  },
  authBtns: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  loginLink: {
    fontWeight: '600',
    color: 'var(--accent)',
  }
};

export default Header;
