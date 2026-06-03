const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Syllabus = require('./models/Syllabus');

const syllabusToSeed = [
  {
    title: 'B.Tech Computer Science Engineering III to VIII Semester Syllabus (BTU Scheme)',
    department: 'Computer Science Engineering',
    semester: 'III Semester',
    type: 'Scheme & Syllabus',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    order: 1
  },
  {
    title: 'B.Tech Civil Engineering III to VIII Semester Syllabus (BTU Scheme)',
    department: 'Civil Engineering',
    semester: 'III Semester',
    type: 'Scheme & Syllabus',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    order: 2
  },
  {
    title: 'B.Tech Electrical Engineering III to VIII Semester Syllabus (BTU Scheme)',
    department: 'Electrical Engineering',
    semester: 'III Semester',
    type: 'Scheme & Syllabus',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    order: 3
  },
  {
    title: 'B.Tech Mechanical Engineering III to VIII Semester Syllabus (BTU Scheme)',
    department: 'Mechanical Engineering',
    semester: 'III Semester',
    type: 'Scheme & Syllabus',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    order: 4
  },
  {
    title: 'B.Tech 1st Year (Semester I & II) Scheme & Syllabus (Common to all branches)',
    department: 'Humanities & Sciences',
    semester: '1st Year (Sem I & II)',
    type: 'Scheme & Syllabus',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    order: 5
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cit').then(async () => {
  console.log('MongoDB connected for seeding syllabus.');
  await Syllabus.deleteMany({});
  await Syllabus.insertMany(syllabusToSeed);
  console.log('Seeded Syllabus Successfully!');
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
