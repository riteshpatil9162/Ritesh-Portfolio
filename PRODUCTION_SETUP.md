# 🌐 Production URLs Configuration Summary

## ✅ Updated for Production

Your portfolio has been configured for production deployment with the following URLs:

---

## 🔗 Production URLs

### Frontend (Vercel)
- **URL:** https://riteshpatil-portfolio.vercel.app/
- **Admin Login:** https://riteshpatil-portfolio.vercel.app/admin/login
- **Admin Dashboard:** https://riteshpatil-portfolio.vercel.app/admin/dashboard

### Backend (Render)
- **API URL:** https://darshanease-backend-ikt6.onrender.com
- **Health Check:** https://darshanease-backend-ikt6.onrender.com/
- **Projects API:** https://darshanease-backend-ikt6.onrender.com/api/projects
- **Contacts API:** https://darshanease-backend-ikt6.onrender.com/api/contacts
- **Admin API:** https://darshanease-backend-ikt6.onrender.com/api/admin
- **Chatbot API:** https://darshanease-backend-ikt6.onrender.com/api/chatbot

---

## 📝 Files Updated

### Backend Configuration

#### 1. `backend/server.js`
✅ CORS configured to allow requests from:
- `https://riteshpatil-portfolio.vercel.app` (production)
- `http://localhost:5173` (local development)
- `http://localhost:3000` (alternative local)

#### 2. `backend/.env.example`
✅ Updated with production frontend URL reference

### Frontend Configuration

#### 1. `frontend/.env.production`
```env
VITE_API_URL=https://darshanease-backend-ikt6.onrender.com
```

#### 2. `frontend/.env.development`
```env
VITE_API_URL=http://localhost:5000
```

#### 3. `frontend/.env.example`
✅ Template with both local and production URLs

#### 4. `frontend/vercel.json`
✅ Created for proper React Router support
- All routes redirect to index.html
- CORS headers configured

#### 5. `frontend/src/config/api.js`
✅ Centralized API configuration
- Automatically uses correct URL based on environment
- Development logging enabled

#### 6. All Component Files Updated
✅ Using centralized `API_URL` from config:
- `src/components/admin/Login.jsx`
- `src/components/admin/ProjectsManager.jsx`
- `src/components/admin/ContactsManager.jsx`
- `src/components/sections/Projects.jsx`
- `src/components/sections/Contact.jsx` (already using)
- `src/components/chatbot/Chatbot.jsx` (already using)

---

## 🚀 Deployment Instructions

### First-Time Production Setup

#### 1. Deploy Backend to Render
```bash
# Push your code to GitHub
git add .
git commit -m "Configure for production"
git push
```

**On Render Dashboard:**
1. Connect repository
2. Set environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=production-secret
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=app-password
   FRONTEND_URL=https://riteshpatil-portfolio.vercel.app
   ```
3. Deploy

#### 2. Deploy Frontend to Vercel
```bash
# Vercel will auto-deploy from GitHub
# Or manually:
cd frontend
vercel --prod
```

**On Vercel Dashboard:**
1. Set environment variable:
   ```
   VITE_API_URL=https://darshanease-backend-ikt6.onrender.com
   ```
2. Redeploy if needed

#### 3. Seed Production Database
```bash
# Option A: From local (update .env with production MongoDB URI)
cd backend
MONGODB_URI=mongodb+srv://... npm run seed

# Option B: Via Render Shell
# SSH into Render and run:
npm run seed
```

#### 4. Create Production Admin
```bash
# From local:
cd backend
MONGODB_URI=mongodb+srv://... npm run create-admin

# Follow prompts to create admin account
```

---

## 🧪 Testing Checklist

### Test Backend (Render)
```bash
# Health check
curl https://darshanease-backend-ikt6.onrender.com

# Get projects
curl https://darshanease-backend-ikt6.onrender.com/api/projects

# Test CORS
curl -H "Origin: https://riteshpatil-portfolio.vercel.app" \
  --verbose \
  https://darshanease-backend-ikt6.onrender.com/api/projects
