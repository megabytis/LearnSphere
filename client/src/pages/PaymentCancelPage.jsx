import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';

const PaymentCancelPage = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>
          <XCircle size={64} color="var(--error)" />
        </div>
        <h1 style={styles.title}>Payment Cancelled</h1>
        <p style={styles.description}>
          Your payment was cancelled. No charges were made. 
          Feel free to try again when you're ready!
        </p>
        <div style={styles.buttons}>
          {courseId && (
            <Link to={`/courses/${courseId}`} className="btn btn-primary" style={styles.btn}>
              <ArrowLeft size={20} /> Back to Course
            </Link>
          )}
          <Link to="/courses" className="btn btn-outline" style={styles.btn}>
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 72px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)',
  },
  card: {
    backgroundColor: 'var(--bg-card)',
    padding: '4rem',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
  },
  iconWrapper: {
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--text-main)',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
    marginBottom: '2rem',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    fontSize: '1rem',
  },
};

export default PaymentCancelPage;
