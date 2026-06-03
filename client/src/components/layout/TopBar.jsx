import { useEffect, useState } from 'react';
import API from '../../api/axios';

const TopBar = () => {
  const [settings, setSettings] = useState(null);
  const [marqueeItems, setMarqueeItems] = useState([]);

  useEffect(() => {
    API.get('/settings').then(res => setSettings(res.data.data));
    // API.get('/marquee').then(res => setMarqueeItems(res.data.data));
  }, []);

  return (
    <div className="bg-primary text-white py-2 px-4 hidden md:flex justify-between items-center text-sm">
      <div className="flex gap-4">
        <span>{settings?.email || 'citaburoad@gmail.com'}</span>
        <span>{settings?.phone1 || '+91 95880 13851'}</span>
      </div>
      <div className="flex-1 mx-8 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {/* Marquee items here */}
          Welcome to Chartered Institute of Technology, Abu Road!
        </div>
      </div>
      <div className="flex gap-3">
        {/* Social icons here */}
      </div>
    </div>
  );
};

export default TopBar;
