const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', async (req, res) => {
  const { category, page = 1, limit = 12 } = req.query;
  const query = { isActive: true };
  if (category) query.category = category;

  try {
    const images = await Gallery.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.json({ success: true, data: images });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', protect, upload.array('images', 20), async (req, res) => {
  try {
    const images = req.files.map(file => ({
      imageUrl: file.path,
      category: req.body.category,
      title: req.body.title
    }));
    const savedImages = await Gallery.insertMany(images);
    res.status(201).json({ success: true, data: savedImages });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Image deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
