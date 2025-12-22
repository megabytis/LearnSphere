import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section style={styles.hero}>
        <div className="container" style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Learn skills that actually matter</h1>
          <p style={styles.heroSub}>
            Master the most in-demand technical skills with our structured, 
            expert-led courses. Start your learning journey today.
          </p>
          <div style={styles.heroCtas}>
            <Link to="/courses" className="btn btn-primary" style={styles.ctaBtn}>Browse Courses</Link>
            <Link to="/signup" className="btn btn-outline" style={styles.ctaBtn}>Join for Free</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Why LearnSphere?</h2>
          <div style={styles.featureGrid}>
            <div style={styles.featureCard}>
              <Zap size={32} color="var(--accent)" />
              <h3>Structured Lessons</h3>
              <p>Well-organized content designed to take you from beginner to expert.</p>
            </div>
            <div style={styles.featureCard}>
              <CheckCircle size={32} color="var(--accent)" />
              <h3>Learn at Your Pace</h3>
              <p>Lifetime access to enrolled courses. Learn whenever and wherever you want.</p>
            </div>
            <div style={styles.featureCard}>
              <Shield size={32} color="var(--accent)" />
              <h3>Expert Instructors</h3>
              <p>Learn from industry professionals with real-world experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    padding: '10rem 0 12rem',
    textAlign: 'center',
    background: 'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 40%)',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '1000px',
    position: 'relative',
    zIndex: 1,
  },
  heroTitle: {
    fontSize: '5.5rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '2rem',
    lineHeight: 0.9,
    letterSpacing: '-0.05em',
  },
  heroSub: {
    fontSize: '1.5rem',
    color: 'var(--text-muted)',
    marginBottom: '4rem',
    maxWidth: '800px',
    margin: '0 auto 4rem',
    lineHeight: 1.6,
    fontWeight: '500',
  },
  heroCtas: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
  },
  ctaBtn: {
    padding: '1.25rem 3rem',
    fontSize: '1.2rem',
    borderRadius: '20px',
  },
  features: {
    padding: '12rem 0',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '3.5rem',
    fontWeight: '900',
    marginBottom: '6rem',
    color: 'var(--primary)',
    letterSpacing: '-0.03em',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '4rem',
  },
  featureCard: {
    padding: '4rem 2.5rem',
    backgroundColor: 'var(--bg-main)',
    borderRadius: 'var(--radius-lg)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    border: '2px solid var(--border)',
    boxShadow: 'var(--shadow)',
  }
};

export default LandingPage;
