# 🚀 Quick Start Guide

## Setup in 4 Steps

### 1️⃣ Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2️⃣ Configure Environment
Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-key-change-this
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:5173
```

### 3️⃣ Setup Database
```bash
# Make sure MongoDB is running, then:
cd backend

# Seed projects (UrbanEye & DarshanEase)
npm run seed

# Create admin account (interactive)
npm run create-admin
```

### 4️⃣ Start Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

## 🎯 Access Points

- **Portfolio:** http://localhost:5173
- **Admin Login:** http://localhost:5173/admin/login
- **API:** http://localhost:5000

## 📱 Admin Panel

Login at `/admin/login` to:
- ✅ Add/Edit/Delete Projects
- ✅ Manage Contact Form Submissions  
- ✅ Update Project Categories & Tech Stacks
- ✅ Mark Projects as Featured

## 📚 Full Documentation

See detailed guides:
- `ADMIN_SETUP.md` - Complete admin panel guide
- `UPDATE_SUMMARY.md` - What changed and why
- `DEPLOYMENT.md` - Production deployment

## 🆘 Troubleshooting

**Projects not showing?**
```bash
cd backend
npm run seed
```

**Can't login?**
```bash
cd backend
npm run create-admin
```

**Database error?**
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`

---

That's it! 🎉 Your portfolio is ready with MongoDB and Admin Panel.
