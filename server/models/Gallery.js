const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String },
  imageUrl: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Events', 'Campus', 'Sports', 'Cultural', 'Technical', 'General'], 
    default: 'General' 
  },
  date: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
