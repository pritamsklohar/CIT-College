const mongoose = require('mongoose');

const academicCalendarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ['Calendar', 'Exam Schedule', 'Holiday List', 'Other'],
    default: 'Calendar'
  },
  academicYear: {
    type: String,
    required: true,
    default: '2023-24'
  },
  fileUrl: {
    type: String,
    required: [true, 'File/Document is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('AcademicCalendar', academicCalendarSchema);
