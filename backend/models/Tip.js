const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter tip title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please enter detailed tip description']
  },
  category: {
    type: String,
    required: [true, 'Please specify category (e.g. Soil Health, Irrigation, Organic Farming, Pest Control)'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tip', tipSchema);
