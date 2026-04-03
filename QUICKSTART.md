# 🚀 Quick Start Guide

## ⚡ Fastest Way to Run the Project

### Step 1: Install Dependencies

Open **TWO terminal windows**:

#### Terminal 1 - Backend
```bash
cd D:\RP\Projects\Portfolio\backend
npm install
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd D:\RP\Projects\Portfolio\frontend
npm install
npm run dev
```

---

## ✅ What You Should See

### Backend Terminal:
```
🚀 Server running on port 5000
📍 Environment: development
✅ MongoDB Connected: localhost:27017
```

### Frontend Terminal:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 🌐 Open Your Browser

Navigate to: **http://localhost:5173**

You should see:
- ✨ 3D animated neural network
- 🎨 Smooth glassmorphism UI
- 🤖 AI Chatbot in bottom-right corner
- 📊 Interactive sections with animations

---

## 🔧 Troubleshooting

### MongoDB Not Connected?

**Option 1: Use MongoDB Atlas (Recommended)**
1. Go to https://www.mongodb.com/atlas
2. Create free cluster
3. Get connection string
4. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```

**Option 2: Install MongoDB Locally**
1. Download from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Connection string: `mongodb://localhost:27017/portfolio`

### Port Already in Use?

Change ports in:
- Backend: `backend/.env` → `PORT=5001`
- Frontend: `frontend/vite.config.js` → `port: 5174`

### Dependencies Error?

```bash
# Delete node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend  
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## 📧 Test Contact Form

1. Fill out the contact form
2. Check backend terminal for email status
3. View messages at: `GET http://localhost:5000/api/contact`

*Note: Email sending requires Gmail App Password in `.env`*

---

## 🤖 Test Chatbot

1. Click chatbot icon (bottom-right)
2. Try these questions:
   - "What are your skills?"
   - "Tell me about your projects"
   - "What is your experience?"

---

## 🎨 Customize Your Portfolio

### Update Your Information:

1. **Name & Role**: `frontend/src/components/sections/Hero.jsx` (line 50-60)
2. **Projects**: `frontend/src/components/sections/Projects.jsx` (line 80-150)
3. **Skills**: `frontend/src/components/sections/Skills.jsx` (line 20-50)
4. **About**: `frontend/src/components/sections/About.jsx` (line 40-70)

---

## 📱 Test Responsive Design

- Desktop: Full experience
- Tablet: Optimized layout
- Mobile: Touch-friendly navigation

---

## 🎯 Next Steps

1. ✅ Customize content with your information
2. ✅ Add your real projects
3. ✅ Upload to GitHub
4. ✅ Deploy to Vercel (frontend) & Render (backend)
5. ✅ Share your amazing portfolio!

---

## 💡 Pro Tips

- Use **DevTools** (F12) to inspect 3D elements
- Check **Network tab** to see API calls
- Monitor **Console** for any errors
- Test on different browsers

---

**Need help? Check the main README.md for detailed documentation!**
