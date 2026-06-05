import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import citLogo from '../../assets/citimage.png';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading resources...');

  const loadingPhrases = [
    'Initializing system...',
    'Loading academic modules...',
    'Securing server connection...',
    'Optimizing assets...',
    'Almost ready...',
  ];

  useEffect(() => {
    // Phrase cycling interval
    const phraseInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingPhrases.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingPhrases.length;
        return loadingPhrases[nextIndex];
      });
    }, 600);

    // Smooth simulated load progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(phraseInterval);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        
        const remaining = 100 - prev;
        const increment = Math.max(1, Math.min(10, Math.floor(remaining * 0.15 + Math.random() * 5)));
        return prev + increment;
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phraseInterval);
    };
  }, [onComplete]);

  // Circumference of circle with r=58 is 2 * Math.PI * 58 = 364.42
  const strokeDashoffset = 364.42 - (364.42 * progress) / 100;

  return (
    <div className="fixed inset-0 bg-[#001e54] z-[99999] flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Dynamic backdrop glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FF6B00]/10 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]"></div>

      <div className="relative flex flex-col items-center justify-center max-w-sm w-full px-6">
        
        {/* Circular Loader with Logo */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-8">
          {/* Glowing background halo */}
          <div className="absolute inset-2 bg-gradient-to-tr from-[#FF6B00]/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>

          {/* SVG Circular Progress */}
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="58"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="4"
              fill="transparent"
            />
            <motion.circle
              cx="72"
              cy="72"
              r="58"
              stroke="#FF6B00"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray="364.42"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ 
                transition: 'stroke-dashoffset 0.1s ease-out',
                filter: 'drop-shadow(0 0 6px #FF6B00)'
              }}
            />
          </svg>

          {/* Centered Logo Badge (Solid white container blends square logo borders) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center z-10 p-2 overflow-hidden border border-white"
          >
            <img 
              src={citLogo} 
              alt="CIT Emblem" 
              className="w-20 h-20 object-contain"
            />
          </motion.div>
        </div>

        {/* School branding */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-white text-xl md:text-2xl font-black tracking-[0.25em] uppercase mb-1"
        >
          CHARTERED
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-[#FF6B00] text-[10px] md:text-xs font-bold tracking-[0.35em] uppercase mb-8"
        >
          Institute of Technology
        </motion.p>

        {/* Percentage Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-3xl font-black mb-2 tracking-wide font-sans"
          style={{ textShadow: '0 0 10px rgba(255,255,255,0.2)' }}
        >
          {progress}%
        </motion.div>

        {/* Animated status text */}
        <span className="text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] animate-pulse">
          {loadingText}
        </span>
      </div>
    </div>
  );
};

export default Preloader;
