const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Testimonial = require('./models/Testimonial');

const testimonialsToSeed = [
  { 
    name: 'Rahul Sharma', 
    company: 'Google', 
    batch: '2016-2020',
    message: 'CIT Abu Road provided me with the foundation I needed to crack top product companies. The coding culture and faculty support are unmatched.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 5,
    isActive: true
  },
  { 
    name: 'Priya Patel', 
    company: 'Microsoft', 
    batch: '2017-2021',
    message: 'The state-of-the-art labs and continuous placement training helped me secure my dream job. I owe my success to the incredible placement cell.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 5,
    isActive: true
  },
  { 
    name: 'Amit Verma', 
    company: 'Amazon', 
    batch: '2015-2019',
    message: 'From hackathons to cultural fests, CIT develops your overall personality. The practical exposure here is exactly what the industry demands.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 5,
    isActive: true
  },
  { 
    name: 'Sneha Gupta', 
    company: 'TCS Digital', 
    batch: '2018-2022',
    message: 'The dedicated faculty mentors guided me through every step of my engineering journey. CIT truly transforms students into professionals.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 5,
    isActive: true
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('MongoDB connected.');
  await Testimonial.deleteMany({});
  await Testimonial.insertMany(testimonialsToSeed);
  console.log('Seeded Testimonials/Alumni Successfully!');
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
