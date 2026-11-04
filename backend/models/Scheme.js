const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter government scheme name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please enter scheme description']
  },
  eligibility: {
    type: String,
    required: [true, 'Please specify eligibility criteria']
  },
  benefits: {
    type: String,
    required: [true, 'Please specify scheme benefits']
  },
  applicationInfo: {
    type: String,
    required: [true, 'Please specify application details or official link']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scheme', schemeSchema);
