import { useState, useEffect, useRef } from 'react';
import API from '../../api/axios';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const LatestEvents = () => {
  const [events, setEvents] = useState([]);
  const sectionRef = useRef();

  useEffect(() => {
    API.get('/events').then(res => setEvents(res.data.data.slice(0, 8)));
  }, []);

  useGSAP(() => {
    if (events.length > 0) {
      gsap.fromTo('.event-card', 
        { scale: 0.9, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          force3D: true,
          clearProps: 'all'
        }
      );
    }
  }, { scope: sectionRef, dependencies: [events] });

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center mb-12">
        <h4 className="text-accent font-bold uppercase tracking-widest mb-2 italic">CIT Events</h4>
        <h2 className="text-3xl md:text-5xl font-black text-primary">LATEST <span className="text-accent">EVENTS</span></h2>
        <div className="w-24 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {events.length > 0 ? events.map((event, index) => (
          <div
            key={event._id}
            className="event-card group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 will-change-transform"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                src={event.imageUrl || 'https://via.placeholder.com/400x300'} 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded font-bold text-sm shadow-lg">
                {new Date(event.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
              </div>
            </div>
            <div className="p-6 text-left">
              <h3 className="font-bold text-lg text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                {event.title}
              </h3>
              <div className="flex flex-col gap-2 text-sm text-gray-500 font-semibold">
                <div className="flex items-center gap-2"><FaCalendarAlt className="text-accent" /> {new Date(event.date).toLocaleDateString()}</div>
                <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-accent" /> {event.location || 'CIT Campus'}</div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-12 text-gray-400 font-bold uppercase tracking-widest">
            No events scheduled yet
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestEvents;
