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

      <div className="container mx-auto px-4 py-20">
         <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
               <h2 className="text-3xl md:text-5xl font-black text-primary mb-8 uppercase leading-tight">
                  Reach <span className="text-accent">CIT Abu Road</span>
               </h2>
               <div className="w-20 h-1.5 bg-accent mb-8 rounded-full"></div>
               
               <div 
                 className="rich-text-content text-gray-700 leading-relaxed text-lg mb-12 font-semibold"
                 dangerouslySetInnerHTML={{ __html: content || "<p>CIT is located in the scenic surroundings of Abu Road, at the foothills of Mount Abu...</p>" }}
               />

               <div className="space-y-6">
                  {travelWays.map((way, i) => (
                    <div key={i} className="flex items-start gap-6 bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition group">
                       <div className="bg-primary text-white p-4 rounded-2xl text-2xl group-hover:bg-accent transition shadow-lg">{way.icon}</div>
                       <div>
                          <h4 className="text-xl font-bold text-primary mb-2 uppercase tracking-wide">{way.title}</h4>
                          <p className="text-gray-500 font-semibold text-sm leading-relaxed">{way.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="lg:w-1/2 w-full h-screen max-h-[700px] sticky top-24">
               <div className="bg-white p-4 rounded-3xl shadow-2xl border-4 border-gray-100 h-full relative overflow-hidden group">
                  <div className="absolute top-8 left-8 z-10 bg-white p-6 rounded-2xl shadow-2xl border-l-4 border-accent max-w-xs">
                     <h5 className="font-black text-primary mb-2 flex items-center gap-2"><FaMapMarkerAlt className="text-accent" /> CAMPUS ADDRESS</h5>
                     <p className="text-xs font-bold text-gray-500 leading-relaxed uppercase">
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
