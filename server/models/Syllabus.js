const mongoose = require('mongoose');

const syllabusSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { 
    type: String, 
    required: true,
    enum: ['Computer Science Engineering', 'Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Humanities & Sciences', 'General']
  },
  semester: { 
    type: String, 
    required: true,
    enum: ['1st Year (Sem I & II)', 'III Semester', 'IV Semester', 'V Semester', 'VI Semester', 'VII Semester', 'VIII Semester', 'General']
  },
  type: { 
    type: String, 
    required: true, 
    enum: ['Scheme', 'Syllabus', 'Scheme & Syllabus'],
    default: 'Syllabus' 
  },
  fileUrl: { type: String, required: true }, // Cloudinary link to PDF
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Syllabus', syllabusSchema);
