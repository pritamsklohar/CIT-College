import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import { motion } from 'framer-motion';
import { FaTrophy, FaChartLine, FaUserGraduate, FaHandshake, FaBullseye, FaLightbulb, FaCheckCircle, FaBuilding, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TNPCell = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [stats, setStats] = useState([
    { label: 'Highest Package', value: '18 LPA', icon: <FaTrophy /> },
    { label: 'Average Package', value: '4.5 LPA', icon: <FaChartLine /> },
    { label: 'Students Placed', value: '85%', icon: <FaUserGraduate /> },
    { label: 'Partnerships', value: '150+', icon: <FaHandshake /> },
  ]);

  useEffect(() => {
    API.get('/recruiters').then(res => setRecruiters(res.data.data)).catch(err => console.log(err));
    API.get('/settings').then(res => {
      if(res.data.data) {
        const s = res.data.data;
        setStats([
          { label: 'Highest Package', value: s.tnpHighestPackage || '18 LPA', icon: <FaTrophy /> },
          { label: 'Average Package', value: s.tnpAveragePackage || '4.5 LPA', icon: <FaChartLine /> },
          { label: 'Students Placed', value: s.tnpStudentsPlaced || '85%', icon: <FaUserGraduate /> },
          { label: 'Partnerships', value: s.tnpPartnerships || '150+', icon: <FaHandshake /> }
        ]);
      }
    }).catch(err => console.log(err));
  }, []);

  const objectives = [
    "Facilitating the Campus Recruitment Program for all disciplines.",
    "Initiating and nurturing contacts with leading organizations for campus visits.",
    "Matching the aspirations of the students with the needs of the Industry and assisting for Summer Industrial training.",
    "Providing counseling and guidance regarding visiting organizations, selection procedures, and preparation methods.",
    "A team of Student Placement Coordinators duly assist the T&P Office.",
    "Central computer facilities adequate for an online test for about 100 students at a time.",
    "Conference Hall, Seminar halls and Interview chambers equipped with audio-visual aids.",
    "Ensuring the best arrangement and hospitality for officials of the visiting companies."
  ];

  const studentTraining = [
    "Special campus training program for final year students in resume building, group discussions, general knowledge, etc.",
    "Mock interviews conducted by faculties of Humanities, T&P coordinators, H.O.D's, and Technical Experts.",
    "Short industrial tours to neighboring companies and extended visits to distant industries.",
    "Regular training classes at the Digital English Language Lab to improve communication skills.",
    "On campus training for competitive exams like GATE, SSC and Other Competition.",
    "Short-term training programs bridging university curriculum and industry needs (CAD/CAM, J2EE, AI&ML, IOT, Web Dev).",
    "Seminars and workshops conducted on entrepreneurship development."
  ];

  const trainingActivities = [
    "Create awareness about 'career planning' and 'career mapping'.",
    "Equip the student with life skills.",
    "Train the students on 'Personality development'.",
    "Organize Training Programs for Quantitative Aptitude, Logical & Verbal reasoning via external & in-house trainers.",
    "Train students through Mock Interviews to perform well as per the expectations of the corporate world.",
    "Train the students on group discussion techniques.",
    "Conduct online tests and written aptitude tests."
  ];

  const facilities = [
    "Spacious Seminar Halls to conduct Pre-Placement talks and written Tests.",
    "Group Discussion Rooms and Personal Interview Chambers.",
    "Student Volunteers for all possible arrangements during the campus drives.",
    "Arrangements for logistics.",
    "Stationery and Photocopying facilities.",
    "Arrangements for pool drives."
  ];

  const SectionHeading = ({ title }) => (
    <h2 className="text-2xl md:text-3xl font-black text-primary mb-8 flex items-center gap-3 uppercase">
      <span className="w-2 h-8 bg-accent inline-block rounded-full"></span> {title}
    </h2>
  );

  return (
    <div className="bg-white min-h-screen">
      <PageBanner title="Training & Placement Cell" breadcrumb="Home / Placement / T&P Cell" />

      {/* Stats */}
      <section className="py-6 md:py-12 bg-primary relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl"></div>
         <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative z-10">
            {stats.map((s, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                key={i} 
                className="text-center text-white p-2 md:p-4"
              >
                 <div className="text-2xl md:text-4xl text-accent mb-2 md:mb-3 flex justify-center">{s.icon}</div>
                 <div className="text-xl md:text-5xl font-black mb-1 md:mb-2">{s.value}</div>
                 <div className="text-[10px] md:text-sm font-bold uppercase tracking-widest opacity-80">{s.label}</div>
              </motion.div>
            ))}
         </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-20">
        
        {/* Top Split: Overview & Vision */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 mb-10 md:mb-20">
          <div>
            <SectionHeading title="Overview" />
            <p className="text-gray-600 font-semibold leading-relaxed text-sm md:text-lg mb-4 md:mb-6 text-justify">
              Chartered Institute of Technology Training, Placement and Development Cell play a critical role in networking graduating students with the industry. It prepares the students for the process of recruitment and simultaneously creates awareness among companies about the recruitment opportunities at CIT.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4 md:mb-6 text-justify">
              Potential recruiters are given structural support for scheduling interviews, hosting seminars, group discussions and written tests. At CIT, Aburoad we believe employability is more than a skill; it is an attitude, it is a practice. So, we instill this attitude through continuous training in learning skills, behavioral skills, and life skills in addition to aptitude and communication skills.
            </p>
            <div className="bg-orange-50 p-4 md:p-6 rounded-2xl border-l-4 border-accent">
               <p className="text-gray-700 italic font-medium text-xs md:text-base">
                 "This training starts in the first year of engineering itself. Specific Campus Recruitment Training programs are conducted in the third year, with an emphasis on problem solving, critical thinking, communication skills and team work."
               </p>
            </div>
          </div>

          <div>
             <div className="bg-primary p-6 md:p-10 rounded-3xl text-white shadow-2xl h-full flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition duration-700 hidden md:block">
                  <FaBullseye className="text-9xl" />
                </div>
                <h3 className="text-xl md:text-3xl font-black mb-4 md:mb-6 flex items-center gap-2 md:gap-3 relative z-10 text-accent">
                  VISION & MISSION
                </h3>
                <p className="leading-relaxed opacity-90 relative z-10 text-justify text-xs md:text-base mb-3 md:mb-4">
                  Placement training plays a major role in shaping up the career goals of students. It is the dream of every engineering student to get placed in a top organization visiting their campus for recruitment. Keeping this key aspect into consideration, it is realized that training is important for engineering students to enhance their employability skills and achieve good placement in various Industries.
                </p>
                <p className="leading-relaxed opacity-90 relative z-10 text-justify text-xs md:text-base">
                  At present, the competition for employment is increasing every day and placement has become a challenging task. Training of students and equipping them with life skills has become an important responsibility of the institution. Along with technical expertise, the development of a holistic personality is also necessary. To meet out these requirements, a fully-fledged training cell is operating in our college to enhance the capabilities of engineering graduates on par with the industry standards.
                </p>
             </div>
          </div>
        </div>

        {/* Four Columns / Grids for Lists */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 mb-10 md:mb-20">
          
          {/* Objectives */}
          <div>
            <SectionHeading title="Objectives" />
            <ul className="space-y-3 md:space-y-4">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 md:gap-4 p-2.5 md:p-4 bg-gray-50 rounded-2xl hover:bg-orange-50 transition border border-transparent hover:border-accent group">
                  <FaCheckCircle className="text-accent text-lg md:text-xl shrink-0 mt-0.5 md:mt-1" />
                  <span className="text-gray-700 font-medium group-hover:text-primary transition text-xs md:text-sm">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Training of Students */}
          <div>
            <SectionHeading title="Training of Students" />
            <ul className="space-y-3 md:space-y-4">
              {studentTraining.map((item, i) => (
                <li key={i} className="flex items-start gap-3 md:gap-4 p-2.5 md:p-4 bg-gray-50 rounded-2xl hover:bg-orange-50 transition border border-transparent hover:border-accent group">
                  <FaLightbulb className="text-accent text-lg md:text-xl shrink-0 mt-0.5 md:mt-1" />
                  <span className="text-gray-700 font-medium group-hover:text-primary transition text-xs md:text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Training Activities */}
          <div>
            <SectionHeading title="Training Activities" />
            <ul className="space-y-3 md:space-y-4">
              {trainingActivities.map((item, i) => (
                <li key={i} className="flex items-start gap-3 md:gap-4 p-2.5 md:p-4 bg-gray-50 rounded-2xl hover:bg-orange-50 transition border border-transparent hover:border-accent group">
                  <FaChartLine className="text-accent text-lg md:text-xl shrink-0 mt-0.5 md:mt-1" />
                  <span className="text-gray-700 font-medium group-hover:text-primary transition text-xs md:text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Facilities & Placement Services */}
          <div className="space-y-8 md:space-y-12">
            <div>
              <SectionHeading title="Facilities for Recruiters" />
              <p className="text-gray-600 mb-4 md:mb-6 font-medium italic text-xs md:text-sm">CIT provides all the necessary facilities to recruiters for their placement drives at the campus:</p>
              <ul className="space-y-3 md:space-y-4">
                {facilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 md:gap-4 p-2.5 md:p-4 bg-gray-50 rounded-2xl hover:bg-orange-50 transition border border-transparent hover:border-accent group">
                    <FaBuilding className="text-accent text-lg md:text-xl shrink-0 mt-0.5 md:mt-1" />
                    <span className="text-gray-700 font-medium group-hover:text-primary transition text-xs md:text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading title="Placement Services" />
              <div className="bg-gray-100 p-4 md:p-8 rounded-3xl border-l-4 border-primary">
                <p className="text-gray-700 font-medium leading-relaxed text-xs md:text-sm">
                  Internships and placements are ensured towards the end of the final year, a campaign is launched to attract prospective recruiters. Recruitment advertisements are also collected, after thoroughly checking eligibility conditions. For the convenience of students, recruitment application forms are supplied for free of cost.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Contact & Recruiters Grid */}
        <div className="grid lg:grid-cols-3 gap-8 md:gap-16">
          
          {/* Contact Card */}
          <div className="lg:col-span-1">
             <div className="bg-primary p-6 md:p-10 rounded-3xl text-white shadow-2xl sticky top-24">
                <h4 className="text-xl md:text-2xl font-black mb-4 md:mb-8 border-b-2 border-accent pb-3 md:pb-4 inline-block uppercase flex items-center gap-2 md:gap-3">
                  <FaHandshake className="text-accent" /> Get In Touch
                </h4>
                
                <div className="space-y-4 md:space-y-8">
                   <div>
                      <p className="text-[10px] md:text-sm font-bold text-accent uppercase tracking-widest mb-1">Head – T&P</p>
                      <p className="text-lg md:text-2xl font-black">Mrs. Anu Badola</p>
                   </div>
                   
                   <div className="flex items-center gap-3 md:gap-4 group">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-accent transition shrink-0">
                         <FaPhoneAlt className="text-base md:text-xl" />
                      </div>
                      <div>
                         <p className="text-[10px] md:text-xs font-bold opacity-70 uppercase tracking-wider mb-0.5">Contact</p>
                         <a href="tel:+919166266888" className="font-bold text-sm md:text-lg hover:text-accent transition">+91-9166266888</a>
                      </div>
                   </div>

                   <div className="flex items-center gap-3 md:gap-4 group">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-accent transition shrink-0">
                         <FaEnvelope className="text-base md:text-xl" />
                      </div>
                      <div className="break-all min-w-0">
                         <p className="text-[10px] md:text-xs font-bold opacity-70 uppercase tracking-wider mb-0.5">Email</p>
                         <a href="mailto:Placements@citabu.ac.in" className="font-bold text-xs md:text-sm block hover:text-accent transition truncate">Placements@citabu.ac.in</a>
                         <a href="mailto:anubadola@citabu.ac.in" className="font-bold text-xs md:text-sm block hover:text-accent transition truncate">anubadola@citabu.ac.in</a>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Recruiters Display */}
          <div className="lg:col-span-2">
             <h4 className="text-2xl md:text-3xl font-black text-primary mb-6 md:mb-8 border-b-2 border-accent pb-2 inline-block uppercase">Our Top Recruiters</h4>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4">
                {recruiters.map((r, i) => (
                  <div key={i} className="aspect-square bg-gray-50 p-3 md:p-6 rounded-2xl border border-gray-100 flex items-center justify-center hover:shadow-xl hover:border-accent transition group bg-white">
                     <img src={r.logoUrl} alt={r.companyName} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition duration-500 scale-90 group-hover:scale-100" />
                  </div>
                ))}
             </div>
             
             <div className="mt-12 flex justify-center">
                <Link to="/student/alumni" className="bg-accent text-white px-8 py-4 rounded-xl font-black hover:bg-primary transition shadow-xl uppercase tracking-widest text-sm flex items-center gap-3">
                   <FaUserGraduate /> Read Success Stories
                </Link>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TNPCell;
