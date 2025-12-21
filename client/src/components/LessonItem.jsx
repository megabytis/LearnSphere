import React from 'react';
import { Play, Lock, CheckCircle } from 'lucide-react';

const LessonItem = ({ lesson, isLocked, isActive, onClick }) => {
  return (
    <div 
      onClick={!isLocked ? onClick : undefined}
      style={{
        ...styles.item,
        ...(isLocked ? styles.locked : {}),
        ...(isActive ? styles.active : {}),
      }}
    >
      <div style={styles.left}>
        {isLocked ? (
          <Lock size={18} color="var(--text-muted)" />
        ) : (
          <Play size={18} color={isActive ? 'var(--accent)' : 'var(--text-muted)'} />
        )}
        <span style={{
          ...styles.title,
          ...(isActive ? styles.activeTitle : {}),
        }}>
          {lesson.title}
        </span>
      </div>
      {lesson.freePreview && !isLocked && (
        <span style={styles.previewBadge}>Free Preview</span>
      )}
    </div>
  );
};

const styles = {
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderRadius: 'var(--radius)',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginBottom: '0.5rem',
    border: '1px solid transparent',
  },
  locked: {
    cursor: 'not-allowed',
    opacity: 0.7,
  },
  active: {
    backgroundColor: '#ebf8ff',
    borderColor: 'var(--accent)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  title: {
    fontSize: '0.95rem',
    color: 'var(--primary)',
  },
  activeTitle: {
    color: 'var(--accent)',
    fontWeight: '600',
  },
  previewBadge: {
    fontSize: '0.7rem',
    fontWeight: '600',
    padding: '0.2rem 0.4rem',
    backgroundColor: '#f0fff4',
    color: '#2f855a',
    borderRadius: '4px',
    textTransform: 'uppercase',
  }
};

export default LessonItem;
