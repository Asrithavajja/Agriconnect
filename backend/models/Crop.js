const mongoose = require('mongoose');
const { adminPasswordHash, defaultPasswordHash } = require('../config/inMemoryStore');

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter crop name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please enter crop description']
  },
  season: {
    type: String,
    required: [true, 'Please specify growing season (e.g. Kharif, Rabi, Zaid, All Season)'],
    trim: true
  },
  soilType: {
    type: String,
    required: [true, 'Please specify suitable soil type'],
    trim: true
  },
  waterRequirement: {
    type: String,
    required: [true, 'Please specify water requirement (e.g. High, Moderate, Low)'],
    trim: true
  },
  climate: {
    type: String,
    required: [true, 'Please specify suitable climate'],
    trim: true
  },
  cultivationInfo: {
    type: String,
    required: [true, 'Please provide cultivation information']
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Crop', cropSchema);


