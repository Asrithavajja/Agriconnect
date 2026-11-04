const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const store = require('../config/inMemoryStore');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'agriconnect_secret_jwt_key_2026_super_secure'
      );

      if (mongoose.connection.readyState === 1) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        req.user = store.users.find(u => u._id === decoded.id);
      }

      if (!req.user) {
        return res.status(401).json({ message: 'User not found, authorization failed' });
      }
      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admin privileges required' });
  }
};

module.exports = { protect, admin };
