const mongoose = require('mongoose');

const recognitionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  logoUrl: { type: String },
  websiteUrl: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Recognition', recognitionSchema);
