// API Configuration
// Automatically uses the correct URL based on environment
// Development: http://localhost:5000
// Production: https://darshanease-backend-ikt6.onrender.com
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Log API URL in development only
if (import.meta.env.DEV) {
  console.log('🔗 API URL:', API_URL);
}
