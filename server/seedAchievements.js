const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Achievement = require('./models/Achievement');

dotenv.config();

const achievements = [
  {
    studentName: 'Aarav Patel',
    title: 'Winner - National Hackathon 2024',
    description: 'Developed an innovative AI-based solution for agriculture, winning first prize against 500+ teams nationwide.',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1740&auto=format&fit=crop',
    date: new Date('2024-03-15'),
    category: 'Technical',
    isActive: true
  },
  {
    studentName: 'Priya Sharma',
    title: 'Gold Medalist - Inter-University Athletics',
    description: 'Secured the gold medal in the 100m sprint and long jump at the State Level University Games.',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1738&auto=format&fit=crop',
    date: new Date('2024-02-10'),
    category: 'Sports',
    isActive: true
  },
  {
    studentName: 'Vikram Singh',
    title: 'Published Research Paper in IEEE',
    description: 'Co-authored a groundbreaking paper on Quantum Cryptography published in the IEEE Transactions journal.',
    imageUrl: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1740&auto=format&fit=crop',
    date: new Date('2023-11-20'),
    category: 'Academic',
    isActive: true
  },
  {
    studentName: 'CIT Drama Club',
    title: 'Best Performance - Zonal Youth Festival',
    description: 'The college dramatics society won the Best Theatrical Performance award at the Zonal Youth Fest.',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d0330a15233c?q=80&w=1738&auto=format&fit=crop',
    date: new Date('2023-12-05'),
    category: 'Cultural',
    isActive: true
  },
  {
    studentName: 'Neha Gupta',
    title: 'Smart India Hackathon Finalist',
    description: 'Led the team to the grand finals of SIH with a prototype for smart traffic management.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1740&auto=format&fit=crop',
    date: new Date('2024-04-02'),
    category: 'Technical',
    isActive: true
  }
];

const seedAchievements = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    await Achievement.deleteMany();
    console.log('Achievements cleared');

    await Achievement.insertMany(achievements);
    console.log('Achievements seeded successfully');

    process.exit();
  } catch (error) {
    console.error('Error with data import:', error);
    process.exit(1);
  }
};

seedAchievements();
