import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement;
