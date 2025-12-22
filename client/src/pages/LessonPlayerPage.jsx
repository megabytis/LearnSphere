import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api, { courseService, lessonService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LessonItem from '../components/LessonItem';
import { Loader, ChevronLeft, AlertCircle, PlayCircle } from 'lucide-react';

const LessonPlayerPage = () => {
  const { courseId, lessonId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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

        const lesson = lessonsRes.data.lessons.find(l => l._id === lessonId);
        if (lesson) {
          setCurrentLesson(lesson);
        }
      } catch (err) {
        setError('Failed to load lesson content.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, lessonId, user]);

  const handleLessonClick = (id) => {
    navigate(`/courses/${courseId}/lessons/${id}`);
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <Loader className="animate-spin" size={48} color="var(--accent)" />
      </div>
    );
  }

  if (error) return <div className="container">{error}</div>;

  const isInstructor = user?._id === course?.instructorId;
  const isAdmin = user?.role === 'admin';
  const canAccessAll = isInstructor || isAdmin || isEnrolled;

  return (
    <div style={styles.page}>
      <div style={styles.content}>
        <div style={styles.topBar}>
          <Link to={`/courses/${courseId}`} style={styles.backLink}>
            <ChevronLeft size={20} />
            <span>Back to Course</span>
          </Link>
          <h2 style={styles.courseTitle}>{course?.title}</h2>
        </div>

        <div style={styles.videoArea}>
          {currentLesson?.freePreview || canAccessAll ? (
            <div style={styles.playerPlaceholder}>
              <PlayCircle size={64} color="white" />
              <p>Video Player Placeholder</p>
              <p style={styles.lessonTitleOverlay}>{currentLesson?.title}</p>
            </div>
          ) : (
            <div style={styles.lockedArea}>
              <AlertCircle size={48} color="var(--text-muted)" />
              <h3>This lesson is locked</h3>
              <p>Please enroll in the course to access this content.</p>
              <Link to={`/courses/${courseId}`} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                View Enrollment Options
              </Link>
            </div>
          )}
        </div>

        <div style={styles.lessonInfo}>
          <h1 style={styles.lessonTitle}>{currentLesson?.title}</h1>
          <div style={styles.lessonDescription}>
            <p>{currentLesson?.content || 'No description available for this lesson.'}</p>
          </div>
        </div>
      </div>

      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h3>Course Content</h3>
        </div>
        <div style={styles.sidebarList}>
          {lessons.map((lesson) => (
            <LessonItem
              key={lesson._id}
              lesson={lesson}
              isLocked={!lesson.freePreview && !canAccessAll}
              isActive={lesson._id === lessonId}
              onClick={() => handleLessonClick(lesson._id)}
            />
          ))}
        </div>
      </aside>
    </div>
  );
};

const styles = {
  page: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    height: 'calc(100vh - 80px)',
    overflow: 'hidden',
    marginTop: '1rem',
  },
  content: {
    overflowY: 'auto',
    padding: '4rem',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
    marginBottom: '3rem',
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '800',
    padding: '0.8rem 1.5rem',
    borderRadius: '16px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    textDecoration: 'none',
  },
  courseTitle: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: 'var(--secondary)',
    letterSpacing: '-0.03em',
  },
  videoArea: {
    width: '100%',
    aspectRatio: '16/9',
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    marginBottom: '4rem',
    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.6)',
    border: '2px solid rgba(255, 255, 255, 0.1)',
  },
  playerPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  lessonTitleOverlay: {
    fontSize: '1.25rem',
    fontWeight: '600',
    opacity: 0.9,
  },
  lockedArea: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    textAlign: 'center',
    padding: '4rem',
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  },
  lessonInfo: {
    color: 'white',
    maxWidth: '1000px',
  },
  lessonTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em',
    background: 'linear-gradient(135deg, #fff 0%, #cbd5e0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  lessonDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 1.8,
    fontSize: '1.2rem',
    fontWeight: '500',
  },
  sidebar: {
    backgroundColor: 'var(--bg-card)',
    borderLeft: '2px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarHeader: {
    padding: '2.5rem 2rem',
    borderBottom: '2px solid var(--border)',
    backgroundColor: 'white',
  },
  sidebarList: {
    flex: 1,
    overflowY: 'auto',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  }
};

export default LessonPlayerPage;
