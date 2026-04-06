import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

async function testUpload() {
  try {
    console.log('Logging in...');
    // We just need a valid token. Let's make one using an arbitrary object id
    const token = jwt.sign({ id: new mongoose.Types.ObjectId() }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '30d'
    });

    console.log('Token created length:', token.length);

    console.log('Hitting auth-protected endpoint as a test');
    // We can't use Admin.findById because the ID doesn't exist, so this MIGHT trigger "Not authorized, token failed" if req.admin check fails?
    // Wait! auth.js:
    // req.admin = await Admin.findById(decoded.id).select('-password');
    // next();
    // It does not check if req.admin is null! It just calls next()!

    const formData = new FormData();
    formData.append('title', 'Test Project');
    formData.append('category', 'Web Dev');
    
    // Create a dummy image
    fs.writeFileSync('dummy.jpg', 'fake image data');
    formData.append('image', fs.createReadStream('dummy.jpg'));

    console.log('Sending upload request...');
    const response = await axios.post('http://localhost:5000/api/projects', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...formData.getHeaders()
      }
    });

    console.log('Success:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Server responded with:', error.response.status, error.response.data);
    } else {
      console.error('Network error:', error.message);
    }
  }
}

testUpload();
