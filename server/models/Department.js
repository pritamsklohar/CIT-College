const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  hod: {
    name: { type: String },
    imageUrl: { type: String },
    message: { type: String }
  },
  vision: { type: String },
  mission: { type: String },
  labs: [{
    name: { type: String },
    description: { type: String },
    imageUrl: { type: String }
  }],
  highlights: [{ type: String }],
  imageUrl: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
