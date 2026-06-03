const express = require('express');
const router = express.Router();
const Recognition = require('../models/Recognition');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Get all recognition entries sorted by order
router.get('/', async (req, res) => {
  try {
    const items = await Recognition.find({}).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create new recognition (admin only)
router.post('/', protect, upload.single('logo'), async (req, res) => {
  try {
    const { title, description, websiteUrl, order } = req.body;
    const itemData = { title, description, websiteUrl, order: Number(order) || 0 };
    if (req.file) {
      itemData.logoUrl = req.file.path;
    }
    const item = await Recognition.create(itemData);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update recognition (admin only)
router.put('/:id', protect, upload.single('logo'), async (req, res) => {
  try {
    const { title, description, websiteUrl, order } = req.body;
    const updateData = { title, description, websiteUrl, order: Number(order) || 0 };
    if (req.file) {
      updateData.logoUrl = req.file.path;
    }
    const item = await Recognition.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete recognition (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Recognition.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, message: 'Recognition entry deleted successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
