import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import MLDemo from './components/sections/MLDemo';
import Chatbot from './components/chatbot/Chatbot';
import ErrorBoundary from './components/common/ErrorBoundary';

// Admin Components
import Login from './components/admin/Login';
import DashboardLayout from './components/admin/DashboardLayout';
import ProjectsManager from './components/admin/ProjectsManager';
import ContactsManager from './components/admin/ContactsManager';
import AchievementsManager from './components/admin/AchievementsManager';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Loading Component
const Loading = () => (
  <div className="h-screen w-full flex items-center justify-center bg-black">
    <div className="text-center">
      <div className="loader mb-4" />
      <p className="text-white text-lg">Loading amazing content...</p>
    </div>
  </div>
);

// Main Portfolio Page Component
const Portfolio = () => (
  <div className="relative bg-black min-h-screen">
    <Navbar />
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <MLDemo />
      <Contact />
    </main>
    <Footer />
    <Chatbot />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Main Portfolio Route */}
            <Route path="/" element={<Portfolio />} />

            {/* Admin Login */}
            <Route path="/admin/login" element={<Login />} />

            {/* Admin Dashboard Routes - Protected */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Default redirect to projects */}
              <Route index element={<Navigate to="/admin/dashboard/projects" replace />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="achievements" element={<AchievementsManager />} />
              <Route path="contacts" element={<ContactsManager />} />
            </Route>

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
