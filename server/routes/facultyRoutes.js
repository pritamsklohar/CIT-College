const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', async (req, res) => {
  const { department, isHOD } = req.query;
  const query = { isActive: true };
  if (department) query.department = department;
  if (isHOD) query.isHOD = isHOD === 'true';

  try {
    const faculty = await Faculty.find(query).sort({ order: 1, name: 1 });
    res.json({ success: true, data: faculty });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.imageUrl = req.file.path;
    const faculty = await Faculty.create(data);
    res.status(201).json({ success: true, data: faculty });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.imageUrl = req.file.path;
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json({ success: true, data: faculty });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Faculty deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
