import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import { motion } from 'framer-motion';

const VisionMission = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    API.get('/static-pages/vision-mission').then(res => setContent(res.data.data));
  }, []);

  return (
    <div className="bg-white">
      <PageBanner title="Vision & Mission" breadcrumb="About Us / Vision & Mission" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:scale-150 transition duration-500"></div>
             <h2 className="text-4xl font-black mb-8 flex items-center gap-4">
                <span className="w-2 h-10 bg-accent inline-block"></span> OUR VISION
             </h2>
             <p className="text-xl leading-relaxed opacity-90 italic">
                "To provide quality technical education and produce ethical and competent engineers who can contribute to the global society and industry with innovation and research."
             </p>
          </motion.div>

          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-accent p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:scale-150 transition duration-500"></div>
             <h2 className="text-4xl font-black mb-8 flex items-center gap-4">
                <span className="w-2 h-10 bg-primary inline-block"></span> OUR MISSION
             </h2>
             <ul className="space-y-4 text-lg font-semibold">
                <li className="flex gap-3"><span>•</span> To provide a conducive learning environment for academic excellence.</li>
                <li className="flex gap-3"><span>•</span> To foster innovation, research, and entrepreneurship among students.</li>
                <li className="flex gap-3"><span>•</span> To collaborate with industry for practical exposure and skill development.</li>
                <li className="flex gap-3"><span>•</span> To instill moral values and ethics for holistic development.</li>
             </ul>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mt-24 text-center">
           <h2 className="text-3xl font-black text-primary mb-12">OUR CORE <span className="text-accent">VALUES</span></h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['Integrity', 'Innovation', 'Excellence', 'Social Responsibility'].map((value, i) => (
                <div key={i} className="bg-gray-50 p-8 rounded-2xl border-b-4 border-primary hover:bg-primary hover:text-white transition group">
                   <div className="text-4xl mb-4 group-hover:scale-110 transition">💎</div>
                   <h4 className="font-bold uppercase tracking-widest">{value}</h4>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
