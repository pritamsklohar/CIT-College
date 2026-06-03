const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  intake: { type: Number, required: true, default: 60 },
  stateSeats: { type: Number, required: true, default: 42 },
  outOfStateSeats: { type: Number, required: true, default: 9 },
  managementSeats: { type: Number, required: true, default: 9 }
});

const admissionPageSchema = new mongoose.Schema({
  content: { 
    type: String, 
    default: '<h3>Admission Process</h3><p>Follow these steps to apply for engineering courses at CIT...</p>' 
  },
  seatMatrix: {
    type: [seatSchema],
    default: [
      { branch: 'Civil Engineering (05)', intake: 60, stateSeats: 42, outOfStateSeats: 9, managementSeats: 9 },
      { branch: 'Computer Science and Engineering (06)', intake: 60, stateSeats: 42, outOfStateSeats: 9, managementSeats: 9 },
      { branch: 'Electronics & Communication Engineering (09)', intake: 60, stateSeats: 42, outOfStateSeats: 9, managementSeats: 9 },
      { branch: 'Electrical Engineering (07)', intake: 60, stateSeats: 42, outOfStateSeats: 9, managementSeats: 9 },
      { branch: 'Mechanical Engineering (13)', intake: 60, stateSeats: 42, outOfStateSeats: 9, managementSeats: 9 }
    ]
  },
  applyOnlineUrl: { 
    type: String, 
    default: 'https://forms.gle/KT257DVQEjc5HBTh9' 
  },
  helplineGeneral: { 
    type: String, 
    default: '+91 95880 13851' 
  },
  helplineIncharge: { 
    type: String, 
    default: '+91 99505 30301' 
  },
  helplineEmail: { 
    type: String, 
    default: 'citaburoad@gmail.com' 
  },
  prospectusUrl: { 
    type: String, 
    default: 'https://citabu.ac.in/assets/pdf/CIT-COLLEGE-BROCHURE.pdf.pdf' 
  }
}, { timestamps: true });

module.exports = mongoose.model('AdmissionPage', admissionPageSchema);
