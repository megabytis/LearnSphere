import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../services/api';
import CourseCard from '../components/CourseCard';
import { Search, Loader, ChevronLeft, ChevronRight } from 'lucide-react';

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await courseService.getCourses(page, searchTerm);
        setCourses(response.data.courses);
        setTotalPages(response.data.pagination.totalPages);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Debounce search to avoid too many requests
    const timeoutId = setTimeout(() => {
      fetchCourses();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [page, searchTerm]);

  const handlePrevPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // Reset to page 1 on search
            }}
            style={styles.searchInput}
          />
        </div>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {loading ? (
        <div style={styles.center}>
          <Loader className="animate-spin" size={48} color="var(--accent)" />
        </div>
      ) : courses.length > 0 ? (
        <>
          <div style={styles.grid}>
            {courses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div style={styles.pagination}>
              <button 
                onClick={handlePrevPage} 
                disabled={page === 1}
                style={{ ...styles.pageBtn, ...(page === 1 ? styles.disabledBtn : {}) }}
              >
                <ChevronLeft size={20} /> Previous
              </button>
              <span style={styles.pageInfo}>
                Page {page} of {totalPages}
              </span>
              <button 
                onClick={handleNextPage} 
                disabled={page === totalPages}
                style={{ ...styles.pageBtn, ...(page === totalPages ? styles.disabledBtn : {}) }}
              >
                Next <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
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
    fontWeight: '800',
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
    transition: 'border-color 0.2s',
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
    height: '40vh',
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
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    marginTop: '2rem',
    paddingBottom: '4rem',
  },
  pageBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--radius)',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    color: 'var(--text-main)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  disabledBtn: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  pageInfo: {
    fontWeight: '600',
    color: 'var(--text-muted)',
  }
};

export default CourseListPage;
