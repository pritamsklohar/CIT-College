const mongoose = require('mongoose');
const dotenv = require('dotenv');
const BoardMember = require('./models/BoardMember');

dotenv.config();

const members = [
  { name: 'Sh. Lalit Gandhi', designation: 'Managing Director', type: 'Management', order: 1 },
  { name: 'Sh. Kishore Gandhi', designation: 'Chairman,Managing Director', type: 'Management', order: 2 },
  { name: 'Sh. Ajay Shah', designation: 'Advisor', type: 'Management', order: 3 },
  { name: 'Sh. L.K Sanghvi', designation: 'Advisor', type: 'Management', order: 4 },
  { name: 'Sh. Jayant Gandhi', designation: 'Director', type: 'Management', order: 5 },
  { name: 'Sh. Tejas R. Shah', designation: 'Director', type: 'Management', order: 6 },
  { name: 'Dr. Rajnesh Yadav', designation: 'Principal', type: 'Management', order: 7 }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB Connected');
  await BoardMember.deleteMany({ type: 'Management' });
  await BoardMember.insertMany(members);
  console.log('Management board seeded successfully!');
  process.exit();
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
