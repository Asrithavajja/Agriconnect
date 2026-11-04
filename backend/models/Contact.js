const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: [true, 'Please enter subject'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please enter your message']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);
