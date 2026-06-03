const mongoose = require('mongoose');

const staticPageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String }, // HTML content from React-Quill
  imageUrl: { type: String }, // Optional image for the page (e.g., profile picture)
  metaDescription: { type: String },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('StaticPage', staticPageSchema);
