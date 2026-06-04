import React from 'react';
import PageBanner from '../../components/common/PageBanner';
import { motion } from 'framer-motion';
import { FaComments, FaUserTie, FaPencilAlt, FaBuilding, FaUserFriends, FaDesktop, FaMicrophoneAlt, FaBrain } from 'react-icons/fa';

const CRTProgram = () => {
  const aptitudePrograms = [
    {
      title: "1. Communication Skills Training to FE Students",
      icon: <FaComments />,
      points: [
        "Demo of various agencies to students.",
        "Finalization of agency, fees and terms of payment.",
        "Time table for training.",
        "Monitoring of the program through CPDC cell.",
        "Feedback about the program from students and corrective actions accordingly."
      ]
    },
    {
      title: "2. Soft Skills Training to Second Year Students",
      icon: <FaUserTie />,
      points: [
        "Demo of various agencies to students.",
        "Finalization of agency, fees and terms of payment.",
        "Time table for training.",
        "Monitoring of the program through CPDC cell.",
        "Feedback about the program from students and corrective actions accordingly."
      ]
    },
    {
      title: "3. Aptitude Training to Third Year Students",
      icon: <FaPencilAlt />,
      points: [
        "Demo of various agencies to students.",
        "Finalization of agency, fees and terms of payment.",
        "Time table for training.",
        "Monitoring of the program through CPDC cell.",
        "Feedback about the program from students and corrective actions accordingly."
      ]
    }
  ];

  const additionalActivities = [
    { title: "Interview Preparation Session for Final Year Students by TCS", icon: <FaBuilding /> },
    { title: "Mock GD / PI Sessions for Final Year Students", icon: <FaUserFriends /> },
    { title: "Mock Aptitude Tests (Written and Online) for Final Year Students", icon: <FaDesktop /> },
    { title: "Language Lab for Improving Language Skills", icon: <FaMicrophoneAlt /> }
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageBanner title="Campus Recruitment Training (CRT)" breadcrumb="Home / Placement / CRT Program" />

      <div className="container mx-auto px-4 py-10 md:py-20">
        
        {/* Top Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-12 md:mb-24">
          
          {/* Aptitude & GD Section */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-primary mb-6 md:mb-10 flex items-center gap-3 uppercase">
              <span className="w-2 h-8 md:w-2 md:h-10 bg-accent inline-block rounded-full"></span> Aptitude / GD
            </h2>
            
            <div className="space-y-6 md:space-y-8">
              {aptitudePrograms.map((prog, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  key={i} 
                  className="bg-gray-50 rounded-3xl p-6 md:p-8 border border-transparent hover:border-accent hover:shadow-xl transition group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-150 group-hover:opacity-10 transition duration-700">
                     <span className="text-8xl">{prog.icon}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-gray-800 mb-4 md:mb-6 flex items-center gap-3 md:gap-4 relative z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:bg-accent transition text-sm md:text-base">
                      {prog.icon}
                    </div>
                    <span>{prog.title}</span>
                  </h3>
                  <ul className="space-y-3 relative z-10">
                    {prog.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></span>
                        <span className="text-gray-600 font-medium text-sm md:text-base">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 md:mt-10 space-y-4">
               {additionalActivities.map((act, i) => (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   key={i} 
                   className="bg-white p-4 md:p-5 rounded-2xl shadow-md border-l-4 border-primary flex items-center gap-3 md:gap-4 hover:border-accent hover:shadow-lg transition group"
                 >
                   <div className="text-xl md:text-2xl text-accent group-hover:scale-110 transition shrink-0">{act.icon}</div>
                   <h4 className="font-bold text-gray-700 text-sm md:text-base">{act.title}</h4>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Personality Development Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-primary p-6 md:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition duration-1000 group-hover:rotate-12">
                 <FaBrain className="text-[250px]" />
               </div>
               
               <h2 className="text-xl md:text-4xl font-black text-accent mb-6 md:mb-8 flex items-center gap-3 md:gap-4 relative z-10">
                 <FaBrain className="text-3xl md:text-5xl shrink-0" />
                 Personality Development
               </h2>
               
               <div className="space-y-4 md:space-y-6 relative z-10 text-justify text-sm md:text-lg leading-relaxed text-gray-100">
                 <p>
                   A unique Personality Development and Memory Training programme was conducted in Chartered Institute of Technology. The Trainer came to the campus and enlightened the students of B. Tech Final Year (All Branches). Interaction with the students during the programme, In his speech, he gave some ideas about how to shine in the competitive world, skill in communication in English, positive thinking, time management, leadership qualities etc. He mentioned that instant decision making depends upon the situation concerned.
                 </p>
                 <p className="p-4 md:p-6 bg-white/10 rounded-2xl border-l-4 border-accent italic">
                   He also explained memory skills. He gave suggestions to the students about how to memorise syllabus topics. He insisted on the development of the skills and explained the students about self introduction, body language, speaking English effectively also made the students drilled about certain aspects of errors in English.
                 </p>
                 <p>
                   Finally during the interactive session, students took the opportunity to ask their doubts and got it clarified by the Resource person. The Chairman, the Director and the Principal were present during the programme. They also motivated the students to acquire the memory development capacity. HODs of all branches, Faculty and staff participated in the programme.
                 </p>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CRTProgram;
