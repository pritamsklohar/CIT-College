const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ isActive: true }).sort({ date: -1 });
    res.json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const eventData = { ...req.body };
    if (req.file) eventData.imageUrl = `/uploads/${req.file.filename}`;
    const event = await Event.create(eventData);
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
