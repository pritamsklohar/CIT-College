const express = require('express');
const router = express.Router();
const Syllabus = require('../models/Syllabus');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Get all syllabus items sorted by order
router.get('/', async (req, res) => {
  try {
    const items = await Syllabus.find({}).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create new syllabus (admin only)
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    const { title, department, semester, type, order } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a PDF file' });
    }

    const item = await Syllabus.create({
      title,
      department,
      semester,
      type,
      fileUrl: req.file.path,
      order: Number(order) || 0
    });

    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update syllabus (admin only)
router.put('/:id', protect, upload.single('file'), async (req, res) => {
  try {
    const { title, department, semester, type, order } = req.body;
    const updateData = { title, department, semester, type, order: Number(order) || 0 };
    
    if (req.file) {
      updateData.fileUrl = req.file.path;
    }

    const item = await Syllabus.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Syllabus item not found' });
    
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete syllabus (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Syllabus.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Syllabus item not found' });
    res.json({ success: true, message: 'Syllabus item deleted successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
