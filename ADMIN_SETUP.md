# Admin Panel & MongoDB Setup Guide

## Overview
Your portfolio has been upgraded with MongoDB integration and a full-featured admin panel for managing projects and contacts.

---

## 🎯 What Changed

### 1. **Projects System**
- ✅ Removed hardcoded projects
- ✅ Projects now stored in MongoDB
- ✅ Frontend fetches projects from API
- ✅ Added UrbanEye and DarshanEase as featured projects

### 2. **Admin Panel Features**
- ✅ Secure login with JWT authentication
- ✅ Projects Management (Add/Edit/Delete)
- ✅ Contacts Management (View/Update Status)
- ✅ Protected routes with authentication
- ✅ Modern glassmorphism UI matching portfolio design

---

## 🚀 Quick Start

### Step 1: Ensure MongoDB is Running

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is installed and running
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `backend/.env` with your Atlas URI

### Step 2: Configure Environment Variables

Make sure your `backend/.env` file has:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
# OR for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

### Step 3: Seed the Database with Featured Projects

Navigate to backend directory and run:
```bash
cd backend
npm run seed
```

This will:
- Clear existing projects
- Add UrbanEye project
- Add DarshanEase project

You should see:
```
✅ MongoDB Connected Successfully
🗑️  Deleted X existing projects
✅ Successfully seeded 2 featured projects
```

### Step 4: Create an Admin Account

You need to create an admin user to access the dashboard.

**Method 1: Using API (Recommended)**

Use Postman, Thunder Client, or curl:
```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "your-secure-password"
  }'
```

**Method 2: Create a script**

Create `backend/scripts/createAdmin.js`:
```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const admin = await Admin.create({
    username: 'admin',
    email: 'admin@example.com',
    password: 'your-secure-password', // Will be hashed automatically
    role: 'admin'
  });
  
  console.log('Admin created:', admin.email);
  process.exit(0);
};

createAdmin();
```

Run it:
```bash
node scripts/createAdmin.js
```

### Step 5: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

---

## 📱 Accessing the Admin Panel

### Login
1. Navigate to: `http://localhost:5173/admin/login`
2. Enter credentials you created
3. Click "Sign In"

### Managing Projects
1. After login, you'll be at `/admin/dashboard/projects`
2. **Add New Project:**
   - Click "Add New Project" button
   - Fill in all details
   - Select category, icon, tech stack
   - Mark as featured if needed
   - Click "Create Project"

3. **Edit Project:**
   - Click "Edit" on any project card
   - Update fields
   - Click "Update Project"

4. **Delete Project:**
   - Click "Delete" on project card
   - Confirm deletion

### Managing Contacts
1. Go to `/admin/dashboard/contacts`
2. View all contact form submissions
3. Update status (New → Read → Replied)
4. Click "Reply via Email" to respond
5. Delete unwanted contacts

---

## 🎨 Admin Panel Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| `/admin/login` | Admin login page | No |
| `/admin/dashboard` | Redirects to projects | Yes |
| `/admin/dashboard/projects` | Manage projects | Yes |
| `/admin/dashboard/contacts` | Manage contacts | Yes |

---

## 🔐 Security Features

- **JWT Authentication:** Token-based secure login
- **Password Hashing:** Bcrypt with 10 salt rounds
- **Protected Routes:** Automatic redirect if not logged in
- **Token Storage:** LocalStorage (consider HttpOnly cookies for production)

---

## 📊 Database Collections

### `projects`
```javascript
{
  title: String (required),
  description: String (required),
  category: Enum ['Data Science', 'Web Dev', 'Android'],
  tech: [String],
  icon: String (emoji),
  github: String (URL),
  live: String (URL),
  featured: Boolean,
  createdAt: Date
}
```

### `contacts`
```javascript
{
  name: String (required),
  email: String (required),
  message: String (required),
  status: Enum ['new', 'read', 'replied'],
  createdAt: Date
}
```

### `admins`
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed),
  role: String (default: 'admin'),
  createdAt: Date
}
```

---

## 🎯 Featured Projects (Seeded)

### 1. UrbanEye
- **Category:** Web Dev
- **Tech:** MongoDB, React.js, Node.js, Express.js, AI/ML
- **Live:** https://urbaneye-ai.vercel.app/
- **Icon:** 🏙️

### 2. DarshanEase
- **Category:** Web Dev
- **Tech:** MERN Stack, Razorpay, MongoDB, JWT, Payment Gateway
- **Live:** https://darshanease-booking.vercel.app/
- **Icon:** 🛕

---

## 🛠️ Troubleshooting

### Projects not showing on homepage?
1. Check backend is running (`http://localhost:5000`)
2. Verify MongoDB connection
3. Run seed script: `npm run seed`
4. Check browser console for API errors
5. Verify `VITE_API_URL` in frontend `.env`

### Can't login to admin panel?
1. Ensure admin account was created
2. Check backend logs for errors
3. Verify JWT_SECRET in backend `.env`
4. Clear localStorage and try again

### Database connection failed?
1. Ensure MongoDB is running (local or Atlas)
2. Check `MONGODB_URI` in backend `.env`
3. For Atlas: whitelist your IP address
4. Check firewall settings

---

## 📝 Adding More Projects

### Method 1: Admin Panel (Recommended)
1. Login to `/admin/login`
2. Go to Projects section
3. Click "Add New Project"
4. Fill form and submit

### Method 2: Seed Script
Edit `backend/scripts/seedProjects.js`:
```javascript
const featuredProjects = [
  // ... existing projects
  {
    title: 'Your New Project',
    description: 'Description here...',
    category: 'Web Dev',
    tech: ['React', 'Node.js'],
    icon: '🚀',
    github: 'https://github.com/...',
    live: 'https://...',
    featured: true
  }
];
```

Run: `npm run seed`

---

## 🚀 Deployment Considerations

### Backend (Render/Railway/Heroku)
- Use MongoDB Atlas (cloud database)
- Set environment variables in hosting platform
- Update `FRONTEND_URL` for CORS

### Frontend (Vercel/Netlify)
- Set `VITE_API_URL` to your backend URL
- Example: `VITE_API_URL=https://your-api.onrender.com`

### First Deployment
1. Deploy backend first
2. Get backend URL
3. Update frontend `VITE_API_URL`
4. Deploy frontend
5. Create admin account via API
6. Run seed script or add projects via admin panel

---

## 📚 API Endpoints Reference

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?category=Web Dev` - Filter by category
- `GET /api/projects?featured=true` - Get featured only
- `POST /api/projects` - Create project (auth required)
- `PUT /api/projects/:id` - Update project (auth required)
- `DELETE /api/projects/:id` - Delete project (auth required)

### Contacts
- `GET /api/contacts` - Get all contacts (auth required)
- `PUT /api/contacts/:id` - Update contact status (auth required)
- `DELETE /api/contacts/:id` - Delete contact (auth required)

### Admin
- `POST /api/admin/register` - Create admin account
- `POST /api/admin/login` - Login and get JWT token

---

## ✨ Next Steps

1. ✅ Seed database with your projects
2. ✅ Create admin account
3. ✅ Login to admin panel
4. ✅ Test adding/editing/deleting projects
5. ✅ Verify projects show on homepage
6. 🎉 Enjoy your dynamic portfolio!

---

## 🆘 Support

If you encounter any issues:
1. Check the console logs (both frontend and backend)
2. Verify all environment variables are set
3. Ensure MongoDB is connected
4. Check that ports 5000 and 5173 are not in use by other apps

Happy coding! 🚀
