# 🔍 Vercel Black Screen - Troubleshooting Guide

## Issue: Black Screen on Vercel Deployment

---

## ✅ Fixes Applied

### 1. Updated API Configuration Default
**File:** `frontend/src/config/api.js`

**Change:** Updated fallback URL from `localhost:5000` to production URL
```javascript
// Before: Would fail in production if env var not set
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// After: Works in production even without env var
export const API_URL = import.meta.env.VITE_API_URL || 'https://darshanease-backend-ikt6.onrender.com';
```

### 2. Added Error Boundary
**File:** `frontend/src/components/common/ErrorBoundary.jsx`

**Purpose:** Catch and display React errors instead of blank screen
- Shows user-friendly error message
- Displays error details for debugging
- Provides refresh button

### 3. Added Console Logging
**File:** `frontend/src/config/api.js`

**Purpose:** Log API URL in both development and production for debugging

---

## 🔧 Steps to Fix on Vercel

### Step 1: Set Environment Variable (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `riteshpatil-portfolio`
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://darshanease-backend-ikt6.onrender.com`
   - **Environment:** Production (and Preview if needed)
5. Click **Save**

### Step 2: Redeploy
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **...** (three dots) → **Redeploy**
4. Wait for deployment to complete (~2-3 minutes)

### Step 3: Clear Browser Cache
After redeployment:
1. Open your site: https://riteshpatil-portfolio.vercel.app/
2. Hard refresh:
   - **Windows/Linux:** `Ctrl + Shift + R` or `Ctrl + F5`
   - **Mac:** `Cmd + Shift + R`

---

## 🐛 How to Debug

### Check Browser Console
1. Open your site: https://riteshpatil-portfolio.vercel.app/
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Look for errors (red messages)

### Common Error Messages:

#### Error: "Failed to fetch"
**Cause:** CORS issue or backend is down
**Solution:** 
- Check backend is running: https://darshanease-backend-ikt6.onrender.com
- Verify CORS in `backend/server.js` includes your frontend URL

#### Error: "Cannot read properties of undefined"
**Cause:** API response format issue
**Solution:**
- Check API response structure
- Verify backend is returning correct data format

#### Error: "Module not found"
**Cause:** Missing dependency or import error
**Solution:**
- Check all imports in components
- Verify all dependencies installed

---

## 🧪 Test Locally First

Before deploying, test the production build locally:

```bash
cd frontend

# Build for production
npm run build

# Preview the production build
npm run preview
```

Visit: http://localhost:4173

If it works locally but not on Vercel, it's likely an environment variable issue.

---

## 🔍 Check Vercel Build Logs

1. Go to Vercel Dashboard
2. Click on your latest deployment
3. Check **Build Logs** for errors
4. Look for:
   - Build failures
   - Missing dependencies
   - Environment variable warnings

---

## ✅ Verification Checklist

After fixes and redeployment:

### Homepage Should Show:
- ✅ Hero section with 3D neural network
- ✅ About section
- ✅ Skills section
- ✅ Projects section (loading from database)
- ✅ Experience timeline
- ✅ ML Demo section
- ✅ Contact form
- ✅ Footer
- ✅ Chatbot widget (bottom right)

### Console Should Show:
- ✅ "🌐 Production API URL: https://darshanease-backend-ikt6.onrender.com"
- ✅ No red error messages
- ✅ Successful API calls

---

## 🚨 If Still Black Screen

### Option 1: Check Backend Health
```bash
# Test if backend is responding
curl https://darshanease-backend-ikt6.onrender.com

# Should return:
# {"success":true,"message":"Portfolio API is running! 🚀",...}
```

### Option 2: Check CORS
Backend should allow requests from your frontend. Verify `backend/server.js`:

```javascript
const allowedOrigins = [
  'https://riteshpatil-portfolio.vercel.app',
  'http://localhost:5173'
];
```

### Option 3: Rollback to Previous Version
If nothing works:
1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click **...** → **Promote to Production**

---

## 📊 Current Configuration

### Frontend (Vercel)
- **URL:** https://riteshpatil-portfolio.vercel.app/
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Version:** 18.x
- **Framework:** Vite + React

### Backend (Render)
- **URL:** https://darshanease-backend-ikt6.onrender.com
- **Environment:** Node.js
- **Status:** Should be running

### Required Vercel Env Vars
```
VITE_API_URL=https://darshanease-backend-ikt6.onrender.com
```

---

## 💡 Prevention Tips

1. **Always set environment variables** before deploying
2. **Test production builds locally** with `npm run build && npm run preview`
3. **Check browser console** immediately after deployment
4. **Monitor Vercel build logs** for warnings
5. **Keep fallback URLs** to production (as now fixed)

---

## 🆘 Still Need Help?

### Check These:
1. Vercel deployment logs
2. Browser console errors
3. Network tab in DevTools (F12)
4. Backend health endpoint
5. CORS configuration

### Quick Diagnostic Commands:
```bash
# Test backend
curl https://darshanease-backend-ikt6.onrender.com

# Test projects API
curl https://darshanease-backend-ikt6.onrender.com/api/projects

# Check CORS
curl -H "Origin: https://riteshpatil-portfolio.vercel.app" \
  --verbose \
  https://darshanease-backend-ikt6.onrender.com/api/projects
```

---

## 📝 Summary of Changes

**Files Modified:**
1. `frontend/src/config/api.js` - Updated default API URL
2. `frontend/src/components/common/ErrorBoundary.jsx` - Added (new)
3. `frontend/src/App.jsx` - Wrapped with ErrorBoundary

**Next Steps:**
1. Push these changes to GitHub
2. Vercel will auto-deploy
3. Set `VITE_API_URL` environment variable on Vercel
4. Test the site

---

**Last Updated:** April 6, 2026
**Status:** Fixes Applied - Ready to Deploy
