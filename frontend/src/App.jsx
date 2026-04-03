import React, { Suspense, lazy } from 'react';
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

// Loading Component
const Loading = () => (
  <div className="h-screen w-full flex items-center justify-center bg-black">
    <div className="text-center">
      <div className="loader mb-4" />
      <p className="text-white text-lg">Loading amazing content...</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="relative bg-black min-h-screen">
      <Suspense fallback={<Loading />}>
        {/* Navigation */}
        <Navbar />

        {/* Main Sections */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <MLDemo />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Chatbot */}
        <Chatbot />
      </Suspense>
    </div>
  );
}

export default App;
