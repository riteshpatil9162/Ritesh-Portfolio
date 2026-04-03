import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CircularProgress = ({ percentage, label, color, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= percentage) {
              clearInterval(interval);
              return percentage;
            }
            return prev + 1;
          });
        }, 20);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, percentage, delay]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
        <svg className="transform -rotate-90 w-full h-full">
          {/* Background Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
            style={{ filter: `drop-shadow(0 0 10px ${color})` }}
          />
        </svg>
        {/* Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl sm:text-3xl font-bold text-white">{progress}%</span>
        </div>
      </div>
      <p className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-white">{label}</p>
    </div>
  );
};

const SkillBar = ({ skill, percentage, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        setWidth(percentage);
      }, delay);
    }
  }, [isInView, percentage, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay / 1000 }}
      className="mb-6"
    >
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium">{skill}</span>
        <span className="text-gray-400">{percentage}%</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-neon-blue rounded-full relative"
          initial={{ width: 0 }}
          style={{ width: `${width}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const programmingSkills = [
    { label: 'Python', percentage: 95, color: '#00F0FF' },
    { label: 'JavaScript', percentage: 90, color: '#8B5CF6' },
    { label: 'Java', percentage: 85, color: '#B794F4' },
  ];

  const dataScienceSkills = [
    { skill: 'Machine Learning', percentage: 90 },
    { skill: 'Deep Learning', percentage: 85 },
    { skill: 'Data Analysis', percentage: 95 },
    { skill: 'Computer Vision', percentage: 80 },
    { skill: 'NLP', percentage: 85 },
  ];

  const webSkills = [
    { skill: 'React.js', percentage: 92 },
    { skill: 'Node.js', percentage: 88 },
    { skill: 'MongoDB', percentage: 85 },
    { skill: 'Tailwind CSS', percentage: 95 },
    { skill: 'Express.js', percentage: 87 },
  ];

  const tools = [
    'TensorFlow',
    'PyTorch',
    'Scikit-learn',
    'Pandas',
    'NumPy',
    'Git',
    'Docker',
    'AWS',
    'Firebase',
    'Jupyter',
    'VS Code',
    'Android Studio',
  ];

  return (
    <section className="section-padding relative bg-gradient-to-b from-black via-gray-900 to-black" id="skills">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-heading gradient-text">Skills & Expertise</h2>
          <p className="section-subheading">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Programming Languages - Circular Progress */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white font-poppins">
            Programming Languages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {programmingSkills.map((skill, index) => (
              <CircularProgress
                key={skill.label}
                label={skill.label}
                percentage={skill.percentage}
                color={skill.color}
                delay={index * 200}
              />
            ))}
          </div>
        </motion.div>

        {/* Data Science & Web Dev Skills - Horizontal Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Data Science */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-8 text-white font-poppins flex items-center gap-3">
              <span className="text-3xl">🤖</span>
              Data Science & ML
            </h3>
            {dataScienceSkills.map((skill, index) => (
              <SkillBar
                key={skill.skill}
                skill={skill.skill}
                percentage={skill.percentage}
                delay={index * 100}
              />
            ))}
          </motion.div>

          {/* Web Development */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-8 text-white font-poppins flex items-center gap-3">
              <span className="text-3xl">💻</span>
              Web Development
            </h3>
            {webSkills.map((skill, index) => (
              <SkillBar
                key={skill.skill}
                skill={skill.skill}
                percentage={skill.percentage}
                delay={index * 100}
              />
            ))}
          </motion.div>
        </div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-8 text-white font-poppins text-center flex items-center justify-center gap-3">
            <span className="text-3xl">🛠️</span>
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {tools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="px-6 py-3 glass-strong rounded-full text-white font-medium cursor-pointer hover:bg-primary/20 transition-colors"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
