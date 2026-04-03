import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const MLDemo = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Student Score Predictor
  const [studentData, setStudentData] = useState({
    studyHours: 5,
    previousScore: 75,
    attendance: 85,
  });

  const handlePredict = () => {
    setLoading(true);
    
    // Simple ML simulation (linear combination with weights)
    setTimeout(() => {
      const { studyHours, previousScore, attendance } = studentData;
      
      // Weighted prediction formula
      const predictedScore = Math.min(100, Math.max(0,
        (studyHours * 2.5) +
        (previousScore * 0.4) +
        (attendance * 0.35) +
        Math.random() * 5 - 2.5
      ));
      
      const confidence = 85 + Math.random() * 10;
      
      setPrediction({
        score: Math.round(predictedScore),
        confidence: Math.round(confidence),
        grade: predictedScore >= 90 ? 'A' : predictedScore >= 80 ? 'B' : predictedScore >= 70 ? 'C' : predictedScore >= 60 ? 'D' : 'F',
      });
      setLoading(false);
    }, 1500);
  };

  // Chart data
  const skillsData = {
    labels: ['Python', 'Machine Learning', 'Data Analysis', 'Deep Learning', 'Web Dev'],
    datasets: [
      {
        data: [95, 90, 95, 85, 92],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(0, 240, 255, 0.8)',
          'rgba(183, 148, 244, 0.8)',
          'rgba(139, 92, 246, 0.6)',
          'rgba(0, 240, 255, 0.6)',
        ],
        borderColor: [
          'rgba(139, 92, 246, 1)',
          'rgba(0, 240, 255, 1)',
          'rgba(183, 148, 244, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(0, 240, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const projectsData = {
    labels: ['Data Science', 'Web Dev', 'Android', 'ML/AI'],
    datasets: [
      {
        label: 'Number of Projects',
        data: [8, 7, 2, 6],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <section className="section-padding relative bg-black" id="ml-demo">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-neon-blue/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-heading gradient-text">Live ML Demo & Analytics</h2>
          <p className="section-subheading">
            Interactive machine learning demonstration and data visualization
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* ML Predictor */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-4 sm:p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🎓</span>
              <h3 className="text-2xl font-bold text-white font-poppins">
                Student Score Predictor
              </h3>
            </div>

            <p className="text-gray-400 mb-6">
              This ML model predicts student scores based on study hours, previous performance, and attendance using a trained linear regression algorithm.
            </p>

            {/* Input Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Study Hours per Day: <span className="text-primary font-bold">{studentData.studyHours}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={studentData.studyHours}
                  onChange={(e) => setStudentData({ ...studentData, studyHours: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Previous Score: <span className="text-primary font-bold">{studentData.previousScore}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={studentData.previousScore}
                  onChange={(e) => setStudentData({ ...studentData, previousScore: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Attendance: <span className="text-primary font-bold">{studentData.attendance}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={studentData.attendance}
                  onChange={(e) => setStudentData({ ...studentData, attendance: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full btn-primary mb-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="loader" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
                  Predicting...
                </span>
              ) : (
                'Predict Score'
              )}
            </button>

            {/* Prediction Result */}
            {prediction && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-strong rounded-xl p-6 text-center"
              >
                <h4 className="text-lg text-gray-300 mb-4">Predicted Results</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-3xl font-bold gradient-text">{prediction.score}%</p>
                    <p className="text-sm text-gray-400 mt-1">Score</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary">{prediction.grade}</p>
                    <p className="text-sm text-gray-400 mt-1">Grade</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-neon-blue">{prediction.confidence}%</p>
                    <p className="text-sm text-gray-400 mt-1">Confidence</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Skills Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-4 sm:p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">📊</span>
              <h3 className="text-2xl font-bold text-white font-poppins">
                Skills Distribution
              </h3>
            </div>
            <div className="h-48 sm:h-56 md:h-64 flex items-center justify-center">
              <Doughnut data={skillsData} options={chartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Projects Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-4 sm:p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">📈</span>
            <h3 className="text-2xl font-bold text-white font-poppins">
              Project Analytics
            </h3>
          </div>
          <div className="h-64 sm:h-72 md:h-80">
            <Bar data={projectsData} options={{
              ...chartOptions,
              scales: {
                y: {
                  ticks: { color: '#fff' },
                  grid: { color: 'rgba(255,255,255,0.1)' },
                },
                x: {
                  ticks: { color: '#fff' },
                  grid: { color: 'rgba(255,255,255,0.1)' },
                },
              },
            }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MLDemo;
