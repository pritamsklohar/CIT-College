import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';

import PageBanner from '../../components/common/PageBanner';

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState([]);
  const [activeDept, setActiveDept] = useState('All');
  const [loading, setLoading] = useState(true);

  const departments = ['All', 'CS', 'Civil', 'Electrical', 'Mechanical', 'EC', 'Science'];

  useEffect(() => {
    setLoading(true);
    const url = activeDept === 'All' ? '/faculty' : `/faculty?department=${activeDept}`;
    API.get(url).then(res => {
      setFaculty(res.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [activeDept]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner title="Faculty Profile" breadcrumb="Academics / Faculty Profile" />

      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-8 md:mb-12">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full font-bold text-xs md:text-sm transition shadow-sm ${
                activeDept === dept ? 'bg-accent text-white shadow-lg' : 'bg-white text-primary hover:bg-gray-100'
              }`}
            >
              {dept === 'EC' ? 'Electronics' : dept === 'Science' ? 'Basic Science' : dept}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
             {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-56 md:h-[400px] bg-white animate-pulse rounded-2xl shadow-sm"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {faculty.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg border-b-4 ${member.isHOD ? 'border-accent' : 'border-primary'} group hover:shadow-2xl transition duration-300`}
              >
                <div className="relative h-40 sm:h-56 md:h-72 overflow-hidden bg-gray-100">
                  <img 
                    src={member.imageUrl || 'https://via.placeholder.com/400x500?text=Faculty'} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {member.isHOD && (
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-accent text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full font-bold text-[8px] md:text-xs uppercase tracking-wider shadow-lg">
                      Head of Dept
                    </div>
                  )}
                </div>
                <div className="p-3 md:p-6 text-center">
                  <h3 className="font-bold text-sm md:text-xl mb-0.5 md:mb-1 truncate">{member.name}</h3>
                  <p className="text-accent font-bold text-[10px] md:text-sm mb-1.5 md:mb-3 uppercase tracking-wide truncate">{member.designation}</p>
                  <div className="space-y-1 pt-2 md:pt-4 border-t border-gray-100 text-[10px] md:text-sm text-gray-500 font-semibold">
                    <p className="truncate">Qual: {member.qualification}</p>
                    <p>Exp: {member.experience} Years</p>
                    <a href={`mailto:${member.email}`} className="text-primary hover:text-accent truncate block">{member.email}</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyProfile;
