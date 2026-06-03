const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  imageUrl: { type: String, required: true },
  link: { type: String },
  buttonText: { type: String, default: 'Learn More' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('HeroSlide', heroSlideSchema);
