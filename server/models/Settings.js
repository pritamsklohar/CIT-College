const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: "Chartered Institute of Technology" },
  email: { type: String },
  phone1: { type: String },
  phone2: { type: String },
  phone3: { type: String },
  address: { type: String },
  googleMapsEmbed: { type: String },
  facebookUrl: { type: String },
  twitterUrl: { type: String },
  linkedinUrl: { type: String },
  instagramUrl: { type: String },
  youtubeUrl: { type: String },
  brochureUrl: { type: String },
  trainingLetterUrl: { type: String },
  admissionFormUrl: { type: String },
  logoUrl: { type: String },
  academicCalendarUrl: { type: String },
  footerText: { type: String },
  metaDescription: { type: String },
  maintenanceMode: { type: Boolean, default: false },
  tnpHighestPackage: { type: String, default: '18 LPA' },
  tnpAveragePackage: { type: String, default: '4.5 LPA' },
  tnpStudentsPlaced: { type: String, default: '85%' },
  tnpPartnerships: { type: String, default: '150+' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
