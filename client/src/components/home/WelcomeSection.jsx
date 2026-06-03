import { useState, useEffect, useRef } from 'react';
import API from '../../api/axios';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import campusVideo from '../../assets/Video-cit-abu.mp4';

gsap.registerPlugin(ScrollTrigger);

const WelcomeSection = () => {
  const [content, setContent] = useState('');
  const sectionRef = useRef();

  useGSAP(() => {
    gsap.from('.welcome-left > *', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });

    gsap.fromTo('.welcome-right', 
      { x: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'all'
      }
    );
  }, { scope: sectionRef });

  useEffect(() => {
    API.get('/static-pages/institute').then(res => {
      setContent(res.data.data.content);
    }).catch(() => {
      setContent("<p>Chartered Institute of Technology (CIT) Abu Road is a premier engineering institution...</p>");
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 welcome-left">
            <h4 className="text-accent font-bold uppercase tracking-widest mb-2">Since 2009</h4>
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-6 leading-tight">
              Welcome To <br />
              <span className="text-accent">Chartered Institute</span> of Technology
            </h2>
            <div 
              className="text-gray-600 leading-relaxed mb-8 text-lg line-clamp-6"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <Link 
              to="/about/institute" 
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-accent transition-all transform hover:-translate-y-1 shadow-lg"
            >
              Learn More About Us
            </Link>
          </div>

          <div className="lg:w-1/2 w-full welcome-right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              <video 
                src={campusVideo} 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-auto block" 
              />
              <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
