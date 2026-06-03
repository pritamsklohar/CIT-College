import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { useState, useEffect, useRef } from 'react';
import API from '../../api/axios';
import gsap from 'gsap';

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    API.get('/hero').then(res => setSlides(res.data.data)).catch(() => { });
  }, []);

  if (slides.length === 0) return null;

  return (
    <section className="relative w-full aspect-[4/3] md:aspect-[16/7] xl:aspect-[21/9] overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={slides.length >= 3}
        className="h-full w-full"
        onSlideChangeTransitionStart={(swiper) => {
          const activeSlide = swiper.slides[swiper.activeIndex];
          if (activeSlide) {
            gsap.fromTo(
              activeSlide.querySelectorAll('.hero-anim'),
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
            );
            gsap.fromTo(
              activeSlide.querySelector('.hero-bg'),
              { scale: 1.1 },
              { scale: 1, duration: 6, ease: 'power2.out', force3D: true }
            );
          }
        }}
        onInit={(swiper) => {
          // Trigger animation for the first slide on load
          setTimeout(() => swiper.emit('slideChangeTransitionStart'), 100);
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="overflow-hidden">
            <div
              className="hero-bg h-full w-full bg-cover bg-center flex items-center justify-center relative will-change-transform"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative text-center text-white px-4">
                <h2 className="hero-anim text-3xl md:text-6xl font-bold mb-4 opacity-0">{slide.title}</h2>
                <p className="hero-anim text-lg md:text-2xl opacity-0">{slide.subtitle}</p>
                {slide.link && (
                  <a href={slide.link} className="hero-anim mt-8 inline-block bg-accent text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-primary transition shadow-2xl opacity-0">
                    {slide.buttonText || 'Explore More'}
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
