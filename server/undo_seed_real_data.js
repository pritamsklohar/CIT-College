const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Settings = require('./models/Settings');
const Notice = require('./models/Notice');
const Stats = require('./models/Stats');
const Faculty = require('./models/Faculty');
const StaticPage = require('./models/StaticPage');
const HeroSlide = require('./models/HeroSlide');
const dotenv = require('dotenv');

dotenv.config();

const undoSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB to undo real-world seeding...');

    // 1. Remove Admin
    await Admin.deleteOne({ email: process.env.ADMIN_EMAIL });
    console.log('Admin removed.');

    // 2. Remove Institutional Settings
    await Settings.deleteOne({ siteName: "Chartered Institute of Technology" });
    console.log('Institutional Settings removed.');

    // 3. Remove College Statistics
    await Stats.deleteOne({ students: 2100, faculty: 150 });
    console.log('College Stats removed.');

    // 4. Remove Static Pages
    await StaticPage.deleteMany({ slug: { $in: ['vision-mission', 'institute', 'chairman-message', 'principal-profile'] } });
    console.log('Static pages removed.');

    // 5. Remove Faculty
    const facultyEmails = [
      "heena.bano@citabu.ac.in", "ashish.sen@citabu.ac.in",
      "dinesh.rao@citabu.ac.in", "rajesh.kumar@citabu.ac.in", "chetan.k@citabu.ac.in"
    ];
    await Faculty.deleteMany({ email: { $in: facultyEmails } });
    console.log('Faculty seeded data removed.');

    // 6. Remove Notices
    const noticeTitles = [
      "Announcement: Student Counsellors appointed for Academic Session 2025",
      "Last date for corrections in Degree (1st, 2nd & 3rd Convocation)",
      "Mark Sheets & Migration Certificates available at University"
    ];
    await Notice.deleteMany({ title: { $in: noticeTitles } });
    console.log('Notices removed.');

    // 7. Remove Hero Slides
    await HeroSlide.deleteMany({ title: { $in: ["Welcome to CIT Abu Road", "State of the Art Labs"] } });
    console.log('Hero Slides removed.');

    console.log('Undo completed successfully!');
    process.exit();
  } catch (err) {
    console.error('Undo failed:', err);
    process.exit(1);
  }
};

undoSeed();