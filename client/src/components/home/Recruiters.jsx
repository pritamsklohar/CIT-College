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
        let list = [...res.data.data];
        // Ensure we have at least 18 items so Swiper loop mode works flawlessly
        while (list.length < 18) {
          list = [...list, ...res.data.data];
        }
        setRecruiters(list);
      }
    }).catch(err => console.error("Failed to load recruiters", err));
  }, []);

  return (
    <section className="py-8 md:py-16 bg-white">
      <style>{`
        .continuous-slider .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
      <div className="container mx-auto px-4 mb-6 md:mb-10 text-center">
        <h2 className="text-xl md:text-2xl font-black text-primary uppercase tracking-wider">Top <span className="text-accent">Recruiters</span></h2>
      </div>
      
      <div className="container mx-auto px-4 relative" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={20}
          slidesPerView={3}
          freeMode={true}
          loop={true}
          speed={3000}
          autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
          allowTouchMove={false}
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween: 20 },
            640: { slidesPerView: 4, spaceBetween: 30 },
            768: { slidesPerView: 5, spaceBetween: 40 },
            1024: { slidesPerView: 6, spaceBetween: 40 },
          }}
          className="recruiter-swiper continuous-slider"
        >
          {recruiters.map((recruiter, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm transition flex items-center justify-center h-16 md:h-24 hover:shadow-md">
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
