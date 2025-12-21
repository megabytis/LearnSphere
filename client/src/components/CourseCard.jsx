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
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  imagePlaceholder: {
    height: '160px',
    backgroundColor: '#edf2f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'var(--primary)',
    marginBottom: '0.5rem',
    lineHeight: 1.3,
  },
  description: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    marginBottom: '1.25rem',
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
    paddingTop: '1rem',
    borderTop: '1px solid var(--border)',
  },
  instructor: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  badge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '0.2rem 0.5rem',
    backgroundColor: '#ebf8ff',
    color: '#2b6cb0',
    borderRadius: '4px',
  }
};

export default CourseCard;
