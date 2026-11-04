const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const store = require('../config/inMemoryStore');

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill in all fields (Name, Email, Subject, Message)' });
    }

    if (mongoose.connection.readyState === 1) {
      const contact = new Contact({ name, email, subject, message });
      const savedContact = await contact.save();
      return res.status(201).json({
        success: true,
        message: 'Your message has been sent successfully! Our agricultural support team will review it shortly.',
        data: savedContact
      });
    }

    const newContact = {
      _id: 'msg_' + Date.now(),
      name,
      email,
      subject,
      message,
      createdAt: new Date()
    };
    store.contacts.unshift(newContact);
    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! Our agricultural support team will review it shortly.',
      data: newContact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all submitted contact messages
// @route   GET /api/contact
// @access  Private
const getContactMessages = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await Contact.find().sort({ createdAt: -1 });
      return res.json(messages);
    }
    return res.json(store.contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContactMessage,
  getContactMessages
};
