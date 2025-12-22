import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CourseListPage from './pages/CourseListPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPlayerPage from './pages/LessonPlayerPage';
import MyCoursesPage from './pages/MyCoursesPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentCancelPage from './pages/PaymentCancelPage';

const NotFoundPage = () => (
  <div className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
    <h1>404 Not Found</h1>
    <p>The page you are looking for doesn't exist.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '2rem' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/courses" element={<CourseListPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPlayerPage />} />
            <Route path="/my-courses" element={<MyCoursesPage />} />
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/payment/cancel" element={<PaymentCancelPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
