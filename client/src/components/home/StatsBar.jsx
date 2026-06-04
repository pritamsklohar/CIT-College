import { useState, useEffect, useRef } from 'react';
import API from '../../api/axios';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const StatsBar = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Fallback data if API not populated
    const fallbackStats = [
      { label: 'Students', value: '2100+', icon: '🎓' },
      { label: 'Proud Alumni', value: '2000+', icon: '🤝' },
      { label: 'Campus Placements', value: '1250+', icon: '💼' },
      { label: 'Years Excellence', value: '18+', icon: '🏆' }
    ];
    
    API.get('/stats').then(res => {
      if (res.data.data && res.data.data.length > 0) {
        setStats(res.data.data);
      } else {
        setStats(fallbackStats);
      }
    }).catch(() => setStats(fallbackStats));
  }, []);

  const sectionRef = useRef();

  useGSAP(() => {
    if (stats.length > 0) {
      gsap.fromTo('.stat-item', 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          force3D: true,
          clearProps: 'all'
        }
      );
    }
  }, { scope: sectionRef, dependencies: [stats] });

  return (
    <section ref={sectionRef} className="bg-primary py-8 md:py-12 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-item text-center text-white p-2 md:p-4 will-change-transform"
            >
              <div className="text-2xl md:text-4xl mb-1.5 md:mb-3 opacity-80">{stat.icon}</div>
              <div className="text-2xl md:text-5xl font-black mb-1 md:mb-2 text-accent">{stat.value}</div>
              <div className="text-xs md:text-lg font-semibold uppercase tracking-wider opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
