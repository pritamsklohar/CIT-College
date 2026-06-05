import HeroSlider from '../components/home/HeroSlider';
import StatsBar from '../components/home/StatsBar';
import WelcomeSection from '../components/home/WelcomeSection';
import NoticeBoard from '../components/home/NoticeBoard';
import AlumniWall from '../components/home/AlumniWall';
import LatestEvents from '../components/home/LatestEvents';
import Recruiters from '../components/home/Recruiters';

const Home = () => {
  return (
    <div className="animate-fade-in">
      <HeroSlider />
      <StatsBar />
      <WelcomeSection />
      <div className="container mx-auto px-4 py-8 md:py-12 grid md:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-2">
          <NoticeBoard />
        </div>
        <div className="md:col-span-1">
          {/* Sidebar components */}
        </div>
      </div>
      
      <AlumniWall />
      <LatestEvents />
      <Recruiters />
    </div>
  );
};


export default Home;
