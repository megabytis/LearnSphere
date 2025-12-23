import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { courseService, lessonService, paymentService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LessonItem from '../components/LessonItem';
import { 
  Loader, 
  Clock, 
  BookOpen, 
  ChevronRight, 
  CreditCard, 
  ShieldCheck, 
  Copy, 
  CheckCircle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Sparkles,
  X
} from 'lucide-react';

// Format price from paisa to rupees
const formatPrice = (priceInPaisa, currency = 'inr') => {
  if (!priceInPaisa || priceInPaisa === 0) return 'Free';
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

// Floating Stripe Developer Helper Component
const StripeDevHelper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedCard, setCopiedCard] = useState(null);

  const cardPresets = [
    { label: 'Successful card', number: '4242424242424242', lastFour: '4242', icon: '✓', color: '#22c55e' },
    { label: '3DS2 required card', number: '4000000000003184', lastFour: '3184', icon: '🔐', color: '#f59e0b' },
    { label: 'Declined card', number: '4000000000000002', lastFour: '0002', icon: '✗', color: '#ef4444' },
    { label: 'Fraudulent card', number: '4000000000000019', lastFour: '0019', icon: '⚠', color: '#f97316' },
  ];

  const handleCopy = (card) => {
    navigator.clipboard.writeText(card.number);
    setCopiedCard(card.label);
    setTimeout(() => setCopiedCard(null), 2000);
  };

  const handleMagicFill = () => {
    const successCard = cardPresets[0];
    navigator.clipboard.writeText(successCard.number);
    setCopiedCard('Magic Fill');
    setTimeout(() => setCopiedCard(null), 2000);
  };

  return (
    <div style={stripeHelperStyles.container}>
      {/* Collapsed State - Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={stripeHelperStyles.toggleBtn}
        >
          <span style={stripeHelperStyles.stripeIcon}>stripe</span>
          <span style={stripeHelperStyles.devLabel}>Developers</span>
          <ChevronUp size={16} />
        </button>
      )}

      {/* Expanded Panel */}
      {isOpen && (
        <div style={stripeHelperStyles.panel}>
          {/* Header */}
          <div style={stripeHelperStyles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={stripeHelperStyles.stripeIcon}>stripe</span>
              <span style={stripeHelperStyles.devLabel}>Developers</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={stripeHelperStyles.closeBtn}>
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Magic Fill */}
          <button onClick={handleMagicFill} style={stripeHelperStyles.magicFillBtn}>
            <Sparkles size={16} style={{ color: '#a78bfa' }} />
            <span>Magic fill</span>
            <span style={stripeHelperStyles.magicFillDesc}>
              {copiedCard === 'Magic Fill' ? 'Copied!' : 'Instantly fill all fields with valid data.'}
            </span>
          </button>

          {/* Card Presets */}
          <div style={stripeHelperStyles.presetsSection}>
            <div style={stripeHelperStyles.presetsTitle}>Card presets</div>
            {cardPresets.map((card) => (
              <button 
                key={card.label}
                onClick={() => handleCopy(card)}
                style={stripeHelperStyles.presetItem}
              >
                <span style={{ ...stripeHelperStyles.presetIcon, color: card.color }}>{card.icon}</span>
                <div style={stripeHelperStyles.presetInfo}>
                  <span style={stripeHelperStyles.presetLabel}>{card.label}</span>
                  <span style={stripeHelperStyles.presetNumber}>•••• {card.lastFour}</span>
                </div>
                {copiedCard === card.label && (
                  <span style={stripeHelperStyles.copiedBadge}>Copied!</span>
                )}
              </button>
            ))}
          </div>

          {/* View Docs Link */}
          <a 
            href="https://stripe.com/docs/testing" 
            target="_blank" 
            rel="noopener noreferrer"
            style={stripeHelperStyles.docsLink}
          >
            View docs
            <span style={stripeHelperStyles.externalIcon}>↗</span>
          </a>
        </div>
      )}
    </div>
  );
};

