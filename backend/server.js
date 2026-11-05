const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Body parser and CORS middleware
app.use(express.json());
app.use(cors());

// Root API Status Endpoint
app.get(['/', '/api'], (req, res) => {
  res.json({
    message: 'Welcome to AgriConnect API - Agriculture Awareness & Support Platform',
    status: 'Server operational',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      crops: '/api/crops',
      schemes: '/api/schemes',
      tips: '/api/tips',
      contact: '/api/contact'
    }
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/crops', require('./routes/cropRoutes'));
app.use('/api/schemes', require('./routes/schemeRoutes'));
app.use('/api/tips', require('./routes/tipRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Centralized Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`AgriConnect Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
