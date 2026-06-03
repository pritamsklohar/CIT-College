import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaSignInAlt, FaArrowLeft } from 'react-icons/fa';
import logo from '../../assets/cit_full_logo.png';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        toast.success('Access Granted. Welcome back!');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07162c] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none"></div>
      
      {/* Animated Subtle Floating Particle */}
      <motion.div 
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-accent/5 to-transparent blur-xl pointer-events-none"
      ></motion.div>

      {/* Main Glassmorphic Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/20 relative z-10"
      >
        {/* Return to home link */}
        <motion.a 
          href="/" 
          className="absolute top-6 left-6 text-gray-400 hover:text-primary transition flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
          whileHover={{ x: -3 }}
        >
          <FaArrowLeft /> Home
        </motion.a>

        {/* Logo & Header */}
        <div className="text-center mb-8 mt-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <img 
              src={logo} 
              alt="CIT Logo" 
              className="h-20 md:h-24 object-contain filter drop-shadow-md mb-6"
            />
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-wide leading-tight">
            Admin Portal
          </h2>
          <div className="w-12 h-1 bg-accent mx-auto mt-3 rounded-full"></div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-3">
            Sign in to manage your site
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">
              Email Address
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-accent transition-colors duration-300">
                <FaEnvelope />
              </span>
              <input
                type="email"
                required
                placeholder="admin@citabu.ac.in"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 rounded-2xl border border-gray-100 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 outline-none text-gray-700 font-medium transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-gray-400 tracking-widest uppercase">
              Password
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-accent transition-colors duration-300">
                <FaLock />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 rounded-2xl border border-gray-100 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 outline-none text-gray-700 font-medium transition-all duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Verifying Credentials...
              </span>
            ) : (
              <>
                <FaSignInAlt /> Access Dashboard
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
