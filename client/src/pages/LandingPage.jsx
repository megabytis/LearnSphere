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
    padding: '4rem 0 6rem',
    textAlign: 'center',
    backgroundColor: 'var(--bg-card)',
  },
  heroContent: {
    maxWidth: '800px',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    color: 'var(--primary)',
    marginBottom: '1.5rem',
    lineHeight: 1.1,
  },
  heroSub: {
    fontSize: '1.25rem',
    color: 'var(--text-muted)',
    marginBottom: '2.5rem',
  },
  heroCtas: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  ctaBtn: {
    padding: '0.75rem 2rem',
    fontSize: '1.1rem',
  },
  features: {
    padding: '5rem 0',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2.25rem',
    marginBottom: '3rem',
    color: 'var(--primary)',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    padding: '2rem',
    backgroundColor: 'var(--bg-card)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  }
};

export default LandingPage;
