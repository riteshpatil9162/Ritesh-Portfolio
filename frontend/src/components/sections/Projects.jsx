import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';

const ProjectCard = ({ project, index }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        scale: 1.05,
      });
    }

    return () => {
      if (tiltRef.current && tiltRef.current.vanillaTilt) {
        tiltRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <motion.div
      ref={tiltRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden group cursor-pointer h-full"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-neon-blue/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">{project.icon}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-60" />
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Category Badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
          project.category === 'Data Science' 
            ? 'bg-neon-blue/20 text-neon-blue' 
            : project.category === 'Web Dev' 
            ? 'bg-primary/20 text-primary' 
            : 'bg-neon-purple/20 text-neon-purple'
        }`}>
          {project.category}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = React.useState('All');

  const categories = ['All', 'Data Science', 'Web Dev', 'Android'];

  const projects = [
    {
      icon: '🧠',
      title: 'AI-Powered Disease Predictor',
      description: 'Machine learning model that predicts diseases based on symptoms using Random Forest and Neural Networks. Achieved 94% accuracy on test data.',
      category: 'Data Science',
      tech: ['Python', 'TensorFlow', 'Scikit-learn', 'Flask'],
      github: '#',
      live: '#',
    },
    {
      icon: '📊',
      title: 'Real-Time Data Dashboard',
      description: 'Interactive dashboard for visualizing real-time data analytics with beautiful charts and insights using D3.js and React.',
      category: 'Data Science',
      tech: ['React', 'D3.js', 'Python', 'MongoDB'],
      github: '#',
      live: '#',
    },
    {
      icon: '🛒',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with payment integration, admin dashboard, and real-time inventory management.',
      category: 'Web Dev',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      live: '#',
    },
    {
      icon: '💬',
      title: 'AI Chatbot Assistant',
      description: 'Intelligent chatbot using NLP and transformer models to provide customer support and answer queries.',
      category: 'Data Science',
      tech: ['Python', 'Transformers', 'FastAPI', 'React'],
      github: '#',
      live: '#',
    },
    {
      icon: '📱',
      title: 'Fitness Tracker App',
      description: 'Android application for tracking workouts, calories, and fitness goals with beautiful UI and cloud sync.',
      category: 'Android',
      tech: ['Kotlin', 'Firebase', 'Jetpack Compose'],
      github: '#',
    },
    {
      icon: '🎬',
      title: 'Movie Recommendation System',
      description: 'Content-based and collaborative filtering system that recommends movies based on user preferences and ratings.',
      category: 'Data Science',
      tech: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit'],
      github: '#',
      live: '#',
    },
    {
      icon: '🌐',
      title: 'Social Media Platform',
      description: 'Full-featured social media app with posts, comments, likes, real-time chat, and user authentication.',
      category: 'Web Dev',
      tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      github: '#',
      live: '#',
    },
    {
      icon: '📸',
      title: 'Image Recognition App',
      description: 'Computer vision application that identifies objects in images using CNN and transfer learning.',
      category: 'Data Science',
      tech: ['Python', 'PyTorch', 'OpenCV', 'Flask'],
      github: '#',
      live: '#',
    },
    {
      icon: '🎮',
      title: 'Game Stats Tracker',
      description: 'Android app for gamers to track their statistics, achievements, and compete with friends.',
      category: 'Android',
      tech: ['Java', 'Firebase', 'Room DB'],
      github: '#',
    },
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section className="section-padding relative bg-black" id="projects">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-neon-blue/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-heading gradient-text">Featured Projects</h2>
          <p className="section-subheading">
            Showcasing my best work in Data Science and Development
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/50'
                  : 'glass text-gray-300 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/riteshpatil9162"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-block"
          >
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
