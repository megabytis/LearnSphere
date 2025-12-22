import React from 'react';
import { Link } from 'react-router-dom';
import { User, BookOpen } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/courses/${course._id}`} style={styles.card}>
      <div style={styles.imagePlaceholder}>
        <BookOpen size={48} color="var(--border)" />
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{course.title}</h3>
        <p style={styles.description}>{course.description}</p>
        <div style={styles.footer}>
          <div style={styles.instructor}>
            <User size={16} color="var(--text-muted)" />
            <span>Instructor</span>
          </div>
          <span style={styles.badge}>{course.published ? 'Published' : 'Draft'}</span>
        </div>
      </div>
    </Link>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--bg-card)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow)',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    border: '2px solid var(--border)',
    textDecoration: 'none',
    position: 'relative',
  },
  imagePlaceholder: {
    height: '200px',
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    opacity: 0.9,
  },
  content: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '1rem',
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: '900',
    color: 'var(--primary)',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  description: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    flex: 1,
    fontWeight: '500',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1.5rem',
    marginTop: 'auto',
    borderTop: '2px solid var(--border)',
  },
  instructor: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontSize: '0.9rem',
    fontWeight: '700',
    color: 'var(--text-main)',
  },
  badge: {
    fontSize: '0.75rem',
    fontWeight: '800',
    padding: '0.4rem 1rem',
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(6, 182, 212, 0.1))',
    color: 'var(--primary)',
    borderRadius: '30px',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    border: '1px solid rgba(99, 102, 241, 0.2)',
  }
};

export default CourseCard;
