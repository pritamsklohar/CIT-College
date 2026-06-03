const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  students: { type: Number, default: 1200 },
  faculty: { type: Number, default: 150 },
  placements: { type: Number, default: 85 },
  partners: { type: Number, default: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Stats', statsSchema);
