import { Link } from 'react-router-dom';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const PageBanner = ({ title, breadcrumb }) => {
  const container = useRef();

  useGSAP(() => {
    gsap.from('.banner-anim', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.1
    });
    
    gsap.from('.banner-circle', {
      scale: 0,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-primary py-12 md:py-24 relative overflow-hidden text-center">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="banner-circle absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 -translate-y-1/3"></div>
         <div className="banner-circle absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
         <h1 className="banner-anim text-2xl md:text-6xl font-black text-white mb-2 md:mb-4 uppercase tracking-wider">{title}</h1>
         <div className="banner-anim text-accent font-bold tracking-widest text-xs md:text-sm uppercase">
            <Link to="/" className="text-white hover:text-accent transition">Home</Link> / {breadcrumb}
         </div>
      </div>
    </div>
  );
};

export default PageBanner;
