import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api, { courseService } from '../services/api';
import CourseCard from '../components/CourseCard';
import { Loader, BookOpen, ArrowRight, ChevronLeft } from 'lucide-react';

const MyCoursesPage = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const response = await api.get('/auth/me/enrollments');
        // The backend returns enrollments, we need to extract the course data
        const courses = response.data.enrollments.map(enrollment => ({
          ...enrollment.courseId,
          progress: enrollment.progress,
          enrolledAt: enrollment.enrolledAt
        }));
        setEnrolledCourses(courses); 
      } catch (err) {
        setError('Failed to load your courses.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyCourses();
    }
  }, [user]);

  if (loading) {
    return (
      <div style={styles.center}>
        <Loader className="animate-spin" size={48} color="var(--accent)" />
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/courses" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
          <ChevronLeft size={18} /> Back to Browse
        </Link>
      </div>
      <div style={styles.header}>
        <h1 style={styles.title}>My Courses</h1>
        <p style={styles.sub}>Continue where you left off</p>
      </div>

      {enrolledCourses.length > 0 ? (
        <div style={styles.grid}>
          {enrolledCourses.map(course => (
            <div key={course._id} style={styles.courseWrapper}>
              <CourseCard course={course} />
              <div style={styles.progressArea}>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: '45%' }}></div>
                </div>
                <div style={styles.progressText}>
                  <span>45% Complete</span>
                  <Link to={`/courses/${course._id}`} style={styles.resumeLink}>
                    Resume <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.empty}>
          <BookOpen size={48} color="var(--text-muted)" />
          <h2>No courses enrolled yet</h2>
          <p>Explore our catalog and start learning today!</p>
          <Link to="/courses" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
};

const styles = {
  header: {
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2rem',
    color: 'var(--primary)',
    marginBottom: '0.5rem',
  },
  sub: {
    color: 'var(--text-muted)',
    fontSize: '1.1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2.5rem',
    paddingBottom: '4rem',
  },
  courseWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  progressArea: {
    padding: '0 0.5rem',
  },
  progressBar: {
    height: '8px',
    backgroundColor: 'var(--border)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '0.5rem',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'var(--success)',
  },
  progressText: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
  },
  resumeLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    color: 'var(--accent)',
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    padding: '5rem 2rem',
    backgroundColor: 'var(--bg-card)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  }
};

export default MyCoursesPage;
