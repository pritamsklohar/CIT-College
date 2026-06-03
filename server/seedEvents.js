const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Event = require('./models/Event');

const eventsToSeed = [
  { 
    title: 'National Level Hackathon - CODE RED 2026', 
    description: 'Join the ultimate 48-hour coding marathon. Build innovative solutions, win exciting cash prizes, and get a chance to be hired by top tech recruiters!',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    location: 'Main Auditorium, CIT Campus',
    isActive: true
  },
  { 
    title: 'Annual Tech Symposium - TECHFEST 2026', 
    description: 'The biggest technology festival of the year! Featuring guest lectures from industry experts, robotics competitions, and project exhibitions.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    location: 'Open Air Theatre, CIT Campus',
    isActive: true
  },
  { 
    title: 'Global Alumni Meet & Networking Dinner', 
    description: 'A grand reunion of CIT alumni from across the globe. Reconnect with old friends, interact with current students, and share your industry experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop',
    date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    location: 'CIT Grand Lawn',
    isActive: true
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('MongoDB connected.');
  await Event.deleteMany({});
  await Event.insertMany(eventsToSeed);
  console.log('Seeded Events Successfully!');
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
