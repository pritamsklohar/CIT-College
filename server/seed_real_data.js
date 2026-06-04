const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Settings = require('./models/Settings');
const Notice = require('./models/Notice');
const Stats = require('./models/Stats');
const Faculty = require('./models/Faculty');
const StaticPage = require('./models/StaticPage');
const HeroSlide = require('./models/HeroSlide');
const BoardMember = require('./models/BoardMember');
const dotenv = require('dotenv');

dotenv.config();

const seedRealData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for real-world seeding...');

    // 1. Clear existing data to avoid duplicates (optional, but good for fresh start)
    // await Notice.deleteMany({});
    // await Faculty.deleteMany({});
    // await BoardMember.deleteMany({});

    // 2. Admin (Only if not exists)
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await Admin.create({
        username: 'admin',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
      console.log('Admin seeded.');
    }

    // 3. Institutional Settings
    await Settings.findOneAndUpdate({}, { $set: {
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
    }}, { upsert: true });
    console.log('Institutional Settings updated.');

    // 4. College Statistics
    await Stats.findOneAndUpdate({}, { $set: {
      students: 2100,
      faculty: 150,
      placements: 1250,
      partners: 100
    }}, { upsert: true });
    console.log('College Stats updated.');

    // 5. Vision & Mission (Static Pages)
    const visionContent = `
      <h3 class="text-2xl font-bold mb-4">Our Vision</h3>
      <p>To produce globally competitive and ethically sound technical professionals contributing towards the building of a knowledge-based society.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4">Our Mission</h3>
      <ul class="list-disc pl-6 space-y-2">
        <li>To provide quality education through state-of-the-art infrastructure and faculty.</li>
        <li>To foster innovation and research mindset among students.</li>
        <li>To collaborate with industry for better placement and practical exposure.</li>
        <li>To instill moral values and professional ethics.</li>
      </ul>
    `;
    await StaticPage.findOneAndUpdate({ slug: 'vision-mission' }, { $set: {
      title: "Vision & Mission",
      content: visionContent,
      slug: 'vision-mission'
    }}, { upsert: true });

    // 6. Institute About
    const aboutContent = `
      <p>Chartered Institute of Technology (CIT), Abu Road, is a premier technical institution in Rajasthan, established with the aim of providing world-class engineering education. Affiliated with Bikaner Technical University (BTU) and Rajasthan Technical University (RTU), CIT has consistently maintained a record of academic excellence and high placements.</p>
      <p class="mt-4">Located in the serene surroundings of Mt. Road, Abu Road, our campus provides the perfect environment for learning and personal growth. With over 18 years of excellence, we have nurtured thousands of engineering professionals who are now leading in top global companies.</p>
    `;
    await StaticPage.findOneAndUpdate({ slug: 'institute' }, { $set: {
      title: "About The Institute",
      content: aboutContent,
      slug: 'institute'
    }}, { upsert: true });

    // 7. Chairman Profile
    const chairmanContent = `
      <p>Welcome to Chartered Institute of Technology. Our goal is to empower students with technical knowledge and professional skills that make them industry-ready from day one. We believe in holistic development where academic rigor is balanced with extracurricular excellence.</p>
      <p class="mt-4">As the Chairman, I am proud to see our students achieving great heights in their careers. We remain committed to providing the best resources, faculty, and industry connect to ensure your success.</p>
      <p class="mt-6 font-bold text-primary">Sh. Kishore Gandhi<br/>Chairman & Managing Director</p>
    `;
    await StaticPage.findOneAndUpdate({ slug: 'chairman-message' }, { $set: {
      title: "Chairman's Message",
      content: chairmanContent,
      slug: 'chairman-message'
    }}, { upsert: true });

    // 8. Principal Profile
    const principalContent = `
      <p>At CIT, we focus on creating an environment that encourages curiosity, innovation, and disciplined learning. Our curriculum is designed to meet the evolving needs of the global technology landscape.</p>
      <p class="mt-4">We take pride in our dedicated faculty and advanced laboratory facilities that provide students with a strong foundation in engineering principles and practical applications.</p>
      <p class="mt-6 font-bold text-primary">Dr. Rajnesh Yadav<br/>Principal, CIT Abu Road</p>
    `;
    await StaticPage.findOneAndUpdate({ slug: 'principal-profile' }, { $set: {
      title: "Principal's Profile",
      content: principalContent,
      slug: 'principal-profile'
    }}, { upsert: true });

    // 9. Faculty Seeding (Fresh batch)
    const facultyList = [
      { name: "Ms. Heena Bano", designation: "Assistant Professor", department: "Computer Science & Engineering", qualification: "M.Tech*, B.Tech.", email: "heena.bano@citabu.ac.in", isActive: true },
      { name: "Mr. Ashish Sen", designation: "Assistant Professor", department: "Computer Science & Engineering", qualification: "M.Tech*, B.Tech.", email: "ashish.sen@citabu.ac.in", isActive: true },
      { name: "Mr. Dinesh Rao", designation: "Assistant Professor", department: "Electrical Engineering", qualification: "M.Tech., B.Tech.", email: "dinesh.rao@citabu.ac.in", isActive: true },
      { name: "Mr. Rajesh Kumar", designation: "Assistant Professor", department: "Civil Engineering", qualification: "M.Tech*, B.Tech.", email: "rajesh.kumar@citabu.ac.in", isActive: true },
      { name: "Mr. Chetan Kumrawat", designation: "Assistant Professor", department: "Mechanical Engineering", qualification: "M.Tech., B.Tech.", email: "chetan.k@citabu.ac.in", isActive: true }
    ];
    for (const f of facultyList) {
      await Faculty.findOneAndUpdate({ email: f.email }, { $set: f }, { upsert: true });
    }

    // 10. Latest Notices
    const notices = [
      { title: "Announcement: Student Counsellors appointed for Academic Session 2025", category: "Important", date: new Date() },
      { title: "Last date for corrections in Degree (1st, 2nd & 3rd Convocation)", category: "Exam", date: new Date() },
      { title: "Mark Sheets & Migration Certificates available at University", category: "Important", date: new Date() }
    ];
    for (const n of notices) {
      const exists = await Notice.findOne({ title: n.title });
      if (!exists) await Notice.create(n);
    }

    // 11. Hero Slides
    const slides = [
      { title: "Welcome to CIT Abu Road", subtitle: "Excellence in Engineering Education", imageUrl: "https://citabu.ac.in/assets/img/slider/slider-1.jpg", link: "/admission", buttonText: "Apply Now", order: 1 },
      { title: "State of the Art Labs", subtitle: "Modern infrastructure for practical learning", imageUrl: "https://citabu.ac.in/assets/img/slider/slider-2.jpg", link: "/academics/departments/cs", buttonText: "Explore Courses", order: 2 }
    ];
    for (const s of slides) {
      await HeroSlide.findOneAndUpdate({ title: s.title }, { $set: s }, { upsert: true });
    }

    console.log('Seeding of real-world data completed successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedRealData();
