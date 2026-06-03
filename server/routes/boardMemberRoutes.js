const express = require('express');
const router = express.Router();
const BoardMember = require('../models/BoardMember');
const { protect } = require('../middleware/authMiddleware');

// Get all board members
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const members = await BoardMember.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new board member (admin only)
router.post('/', protect, async (req, res) => {
  try {
    const { name, designation, type, profile, order, isActive } = req.body;
    let imageUrl = '';
    
    if (req.file) {
       imageUrl = `/uploads/${req.file.filename}`;
    }

    const member = await BoardMember.create({
      name, designation, type, profile, order, isActive, imageUrl
    });
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete board member (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const member = await BoardMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }
    await member.deleteOne();
    res.json({ success: true, message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
