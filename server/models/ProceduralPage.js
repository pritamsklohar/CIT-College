const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true }
});

const feeSchema = new mongoose.Schema({
  label: { type: String, required: true },
  amount: { type: String, required: true }
});

const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true }
});

const proceduralPageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  pageTitle: { type: String, required: true },
  pageSubtitle: { type: String, required: true },
  heroIcon: { type: String, required: true },
  noticeTitle: { type: String, required: true },
  noticeContent: { type: String, required: true },
  noticeType: { type: String, enum: ['yellow', 'blue', 'red', 'green'], default: 'yellow' },
  documents: [documentSchema],
  feesTitle: { type: String, default: 'Fee Structure' },
  fees: [feeSchema],
  feeNote: { type: String },
  stepsTitle: { type: String, default: 'Application Flow' },
  steps: [stepSchema],
  downloadLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ProceduralPage', proceduralPageSchema);
