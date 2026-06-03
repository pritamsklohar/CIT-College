const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  date: { type: Date },
  category: { type: String, enum: ['Academic', 'Sports', 'Technical', 'Cultural'], default: 'Academic' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
