import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Achievement from '../models/Achievement.js';
import connectDB from '../config/db.js';

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const achievements = [
  { title: 'Android Development Certification' },
  { title: 'Zscaler Cybersecurity Fundamentals Certification' },
  { title: 'Published Research Paper on Sign Language Detection' }
];

const importData = async () => {
  try {
    // Delete existing achievements
    await Achievement.deleteMany();

    // Insert new achievements
    await Achievement.insertMany(achievements);

    console.log('Achievements Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
