const mongoose = require('mongoose');
const Tip = require('../models/Tip');
const store = require('../config/inMemoryStore');

// @desc    Get all tips (optional filter by category)
// @route   GET /api/tips
// @access  Public
const getTips = async (req, res, next) => {
  try {
    const category = req.query.category || '';

    if (mongoose.connection.readyState === 1) {
      const filter = category ? { category: { $regex: category, $options: 'i' } } : {};
      const tips = await Tip.find(filter).sort({ createdAt: -1 });
      return res.json(tips);
    }

    // Fallback In-Memory Mode
    let filteredTips = store.tips;
    if (category.trim() && category !== 'All Categories') {
      const catLower = category.toLowerCase();
      filteredTips = store.tips.filter(t => t.category.toLowerCase().includes(catLower));
    }
    return res.json(filteredTips);
  } catch (error) {
    next(error);
  }
};

// @desc    Get tip by ID
// @route   GET /api/tips/:id
// @access  Public
const getTipById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (mongoose.connection.readyState === 1) {
      const tip = await Tip.findById(id);
      if (tip) return res.json(tip);
      return res.status(404).json({ message: 'Agriculture Tip not found' });
    }
    const tip = store.tips.find(t => t._id === id);
    if (tip) return res.json(tip);
    return res.status(404).json({ message: 'Agriculture Tip not found' });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new tip
// @route   POST /api/tips
// @access  Private
const createTip = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Please provide title, description, and category' });
    }

    if (mongoose.connection.readyState === 1) {
      const tip = new Tip({ title, description, category });
      const createdTip = await tip.save();
      return res.status(201).json(createdTip);
    }

    const newTip = {
      _id: 'tip_' + Date.now(),
      title,
      description,
      category,
      createdAt: new Date()
    };
    store.tips.unshift(newTip);
    return res.status(201).json(newTip);
  } catch (error) {
    next(error);
  }
};

// @desc    Update tip
// @route   PUT /api/tips/:id
// @access  Private
const updateTip = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (mongoose.connection.readyState === 1) {
      const tip = await Tip.findById(id);
      if (tip) {
        Object.assign(tip, req.body);
        const updatedTip = await tip.save();
        return res.json(updatedTip);
      }
      return res.status(404).json({ message: 'Tip not found' });
    }

    const tip = store.tips.find(t => t._id === id);
    if (tip) {
      Object.assign(tip, req.body);
      return res.json(tip);
    }
    return res.status(404).json({ message: 'Tip not found' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete tip
// @route   DELETE /api/tips/:id
// @access  Private
const deleteTip = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (mongoose.connection.readyState === 1) {
      const tip = await Tip.findById(id);
      if (tip) {
        await Tip.deleteOne({ _id: id });
        return res.json({ message: 'Tip removed successfully' });
      }
      return res.status(404).json({ message: 'Tip not found' });
    }

    const index = store.tips.findIndex(t => t._id === id);
    if (index !== -1) {
      store.tips.splice(index, 1);
      return res.json({ message: 'Tip removed successfully' });
    }
    return res.status(404).json({ message: 'Tip not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTips,
  getTipById,
  createTip,
  updateTip,
  deleteTip
};
