const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  state: { type: String },
  city: { type: String },
  branch: { type: String },
  message: { type: String },
  status: { type: String, enum: ['New', 'Read', 'Replied'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
