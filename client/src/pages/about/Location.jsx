import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import { FaMapMarkerAlt, FaPlane, FaTrain, FaBus } from 'react-icons/fa';

const Location = () => {
  const [content, setContent] = useState('');
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    API.get('/static-pages/location').then(res => setContent(res.data.data.content));
    API.get('/settings').then(res => setSettings(res.data.data));
  }, []);

  const travelWays = [
    { title: 'By Air', desc: 'Nearest airport is Udaipur (160km) or Ahmedabad (190km).', icon: <FaPlane /> },
    { title: 'By Rail', desc: 'Abu Road station is a major stop on the Delhi-Mumbai line.', icon: <FaTrain /> },
    { title: 'By Road', desc: 'Well connected via NH-14 and NH-27. Frequent buses from all cities.', icon: <FaBus /> },
  ];

  return (
    <div className="bg-white">
      <PageBanner title="How to Reach Us" breadcrumb="About Us / Location" />

      <div className="container mx-auto px-4 py-10 md:py-20">
         <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-start">
            <div className="lg:w-1/2">
               <h2 className="text-2xl md:text-5xl font-black text-primary mb-4 md:mb-8 uppercase leading-tight">
                  Reach <span className="text-accent">CIT Abu Road</span>
               </h2>
               <div className="w-20 h-1.5 bg-accent mb-6 md:mb-8 rounded-full"></div>
               
               <div 
                 className="rich-text-content text-gray-700 leading-relaxed text-base md:text-lg mb-6 md:mb-12 font-semibold"
                 dangerouslySetInnerHTML={{ __html: content || "<p>CIT is located in the scenic surroundings of Abu Road, at the foothills of Mount Abu...</p>" }}
               />

               <div className="space-y-4 md:space-y-6">
                  {travelWays.map((way, i) => (
                    <div key={i} className="flex items-start gap-4 md:gap-6 bg-gray-50 p-4 md:p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition group">
                       <div className="bg-primary text-white p-3 md:p-4 rounded-2xl text-xl md:text-2xl group-hover:bg-accent transition shadow-lg">{way.icon}</div>
                       <div>
                          <h4 className="text-base md:text-xl font-bold text-primary mb-1 md:mb-2 uppercase tracking-wide">{way.title}</h4>
                          <p className="text-gray-500 font-semibold text-xs md:text-sm leading-relaxed">{way.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="lg:w-1/2 w-full h-[300px] md:h-screen max-h-[350px] md:max-h-[700px] sticky top-24">
               <div className="bg-white p-2 md:p-4 rounded-xl md:rounded-3xl shadow-2xl border-2 md:border-4 border-gray-100 h-full relative overflow-hidden group">
                  <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-2xl border-l-4 border-accent max-w-[200px] md:max-w-xs">
                     <h5 className="font-black text-primary mb-1 md:mb-2 flex items-center gap-2 text-xs md:text-sm"><FaMapMarkerAlt className="text-accent" /> CAMPUS ADDRESS</h5>
                     <p className="text-[10px] md:text-xs font-bold text-gray-500 leading-relaxed uppercase">
                        {settings?.address || 'Village Danvav, Mt. Road, Abu Road, Dist. Sirohi, Rajasthan - 307510'}
                     </p>
                  </div>
                  <iframe 
                    src={settings?.googleMapsEmbed || "https://maps.google.com/maps?q=24.52327198836052,72.79505859574401&hl=en&z=14&output=embed"} 
                    width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" className="grayscale hover:grayscale-0 transition duration-1000">
                  </iframe>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Location;
