import React from 'react';
import { Link } from 'react-router-dom';
import { User, BookOpen } from 'lucide-react';

// Format price from paisa to rupees
const formatPrice = (priceInPaisa, currency = 'inr') => {
  const price = priceInPaisa / 100;
  if (currency === 'inr') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

const CourseCard = ({ course }) => {
  const isFree = !course.price || course.price === 0;

  return (
    <Link to={`/courses/${course._id}`} style={styles.card}>
      <div style={styles.imagePlaceholder}>
        <BookOpen size={48} color="rgba(255,255,255,0.5)" />
        <div style={styles.priceTag}>
          {isFree ? 'FREE' : formatPrice(course.price, course.currency)}
        </div>
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
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    border: '1px solid var(--border)',
    textDecoration: 'none',
    position: 'relative',
  },
  imagePlaceholder: {
    height: '180px',
    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  priceTag: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'white',
    color: 'var(--primary)',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '0.95rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  content: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '0.75rem',
  },
  title: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: 'var(--text-main)',
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  description: {
    fontSize: '0.9rem',
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
    paddingTop: '1rem',
    marginTop: 'auto',
    borderTop: '1px solid var(--border)',
  },
  instructor: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: 'var(--text-muted)',
  },
  badge: {
    fontSize: '0.7rem',
    fontWeight: '600',
    padding: '0.3rem 0.75rem',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    color: 'var(--primary)',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  }
};

export default CourseCard;
