const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Settings = require('./models/Settings');
const Notice = require('./models/Notice');
const Stats = require('./models/Stats'); // Note: Stats model missing, let's create it later
const dotenv = require('dotenv');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Seed Admin
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await Admin.create({
        username: 'admin',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
      console.log('Admin seeded.');
    }

    // Seed Settings
    const settingsExists = await Settings.findOne();
    if (!settingsExists) {
      await Settings.create({
        siteName: "Chartered Institute of Technology",
        email: "citaburoad@gmail.com",
        phone1: "+91 99505 30301",
        phone2: "+91 95880 13851",
        phone3: "+91 98298 04013",
        address: "Village Danvav, Mt. Road, Abu Road, Dist. Sirohi, Rajasthan - 307510",
        facebookUrl: "https://www.facebook.com/citabuinfo/",
        twitterUrl: "https://twitter.com/citabuinfo",
        linkedinUrl: "https://in.linkedin.com/school/chartered-institute-of-technology/",
        instagramUrl: "https://www.instagram.com/info_cit/",
        youtubeUrl: "https://www.youtube.com/@citaburoad8124",
        admissionFormUrl: "https://forms.gle/KT257DVQEjc5HBTh9",
        brochureUrl: "https://citabu.ac.in/assets/pdf/CIT-COLLEGE-BROCHURE.pdf.pdf",
        trainingLetterUrl: "https://citabu.ac.in/assets/pdf/Training-Letter-2026.pdf"
      });
      console.log('Settings seeded.');
    }

    // Add more seed data here...

    console.log('Seeding completed.');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
