import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { useState, useEffect } from 'react';
import API from '../../api/axios';
import 'swiper/css';
import 'swiper/css/free-mode';

const Recruiters = () => {
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    API.get('/recruiters').then(res => {
      if (res.data.data && res.data.data.length > 0) {
        // Duplicate the list so the infinite CSS scroll has enough elements
        setRecruiters([...res.data.data, ...res.data.data]);
      }
    }).catch(err => console.error("Failed to load recruiters", err));
  }, []);

  return (
    <section className="py-16 bg-white">
      <style>{`
        .continuous-slider .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
      <div className="container mx-auto px-4 mb-10 text-center">
        <h2 className="text-2xl font-black text-primary uppercase tracking-wider">Top <span className="text-accent">Recruiters</span></h2>
      </div>
      
      <div className="container mx-auto px-4 relative" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={40}
          slidesPerView={3}
          freeMode={true}
          loop={true}
          speed={3000}
          autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
          allowTouchMove={false}
          breakpoints={{
            640: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
          }}
          className="recruiter-swiper continuous-slider"
        >
          {recruiters.map((recruiter, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition flex items-center justify-center h-24 hover:shadow-md">
                <img src={recruiter.logoUrl} alt={recruiter.companyName} className="max-h-full max-w-full object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Recruiters;