```

### Test Frontend (Vercel)

Visit: https://riteshpatil-portfolio.vercel.app

**Homepage:**
- ✅ Hero section loads
- ✅ Projects section shows data from database
- ✅ Contact form submits successfully
- ✅ Chatbot responds

**Admin Panel:**
- ✅ Navigate to `/admin/login`
- ✅ Login with credentials
- ✅ Projects page loads
- ✅ Can add/edit/delete projects
- ✅ Contacts page loads
- ✅ Can view/manage contacts

---

## 🔄 Continuous Deployment

### Auto-Deploy Workflow

**When you push to GitHub:**

1. **Vercel** automatically:
   - Detects changes in `frontend/`
   - Runs `npm install`
   - Runs `npm run build`
   - Deploys to production
   - Uses `VITE_API_URL` from environment

2. **Render** automatically:
   - Detects changes in `backend/`
   - Runs `npm install`
   - Runs `npm start`
   - Redeploys service
   - Uses environment variables from dashboard

### Manual Deploy

**Vercel:**
```bash
cd frontend
vercel --prod
```

**Render:**
- Dashboard → Manual Deploy → Deploy latest commit

---

## 🌍 Environment Switching

Your app automatically uses the correct API URL:

### Development (Local)
```bash
# Frontend uses: http://localhost:5000
# From: .env.development

npm run dev
```

### Production (Deployed)
```bash
# Frontend uses: https://darshanease-backend-ikt6.onrender.com
# From: .env.production (or Vercel environment variable)

npm run build
```

---

## 📊 API Endpoints Reference

All endpoints are prefixed with: `https://darshanease-backend-ikt6.onrender.com`

### Public Endpoints
- `GET /` - Health check
- `GET /api/projects` - Get all projects
- `GET /api/projects?category=Web Dev` - Filter projects
- `POST /api/contact` - Submit contact form
- `POST /api/chatbot` - Chat with bot

### Protected Endpoints (Require JWT)
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/contacts` - Get all contacts (admin only)
- `PUT /api/contacts/:id` - Update contact status
- `DELETE /api/contacts/:id` - Delete contact

### Auth Endpoints
- `POST /api/admin/register` - Register admin
- `POST /api/admin/login` - Login (returns JWT)

---

## 🔐 Security Notes

### Production Checklist
- ✅ CORS restricted to specific domains
- ✅ JWT secret is strong and unique
- ✅ MongoDB Atlas IP whitelist configured
- ✅ Environment variables not in git
- ✅ HTTPS enabled on all endpoints
- ✅ Passwords hashed with bcrypt
- ✅ Email uses app-specific password

### Important Reminders
1. Never commit `.env` files
2. Use strong JWT_SECRET in production
3. Regularly rotate admin passwords
4. Monitor Render/Vercel logs for suspicious activity
5. Keep dependencies updated

---

## 📱 Mobile & Desktop Testing

### Test on Multiple Devices
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Android Chrome)
- ✅ Tablet (iPad, Android)

### Responsive Design
- Portfolio adapts to all screen sizes
- Admin panel is mobile-friendly
- Touch-friendly navigation

---

## 🆘 Troubleshooting

### Issue: 404 on Admin Routes
**Cause:** Vercel not redirecting properly
**Fix:** Ensure `vercel.json` exists in frontend root

### Issue: CORS Error
**Cause:** Frontend URL not in CORS whitelist
**Fix:** Check `backend/server.js` allowedOrigins array

### Issue: API Timeout
**Cause:** Render free tier sleeps after inactivity
**Fix:** Wait 30-60 seconds for cold start, or upgrade to paid tier

### Issue: Projects Not Loading
**Cause:** Database not seeded or wrong API URL
**Fix:** 
1. Check `VITE_API_URL` on Vercel
2. Run seed script on production database
3. Check browser console for errors

---

## 📞 Support Resources

- **Render Status:** https://status.render.com
- **Vercel Status:** https://www.vercel-status.com
- **MongoDB Atlas Status:** https://status.cloud.mongodb.com

---

## ✨ What's New

### Production Configuration
✅ CORS configured for production frontend
✅ Environment-based API URL switching
✅ Centralized API configuration
✅ Proper routing for React Router on Vercel
✅ Production environment files created
✅ Comprehensive deployment documentation

### Ready for Production
Your portfolio is now fully configured and ready for production deployment!

---

**Frontend:** https://riteshpatil-portfolio.vercel.app/
**Backend:** https://darshanease-backend-ikt6.onrender.com
**Admin:** https://riteshpatil-portfolio.vercel.app/admin/login

**Last Updated:** April 6, 2026
**Status:** ✅ Production Ready
