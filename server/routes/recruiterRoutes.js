const express = require('express');
const router = express.Router();
const Recruiter = require('../models/Recruiter');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', async (req, res) => {
  try {
    const recruiters = await Recruiter.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: recruiters });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', protect, upload.single('logo'), async (req, res) => {
  try {
    const recruiterData = { ...req.body };
    if (req.file) recruiterData.logoUrl = req.file.path;
    const recruiter = await Recruiter.create(recruiterData);
    res.status(201).json({ success: true, data: recruiter });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Recruiter.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Recruiter deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
