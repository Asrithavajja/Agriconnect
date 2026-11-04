const express = require('express');
const router = express.Router();
const {
  getTips,
  getTipById,
  createTip,
  updateTip,
  deleteTip
} = require('../controllers/tipController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getTips)
  .post(protect, createTip);

router.route('/:id')
  .get(getTipById)
  .put(protect, updateTip)
  .delete(protect, deleteTip);

module.exports = router;
