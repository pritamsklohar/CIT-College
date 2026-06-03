const mongoose = require('mongoose');

const boardMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  type: { type: String, enum: ['Management', 'AcademicAdvisory'], required: true },
  imageUrl: { type: String },
  profile: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('BoardMember', boardMemberSchema);