const stripeHelperStyles = {
  container: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 9999,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  toggleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: '#1a1f36',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    transition: 'all 0.2s',
  },
  stripeIcon: {
    fontWeight: '700',
    fontSize: '16px',
    background: 'linear-gradient(90deg, #635bff, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px',
  },
  devLabel: {
    color: '#a3acb9',
    fontSize: '13px',
  },
  panel: {
    width: '320px',
    backgroundColor: '#1a1f36',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderBottom: '1px solid #2d3348',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#a3acb9',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  magicFillBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '4px',
    width: '100%',
    padding: '16px',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #2d3348',
    cursor: 'pointer',
    textAlign: 'left',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background 0.2s',
  },
  magicFillDesc: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '400',
  },
  presetsSection: {
    padding: '12px 0',
  },
  presetsTitle: {
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  presetItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '10px 16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    fontSize: '14px',
    textAlign: 'left',
    transition: 'background 0.2s',
  },
  presetIcon: {
    fontSize: '14px',
    width: '20px',
  },
  presetInfo: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  presetLabel: {
    fontWeight: '500',
  },
  presetNumber: {
    fontSize: '12px',
    color: '#6b7280',
  },
  copiedBadge: {
    fontSize: '11px',
    color: '#22c55e',
    fontWeight: '600',
  },
  docsLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderTop: '1px solid #2d3348',
    color: '#a3acb9',
    fontSize: '13px',
    textDecoration: 'none',
    transition: 'background 0.2s',
  },
  externalIcon: {
    fontSize: '14px',
  },
};

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const [courseRes, lessonsRes] = await Promise.all([
          courseService.getCourseById(courseId),
          lessonService.getLessons(courseId)
        ]);
        setCourse(courseRes.data.course);
        const sortedLessons = (lessonsRes.data.lessons || []).sort((a, b) => (a.order || 0) - (b.order || 0));
        setLessons(sortedLessons);

        if (user) {
          try {
            const statusRes = await api.get(`/courses/${courseId}/enrollment-status`);
            setIsEnrolled(statusRes.data.status === 'active');
          } catch (e) {
            console.error("Failed to fetch enrollment status");
          }
        }
      } catch (err) {
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, user]);

  const handleBuyNow = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      const response = await paymentService.createCheckoutSession(courseId);
      
      if (response.data.free) {
        setIsEnrolled(true);
        const lessonsRes = await lessonService.getLessons(courseId);
        const sortedLessons = (lessonsRes.data.lessons || []).sort((a, b) => (a.order || 0) - (b.order || 0));
        setLessons(sortedLessons);
        alert('Enrolled successfully!');
        setEnrolling(false);
        return;
      }

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to initiate checkout.';
      alert(`Checkout Error: ${errorMsg}`);
      console.error('Checkout error details:', err);
      setEnrolling(false);
    }
  };

  const handleUnenroll = async () => {
    if (!window.confirm('Are you sure you want to unenroll from this course?')) return;
    
    setEnrolling(true);
    try {
      await courseService.unenroll(courseId);
      setIsEnrolled(false);
      alert('Unenrolled successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to unenroll.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <Loader className="animate-spin" size={48} color="var(--primary)" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
        <h2 style={{ color: 'var(--error)' }}>{error || 'Course not found'}</h2>
        <button onClick={() => navigate('/courses')} className="btn btn-outline" style={{ marginTop: '2rem' }}>
          <ArrowLeft size={20} /> Back to Courses
        </button>
      </div>
    );
  }

  const isFree = course.price === 0;

  return (
    <div className="container">
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>{course.title}</h1>
          <p style={styles.description}>{course.description}</p>
          <div style={styles.meta}>
            <div style={styles.metaItem}>
              <Clock size={20} />
              <span>{lessons.length * 15} mins of content</span>
            </div>
            <div style={styles.metaItem}>
              <BookOpen size={20} />
              <span>{lessons.length} Lessons</span>
            </div>
          </div>
        </div>
      </header>

      <div style={styles.contentWrapper}>
        <main style={styles.mainContent}>
          <section style={styles.syllabus}>
            <h2 style={styles.sectionTitle}>Course Content</h2>
            <div style={styles.lessonList}>
              {lessons.length > 0 ? (
                lessons.map((lesson, index) => (
                  <LessonItem 
                    key={lesson._id} 
                    lesson={lesson} 
                    index={index} 
                    courseId={courseId}
                    isEnrolled={isEnrolled}
                  />
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No lessons available for this course yet.</p>
              )}
            </div>
          </section>
        </main>

        <aside style={styles.sidebar}>
          <div style={styles.enrollCard}>
            <div style={styles.priceSection}>
              <span style={styles.price}>{formatPrice(course.price, course.currency)}</span>
            </div>
            
            {isEnrolled ? (
              <>
                <div style={styles.enrollNote}>
                  <CheckCircle size={24} color="var(--success)" style={{ marginBottom: '0.5rem' }} />
                  <p>You are enrolled in this course</p>
                </div>
                <button 
                  onClick={() => navigate(`/courses/${courseId}/lessons/${lessons[0]?._id}`)} 
                  className="btn btn-primary" 
                  style={styles.enrollBtn}
                  disabled={lessons.length === 0}
                >
                  Go to Course
                </button>
                <button 
                  onClick={handleUnenroll} 
                  className="btn btn-outline" 
                  style={{ ...styles.enrollBtn, borderColor: 'var(--error)', color: 'var(--error)' }}
                  disabled={enrolling}
                >
                  {enrolling ? 'Processing...' : 'Unenroll from Course'}
                </button>
              </>
            ) : (
              <button 
                onClick={handleBuyNow} 
                className="btn btn-primary" 
                style={styles.enrollBtn}
                disabled={enrolling}
              >
                {enrolling ? 'Processing...' : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                    <CreditCard size={20} />
                    <span>{isFree ? 'Enroll Now - Free' : `Buy Now - ${formatPrice(course.price, course.currency)}`}</span>
                  </div>
                )}
              </button>
            )}

            <ul style={styles.includesList}>
              <li style={styles.includesItem}><ChevronRight size={16} /> Full lifetime access</li>
              <li style={styles.includesItem}><ChevronRight size={16} /> Access on mobile and TV</li>
              <li style={styles.includesItem}><ChevronRight size={16} /> Certificate of completion</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Floating Stripe Developer Helper */}
      {!isEnrolled && !isFree && <StripeDevHelper />}
    </div>
  );
};

