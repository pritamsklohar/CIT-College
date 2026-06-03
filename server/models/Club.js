const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Coding', 'Cultural', 'Robotics', 'TechInnovation', 'SocialMedia', 'Sports'], 
    required: true, 
    unique: true 
  },
  description: { type: String },
  imageUrl: { type: String },
  gallery: [{ imageUrl: String }],
  activities: [{ type: String }],
  coordinator: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);
