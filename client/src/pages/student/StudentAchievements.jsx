import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import { motion } from 'framer-motion';
import { FaMedal, FaStar, FaTrophy } from 'react-icons/fa';

const StudentAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Academic', 'Sports', 'Technical', 'Cultural'];

  useEffect(() => {
    setLoading(true);
    const url = category === 'All' ? '/achievements' : `/achievements?category=${category}`;
    // Assuming /achievements route exists
    API.get(url).then(res => {
      setAchievements(res.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [category]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner title="Student Achievements" breadcrumb="Student Corner / Achievements" />

      <div className="container mx-auto px-4 py-10 md:py-20">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 md:px-8 md:py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all ${
                category === cat ? 'bg-primary text-white shadow-xl' : 'bg-white text-gray-500 hover:bg-gray-100 border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
             {[1,2,3].map(i => <div key={i} className="h-64 md:h-80 bg-white animate-pulse rounded-3xl shadow-sm"></div>)}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {achievements.map((ach, index) => (
              <motion.div
                key={ach._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border-b-8 border-accent group hover:shadow-2xl transition duration-500"
              >
                <div className="h-48 md:h-64 relative overflow-hidden">
                   <img src={ach.imageUrl || 'https://via.placeholder.com/500x400?text=Achievement'} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                   <div className="absolute top-3 left-3 bg-accent text-white p-2.5 md:p-3 rounded-2xl shadow-xl text-sm md:text-base"><FaTrophy /></div>
                </div>
                <div className="p-5 md:p-8">
                   <div className="text-[10px] md:text-xs font-black text-accent uppercase tracking-[0.2em] mb-1 md:mb-2 italic">{ach.category}</div>
                   <h3 className="text-base md:text-xl font-bold text-primary mb-1 md:mb-2">{ach.title}</h3>
                   <p className="text-xs md:text-sm font-bold text-gray-500 mb-3 md:mb-4">— {ach.studentName}</p>
                   <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{ach.description}</p>
                   <div className="mt-4 pt-4 md:mt-6 md:pt-6 border-t flex justify-between items-center">
                      <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">{new Date(ach.date).toLocaleDateString()}</span>
                      <div className="text-accent flex gap-1 text-xs md:text-sm"><FaStar /><FaStar /><FaStar /></div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {achievements.length === 0 && !loading && (
          <div className="py-20 text-center">
             <div className="text-6xl mb-4 opacity-20">🏆</div>
             <p className="text-gray-400 font-black uppercase tracking-[0.3em]">Our students are currently busy creating records</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAchievements;
