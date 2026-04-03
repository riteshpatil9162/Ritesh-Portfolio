# 🚀 Premium 3D Portfolio Website - Ritesh Patil

A **premium, industry-level portfolio website** built with the MERN stack, featuring stunning 3D animations, interactive ML demos, AI chatbot, and glassmorphism UI.

![Portfolio Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

---

## ✨ Features

### 🎨 Premium UI/UX
- **3D Hero Section** with animated neural network using Three.js & React Three Fiber
- **Glassmorphism** design system throughout
- **Smooth animations** with Framer Motion and GSAP
- **Custom animated cursor** and parallax effects
- **Dark theme** with neon blue and purple gradients

### 🧠 Advanced Functionality
- **AI Chatbot Assistant** - Rule-based chatbot to answer portfolio questions
- **Live ML Demo** - Interactive student score predictor with data visualization
- **Interactive Charts** - D3.js and Chart.js visualizations
- **3D Tilt Cards** - Project cards with vanilla-tilt effects
- **Animated Timelines** - Experience and education showcase
- **Contact Form** - Backend integration with email notifications

### 🎯 Sections
1. **Hero** - 3D animated background with typing effect
2. **About** - Glassmorphism cards with animated counters
3. **Skills** - Circular progress bars and skill metrics
4. **Projects** - Filterable project showcase with 3D effects
5. **Experience** - Vertical timeline with animations
6. **ML Demo** - Live machine learning demonstration
7. **Contact** - Functional contact form with backend
8. **Footer** - Clean design with social links

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** - Utility-first styling
- **Three.js + React Three Fiber** - 3D graphics
- **Framer Motion** - Smooth animations
- **GSAP** - Advanced animations
- **Chart.js & D3.js** - Data visualization
- **Axios** - HTTP requests
- **Vanilla Tilt** - 3D tilt effects

### Backend
- **Node.js**
- **Express.js** - REST API
- **MongoDB** - Database
- **Mongoose** - ODM
- **Nodemailer** - Email service
- **JWT** - Authentication
- **Bcrypt** - Password hashing

---

## 📁 Project Structure

```
Portfolio/
│
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/       # Navbar, Footer
│   │   │   ├── sections/     # All page sections
│   │   │   ├── chatbot/      # AI Chatbot component
│   │   │   └── admin/        # Admin dashboard
│   │   ├── three/            # Three.js 3D components
│   │   ├── animations/       # Animation utilities
│   │   ├── hooks/            # Custom React hooks
│   │   ├── utils/            # Helper functions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/                   # Node.js backend
│   ├── models/               # MongoDB models
│   │   ├── Contact.js
│   │   ├── Project.js
│   │   └── Admin.js
│   ├── routes/               # API routes
│   │   ├── contactRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── adminRoutes.js
│   │   └── chatbotRoutes.js
│   ├── controllers/          # Route controllers
│   │   ├── contactController.js
│   │   ├── projectController.js
│   │   ├── adminController.js
│   │   └── chatbotController.js
│   ├── middleware/           # Authentication middleware
│   │   └── auth.js
│   ├── config/               # Database config
│   │   └── db.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

#### 1. Clone the repository
```bash
cd D:\RP\Projects\Portfolio
```

#### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:5173
```

Start backend server:
```bash
npm run dev
```

Backend will run on: **http://localhost:5000**

#### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Start frontend:
```bash
npm run dev
```

Frontend will run on: **http://localhost:5173**

---

## 📡 API Endpoints

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (Admin)
- `PUT /api/contact/:id` - Update message status (Admin)
- `DELETE /api/contact/:id` - Delete message (Admin)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Admin)
- `PUT /api/projects/:id` - Update project (Admin)
- `DELETE /api/projects/:id` - Delete project (Admin)

### Chatbot
- `POST /api/chatbot` - Send message to chatbot

### Admin
- `POST /api/admin/register` - Register admin
- `POST /api/admin/login` - Login admin
- `GET /api/admin/profile` - Get admin profile (Protected)

---

## 🎨 Customization

### Update Personal Information

Edit the following files:

1. **Hero Section**: `frontend/src/components/sections/Hero.jsx`
2. **About Section**: `frontend/src/components/sections/About.jsx`
3. **Projects**: `frontend/src/components/sections/Projects.jsx`
4. **Experience**: `frontend/src/components/sections/Experience.jsx`
5. **Contact**: `frontend/src/components/sections/Contact.jsx`

### Styling
- **Colors**: `frontend/tailwind.config.js`
- **Global Styles**: `frontend/src/index.css`

---

## 🌐 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

### Backend (Render/Railway)
1. Create new Web Service
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create cluster at mongodb.com/atlas
2. Get connection string
3. Update `MONGODB_URI` in `.env`

---

## 🔑 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=https://your-frontend-url.vercel.app
```

---

## 📊 Performance Optimizations

- ✅ Code splitting with React.lazy
- ✅ Lazy loading for 3D components
- ✅ Image optimization
- ✅ Smooth 60fps animations
- ✅ Responsive design
- ✅ SEO optimized

---

## 🎯 Future Enhancements

- [ ] Admin Dashboard UI
- [ ] Blog section
- [ ] Dark/Light mode toggle
- [ ] Advanced ML demos
- [ ] OpenAI integration for chatbot
- [ ] Portfolio analytics
- [ ] Resume download feature

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Ritesh Patil**
- Portfolio: [your-portfolio-url.com](https://your-portfolio-url.com)
- GitHub: [@riteshpatil](https://github.com)
- LinkedIn: [Ritesh Patil](https://linkedin.com)

---

## 🙏 Acknowledgments

- Three.js for 3D graphics
- Framer Motion for animations
- Vercel for deployment
- MongoDB Atlas for database

---

**⭐ If you found this project helpful, please give it a star!**
