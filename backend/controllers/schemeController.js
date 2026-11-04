const mongoose = require('mongoose');
const Scheme = require('../models/Scheme');
const store = require('../config/inMemoryStore');

// @desc    Get all government schemes
// @route   GET /api/schemes
// @access  Public
const getSchemes = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const schemes = await Scheme.find().sort({ createdAt: -1 });
      return res.json(schemes);
    }
    return res.json(store.schemes);
  } catch (error) {
    next(error);
  }
};

// @desc    Get scheme by ID
// @route   GET /api/schemes/:id
// @access  Public
const getSchemeById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (mongoose.connection.readyState === 1) {
      const scheme = await Scheme.findById(id);
      if (scheme) return res.json(scheme);
      return res.status(404).json({ message: 'Government Scheme not found' });
    }
    const scheme = store.schemes.find(s => s._id === id);
    if (scheme) return res.json(scheme);
    return res.status(404).json({ message: 'Government Scheme not found' });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new scheme
// @route   POST /api/schemes
// @access  Private
const createScheme = async (req, res, next) => {
  try {
    const { name, description, eligibility, benefits, applicationInfo } = req.body;

    if (!name || !description || !eligibility || !benefits || !applicationInfo) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (mongoose.connection.readyState === 1) {
      const scheme = new Scheme({ name, description, eligibility, benefits, applicationInfo });
      const createdScheme = await scheme.save();
      return res.status(201).json(createdScheme);
    }

    const newScheme = {
      _id: 'sch_' + Date.now(),
      name,
      description,
      eligibility,
      benefits,
      applicationInfo,
      createdAt: new Date()
    };
    store.schemes.unshift(newScheme);
    return res.status(201).json(newScheme);
  } catch (error) {
    next(error);
  }
};

// @desc    Update scheme
// @route   PUT /api/schemes/:id
// @access  Private
const updateScheme = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (mongoose.connection.readyState === 1) {
      const scheme = await Scheme.findById(id);
      if (scheme) {
        Object.assign(scheme, req.body);
        const updatedScheme = await scheme.save();
        return res.json(updatedScheme);
      }
      return res.status(404).json({ message: 'Scheme not found' });
    }

    const scheme = store.schemes.find(s => s._id === id);
    if (scheme) {
      Object.assign(scheme, req.body);
      return res.json(scheme);
    }
    return res.status(404).json({ message: 'Scheme not found' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete scheme
// @route   DELETE /api/schemes/:id
// @access  Private
const deleteScheme = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (mongoose.connection.readyState === 1) {
      const scheme = await Scheme.findById(id);
      if (scheme) {
        await Scheme.deleteOne({ _id: id });
        return res.json({ message: 'Scheme removed successfully' });
      }
      return res.status(404).json({ message: 'Scheme not found' });
    }

    const index = store.schemes.findIndex(s => s._id === id);
    if (index !== -1) {
      store.schemes.splice(index, 1);
      return res.json({ message: 'Scheme removed successfully' });
    }
    return res.status(404).json({ message: 'Scheme not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme
};
