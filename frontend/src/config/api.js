// API Configuration
// Automatically uses the correct URL based on environment
// Development: http://localhost:5000
// Production: https://darshanease-backend-ikt6.onrender.com
export const API_URL = import.meta.env.VITE_API_URL || 'https://darshanease-backend-ikt6.onrender.com';

// Log API URL in development only
if (import.meta.env.DEV) {
  console.log('🔗 API URL:', API_URL);
} else {
  console.log('🌐 Production API URL:', API_URL);
}
