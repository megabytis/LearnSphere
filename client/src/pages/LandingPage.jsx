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
    padding: '8rem 0 10rem',
    textAlign: 'center',
    background: 'radial-gradient(circle at top, #f1f5f9 0%, #f8fafc 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '900px',
    position: 'relative',
    zIndex: 1,
  },
  heroTitle: {
    fontSize: '4.5rem',
    fontWeight: '900',
    color: 'var(--primary)',
    marginBottom: '1.5rem',
    lineHeight: 1,
    letterSpacing: '-0.04em',
  },
  heroSub: {
    fontSize: '1.4rem',
    color: 'var(--text-muted)',
    marginBottom: '3rem',
    maxWidth: '700px',
    margin: '0 auto 3rem',
    lineHeight: 1.6,
  },
  heroCtas: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
  },
  ctaBtn: {
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
  },
  features: {
    padding: '10rem 0',
    backgroundColor: 'white',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '5rem',
    color: 'var(--primary)',
    letterSpacing: '-0.02em',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '3rem',
  },
  featureCard: {
    padding: '3rem 2rem',
    backgroundColor: 'var(--bg-main)',
    borderRadius: 'var(--radius-lg)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    transition: 'all 0.3s ease',
    border: '1px solid var(--border)',
  }
};

export default LandingPage;
