const mongoose = require('mongoose');

const scholarshipCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  eligibility: { type: String, required: true },
  incomeCriteria: [{ type: String }],
  amountMain: { type: String, required: true },
  amountSubtext: { type: String },
  colorTheme: { type: String, enum: ['primary', 'accent'], default: 'primary' }
});

const scholarshipPageSchema = new mongoose.Schema({
  introText: { type: String, required: true },
  scholarships: [scholarshipCardSchema],
  contactTitle: { type: String, default: 'Contact for Details:' },
  contactPerson: { type: String, required: true },
  assistanceTitle: { type: String, default: 'Need Assistance?' },
  assistanceDesc: { type: String, default: 'Visit our Scholarship Cell in the Admin block or contact the Scholarship Incharge.' },
  assistancePhone: { type: String },
  requiredDocuments: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('ScholarshipPage', scholarshipPageSchema);
