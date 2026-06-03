const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Recognition = require('./models/Recognition');

const recognitionsToSeed = [
  {
    title: 'All India Council for Technical Education (AICTE)',
    description: 'Chartered Institute of Technology is approved with All India Council for Technical Education and this information is available on the Website of All India Council for Technical Education.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png',
    websiteUrl: 'https://www.aicte-india.org',
    order: 1
  },
  {
    title: 'Bikaner Technical University, Kota (BTU)',
    description: 'Chartered Institute of Technology is affiliated by Bikaner Technical University and this information is available on the Website of Bikaner Technical University.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Bikaner_Technical_University_logo.png',
    websiteUrl: 'http://btu.ac.in',
    order: 2
  },
  {
    title: 'Indian Society for Technical Education (ISTE)',
    description: 'Chartered Institute of Technology is approved by Indian Society for Technical Education and this information is available on the Website of Indian Society for Technical Education.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e4/ISTE_logo.png',
    websiteUrl: 'http://www.isteonline.in',
    order: 3
  },
  {
    title: 'International Accreditation Organization (IAO)',
    description: 'Chartered Institute of Technology is approved by International Accreditation Organization and this information is available on the Website of International Accreditation Organization.',
    logoUrl: 'https://www.iao.org/images/logo.png',
    websiteUrl: 'https://www.iao.org',
    order: 4
  },
  {
    title: 'National Programme on Technology Enhanced Learning (NPTEL)',
    description: 'Chartered Institute of Technology is affiliated by National Programme on Technology Enhanced Learning and this information is available on the Website of NPTEL.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/NPTEL_Logo.png',
    websiteUrl: 'https://nptel.ac.in',
    order: 5
  },
  {
    title: 'Rajasthan Technical University, Kota (RTU)',
    description: 'Chartered Institute of Technology is affiliated with Rajasthan Technical University and this information is available on the Website of Rajasthan Technical University.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/2/27/Rajasthan_Technical_University_logo.png',
    websiteUrl: 'http://www.rtu.ac.in',
    order: 6
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/cit').then(async () => {
  console.log('MongoDB connected for seeding recognitions.');
  await Recognition.deleteMany({});
  await Recognition.insertMany(recognitionsToSeed);
  console.log('Seeded Recognitions Successfully!');
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
