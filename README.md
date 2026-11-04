# AgriConnect – Agriculture Awareness and Support Platform

AgriConnect is a modern full-stack web application developed for farmers, agricultural students, and agricultural enthusiasts. The platform provides a centralized, user-friendly hub for crop advisory, soil health management, sustainable farming awareness, government welfare schemes, real-time weather forecasting, and contact support.

---

## 🌟 Key Features

1. **Agricultural Awareness Modules**: Educational guidance covering 9 core domains (Soil Health, Water Management, Crop Selection, Organic Farming, Pest Management, Fertilizer Awareness, Modern Farming Methods, Sustainable Agriculture, Climate Awareness).
2. **Interactive Crop Library & Search**: Full database-driven crop library with real-time search by name, growing season, or soil type.
3. **Crop Cultivation Detail View**: In-depth pages detailing climate requirements, soil preferences, water consumption, and cultivation management.
4. **Government Schemes Portal**: Database-driven list of agricultural subsidy schemes, eligibility requirements, benefits, and application guidance.
5. **Farming Tips Library**: Practical, category-filtered advice for optimized crop yields.
6. **Agri Weather Portal**: Region-based weather forecasting with agricultural operation advisories (irrigation and spraying advice).
7. **Farmer Helpline Contact Form**: Validated contact form that securely stores inquiry messages directly in MongoDB.
8. **JWT Authentication & Security**: Password hashing with `bcryptjs` and stateless authentication with JWT tokens.
9. **Protected Farmer Dashboard**: User portal for viewing profile statistics, saving recommendations, creating new crop records, posting farming tips, and managing contact inquiries.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (Bootstrapped with Vite)
- **Routing**: React Router DOM (v6)
- **HTTP Client**: Axios (configured with base URL and JWT interceptors)
- **Icons**: Lucide React
- **Styling**: Modern Vanilla CSS with responsive agriculture-themed design system

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Middleware**: CORS, Custom Auth Middleware, Centralized Error Handler

---

## 📁 Project Structure

```
AgriConnect/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ErrorMessage.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Awareness.jsx
│   │   │   ├── Crops.jsx
│   │   │   ├── CropDetails.jsx
│   │   │   ├── Schemes.jsx
│   │   │   ├── Weather.jsx
│   │   │   ├── Tips.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .env
│   └── .env.example
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cropController.js
│   │   ├── schemeController.js
│   │   ├── tipController.js
│   │   └── contactController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Crop.js
│   │   ├── Scheme.js
│   │   ├── Tip.js
│   │   └── Contact.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cropRoutes.js
│   │   ├── schemeRoutes.js
│   │   ├── tipRoutes.js
│   │   └── contactRoutes.js
│   │
│   ├── seed/
│   │   └── seedData.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

## ⚡ Quick Start & Installation Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (Local MongoDB Server running at `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI)

---

### Step 1: Backend Setup & Database Seeding

1. Open terminal and navigate to the backend folder:
   ```bash
   cd AgriConnect/backend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file inside `backend/` with the following contents (a `.env.example` is also provided):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/agriconnect
   JWT_SECRET=agriconnect_secret_jwt_key_2026_super_secure
   NODE_ENV=development
   ```

4. Populate Database with Sample Agricultural Seed Data:
   ```bash
   npm run seed
   ```
   *This seeds 8 crops, 5 government schemes, 10 farming tips, and 2 default user accounts (Admin & Farmer).*

5. Start Backend Express Server:
   ```bash
   npm start
   ```
   *The API server will run at `http://localhost:5000`.*

---

### Step 2: Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd AgriConnect/frontend
   ```

2. Install Frontend dependencies:
   ```bash
   npm install
   ```

3. Configure Frontend Environment Variables:
   Create a `.env` file inside `frontend/` with:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Launch Vite Development Server:
   ```bash
   npm run dev
   ```
   *Open browser at `http://localhost:5173`.*

---

## 🔐 Pre-Seeded Test Credentials

| Account Role | Email Address | Password |
| :--- | :--- | :--- |
| **Demo Farmer Account** | `ramesh@agriconnect.com` | `userpassword123` |
| **Demo Admin Account** | `admin@agriconnect.com` | `adminpassword123` |

---

## 📡 REST API Endpoint Reference

### Authentication APIs (`/api/auth`)
- `POST /api/auth/register` - Register a new farmer/user
- `POST /api/auth/login` - Authenticate user & return JWT token
- `GET /api/auth/profile` - Get logged-in user profile (*Private*)

### Crop APIs (`/api/crops`)
- `GET /api/crops` - Get list of crops (Supports `?search=wheat` filter)
- `GET /api/crops/:id` - Get single crop details
- `POST /api/crops` - Create new crop (*Private*)
- `PUT /api/crops/:id` - Update existing crop (*Private*)
- `DELETE /api/crops/:id` - Delete crop record (*Private*)

### Scheme APIs (`/api/schemes`)
- `GET /api/schemes` - List all government welfare schemes
- `GET /api/schemes/:id` - Get scheme details
- `POST /api/schemes` - Create scheme (*Private*)
- `PUT /api/schemes/:id` - Update scheme (*Private*)
- `DELETE /api/schemes/:id` - Delete scheme (*Private*)

### Farming Tip APIs (`/api/tips`)
- `GET /api/tips` - Get tips (Supports `?category=Soil%20Health` filter)
- `GET /api/tips/:id` - Get tip details
- `POST /api/tips` - Create tip (*Private*)
- `PUT /api/tips/:id` - Update tip (*Private*)
- `DELETE /api/tips/:id` - Delete tip (*Private*)

### Contact API (`/api/contact`)
- `POST /api/contact` - Submit contact message (Stores in MongoDB)
- `GET /api/contact` - View submitted contact messages (*Private*)

---

## 🚀 How the System Works

1. **Frontend-Backend Communication**: The React frontend communicates with Express APIs via a centralized `axios` service (`frontend/src/services/api.js`). When a user logs in, the returned JWT token is stored in `localStorage` and attached to all authorization headers automatically via Axios interceptors.
2. **Database Layer**: MongoDB stores documents using Mongoose schemas defined in `backend/models/`. Passwords are automatically hashed with `bcryptjs` before document save operations.
3. **Protected Routes**: The `ProtectedRoute` component validates session status via `AuthContext`. Unauthenticated users attempting to access `/dashboard` are cleanly redirected to `/login`.

---

## 🌐 Deployment Instructions

- **Backend**: Deploy on Render, Railway, or Heroku. Set environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`).
- **Frontend**: Build production bundle using `npm run build` inside `frontend/` and deploy to Vercel, Netlify, or GitHub Pages.
