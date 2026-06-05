import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../../api/axios';
import PageBanner from '../../../components/common/PageBanner';
import { motion } from 'framer-motion';
import { FaMicroscope, FaLightbulb, FaUserTie, FaCheckCircle } from 'react-icons/fa';

const DepartmentPage = () => {
  const { slug } = useParams();
  const [dept, setDept] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [deptRes, facultyRes] = await Promise.all([
          API.get(`/departments/${slug}`),
          API.get(`/faculty?department=${slug.toUpperCase()}`)
        ]);
        setDept(deptRes.data.data);
        setFaculty(facultyRes.data.data);
      } catch (err) {}
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) return <div className="py-20 text-center font-bold animate-pulse text-primary uppercase tracking-widest">Loading Department...</div>;
  if (!dept) return <div className="py-20 text-center text-red-500 font-bold">Department not found</div>;

  return (
    <div className="bg-white">
      <PageBanner title={`${dept.name} Department`} breadcrumb={`Academics / Departments / ${dept.name}`} />

      {/* Intro & HOD */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-start">
            <div className="lg:w-2/3">
               <h2 className="text-2xl md:text-3xl font-black text-primary mb-4 md:mb-6 flex items-center gap-2 uppercase">
                  <span className="w-1.5 h-6 md:h-8 bg-accent inline-block"></span> Overview
               </h2>
               <div 
                 className="text-gray-600 leading-relaxed text-sm md:text-lg rich-text-content"
                 dangerouslySetInnerHTML={{ __html: dept.description }}
               />
               
               <div className="mt-6 md:mt-12 grid md:grid-cols-2 gap-4 md:gap-8">
                  <div className="bg-primary bg-opacity-5 p-4 md:p-8 rounded-3xl border-l-4 border-primary shadow-sm">
                     <h4 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-4 flex items-center gap-2 italic uppercase">Vision</h4>
                     <p className="text-gray-600 font-semibold italic text-xs md:text-base">"{dept.vision}"</p>
                  </div>
                  <div className="bg-orange-50 p-4 md:p-8 rounded-3xl border-l-4 border-accent shadow-sm">
                     <h4 className="text-lg md:text-xl font-bold text-accent mb-2 md:mb-4 flex items-center gap-2 italic uppercase">Mission</h4>
                     <p className="text-gray-600 font-semibold italic text-xs md:text-base">"{dept.mission}"</p>
                  </div>
               </div>
            </div>

            <div className="lg:w-1/3 w-full">
               <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border-t-8 border-primary relative overflow-hidden group">
                  <h3 className="text-lg md:text-xl font-black text-primary mb-4 md:mb-8 border-b-2 border-accent pb-2 inline-block uppercase">Message from HOD</h3>
                  <div className="flex flex-col items-center text-center">
                     <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 md:mb-6 border-4 border-accent shadow-xl">
                        <img src={dept.hod?.imageUrl || 'https://via.placeholder.com/150'} alt={dept.hod?.name} className="w-full h-full object-cover" />
                     </div>
                     <h4 className="font-bold text-base md:text-lg text-primary">{dept.hod?.name}</h4>
                     <p className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 md:mb-4 italic">Head of Department</p>
                     <p className="text-gray-600 text-xs md:text-sm italic leading-relaxed">"{dept.hod?.message}"</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Labs */}
      <section className="py-10 md:py-20 bg-gray-50">
         <div className="container mx-auto px-4 text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-black text-primary uppercase">Specialized <span className="text-accent">Labs</span></h2>
            <div className="w-16 md:w-24 h-1 bg-accent mx-auto mt-3 md:mt-4 rounded-full"></div>
         </div>
         
         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {dept.labs?.map((lab, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group"
              >
                 <div className="h-40 md:h-56 relative overflow-hidden">
                    <img src={lab.imageUrl || 'https://via.placeholder.com/400x300?text=Lab'} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                    <div className="absolute top-3 left-3 bg-primary text-white p-2.5 md:p-3 rounded-xl shadow-xl text-sm md:text-base"><FaMicroscope /></div>
                 </div>
                 <div className="p-6 md:p-8">
                    <h4 className="font-bold text-lg md:text-xl text-primary mb-2 md:mb-3">{lab.name}</h4>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{lab.description}</p>
                 </div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Department Faculty */}
      <section className="py-10 md:py-20">
         <div className="container mx-auto px-4 text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-black text-primary uppercase">Department <span className="text-accent">Faculty</span></h2>
            <div className="w-16 md:w-24 h-1 bg-accent mx-auto mt-3 md:mt-4 rounded-full"></div>
         </div>

         <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {faculty.map((member, index) => (
              <div key={member._id} className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all text-center">
                 <img src={member.imageUrl || 'https://via.placeholder.com/150'} className="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-3 md:mb-4 object-cover border-2 border-accent p-1 shadow-md" />
                 <h4 className="font-bold text-primary text-sm md:text-base truncate">{member.name}</h4>
                 <p className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 md:mb-2 truncate">{member.designation}</p>
                 <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase truncate">{member.qualification}</p>
              </div>
            ))}
         </div>
         <div className="mt-8 md:mt-12 text-center text-sm md:text-base">
            <Link to="/academics/faculty-profile" className="text-primary font-bold hover:text-accent border-b-2 border-accent pb-1">View Detailed Faculty Profiles →</Link>
         </div>
      </section>

      {/* Highlights */}
      <section className="py-10 md:py-20 bg-primary text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 -translate-y-1/2"></div>
         <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
               <div className="lg:w-1/2">
                  <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-8 uppercase tracking-wider">Key <span className="text-accent">Highlights</span></h2>
                  <div className="space-y-4 md:space-y-6">
                     {dept.highlights?.map((h, i) => (
                        <div key={i} className="flex items-start gap-3 md:gap-4">
                           <div className="text-accent text-xl md:text-2xl shrink-0"><FaCheckCircle /></div>
                           <p className="text-sm md:text-lg font-semibold opacity-90">{h}</p>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="lg:w-1/2 w-full">
                  <img src={dept.imageUrl || 'https://citabu.ac.in/assets/img/campus/campus-1.jpg'} className="rounded-3xl shadow-2xl border-4 border-white border-opacity-10 w-full object-cover" />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default DepartmentPage;
