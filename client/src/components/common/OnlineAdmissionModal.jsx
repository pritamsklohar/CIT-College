import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

const OnlineAdmissionModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full relative shadow-[0_0_50px_rgba(255,107,0,0.3)]"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-accent z-10 p-2"
            >
              <FaTimes className="text-2xl" />
            </button>

            <div className="flex flex-col md:flex-row">
               <div className="md:w-1/2 bg-primary p-12 text-white flex flex-col justify-center">
                  <h3 className="text-3xl font-black uppercase mb-4 leading-tight">Admissions <br /><span className="text-accent">Open 2024-25</span></h3>
                  <p className="text-sm opacity-80 mb-8 font-semibold">Join the legacy of excellence in engineering. Register now to secure your future.</p>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <span className="text-accent text-xl font-bold">109</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">BTU College Code</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <span className="text-accent text-xl font-bold">086</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">RTU College Code</span>
                     </div>
                  </div>
               </div>
               
               <div className="md:w-1/2 p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-accent text-4xl mb-6">
                     <FaExternalLinkAlt />
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-4 uppercase">Direct Online Admission</h4>
                  <p className="text-gray-500 text-sm mb-8 font-bold leading-relaxed">Click below to fill the online application form and start your journey with CIT.</p>
                  <a 
                    href="https://forms.gle/KT257DVQEjc5HBTh9" 
                    target="_blank"
                    className="bg-accent text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-primary transition shadow-xl"
                  >
                     Apply Online Now
                  </a>
                  <p className="mt-8 text-[10px] font-black text-gray-400 uppercase tracking-tighter">Approved by AICTE, New Delhi</p>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OnlineAdmissionModal;
