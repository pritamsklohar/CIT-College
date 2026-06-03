const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Recruiter = require('./models/Recruiter');

const recruitersToSeed = [
  { companyName: 'Google', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', sector: 'Technology' },
  { companyName: 'Microsoft', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg', sector: 'Technology' },
  { companyName: 'Amazon', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', sector: 'Technology' },
  { companyName: 'HCL', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/HCL_Technologies_logo.svg', sector: 'Technology' },
  { companyName: 'Infosys', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg', sector: 'Technology' },
  { companyName: 'Accenture', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg', sector: 'Consulting' },
  { companyName: 'IBM', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg', sector: 'Technology' },
  { companyName: 'Capgemini', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg', sector: 'Consulting' },
  { companyName: 'Cognizant', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg', sector: 'Technology' },
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('MongoDB connected.');
  await Recruiter.deleteMany({});
  await Recruiter.insertMany(recruitersToSeed);
  console.log('Seeded Recruiters Successfully!');
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
