import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload, FaBookOpen } from 'react-icons/fa';

const SchemeSyllabus = () => {
  const [syllabusList, setSyllabusList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDept, setActiveDept] = useState('All');

  const departments = ['All', 'Computer Science Engineering', 'Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Humanities & Sciences', 'General'];

  useEffect(() => {
    API.get('/syllabus')
      .then(res => {
        setSyllabusList(res.data.data);
        setFilteredList(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFilter = (dept) => {
    setActiveDept(dept);
    if (dept === 'All') {
      setFilteredList(syllabusList);
    } else {
      setFilteredList(syllabusList.filter(item => item.department === dept));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner title="Scheme & Syllabus" breadcrumb="Academics / Scheme & Syllabus" />

      <div className="container mx-auto px-4 py-10 md:py-20 max-w-6xl">
        <div className="text-center mb-8 md:mb-16">
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
            Download Scheme and Syllabus Documents of B.Tech Programs
          </p>
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-12">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => handleFilter(dept)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                activeDept === dept
                  ? 'bg-accent text-white shadow-lg scale-105'
                  : 'bg-white text-gray-500 hover:text-primary hover:bg-blue-50 border border-gray-100'
              }`}
            >
              {dept === 'Humanities & Sciences' ? '1st Year / Humanities' : dept}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 md:h-28 bg-white animate-pulse rounded-3xl border"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {filteredList.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-blue-100 hover:shadow-md transition duration-300 flex items-center gap-4 md:gap-6 group"
              >
                {/* PDF Icon Box */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500 group-hover:text-white transition duration-300">
                  <FaFilePdf className="text-xl md:text-3xl" />
                </div>

                {/* Content Box */}
                <div className="flex-grow min-w-0">
                  <span className="text-[9px] md:text-[10px] font-black text-accent uppercase tracking-widest bg-blue-50 px-2 md:px-2.5 py-0.5 md:py-1 rounded-md">
                    {item.semester} • {item.type}
                  </span>
                  <h3 className="font-bold text-primary text-sm md:text-base mt-1.5 md:mt-2 line-clamp-2 leading-snug group-hover:text-accent transition duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-[10px] md:text-xs font-semibold mt-1 uppercase tracking-wider">
                    {item.department}
                  </p>
                </div>

                {/* Download Button */}
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-primary hover:text-white text-gray-400 transition-all duration-300 flex-shrink-0"
                  title="Download PDF"
                >
                  <FaDownload className="text-sm md:text-base" />
                </a>
              </motion.div>
            ))}

            {filteredList.length === 0 && (
              <div className="col-span-full bg-white p-12 rounded-3xl border text-center text-gray-400 font-bold italic shadow-sm">
                No scheme or syllabus document is currently uploaded for this department.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemeSyllabus;
