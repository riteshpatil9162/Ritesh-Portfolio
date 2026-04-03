import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime;
      let animationFrame;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-mono text-4xl md:text-5xl font-bold gradient-text">
      {count}{suffix}
    </span>
  );
};

const About = () => {
  const stats = [
    { label: 'Projects Completed', value: 25, suffix: '+' },
    { label: 'Technologies Mastered', value: 15, suffix: '+' },
    { label: 'Years Experience', value: 3, suffix: '+' },
  ];

  const highlights = [
    {
      icon: '🎓',
      title: 'Education',
      description: 'Data Science Engineering Student',
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Creating solutions that make a difference',
    },
    {
      icon: '🚀',
      title: 'Mission',
      description: 'Building the future with AI and Data',
    },
  ];

  return (
    <section className="section-padding relative bg-black" id="about">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading gradient-text">About Me</h2>
          <p className="section-subheading">
            Get to know more about my journey and passion
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8 md:p-12"
          >
            <h3 className="text-3xl font-bold mb-6 text-white font-poppins">
              Hi, I'm <span className="gradient-text">Ritesh</span>
            </h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I'm a passionate <span className="text-primary font-semibold">Data Science Engineering student</span> with 
                a deep love for transforming data into actionable insights and building innovative solutions.
              </p>
              <p>
                My expertise spans across <span className="text-neon-blue font-semibold">Machine Learning</span>, 
                <span className="text-primary font-semibold"> Full-Stack Development</span>, and 
                <span className="text-neon-purple font-semibold"> Android Development</span>. 
                I believe in the power of technology to solve real-world problems.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                or brainstorming the next big idea. I'm always eager to learn and take on new challenges.
              </p>
            </div>

            {/* Skills Badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {['Python', 'React', 'Machine Learning', 'Node.js', 'Android', 'Data Science'].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full glass text-sm font-medium text-white hover:bg-primary/20 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform">
                    {highlight.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 font-poppins">
                      {highlight.title}
                    </h4>
                    <p className="text-gray-300">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-strong rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300"
            >
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              <p className="text-gray-300 mt-4 text-lg font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
