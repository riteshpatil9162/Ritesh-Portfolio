import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/api';
import { motion } from 'framer-motion';

const TimelineItem = ({ item, index, isLeft }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className={`flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-center mb-12 md:mb-8`}
    >
      {/* Content Card */}
      <div className="w-full md:w-5/12">
        <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
          {/* Icon */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{item.icon}</span>
            <span className="text-sm text-primary font-semibold">{item.period}</span>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          
          {/* Organization */}
          <p className="text-neon-blue font-medium mb-3">{item.organization}</p>
          
          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Skills/Highlights */}
          {item.highlights && (
            <div className="flex flex-wrap gap-2">
              {item.highlights.map((highlight, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Timeline Center */}
      <div className="hidden md:flex md:w-2/12 justify-center relative">
        {/* Dot */}
        <div className="w-6 h-6 bg-primary rounded-full border-4 border-black shadow-lg shadow-primary/50 z-10 group-hover:scale-125 transition-transform" />
      </div>

      {/* Empty Space */}
      <div className="hidden md:block md:w-5/12" />
    </motion.div>
  );
};

const Experience = () => {
  const [achievementsList, setAchievementsList] = useState([]);
  const [loadingAchievements, setLoadingAchievements] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/achievements`);
        const data = response.data.data || response.data || [];
        setAchievementsList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoadingAchievements(false);
      }
    };
    fetchAchievements();
  }, []);

  const experiences = [
    {
      icon: '💼',
      period: 'January 2026 - Present',
      title: 'Website Development Intern',
      organization: 'Brandkrit Technologies',
      description: 'Building responsive and user-centric web applications, focusing on clean UI/UX and full-stack functionality for real-world projects.',
      highlights: ['Web Development', 'Full Stack', 'UI/UX Design'],
    },
    {
      icon: '📱',
      period: 'June 2023 - July 2023',
      title: 'Android Developer Intern',
      organization: 'iGAP Technologies Private Limited',
      description: 'Developed and optimized Android applications with intuitive UI and efficient performance in real-world development scenarios.',
      highlights: ['Android Development'],
    },
  ];

  const education = [
    {
      icon: '🎓',
      period: '2024 - 2027',
      title: 'B.Tech in Data Science Engineering',
      organization: 'D. Y. Patil College of Engineering and Technology, Kolhapur',
      description: 'Passionate about combining Data Science with interactive frontend experiences to build intelligent and user-centric applications.',
      highlights: ['Python', 'Data Science', 'Data Analysis', 'Full Stack'],
    },
    {
      icon: '💻',
      period: '2021 - 2024',
      title: 'Diploma in Computer Engineering',
      organization: 'Sharad Institute of Technology, Polytechnic, Yadrav',
      description: 'Completed a diploma in Computer Engineering with strong academic performance. Gained hands-on experience in programming, software development, and core computer science fundamentals, building a solid technical foundation.',
      highlights: ['87.71%', 'Android Development', 'Programming', 'Software Development'],
    },
    {
      icon: '🏆',
      period: '2020 - 2021',
      title: 'Secondary School (10th)',
      organization: 'Laxminarayan Malu Highschool, Jaysingpur',
      description: 'Completed secondary education with excellent academic performance, developing a strong base in mathematics and logical problem-solving.',
      highlights: ['93.80%', 'Foundation', 'Mathematics'],
    },
  ];

  return (
    <section className="section-padding relative bg-gradient-to-b from-black via-gray-900 to-black" id="experience">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Experience Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-heading gradient-text">Experience</h2>
            <p className="section-subheading">
              My professional journey and work experience
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-neon-blue to-primary opacity-30" />

            {experiences.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-heading gradient-text">Education</h2>
            <p className="section-subheading">
              My academic background and qualifications
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-neon-blue to-primary opacity-30" />

            {education.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-10 text-white font-poppins">
            🏅 Achievements & Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingAchievements ? (
              <div className="col-span-full text-center text-gray-400 py-10">Loading achievements...</div>
            ) : achievementsList.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-10">No achievements found.</div>
            ) : achievementsList.map((achievement, index) => (
              <motion.div
                key={achievement._id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-4 flex items-center gap-3 hover:bg-white/10 transition-all"
              >
                <span className="text-2xl">✅</span>
                <span className="text-gray-300 text-sm">{achievement.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
