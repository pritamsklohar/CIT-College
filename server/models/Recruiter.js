const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  logoUrl: { type: String, required: true },
  website: String,
  sector: String,
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Recruiter', recruiterSchema);
