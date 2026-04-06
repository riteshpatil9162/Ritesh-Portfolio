# 🚀 Production Deployment Guide

## Production URLs

- **Frontend:** https://riteshpatil-portfolio.vercel.app/
- **Backend:** https://darshanease-backend-ikt6.onrender.com
- **Admin Panel:** https://riteshpatil-portfolio.vercel.app/admin/login

---

## Backend Deployment (Render)

### Current Status
✅ Already deployed at: `https://darshanease-backend-ikt6.onrender.com`

### Environment Variables on Render

Make sure these are set in your Render dashboard:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your-production-jwt-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
FRONTEND_URL=https://riteshpatil-portfolio.vercel.app
```

### CORS Configuration
✅ Already configured in `backend/server.js` to allow:
- `https://riteshpatil-portfolio.vercel.app`
- `http://localhost:5173` (for local development)

### MongoDB Atlas Setup
1. Create account at https://cloud.mongodb.com
2. Create a cluster
3. Add database user
4. **Whitelist Render IPs** or use `0.0.0.0/0` (all IPs)
5. Get connection string
6. Update `MONGODB_URI` on Render

### Seed Production Database

**Option 1: From Local Machine**
```bash
cd backend

# Update .env with production MongoDB URI temporarily
MONGODB_URI=mongodb+srv://... npm run seed

# Create production admin
MONGODB_URI=mongodb+srv://... npm run create-admin
```

**Option 2: Via Render Shell**
```bash
# SSH into Render instance
npm run seed
npm run create-admin
```

---

## Frontend Deployment (Vercel)

### Current Status
✅ Already deployed at: `https://riteshpatil-portfolio.vercel.app/`

### Environment Variables on Vercel

Set in Vercel Dashboard → Settings → Environment Variables:

```env
VITE_API_URL=https://darshanease-backend-ikt6.onrender.com
```

### Build Settings
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Vercel Configuration

Create `vercel.json` in frontend root (if not exists):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This ensures React Router works properly with client-side routing.

---

## Post-Deployment Checklist

### 1. Test Backend API
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

### 2. Seed Production Database
```bash
# Connect to production MongoDB and run:
cd backend
npm run seed
```

### 3. Create Production Admin Account
```bash
cd backend
npm run create-admin
# Enter username, email, password
```

### 4. Test Frontend Features

Visit: https://riteshpatil-portfolio.vercel.app

**Test:**
- ✅ Projects section loads (from MongoDB)
- ✅ Contact form submission works
- ✅ Chatbot responds
- ✅ All sections render properly

### 5. Test Admin Panel

Visit: https://riteshpatil-portfolio.vercel.app/admin/login

**Test:**
- ✅ Login with admin credentials
- ✅ View projects
- ✅ Add new project
- ✅ Edit existing project
- ✅ Delete project
- ✅ View contacts
- ✅ Update contact status

---

## Common Deployment Issues

### Issue: "CORS Error"
**Solution:**
- Verify `FRONTEND_URL` on Render includes correct domain
- Check `server.js` has production URL in allowedOrigins
- Ensure no trailing slashes in URLs

### Issue: "Projects not loading"
**Solution:**
- Check `VITE_API_URL` on Vercel
- Verify backend is running (visit backend URL)
- Check browser console for errors
- Ensure database is seeded

### Issue: "Cannot login to admin"
**Solution:**
- Verify admin account exists in production database
- Check `JWT_SECRET` is set on Render
- Clear browser localStorage
- Check backend logs for errors

### Issue: "Contact form not working"
**Solution:**
- Verify `EMAIL_USER` and `EMAIL_PASS` on Render
- Use Gmail App Password (not regular password)
- Check Render logs for email errors

---

## Environment Files Summary

### Backend (.env on Render)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://your-atlas-connection
JWT_SECRET=production-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=app-specific-password
FRONTEND_URL=https://riteshpatil-portfolio.vercel.app
```

### Frontend (Vercel Environment Variables)
```env
VITE_API_URL=https://darshanease-backend-ikt6.onrender.com
```

---

## Continuous Deployment

### Vercel (Frontend)
✅ Auto-deploys on git push to `main` branch
- Builds from `frontend/` directory
- Environment variables persist across deployments

### Render (Backend)
✅ Auto-deploys on git push to `main` branch
- Builds from `backend/` directory
- Environment variables persist across deployments

---

## Monitoring & Logs

### Backend Logs (Render)
```
Render Dashboard → Your Service → Logs
```

### Frontend Logs (Vercel)
```
Vercel Dashboard → Your Project → Deployments → View Logs
```

### MongoDB Atlas Monitoring
```
MongoDB Atlas → Clusters → Metrics
```

---

## Security Checklist

- ✅ JWT_SECRET is strong and unique in production
- ✅ MongoDB uses strong password and user restrictions
- ✅ CORS only allows your frontend domain
- ✅ Email credentials use App Password
- ✅ MongoDB Atlas IP whitelist configured
- ✅ Environment variables not in git repository
- ✅ HTTPS enabled on both frontend and backend

---

## Rollback Plan

### If deployment fails:

**Vercel (Frontend):**
1. Go to Vercel Dashboard
2. Deployments tab
3. Click "..." on previous working deployment
4. Select "Promote to Production"

**Render (Backend):**
1. Go to Render Dashboard
2. Click on your service
3. Manual Deploy → Deploy Previous Commit

---

## Performance Optimization

### Backend (Render)
- Using free tier: May sleep after 15 min inactivity
- Consider upgrading to paid tier for 24/7 uptime
- Enable Render Redis for caching (optional)

### Frontend (Vercel)
- Automatic CDN distribution
- Image optimization with Vercel Image
- Gzip compression enabled
- Edge network for fast global access

### MongoDB Atlas
- Free tier: 512MB storage
- Consider upgrading if you have many projects/contacts
- Enable connection pooling

---

## Next Steps

1. ✅ Verify both URLs are working
2. ✅ Seed production database with your projects
3. ✅ Create admin account
4. ✅ Test all features end-to-end
5. ✅ Monitor logs for any errors
6. ✅ Set up custom domain (optional)

---

## Support URLs

- **Render Dashboard:** https://dashboard.render.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **MongoDB Atlas:** https://cloud.mongodb.com

---

**Last Updated:** April 6, 2026
**Status:** ✅ Production Ready
