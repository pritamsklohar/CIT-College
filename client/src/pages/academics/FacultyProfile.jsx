import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';

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
      <div className="bg-primary py-24 text-center text-white relative">
         <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase">FACULTY PROFILE</h1>
         <p className="text-accent font-bold tracking-widest uppercase text-sm">Academics / Faculty</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-6 py-2 rounded-full font-bold transition shadow-sm ${
                activeDept === dept ? 'bg-accent text-white shadow-lg' : 'bg-white text-primary hover:bg-gray-100'
              }`}
            >
              {dept === 'EC' ? 'Electronics' : dept === 'Science' ? 'Basic Science' : dept}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-[400px] bg-white animate-pulse rounded-2xl shadow-sm"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {faculty.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg border-b-4 ${member.isHOD ? 'border-accent' : 'border-primary'} group hover:shadow-2xl transition duration-300`}
              >
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <img 
                    src={member.imageUrl || 'https://via.placeholder.com/400x500?text=Faculty'} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {member.isHOD && (
                    <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg">
                      Head of Dept
                    </div>
                  )}
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl text-primary mb-1">{member.name}</h3>
                  <p className="text-accent font-bold text-sm mb-3 uppercase tracking-wide">{member.designation}</p>
                  <div className="space-y-2 pt-4 border-t border-gray-100 text-sm text-gray-500 font-semibold">
                    <p>Qual: {member.qualification}</p>
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
