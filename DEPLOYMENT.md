# 🌐 Deployment Guide

## 📦 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] MongoDB Atlas cluster created
- [ ] GitHub repository created
- [ ] Code pushed to GitHub

---

## 🚀 Deploy Frontend to Vercel

### Step 1: Prepare Frontend

```bash
cd D:\RP\Projects\Portfolio\frontend
npm run build
```

### Step 2: Deploy to Vercel

**Option A: Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Option B: Vercel Dashboard**
1. Go to https://vercel.com
2. Click "Import Project"
3. Select your GitHub repository
4. Root directory: `frontend`
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click "Deploy"

### Step 3: Environment Variables (Vercel)

Add in Vercel Dashboard → Settings → Environment Variables:
```
VITE_API_URL=https://your-backend-url.com
```

---

## 🖥️ Deploy Backend to Render

### Step 1: Create render.yaml

Create `backend/render.yaml`:
```yaml
services:
  - type: web
    name: portfolio-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: EMAIL_USER
        sync: false
      - key: EMAIL_PASS
        sync: false
```

### Step 2: Deploy to Render

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Root directory: `backend`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables
8. Click "Create Web Service"

### Alternative: Railway

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select repository
4. Root directory: `backend`
5. Add environment variables
6. Deploy

---

## 🗄️ Setup MongoDB Atlas

### Step 1: Create Cluster

1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Build a Database → Free Shared
4. Choose AWS / Region
5. Create cluster

### Step 2: Create Database User

1. Database Access → Add New User
2. Username: `portfolio-admin`
3. Password: Generate secure password
4. Database User Privileges: Read and write

### Step 3: Whitelist IP

1. Network Access → Add IP Address
2. Select "Allow Access from Anywhere" (0.0.0.0/0)
3. Or add your server's IP

### Step 4: Get Connection String

1. Clusters → Connect
2. Connect your application
3. Copy connection string:
   ```
   mongodb+srv://portfolio-admin:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your database password

---

## 🔐 Environment Variables

### Backend (Render/Railway)

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Frontend (Vercel)

```env
VITE_API_URL=https://your-render-app.onrender.com
```

---

## 📧 Setup Gmail for Contact Form

### Enable App Passwords

1. Go to https://myaccount.google.com
2. Security → 2-Step Verification (enable if not already)
3. App passwords → Select "Mail" and "Other"
4. Name it "Portfolio"
5. Copy the 16-character password
6. Use this in `EMAIL_PASS` environment variable

---

## 🔄 Update API URL in Frontend

Create `frontend/src/config/api.js`:
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

Update all API calls:
```javascript
import { API_URL } from '../config/api';

// Example in Contact.jsx
const response = await axios.post(`${API_URL}/api/contact`, formData);
```

---

## ✅ Post-Deployment Testing

### Test Checklist

- [ ] Frontend loads correctly
- [ ] 3D animations work smoothly
- [ ] Navigation links work
- [ ] Contact form submits successfully
- [ ] Chatbot responds
- [ ] ML Demo works
- [ ] Charts render correctly
- [ ] Mobile responsive
- [ ] All images load

### Test URLs

```bash
# Frontend
https://your-portfolio.vercel.app

# Backend API
https://your-backend.onrender.com/api/contact

# Test Chatbot
POST https://your-backend.onrender.com/api/chatbot
Body: { "message": "hello" }
```

---

## 🐛 Troubleshooting Deployment Issues

### CORS Errors

Update `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### MongoDB Connection Failed

1. Check connection string format
2. Verify whitelist IP (0.0.0.0/0)
3. Ensure database user has correct permissions

### Build Failures

```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Not Responding

1. Check backend logs in Render/Railway
2. Verify environment variables
3. Test API endpoints directly

---

## 📊 Monitoring & Analytics

### Vercel Analytics

1. Enable in Vercel Dashboard
2. View performance metrics
3. Monitor Core Web Vitals

### Backend Monitoring

1. Use Render/Railway built-in logs
2. Add error tracking (Sentry)
3. Monitor API response times

---

## 🔒 Security Best Practices

- ✅ Use environment variables for secrets
- ✅ Enable HTTPS (automatic on Vercel/Render)
- ✅ Implement rate limiting
- ✅ Validate all inputs
- ✅ Use secure JWT secrets (32+ characters)
- ✅ Keep dependencies updated

---

## 🎯 Custom Domain (Optional)

### Vercel
1. Settings → Domains
2. Add your domain
3. Update DNS records

### Render
1. Settings → Custom Domain
2. Add domain
3. Configure DNS

---

## 📝 Deployment Costs

- **Vercel**: Free for personal projects
- **Render**: Free tier available (sleeps after inactivity)
- **Railway**: $5/month credit, then pay-as-you-go
- **MongoDB Atlas**: Free tier (512MB)
- **Gmail**: Free

**Total Monthly Cost: $0-5**

---

## 🎉 You're Live!

Your portfolio is now deployed and accessible worldwide!

Share your links:
- Portfolio: `https://your-name.vercel.app`
- LinkedIn, GitHub, Twitter
- Include in resume and job applications

---

**🌟 Congratulations on deploying your premium portfolio!**
