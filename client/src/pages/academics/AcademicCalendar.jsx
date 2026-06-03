import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaFilePdf, FaDownload } from 'react-icons/fa';

const AcademicCalendar = () => {
  const [content, setContent] = useState('');
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    API.get('/static-pages/academic-calendar').then(res => setContent(res.data.data.content));
    API.get('/academic-calendars').then(res => setCalendars(res.data.data));
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <PageBanner title="Academic Calendar" breadcrumb="Academics / Calendar" />

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Info */}
          <div className="lg:w-2/3">
             <div className="bg-orange-50 p-8 rounded-3xl mb-12 border-l-8 border-accent">
                <h2 className="text-2xl font-black text-primary mb-4 flex items-center gap-3">
                   <FaCalendarAlt className="text-accent" /> ACADEMIC CALENDAR & SCHEDULES
                </h2>
                <p className="text-gray-600 font-semibold leading-relaxed">
                   The academic calendar provides details of session commencement, internal exams, holidays, and university examination schedules for BTU/RTU affiliated courses.
                </p>
             </div>

             <div 
               className="rich-text-content prose prose-lg max-w-none"
               dangerouslySetInnerHTML={{ __html: content || "<p>Academic schedules will be updated soon after University notifications...</p>" }}
             />
          </div>

          {/* Download Side */}
          <div className="lg:w-1/3">
             <div className="sticky top-24 space-y-6">
                <div className="bg-primary p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                   <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full group-hover:scale-150 transition duration-700"></div>
                   <h3 className="text-2xl font-black mb-6 flex items-center gap-2 relative z-10">
                      <FaFilePdf className="text-accent" /> DOWNLOADS
                   </h3>
                   <div className="space-y-4 relative z-10">
                      {calendars.length === 0 ? (
                        <p className="text-sm text-white/70 italic">No documents available for download at the moment.</p>
                      ) : (
                        calendars.map(cal => (
                          <a 
                            key={cal._id}
                            href={cal.fileUrl} 
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between bg-white/10 p-4 rounded-xl hover:bg-white/20 transition group/btn"
                          >
                             <div>
                               <span className="font-bold text-sm block">{cal.title}</span>
                               <span className="text-xs text-white/70 block mt-1">{cal.type} • {cal.academicYear}</span>
                             </div>
                             <FaDownload className="text-accent group-hover/btn:translate-y-1 transition text-xl" />
                          </a>
                        ))
                      )}
                   </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                   <h4 className="text-lg font-bold text-primary mb-4 border-b-2 border-accent pb-2 inline-block">University Links</h4>
                   <ul className="space-y-3">
                      <li><a href="https://btu.ac.in" target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-500 hover:text-accent transition flex items-center gap-2"><span>›</span> Bikaner Technical University</a></li>
                      <li><a href="https://rtu.ac.in" target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-500 hover:text-accent transition flex items-center gap-2"><span>›</span> Rajasthan Technical University</a></li>
                   </ul>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
