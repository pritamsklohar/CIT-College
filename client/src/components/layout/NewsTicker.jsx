import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';

const NewsTicker = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    API.get('/notices?category=Important').then(res => setNotices(res.data.data)).catch(() => {});
  }, []);

  if (notices.length === 0) return null;

  return (
    <div className="bg-accent bg-opacity-95 text-white py-2 overflow-hidden relative z-50">
      <div className="container mx-auto px-4 flex items-center">
        <div className="bg-white text-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mr-4 shrink-0 shadow-lg animate-pulse">
           LATEST NEWS
        </div>
        <div className="relative flex-1 overflow-hidden h-6">
           <motion.div 
             animate={{ x: ['100%', '-100%'] }}
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             className="whitespace-nowrap flex gap-12 absolute top-0 left-0"
           >
              {notices.map((n, i) => (
                <span key={i} className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                   {n.title}
                </span>
              ))}
              {/* Duplicate for seamless loop if needed, but 25s for 100% to -100% is usually enough for a few items */}
              {notices.map((n, i) => (
                <span key={`dup-${i}`} className="text-xs font-bold uppercase tracking-wide flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                   {n.title}
                </span>
              ))}
           </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
