const mongoose = require('mongoose');

const objectiveSchema = new mongoose.Schema({
  icon: { type: String, default: 'FaNetworkWired' },
  title: { type: String, required: true },
  desc: { type: String, required: true }
});

const alumniPageSchema = new mongoose.Schema({
  pageTitle: { type: String, default: 'CIT Alumni Cell' },
  pageSubtitle: { type: String, default: 'Bridging the gap between our glorious past and a promising future. Stay connected with your alma mater.' },
  heroImageUrl: { type: String, default: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2000&auto=format&fit=crop' },
  aboutTitle: { type: String, default: 'About the Association' },
  aboutContent: { type: String, default: 'The CIT Alumni Association is a vibrant global network of professionals who have graduated from the Chartered Institute of Technology. Our alumni hold prestigious positions in top multinational corporations, government sectors, and successful startups worldwide.\n\nThe Alumni Cell serves as a bridge, fostering continuous interaction between the institute, current students, and our esteemed graduates. Through guest lectures, industry mentorship programs, and grand reunion events, we ensure the CIT legacy continues to thrive.' },
  objectives: {
    type: [objectiveSchema],
    default: [
      {
        icon: 'FaNetworkWired',
        title: "Strong Networking",
        desc: "Build and maintain a lifelong relationship between the institute and its alumni."
      },
      {
        icon: 'FaHandsHelping',
        title: "Student Mentorship",
        desc: "Provide career guidance, industry insights, and mentorship to current students."
      },
      {
        icon: 'FaUserTie',
        title: "Placements & Internships",
        desc: "Facilitate recruitment opportunities and industry connections for fresh graduates."
      },
      {
        icon: 'FaGraduationCap',
        title: "Alumni Meets",
        desc: "Organize annual reunions, chapter meets, and special events across the globe."
      }
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model('AlumniPage', alumniPageSchema);
