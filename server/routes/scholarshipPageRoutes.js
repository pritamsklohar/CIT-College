const express = require('express');
const router = express.Router();
const ScholarshipPage = require('../models/ScholarshipPage');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/scholarship-page
// @desc    Get the scholarship page content
// @access  Public
router.get('/', async (req, res) => {
  try {
    let page = await ScholarshipPage.findOne();
    if (!page) {
      // Return empty structure if not found
      return res.status(200).json({ success: true, data: { introText: '', scholarships: [], contactTitle: '', contactPerson: '' } });
    }
    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// @route   PUT /api/scholarship-page
// @desc    Update scholarship page content
// @access  Private (Admin)
router.put('/', protect, async (req, res) => {
  try {
    let page = await ScholarshipPage.findOne();
    
    if (page) {
      // Update existing
      page = await ScholarshipPage.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
    } else {
      // Create new if doesn't exist
      page = await ScholarshipPage.create(req.body);
    }
    
    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
