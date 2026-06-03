const express = require('express');
const router = express.Router();
const AlumniPage = require('../models/AlumniPage');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// @route   GET /api/alumni-page
// @desc    Get alumni page content
// @access  Public
router.get('/', async (req, res) => {
  try {
    let page = await AlumniPage.findOne();
    if (!page) {
      page = await AlumniPage.create({});
    }
    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// @route   PUT /api/alumni-page
// @desc    Update alumni page content
// @access  Private (Admin)
router.put('/', protect, upload.single('heroImage'), async (req, res) => {
  try {
    let updateData = { ...req.body };
    
    // Parse objectives if it comes as a string (from FormData)
    if (updateData.objectives && typeof updateData.objectives === 'string') {
      try {
        updateData.objectives = JSON.parse(updateData.objectives);
      } catch (e) {
        console.error("Error parsing objectives:", e);
      }
    }

    if (req.file) {
      updateData.heroImageUrl = req.file.path;
    }

    let page = await AlumniPage.findOne();
    
    if (page) {
      page = await AlumniPage.findByIdAndUpdate(page._id, updateData, { new: true });
    } else {
      page = await AlumniPage.create(updateData);
    }
    
    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
