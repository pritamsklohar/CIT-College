import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const AlumniWall = () => {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    API.get('/testimonials').then(res => {
      if (res.data.data && res.data.data.length > 0) {
        let items = res.data.data;
        // Duplicate items if too few, to ensure smooth infinite coverflow loop
        if (items.length < 8) {
          items = [...items, ...items, ...items];
        }
        setAlumni(items);
      }
    }).catch(err => console.error(err));
  }, []);

  if (alumni.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-primary/5 pattern-grid pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-wider mb-4">
            Our <span className="text-accent">Alumni Wall</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium">
            Hear from our successful graduates who are making a global impact at top multinational corporations and institutions.
          </p>
        </div>

        <div className="w-full relative" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="alumni-swiper pb-16 pt-4"
          >
            {alumni.map((person, index) => (
              <SwiperSlide key={`${person._id}-${index}`} className="max-w-[350px] md:max-w-[450px]">
                <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-accent relative h-full flex flex-col justify-between">
                  <FaQuoteLeft className="text-4xl text-gray-200 absolute top-6 right-6" />
                  
                  <div>
                    <div className="flex gap-1 text-yellow-400 mb-6">
                      {[...Array(person.rating || 5)].map((_, i) => (
                        <FaStar key={i} className="text-sm" />
                      ))}
                    </div>
                    
                    <p className="text-gray-600 italic font-medium leading-relaxed mb-8 relative z-10">
                      "{person.message}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-auto border-t pt-6">
                    <img 
                      src={person.imageUrl} 
                      alt={person.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary p-0.5"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg leading-tight">{person.name}</h4>
                      <p className="text-sm text-accent font-bold">{person.company}</p>
                      {person.batch && <p className="text-xs text-gray-400 font-semibold mt-0.5">Batch of {person.batch}</p>}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AlumniWall;
