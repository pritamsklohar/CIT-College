import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import nccLogo from '../../assets/ncc_logo.png';

const FloatingNCC = () => {
  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      <Link to="/student/ncc">
        <motion.div
          className="relative flex items-center justify-center cursor-pointer group"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        >
          {/* Pulsing Outer Ring */}
          <span className="absolute inline-flex h-16 w-16 rounded-full bg-accent opacity-75 animate-ping"></span>
          
          {/* Main Button */}
          <div className="relative bg-white h-16 w-16 rounded-full shadow-2xl flex items-center justify-center p-2.5 hover:bg-orange-50 border-2 border-accent transition-all duration-300 transform group-hover:scale-105">
            <img 
              src={nccLogo} 
              alt="NCC Logo" 
              className="h-full w-full object-contain filter drop-shadow-md group-hover:rotate-12 transition-transform duration-300"
            />
          </div>

          {/* Expanded Hover Pill Text */}
          <div className="absolute left-full ml-3 bg-primary text-white font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-white/15">
            Join NCC / View Details
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default FloatingNCC;
