const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, enum: ['CS', 'Civil', 'Electrical', 'Mechanical', 'EC', 'Science', 'Admin', 'Academic Administration', 'Administration Staff'], required: true },
  qualification: { type: String },
  experience: { type: String },
  email: { type: String },
  imageUrl: { type: String },
  isHOD: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Faculty', facultySchema);
