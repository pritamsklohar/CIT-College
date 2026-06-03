const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/', protect, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'academicCalendarPdf', maxCount: 1 }]), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.files?.logo) updateData.logoUrl = req.files.logo[0].path;
    if (req.files?.academicCalendarPdf) updateData.academicCalendarUrl = req.files.academicCalendarPdf[0].path;
    const settings = await Settings.findOneAndUpdate({}, updateData, { new: true, upsert: true });
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
