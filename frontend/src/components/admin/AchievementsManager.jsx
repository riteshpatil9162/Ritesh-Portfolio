import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_URL } from '../../config/api';

const AchievementsManager = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/achievements`);
      const achievementsData = response.data.data || response.data || [];
      setAchievements(Array.isArray(achievementsData) ? achievementsData : []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      alert('Failed to fetch achievements');
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('Please login first');
      return;
    }

    try {
      const achievementData = { ...formData };

      if (editingAchievement) {
        await axios.put(
          `${API_URL}/api/achievements/${editingAchievement._id}`,
          achievementData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Achievement updated successfully!');
      } else {
        await axios.post(
          `${API_URL}/api/achievements`,
          achievementData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Achievement created successfully!');
      }

      setShowModal(false);
      setEditingAchievement(null);
      resetForm();
      fetchAchievements();
    } catch (error) {
      console.error('Error saving achievement:', error);
      alert(error.response?.data?.message || 'Failed to save achievement');
    }
  };

  const handleEdit = (achievement) => {
    setEditingAchievement(achievement);
    setFormData({
      title: achievement.title,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/api/achievements/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Achievement deleted successfully!');
      fetchAchievements();
    } catch (error) {
      console.error('Error deleting achievement:', error);
      alert('Failed to delete achievement');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
    });
  };

  const handleAddNew = () => {
    resetForm();
    setEditingAchievement(null);
    setShowModal(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold gradient-text">Achievements Management</h2>
          <p className="text-gray-400 mt-2">Manage your achievements and certifications</p>
        </div>
        <button
          onClick={handleAddNew}
          className="btn-primary px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4">Loading achievements...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-6 hover:border-primary/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 w-full">
                <span className="text-2xl text-primary">✅</span>
                <span className="text-gray-300 font-medium break-words w-full pr-4">{achievement.title}</span>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(achievement)}
                  className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(achievement._id)}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {achievements.length === 0 && !loading && (
        <div className="text-center py-20">
          <p className="text-gray-400">No achievements found. Add your first achievement!</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold gradient-text">
                {editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingAchievement(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Achievement Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="E.g. Certified Data Scientist"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingAchievement(null);
                  }}
                  className="flex-1 px-6 py-3 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary px-6 py-3 rounded-lg"
                >
                  {editingAchievement ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AchievementsManager;
