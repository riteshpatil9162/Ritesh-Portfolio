import React from 'react';
import { motion } from 'framer-motion';

const SkillBar = ({ skill, percentage, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: delay / 1000 }}
      className="mb-6"
    >
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium">{skill}</span>
        <span className="text-gray-400 font-medium">{percentage}%</span>
      </div>
      {/* 3D Progress Track */}
      <div className="h-3 rounded-full overflow-hidden progress-track">
        {/* 3D Blue Progress Fill */}
        <motion.div
          className="h-full rounded-full relative progress-fill-blue"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: (delay / 1000) + 0.2, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
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
    'Full Stack',
    'Payment Gateways',
    'MongoDB Atlas',
    'Scikit-learn',
    'Pandas',
    'NumPy',
    'Git',
    'AWS',
    'Jupyter',
    'VS Code',
    'Android Studio',
  ];

  return (
    <section className="section-padding relative bg-gradient-to-b from-black via-gray-900 to-black" id="skills">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
                className="px-6 py-3 glass-strong rounded-full text-white font-medium cursor-pointer hover:bg-blue-500/20 transition-colors"
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