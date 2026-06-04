import React from 'react';
import PageBanner from '../../components/common/PageBanner';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaShieldAlt, FaAward, FaCalendarCheck, FaBookOpen } from 'react-icons/fa';
import nccLogo from '../../assets/ncc_logo.png';
import nccDrill from '../../assets/ncc_drill.png';
import nccCamp from '../../assets/ncc_camp.png';

const NCC = () => {
  const aims = [
    "To develop character, comradeship, discipline, leadership, secular outlook, spirit of adventure and the ideals of selfless service amongst the youth of the country.",
    "To create a human resource of organized, trained and motivated youth, to provide leadership in all walks of life and be always available for the service of the nation.",
    "To provide a suitable environment to motivate the youth to take up a career in the Armed Forces."
  ];

  const trainings = [
    { title: "Drill & Parade", desc: "Instilling discipline, smartness, teamwork, and immediate response to commands through intensive parade grounds training." },
    { title: "Weapon Training", desc: "Safe handling, stripping, assembling, and target shooting with rifles, helping cadets build focus and coordination." },
    { title: "Social Service", desc: "Participating in blood donation drives, tree plantation campaigns, disaster relief, and national integration camps." },
    { title: "Adventure Activities", desc: "Trekking, rock climbing, parasailing, and survival camps designed to build raw leadership and eliminate fear." }
  ];

  const benefits = [
    { title: "Defense Entry (IMA/OTA)", desc: "Direct SSB Interview entry for NCC 'C' certificate holders with 'A' or 'B' grade, skipping the UPSC written exams." },
    { title: "State Police Bonus", desc: "Preference marks and weightage given in recruitment exams for police forces, paramilitary forces, and public sectors." },
    { title: "Academic Weightage", desc: "Bonus marks in university admissions, postgraduate programs, and scholarships." },
    { title: "Corporate Edge", desc: "Corporates value the discipline, leadership, and crisis management skills built through NCC training." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageBanner title="National Cadet Corps (NCC)" breadcrumb="Home / Student Corner / NCC" />

      <div className="container mx-auto px-4 py-10 md:py-20">
        
        {/* Intro Section */}
        <div className="grid lg:grid-cols-12 gap-8 md:gap-16 items-center mb-12 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl group-hover:scale-110 transition duration-700"></div>
              <img 
                src={nccLogo} 
                alt="NCC National Logo" 
                className="h-48 w-48 md:h-80 md:w-80 object-contain relative z-10 filter drop-shadow-2xl animate-float"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 space-y-4 md:space-y-6"
          >
            <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-accent uppercase bg-orange-50 px-3 py-1.5 md:px-4 md:py-2 rounded-lg inline-block border border-accent/20">
              Unity and Discipline
            </span>
            <h2 className="text-2xl md:text-5xl font-black text-primary uppercase leading-tight">
              NCC at CIT Abu Road
            </h2>
            <div className="w-16 md:w-20 h-1 md:h-1.5 bg-accent rounded-full mb-4 md:mb-6"></div>
            <p className="text-gray-600 font-semibold leading-relaxed text-sm md:text-lg text-justify">
              The National Cadet Corps (NCC) is the youth wing of the Indian Armed Forces. At Chartered Institute of Technology, our NCC unit is dedicated to grooming the youth of our country into disciplined and patriotic citizens. We provide students with extensive training, instill leadership qualities, and prepare them for selfless service to the nation.
            </p>
            <p className="text-gray-500 leading-relaxed text-xs md:text-sm text-justify">
              Cadets are given basic military training in small arms and parade. The training program is designed to develop character, comrade-ship, discipline, a secular outlook, the spirit of adventure and ideals of selfless service. Join our cadet corps to unleash your potential and serve the motherland!
            </p>
          </motion.div>
        </div>

        {/* Core Aims (Three columns) */}
        <div className="bg-primary text-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden mb-12 md:mb-24">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16 relative z-10">
            <h3 className="text-accent text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-2 md:mb-3">Core Values</h3>
            <h2 className="text-2xl md:text-4xl font-black uppercase">Aims of NCC</h2>
            <div className="w-12 h-0.5 bg-accent mx-auto mt-3 md:mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative z-10">
            {aims.map((aim, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition duration-300 flex flex-col gap-3 md:gap-4"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-accent text-white flex items-center justify-center text-lg md:text-xl shadow-lg shrink-0">
                  <FaShieldAlt />
                </div>
                <p className="text-xs md:text-sm font-semibold leading-relaxed text-gray-200">{aim}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Training & Drill Section */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 md:space-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-black text-primary uppercase flex items-center gap-2 md:gap-3">
              <span className="w-1.5 h-6 md:w-2 md:h-8 bg-accent inline-block rounded-full"></span> Training Curriculum
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {trainings.map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-4 md:p-6 rounded-2xl border border-transparent hover:border-accent hover:bg-white hover:shadow-xl transition duration-300">
                  <h4 className="font-bold text-primary text-sm md:text-lg mb-1 md:mb-2 uppercase tracking-wide flex items-center gap-1.5 md:gap-2">
                    <span className="w-1 h-3 md:w-1.5 md:h-4 bg-accent inline-block"></span> {item.title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-gray-500 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[250px] md:h-[400px] w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-gray-50"
          >
            <img 
              src={nccDrill} 
              alt="NCC Cadet Drill Parade at CIT" 
              className="h-full w-full object-cover group-hover:scale-105 transition duration-[1500ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-4 md:p-8">
              <div>
                <span className="text-[10px] md:text-xs font-black uppercase text-accent tracking-widest block mb-0.5 md:mb-1">Weekly Parades</span>
                <h4 className="text-white font-black text-base md:text-xl uppercase">Drill & Disciplinary Parades</h4>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Camps & Activities Section */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative h-[250px] md:h-[400px] w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-gray-50"
          >
            <img 
              src={nccCamp} 
              alt="NCC Camp Adventure Training" 
              className="h-full w-full object-cover group-hover:scale-105 transition duration-[1500ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-4 md:p-8">
              <div>
                <span className="text-[10px] md:text-xs font-black uppercase text-accent tracking-widest block mb-0.5 md:mb-1">Adventure & Camps</span>
                <h4 className="text-white font-black text-base md:text-xl uppercase">Combined Annual Training Camps (CATC)</h4>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-4 md:space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-black text-primary uppercase flex items-center gap-2 md:gap-3">
              <span className="w-1.5 h-6 md:w-2 md:h-8 bg-accent inline-block rounded-full"></span> Camp Deployments
            </h2>
            <p className="text-gray-600 font-semibold leading-relaxed text-justify text-sm md:text-base">
              Annual Camps are a critical component of NCC curriculum. Every cadet undergoes practical simulations in survival, obstacle course clearing, guard duties, and firing range tests. 
            </p>
            <div className="space-y-3 md:space-y-4">
              <div className="flex gap-3 md:gap-4 items-start p-3 md:p-4 bg-orange-50/50 rounded-2xl border border-accent/10">
                <div className="bg-accent text-white p-2.5 md:p-3 rounded-xl text-base md:text-lg shrink-0"><FaCalendarCheck /></div>
                <div>
                  <h4 className="font-bold text-primary uppercase text-xs md:text-sm tracking-wider">Annual Training Camps (ATC)</h4>
                  <p className="text-[10px] md:text-xs text-gray-500 font-semibold mt-0.5 md:mt-1">7 to 10 days of intense outdoor living, simulated army schedules, and weapon training.</p>
                </div>
              </div>
              <div className="flex gap-3 md:gap-4 items-start p-3 md:p-4 bg-orange-50/50 rounded-2xl border border-accent/10">
                <div className="bg-accent text-white p-2.5 md:p-3 rounded-xl text-base md:text-lg shrink-0"><FaBookOpen /></div>
                <div>
                  <h4 className="font-bold text-primary uppercase text-xs md:text-sm tracking-wider">National Integration Camps (NIC)</h4>
                  <p className="text-[10px] md:text-xs text-gray-500 font-semibold mt-0.5 md:mt-1">Fostering unity and cultural integration by gathering cadets from all states in India.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12 md:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
            <h3 className="text-accent text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-2 md:mb-3">Incentives</h3>
            <h2 className="text-2xl md:text-4xl font-black text-primary uppercase">Benefits of 'C' Certificate</h2>
            <div className="w-12 h-0.5 bg-accent mx-auto mt-3 md:mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-primary shadow-xl hover:shadow-2xl transition duration-300 relative group flex flex-col gap-3 md:gap-4"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-orange-50 text-accent flex items-center justify-center text-lg md:text-xl group-hover:bg-accent group-hover:text-white transition shadow shrink-0">
                  <FaAward />
                </div>
                <h4 className="font-bold text-primary text-sm md:text-base uppercase tracking-wide mt-1 md:mt-2">{item.title}</h4>
                <p className="text-[10px] md:text-xs text-gray-400 font-bold leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enrollment Card */}
        <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-10 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-center max-w-4xl mx-auto">
           <h3 className="text-xl md:text-2xl font-black text-primary uppercase mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
             <FaGraduationCap className="text-accent" /> How to Enroll
           </h3>
           <p className="text-gray-600 font-semibold leading-relaxed text-xs md:text-sm mb-4 md:mb-6">
              Enrollment in the CIT NCC unit begins in the first month of the academic session. Interested students must undergo physical fitness tests, basic interview round, and standard selection procedures.
           </p>
           <ul className="space-y-2.5 md:space-y-3 text-[10px] md:text-xs text-gray-500 font-bold">
             <li className="flex items-center gap-2 md:gap-3"><span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent shrink-0"></span> Open to 1st year and 2nd year students of all engineering departments.</li>
             <li className="flex items-center gap-2 md:gap-3"><span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent shrink-0"></span> Cadets must commit to a 2-year (B certificate) or 3-year (C certificate) training schedule.</li>
             <li className="flex items-center gap-2 md:gap-3"><span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent shrink-0"></span> Parades are held on weekends to avoid conflict with standard academic hours.</li>
           </ul>
        </div>

      </div>
    </div>
  );
};

export default NCC;
