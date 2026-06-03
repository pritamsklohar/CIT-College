import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
       >
          <h1 className="text-[12rem] font-black text-primary leading-none opacity-10">404</h1>
          <div className="relative -mt-32">
             <h2 className="text-4xl font-black text-primary mb-4 uppercase">Oops! Page Not Found</h2>
             <p className="text-gray-500 font-bold max-w-md mx-auto mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
             </p>
             <Link 
               to="/" 
               className="inline-block bg-accent text-white px-10 py-4 rounded-xl font-bold hover:bg-primary transition shadow-2xl uppercase tracking-widest"
             >
                Back To Home
             </Link>
          </div>
       </motion.div>
    </div>
  );
};

export default NotFound;
