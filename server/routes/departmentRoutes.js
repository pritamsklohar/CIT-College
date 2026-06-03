const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', async (req, res) => {
  try {
    const departments = await Department.find({ isActive: true });
    res.json({ success: true, data: departments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const department = await Department.findOne({ slug: req.params.slug });
    if (!department) return res.status(404).json({ success: false, message: 'Department not found' });
    res.json({ success: true, data: department });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/:slug', protect, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;
    const department = await Department.findOneAndUpdate({ slug: req.params.slug }, updateData, { new: true });
    res.json({ success: true, data: department });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
