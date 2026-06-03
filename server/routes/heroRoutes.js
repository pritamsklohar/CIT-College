const express = require('express');
const router = express.Router();
const HeroSlide = require('../models/HeroSlide');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', async (req, res) => {
  try {
    const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: slides });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const slideData = { ...req.body };
    if (req.file) slideData.imageUrl = req.file.path;
    const slide = await HeroSlide.create(slideData);
    res.status(201).json({ success: true, data: slide });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const slideData = { ...req.body };
    if (req.file) slideData.imageUrl = req.file.path;
    const slide = await HeroSlide.findByIdAndUpdate(req.params.id, slideData, { new: true });
    res.json({ success: true, data: slide });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await HeroSlide.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Slide deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
