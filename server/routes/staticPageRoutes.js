const express = require('express');
const router = express.Router();
const StaticPage = require('../models/StaticPage');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/:slug', async (req, res) => {
  try {
    const page = await StaticPage.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' });
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/:slug', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, content, metaDescription } = req.body;
    const updateData = { title, content, metaDescription, lastUpdated: Date.now() };
    
    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const page = await StaticPage.findOneAndUpdate(
      { slug: req.params.slug },
      updateData,
      { new: true, upsert: true }
    );
    res.json({ success: true, data: page });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
