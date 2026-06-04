import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    API.get('/settings').then(res => setSettings(res.data.data));
  }, []);

  const quickLinks = [
    { name: 'The Institute', path: '/about/institute' },
    { name: 'Vision & Mission', path: '/about/vision-mission' },
    { name: 'Mandatory Disclosure', path: '/about/mandatory-disclosure' },
    { name: 'Principal Profile', path: '/academics/principal-profile' },
    { name: 'Faculty Profile', path: '/academics/faculty-profile' },
    { name: 'Admission', path: '/admission' },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-gray-300">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About Column */}
          <div>
            <img src={settings?.logoUrl || '/logo-cit.png'} alt="CIT Logo" className="h-16 md:h-20 mb-4 md:mb-6 brightness-80 " />
            <p className="text-sm leading-relaxed mb-6 opacity-70">
              Chartered Institute of Technology (CIT), Abu Road, Rajasthan – an engineering college affiliated to BTU/RTU and approved by AICTE. Committed to excellence in technical education.
            </p>
            <div className="flex gap-4">
              <a href={settings?.facebookUrl} target="_blank" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition"><FaFacebook /></a>
              <a href={settings?.twitterUrl} target="_blank" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition"><FaTwitter /></a>
              <a href={settings?.linkedinUrl} target="_blank" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition"><FaLinkedin /></a>
              <a href={settings?.instagramUrl} target="_blank" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition"><FaInstagram /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg md:text-xl mb-4 md:mb-8 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent inline-block"></span> Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="hover:text-accent transition flex items-center gap-2">
                    <span className="text-accent">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-lg md:text-xl mb-4 md:mb-8 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent inline-block"></span> Get In Touch
            </h4>
            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-white p-3 rounded-lg"><FaMapMarkerAlt /></div>
                  <p className="text-sm">{settings?.address || 'Village Danvav, Mt. Road, Abu Road, Dist. Sirohi, Rajasthan - 307510'}</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-white p-3 rounded-lg"><FaEnvelope /></div>
                  <p className="text-sm">{settings?.email || 'citaburoad@gmail.com'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-white p-3 rounded-lg"><FaPhone /></div>
                  <div className="text-sm">
                     <p>{settings?.phone1 || '+91 99505 30301'}</p>
                     <p>{settings?.phone2 || '+91 95880 13851'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 md:mt-10 md:pt-10 border-t border-white border-opacity-10 text-center md:text-left">
              <h5 className="text-white font-bold mb-4">Location Map</h5>
              <div className="rounded-xl overflow-hidden h-40 w-full grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-500 shadow-2xl border border-white border-opacity-10">
                <iframe
                  src={settings?.googleMapsEmbed || "https://maps.google.com/maps?q=24.52327198836052,72.79505859574401&hl=en&z=14&output=embed"}
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-6 text-center text-sm border-t border-white border-opacity-5">
        <p>© {new Date().getFullYear()} Chartered Institute of Technology. All Rights Reserved. | <a href="https://www.facebook.com/citabuinfo/" className="text-accent hover:underline">Designed & Developed with ❤️</a></p>
      </div>
    </footer>
  );
};

export default Footer;
