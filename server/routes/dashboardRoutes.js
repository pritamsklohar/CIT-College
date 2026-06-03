const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const Faculty = require('../models/Faculty');
const Gallery = require('../models/Gallery');
const Enquiry = require('../models/Enquiry');
const Department = require('../models/Department');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, async (req, res) => {
  try {
    const [notices, faculty, gallery, enquiries, departments] = await Promise.all([
      Notice.countDocuments(),
      Faculty.countDocuments(),
      Gallery.countDocuments(),
      Enquiry.countDocuments({ isRead: false }),
      Department.countDocuments()
    ]);

    const recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(5);
    const latestNotices = await Notice.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        counts: {
          notices,
          faculty,
          gallery,
          enquiries,
          departments
        },
        recentEnquiries,
        latestNotices
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
