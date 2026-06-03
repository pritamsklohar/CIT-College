import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navbar from './Navbar';
import Footer from './Footer';
import TopBar from './TopBar';
import FloatingEnquiry from './FloatingEnquiry';
import ScrollToTop from '../common/ScrollToTop';
import NewsTicker from './NewsTicker';
import FloatingSidebar from './FloatingSidebar';
import FloatingNCC from './FloatingNCC';
import OnlineAdmissionModal from '../common/OnlineAdmissionModal';

gsap.registerPlugin(ScrollTrigger);

const MainLayout = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <NewsTicker />
      <TopBar />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingEnquiry />
      <FloatingSidebar />
      <FloatingNCC />
      <OnlineAdmissionModal />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
