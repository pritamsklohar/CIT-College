const express = require('express');
const router = express.Router();
const ProceduralPage = require('../models/ProceduralPage');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/procedural-pages
// @desc    Get all procedural pages (slugs and titles)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const pages = await ProceduralPage.find().select('slug pageTitle');
    res.status(200).json({ success: true, data: pages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// @route   GET /api/procedural-pages/:slug
// @desc    Get a specific procedural page content
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const page = await ProceduralPage.findOne({ slug: req.params.slug });
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// @route   PUT /api/procedural-pages/:slug
// @desc    Update procedural page content
// @access  Private (Admin)
router.put('/:slug', protect, async (req, res) => {
  try {
    const page = await ProceduralPage.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    
    res.status(200).json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
