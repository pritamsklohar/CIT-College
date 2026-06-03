const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const query = { isActive: true };
  if (category) query.category = category;

  try {
    const notices = await Notice.find(query)
      .sort({ order: 1, date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.json({ success: true, data: notices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    const noticeData = { ...req.body };
    if (req.file) noticeData.fileUrl = req.file.path;
    const notice = await Notice.create(noticeData);
    res.status(201).json({ success: true, data: notice });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put('/:id', protect, upload.single('file'), async (req, res) => {
  try {
    const noticeData = { ...req.body };
    if (req.file) noticeData.fileUrl = req.file.path;
    const notice = await Notice.findByIdAndUpdate(req.params.id, noticeData, { new: true });
    res.json({ success: true, data: notice });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.patch('/:id/toggle', protect, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    notice.isActive = !notice.isActive;
    await notice.save();
    res.json({ success: true, data: notice });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Notice deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
