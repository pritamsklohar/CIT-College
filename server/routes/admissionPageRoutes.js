const express = require('express');
const router = express.Router();
const AdmissionPage = require('../models/AdmissionPage');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Initialize settings if they don't exist
const getOrInitializeSettings = async () => {
  let settings = await AdmissionPage.findOne();
  if (!settings) {
    settings = await AdmissionPage.create({});
  }
  return settings;
};

// @desc    Get Admission Page Data
// @route   GET /api/admission-page
// @access  Public
router.get('/', async (req, res) => {
  try {
    const settings = await getOrInitializeSettings();
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Update Admission Page Data
// @route   PUT /api/admission-page
// @access  Private/Admin
router.put('/', protect, upload.single('prospectusFile'), async (req, res) => {
  try {
    let settings = await getOrInitializeSettings();

    const {
      content,
      applyOnlineUrl,
      helplineGeneral,
      helplineIncharge,
      helplineEmail,
      seatMatrix // This will be sent as a JSON string if FormData is used
    } = req.body;

    if (content) settings.content = content;
    if (applyOnlineUrl) settings.applyOnlineUrl = applyOnlineUrl;
    if (helplineGeneral) settings.helplineGeneral = helplineGeneral;
    if (helplineIncharge) settings.helplineIncharge = helplineIncharge;
    if (helplineEmail) settings.helplineEmail = helplineEmail;
    
    if (seatMatrix) {
      settings.seatMatrix = JSON.parse(seatMatrix);
    }

    if (req.file) {
      settings.prospectusUrl = req.file.path; // from cloudinary
    }

    await settings.save();
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
