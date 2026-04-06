import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import Project model
import Project from '../models/Project.js';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Featured Projects Data
const featuredProjects = [
  {
    title: 'UrbanEye - Municipal Issue Reporting and Managing Ecosystem',
    description: 'UrbanEye is a MERN-based platform that streamlines municipal issue reporting using AI-powered validation and automated task management.',
    category: 'Web Dev',
    tech: ['MongoDB', 'React.js', 'Node.js', 'Express.js', 'AI/ML'],
    icon: '🏙️',
    github: 'https://github.com/yourusername/urbaneye',
    live: 'https://urbaneye-ai.vercel.app/',
    featured: true
  },
  {
    title: 'DarshanEase - Temple Ticket Booking',
    description: 'DarshanEase is a MERN-based web application for seamless temple darshan booking, featuring secure payments, real-time slot availability, and role-based management.',
    category: 'Web Dev',
    tech: ['MERN Stack', 'Razorpay', 'MongoDB', 'JWT', 'Payment Gateway'],
    icon: '🛕',
    github: 'https://github.com/yourusername/darshanease',
    live: 'https://darshanease-booking.vercel.app/',
    featured: true
  }
];

// Seed function
const seedProjects = async () => {
  try {
    await connectDB();

    console.log('\n🔄 Starting seeding process...\n');

    // Clear existing projects
    const deleteResult = await Project.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing projects`);

    // Insert new featured projects
    const insertedProjects = await Project.insertMany(featuredProjects);
    console.log(`✅ Successfully seeded ${insertedProjects.length} featured projects:\n`);

    insertedProjects.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.title}`);
      console.log(`      Category: ${project.category}`);
      console.log(`      Tech: ${project.tech.join(', ')}`);
      console.log(`      Live: ${project.live}\n`);
    });

    console.log('✨ Seeding completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error.message);
    process.exit(1);
  }
};

// Run the seed function
seedProjects();
