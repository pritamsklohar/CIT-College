import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import { motion } from 'framer-motion';

const Institute = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/static-pages/institute').then(res => {
      setContent(res.data.data.content);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white">
      <PageBanner title="The Institute" breadcrumb="About Us / The Institute" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="space-y-6">
                <div className="h-10 bg-gray-100 animate-pulse w-1/3 rounded"></div>
                <div className="space-y-3">
                  {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-4 bg-gray-100 animate-pulse rounded"></div>)}
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 bg-blue-50/50 p-8 md:p-10 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                <div 
                   className="rich-text-content prose prose-lg max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-headings:text-primary prose-a:text-accent prose-strong:text-primary"
                   dangerouslySetInnerHTML={{ __html: content }} 
                />
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
             <div className="bg-gray-50 p-8 rounded-2xl sticky top-24">
                <h4 className="text-xl font-bold text-primary mb-6 border-b-2 border-accent pb-2 inline-block">Quick Links</h4>
                <ul className="space-y-4 font-bold text-gray-600">
                   <li><Link to="/about/vision-mission" className="hover:text-accent flex items-center gap-2"><span>›</span> Vision & Mission</Link></li>
                   <li><Link to="/about/location" className="hover:text-accent flex items-center gap-2"><span>›</span> Location</Link></li>
                   <li><Link to="/about/mandatory-disclosure" className="hover:text-accent flex items-center gap-2"><span>›</span> Mandatory Disclosure</Link></li>
                   <li><Link to="/about/chairman-message" className="hover:text-accent flex items-center gap-2"><span>›</span> Chairman Message</Link></li>
                </ul>
                
                <div className="mt-10 bg-primary p-6 rounded-xl text-white">
                   <h5 className="font-bold mb-2">Need Help?</h5>
                   <p className="text-sm opacity-80 mb-4">Contact our support team for any queries regarding admission.</p>
                   <a href="tel:+919588013851" className="block text-accent font-black text-lg">+91 95880 13851</a>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Institute;
