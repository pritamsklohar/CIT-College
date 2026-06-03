const express = require('express');
const router = express.Router();
const AcademicCalendar = require('../models/AcademicCalendar');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Get all academic calendars
router.get('/', async (req, res) => {
  try {
    const calendars = await AcademicCalendar.find().sort({ createdAt: -1 });
    res.json({ success: true, data: calendars });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create new academic calendar
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    const { title, description, type, academicYear, isActive } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file document' });
    }

    const newCalendar = await AcademicCalendar.create({
      title,
      description,
      type,
      academicYear,
      isActive,
      fileUrl: req.file.path // Cloudinary path
    });
    
    res.status(201).json({ success: true, data: newCalendar });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete academic calendar
router.delete('/:id', protect, async (req, res) => {
  try {
    const calendar = await AcademicCalendar.findById(req.params.id);
    if (!calendar) {
      return res.status(404).json({ success: false, message: 'Calendar not found' });
    }
    
    await calendar.deleteOne();
    res.json({ success: true, message: 'Calendar removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
