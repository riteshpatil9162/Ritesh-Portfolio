# ⚡ Command Cheat Sheet

## 🚀 Development Commands

### Start Both Servers (Run in separate terminals)

```bash
# Terminal 1 - Backend
cd D:\RP\Projects\Portfolio\backend
npm run dev

# Terminal 2 - Frontend  
cd D:\RP\Projects\Portfolio\frontend
npm run dev
```

---

## 📦 Installation Commands

### Fresh Install

```bash
# Backend
cd D:\RP\Projects\Portfolio\backend
npm install

# Frontend
cd D:\RP\Projects\Portfolio\frontend
npm install --legacy-peer-deps
```

### Reinstall (if errors)

```bash
# Backend
cd D:\RP\Projects\Portfolio\backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd D:\RP\Projects\Portfolio\frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## 🏗️ Build Commands

### Frontend Build

```bash
cd D:\RP\Projects\Portfolio\frontend
npm run build
```

### Backend Build (Production)

```bash
cd D:\RP\Projects\Portfolio\backend
npm start
```

---

## 🧪 Testing Commands

### Test Backend API

```bash
# Using curl
curl http://localhost:5000

# Test contact endpoint
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Hello"}'

# Test chatbot
curl -X POST http://localhost:5000/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message":"What are your skills?"}'
```

### Using PowerShell (Windows)

```powershell
# Test API
Invoke-WebRequest -Uri http://localhost:5000

# Test contact form
Invoke-RestMethod -Uri http://localhost:5000/api/contact -Method Post -Body (@{name="Test";email="test@test.com";message="Hello"} | ConvertTo-Json) -ContentType "application/json"
```

---

## 🗄️ MongoDB Commands

### Local MongoDB

```bash
# Start MongoDB
mongod

# Connect to MongoDB shell
mongosh

# View databases
show dbs

# Use portfolio database
use portfolio

# View collections
show collections

# View contacts
db.contacts.find()

# View projects
db.projects.find()

# Clear contacts
db.contacts.deleteMany({})
```

---

## 🔧 Git Commands

### Initialize and Push

```bash
cd D:\RP\Projects\Portfolio

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Premium portfolio website"

# Add remote
git remote add origin https://github.com/yourusername/portfolio.git

# Push
git push -u origin main
```

### Update Code

```bash
git add .
git commit -m "Update: description of changes"
git push
```

---

## 📝 Useful NPM Commands

### Check Versions

```bash
node --version
npm --version
npx --version
```

### Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package-name@latest
```

### Audit Security

```bash
npm audit
npm audit fix
```

---

## 🌐 Deployment Commands

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd D:\RP\Projects\Portfolio\frontend
vercel --prod
```

### Git Push to Deploy

```bash
# Just push to GitHub - Vercel auto-deploys
git add .
git commit -m "Deploy updates"
git push
```

---

## 🔍 Debugging Commands

### Check Port Usage (Windows)

```powershell
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill process (if needed)
taskkill /PID <process_id> /F
```

### Check Port Usage (Linux/Mac)

```bash
# Check port 5000
lsof -i :5000

# Kill process
kill -9 <process_id>
```

### View Logs

```bash
# Backend logs (if using PM2)
pm2 logs

# Frontend dev server logs (already visible in terminal)
```

---

## 📊 Database Management

### Backup MongoDB

```bash
# Backup
mongodump --db portfolio --out ./backup

# Restore
mongorestore --db portfolio ./backup/portfolio
```

### MongoDB Atlas

```bash
# Connect to Atlas
mongosh "mongodb+srv://cluster.mongodb.net/portfolio" --username your_username
```

---

## 🎨 Quick Fixes

### Clear Vite Cache

```bash
cd frontend
rm -rf node_modules/.vite
npm run dev
```

### Reset Everything

```bash
# Frontend
cd D:\RP\Projects\Portfolio\frontend
rm -rf node_modules .vite dist package-lock.json
npm install --legacy-peer-deps

# Backend
cd D:\RP\Projects\Portfolio\backend
rm -rf node_modules package-lock.json
npm install
```

---

## 🚀 Production Commands

### PM2 (Process Manager)

```bash
# Install PM2
npm install -g pm2

# Start backend
cd backend
pm2 start server.js --name portfolio-backend

# View status
pm2 status

# View logs
pm2 logs

# Restart
pm2 restart portfolio-backend

# Stop
pm2 stop portfolio-backend
```

---

## 📱 Quick Tests

### Test Complete Flow

```bash
# 1. Start backend
cd D:\RP\Projects\Portfolio\backend && npm run dev

# 2. Start frontend (new terminal)
cd D:\RP\Projects\Portfolio\frontend && npm run dev

# 3. Open browser
start http://localhost:5173

# 4. Test features:
#    - Scroll through sections
#    - Fill contact form
#    - Open chatbot
#    - Try ML demo
#    - Filter projects
```

---

## 💡 Pro Tips

```bash
# Run both servers in one command (with concurrently)
npm install -g concurrently
concurrently "cd backend && npm run dev" "cd frontend && npm run dev"

# Open VSCode in project
code D:\RP\Projects\Portfolio

# Quick navigate
cd %USERPROFILE%\Desktop
cd D:\RP\Projects\Portfolio
```

---

## 🆘 Common Errors & Fixes

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port already in use"
```bash
# Change port in backend/.env
PORT=5001

# Or kill process using port
netstat -ano | findstr :5000
taskkill /PID <process_id> /F
```

### Error: "Cannot connect to MongoDB"
```bash
# Check MongoDB is running
mongod --version

# Start MongoDB service
# Windows: services.msc → MongoDB → Start
# Linux: sudo systemctl start mongod
```

---

**📋 Bookmark this file for quick reference!**
