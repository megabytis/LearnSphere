import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { courseService, lessonService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LessonItem from '../components/LessonItem';
import { Loader, User, Clock, BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';

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

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      await courseService.enroll(courseId);
      setIsEnrolled(true);
      // Refresh lessons to ensure they are unlocked and sorted
      const lessonsRes = await lessonService.getLessons(courseId);
      const sortedLessons = (lessonsRes.data.lessons || []).sort((a, b) => (a.order || 0) - (b.order || 0));
      setLessons(sortedLessons);
      alert('Enrolled successfully!');
    } catch (err) {
      alert(err.response?.data?.message || err.response?.data?.error || 'Enrollment failed.');
    } finally {
      setEnrolling(false);
    }
  };

  const handleUnenroll = async () => {
    if (!window.confirm('Are you sure you want to unenroll from this course?')) return;
    
    setEnrolling(true);
    try {
      await courseService.unenroll(courseId);
      setIsEnrolled(false);
      // Refresh lessons to lock them again
      const lessonsRes = await lessonService.getLessons(courseId);
      const sortedLessons = (lessonsRes.data.lessons || []).sort((a, b) => (a.order || 0) - (b.order || 0));
      setLessons(sortedLessons);
      alert('Unenrolled successfully.');
    } catch (err) {
      alert(err.response?.data?.message || 'Unenrollment failed.');
    } finally {
      setEnrolling(false);
    }
  };

  const handleLessonClick = (lessonId) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <Loader className="animate-spin" size={48} color="var(--accent)" />
      </div>
    );
  }

  if (!course) return <div className="container">Course not found.</div>;

  const isInstructor = user?._id === course.instructorId;
  const isAdmin = user?.role === 'admin';
  const canAccessAll = isInstructor || isAdmin || isEnrolled;

  return (
    <div className="container" style={styles.page}>
      <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
        <button 
          onClick={() => navigate('/courses')} 
          className="btn btn-outline" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
        >
          <ChevronLeft size={18} /> Back to Courses
        </button>
      </div>
      <div style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>{course.title}</h1>
          <p style={styles.description}>{course.description}</p>
          
          <div style={styles.meta}>
            <div style={styles.metaItem}>
              <User size={18} />
              <span>Instructor</span>
            </div>
            <div style={styles.metaItem}>
              <Clock size={18} />
              <span>12 Hours</span>
            </div>
            <div style={styles.metaItem}>
              <BookOpen size={18} />
              <span>{lessons.length} Lessons</span>
            </div>
          </div>
        </div>

        <div style={styles.syllabus}>
          <h2 style={styles.sectionTitle}>Course Syllabus</h2>
          <div style={styles.lessonList}>
            {lessons.map((lesson) => (
              <LessonItem
                key={lesson._id}
                lesson={lesson}
                isLocked={!lesson.freePreview && !canAccessAll}
                onClick={() => handleLessonClick(lesson._id)}
              />
            ))}
          </div>
        </div>
      </div>

      <aside style={styles.sidebar}>
        <div style={styles.enrollCard}>
          <div style={styles.priceSection}>
            <span style={styles.price}>Free</span>
          </div>
          
          {isEnrolled ? (
            <>
              <button className="btn btn-outline" style={styles.enrollBtn} disabled>
                Already Enrolled
              </button>
              <button 
                onClick={handleUnenroll} 
                className="btn btn-outline" 
                style={{ ...styles.enrollBtn, color: '#e53e3e', borderColor: '#e53e3e' }}
                disabled={enrolling}
              >
                {enrolling ? 'Processing...' : 'Unenroll from Course'}
              </button>
            </>
          ) : (isInstructor || isAdmin) ? (
            <button className="btn btn-outline" style={styles.enrollBtn} disabled>
              You have access
            </button>
          ) : (
            <button 
              onClick={handleEnroll} 
              className="btn btn-primary" 
              style={styles.enrollBtn}
              disabled={enrolling}
            >
              {enrolling ? 'Enrolling...' : 'Enroll Now'}
            </button>
          )}
          <p style={styles.enrollNote}>Full lifetime access</p>
          
          <ul style={styles.includesList}>
            <li style={styles.includesItem}><ChevronRight size={16} /> Access on mobile and TV</li>
            <li style={styles.includesItem}><ChevronRight size={16} /> Certificate of completion</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

const styles = {
  page: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '3rem',
    paddingBottom: '5rem',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
  },
  header: {
    backgroundColor: 'var(--primary)',
    color: 'white',
    padding: '3rem',
    borderRadius: 'var(--radius)',
    margin: '0 -1rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    lineHeight: 1.2,
  },
  description: {
    fontSize: '1.1rem',
    opacity: 0.9,
    marginBottom: '2rem',
    maxWidth: '700px',
  },
  meta: {
    display: 'flex',
    gap: '2rem',
    fontSize: '0.9rem',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  syllabus: {
    marginTop: '1rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: 'var(--primary)',
  },
  lessonList: {
    display: 'flex',
    flexDirection: 'column',
  },
  sidebar: {
    position: 'sticky',
    top: '100px',
    height: 'fit-content',
  },
  enrollCard: {
    backgroundColor: 'var(--bg-card)',
    padding: '2rem',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
  },
  priceSection: {
    marginBottom: '1.5rem',
  },
  price: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--primary)',
  },
  enrollBtn: {
    width: '100%',
    padding: '1rem',
    fontSize: '1.1rem',
    marginBottom: '1rem',
  },
  enrollNote: {
    textAlign: 'center',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    marginBottom: '2rem',
  },
  includesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  includesItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: 'var(--primary-light)',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  }
};

export default CourseDetailPage;
