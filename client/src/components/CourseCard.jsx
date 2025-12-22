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
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    border: '1px solid var(--border)',
    textDecoration: 'none',
  },
  imagePlaceholder: {
    height: '180px',
    background: 'linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  content: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '0.75rem',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: 'var(--primary)',
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  description: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    flex: 1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1.25rem',
    marginTop: 'auto',
    borderTop: '1px solid var(--border)',
  },
  instructor: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-main)',
  },
  badge: {
    fontSize: '0.7rem',
    fontWeight: '700',
    padding: '0.25rem 0.75rem',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    color: 'var(--accent)',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  }
};

export default CourseCard;
