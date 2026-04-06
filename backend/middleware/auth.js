import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import fs from 'fs';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

      // Get admin from token
      req.admin = await Admin.findById(decoded.id).select('-password');
    } catch (error) {
      fs.appendFileSync('auth_debug.log', new Date().toISOString() + ': ' + error.stack + '\n');
      console.error('Token Verification Error:', error);
      return res.status(401).json({
        success: false,
        message: `Token Verification Failed: ${error.message}`,
        error: error.message
      });
    }
    return next();
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Not authorized, no token',
    });
  }
};
