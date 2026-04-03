import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Data Science', 'Web Dev', 'Android'],
    required: true,
  },
  tech: [{
    type: String,
  }],
  icon: {
    type: String,
    default: '🚀',
  },
  github: {
    type: String,
    trim: true,
  },
  live: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
