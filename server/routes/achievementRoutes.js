const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// @route   GET /api/achievements
// @desc    Get all active achievements (with optional category filter)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = { isActive: true };
    if (category && category !== 'All') {
      query.category = category;
    }
    
    const achievements = await Achievement.find(query).sort({ date: -1 });
    res.json({ success: true, data: achievements });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/achievements
// @desc    Create an achievement
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const achievementData = { ...req.body };
    if (req.file) achievementData.imageUrl = req.file.path;
    
    const achievement = await Achievement.create(achievementData);
    res.status(201).json({ success: true, data: achievement });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/achievements/:id
// @desc    Update an achievement
// @access  Private
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const achievementData = { ...req.body };
    if (req.file) achievementData.imageUrl = req.file.path;

    const achievement = await Achievement.findByIdAndUpdate(req.params.id, achievementData, { new: true });
    res.json({ success: true, data: achievement });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/achievements/:id
// @desc    Delete an achievement
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Achievement deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
