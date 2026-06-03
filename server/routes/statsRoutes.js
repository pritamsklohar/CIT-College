const express = require('express');
const router = express.Router();
const Stats = require('../models/Stats');
const { protect } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const stats = await Stats.findOne();
    res.json({ success: true, data: stats || { students: 1200, faculty: 150, placements: 85, partners: 100 } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/', protect, async (req, res) => {
  try {
    let stats = await Stats.findOne();
    if (stats) {
      stats = await Stats.findByIdAndUpdate(stats._id, req.body, { new: true });
    } else {
      stats = await Stats.create(req.body);
    }
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
