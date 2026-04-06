# 🚀 Quick Reference Card

## Production URLs
- **Portfolio:** https://riteshpatil-portfolio.vercel.app/
- **Admin:** https://riteshpatil-portfolio.vercel.app/admin/login
- **API:** https://darshanease-backend-ikt6.onrender.com

---

## Environment Variables

### Vercel (Frontend)
```
VITE_API_URL=https://darshanease-backend-ikt6.onrender.com
```

### Render (Backend)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-production-secret
FRONTEND_URL=https://riteshpatil-portfolio.vercel.app
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=app-password
```

---

## Quick Commands

### Development
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

### Database
```bash
# Seed projects
npm run seed

# Create admin
npm run create-admin
```

### Deployment
```bash
# Commit and push (auto-deploys to Vercel & Render)
git add .
git commit -m "Your message"
git push
```

---

## Admin Access
1. Go to: https://riteshpatil-portfolio.vercel.app/admin/login
2. Login with admin credentials
3. Manage projects and contacts

---

## Files Created/Updated

### New Files
- `frontend/.env.production` - Production API URL
- `frontend/.env.development` - Development API URL
- `frontend/.env.example` - Template
- `frontend/vercel.json` - Vercel routing config
- `PRODUCTION_SETUP.md` - Full guide
- `PRODUCTION_DEPLOYMENT.md` - Deployment steps

### Updated Files
- `backend/server.js` - CORS for production
- `frontend/src/config/api.js` - Centralized API config
- All admin components - Using centralized API
- All section components - Using centralized API

---

## Test Everything

✅ Visit https://riteshpatil-portfolio.vercel.app
✅ Projects load from database
✅ Contact form works
✅ Chatbot responds
✅ Admin login works
✅ Can manage projects
✅ Can view contacts

---

**Status:** ✅ Ready for Production