const styles = {
  header: {
    background: 'linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%)',
    color: 'white',
    padding: '4rem 3rem',
    borderRadius: 'var(--radius-lg)',
    margin: '0 -1rem',
    boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '1rem',
    lineHeight: 1.2,
    letterSpacing: '-0.03em',
  },
  description: {
    fontSize: '1.1rem',
    opacity: 0.95,
    marginBottom: '2rem',
    maxWidth: '700px',
    lineHeight: 1.6,
    fontWeight: '500',
  },
  meta: {
    display: 'flex',
    gap: '2rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    flexWrap: 'wrap',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    opacity: 0.9,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: '3rem',
    marginTop: '3rem',
    '@media (max-width: 1024px)': {
      flexDirection: 'column',
    },
  },
  mainContent: {
    flex: 1,
    minWidth: 0,
  },
  syllabus: {
    marginTop: '1rem',
  },
  sectionTitle: {
    fontSize: '1.75rem',
    fontWeight: '800',
    marginBottom: '1.5rem',
    color: 'var(--primary)',
    letterSpacing: '-0.02em',
  },
  lessonList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  sidebar: {
    width: '380px',
    flexShrink: 0,
    position: 'sticky',
    top: '100px',
    height: 'fit-content',
    '@media (max-width: 1024px)': {
      width: '100%',
      position: 'static',
    },
  },
  enrollCard: {
    backgroundColor: 'var(--bg-card)',
    padding: '2rem',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  priceSection: {
    marginBottom: '0.25rem',
  },
  price: {
    fontSize: '2.25rem',
    fontWeight: '800',
    color: 'var(--primary)',
    letterSpacing: '-0.02em',
  },
  enrollBtn: {
    width: '100%',
    padding: '1.25rem',
    fontSize: '1.1rem',
    borderRadius: '16px',
  },
  enrollNote: {
    textAlign: 'center',
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  includesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid var(--border)',
  },
  includesItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.95rem',
    color: 'var(--text-main)',
    fontWeight: '500',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  },
};

// Add responsive styles via CSS
const responsiveStyles = document.createElement('style');
responsiveStyles.textContent = `
  @media (max-width: 1024px) {
    .course-content-wrapper {
      flex-direction: column !important;
    }
    .course-sidebar {
      width: 100% !important;
      position: static !important;
    }
  }
`;
if (typeof document !== 'undefined' && !document.getElementById('course-detail-responsive')) {
  responsiveStyles.id = 'course-detail-responsive';
  document.head.appendChild(responsiveStyles);
}

export default CourseDetailPage;
