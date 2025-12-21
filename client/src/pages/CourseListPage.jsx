import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../services/api';
import CourseCard from '../components/CourseCard';
import { Search, Loader, ChevronLeft } from 'lucide-react';

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getCourses();
        setCourses(response.data.courses);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Link to="/" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
          <ChevronLeft size={18} /> Back to Home
        </Link>
      </div>
      <div style={styles.header}>
        <h1 style={styles.title}>All Courses</h1>
        <div style={styles.searchWrapper}>
          <Search size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {filteredCourses.length > 0 ? (
        <div style={styles.grid}>
          {filteredCourses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div style={styles.empty}>
          <p>No courses found matching your search.</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    fontSize: '2rem',
    color: 'var(--primary)',
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    color: 'var(--text-muted)',
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: 'var(--bg-card)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
    paddingBottom: '4rem',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  },
  error: {
    color: 'var(--error)',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem',
    backgroundColor: 'var(--bg-card)',
    borderRadius: 'var(--radius)',
    color: 'var(--text-muted)',
  }
};

export default CourseListPage;
