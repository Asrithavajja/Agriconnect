const express = require('express');
const router = express.Router();
const {
  getSchemes,
  getSchemeById,
  createScheme,
  updateScheme,
  deleteScheme
} = require('../controllers/schemeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getSchemes)
  .post(protect, createScheme);

router.route('/:id')
  .get(getSchemeById)
  .put(protect, updateScheme)
  .delete(protect, deleteScheme);

module.exports = router;
