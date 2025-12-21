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
    gridTemplateColumns: '1fr 350px',
    height: 'calc(100vh - 64px)',
    overflow: 'hidden',
    marginTop: '-2rem', // Offset the main padding
  },
  content: {
    overflowY: 'auto',
    padding: '2rem',
    backgroundColor: '#000',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    marginBottom: '1.5rem',
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#fff',
    fontSize: '0.9rem',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius)',
    border: '1px solid #4a5568',
    backgroundColor: 'transparent',
    textDecoration: 'none',
  },
  courseTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#a0aec0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  videoArea: {
    width: '100%',
    aspectRatio: '16/9',
    backgroundColor: '#1a202c',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
    marginBottom: '2rem',
  },
  playerPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    color: '#a0aec0',
  },
  lessonTitleOverlay: {
    fontSize: '0.9rem',
    opacity: 0.7,
  },
  lockedArea: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    textAlign: 'center',
    padding: '2rem',
  },
  lessonInfo: {
    color: 'white',
  },
  lessonTitle: {
    fontSize: '1.75rem',
    marginBottom: '1rem',
  },
  lessonDescription: {
    color: '#cbd5e0',
    lineHeight: 1.6,
  },
  sidebar: {
    backgroundColor: 'var(--bg-card)',
    borderLeft: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid var(--border)',
  },
  sidebarList: {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  }
};

export default LessonPlayerPage;
