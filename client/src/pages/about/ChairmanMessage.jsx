import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import { motion } from 'framer-motion';

const ChairmanMessage = () => {
   const [content, setContent] = useState('');
   const [imageUrl, setImageUrl] = useState('');

   useEffect(() => {
      API.get('/static-pages/chairman-message').then(res => {
         setContent(res.data.data.content);
         setImageUrl(res.data.data.imageUrl);
      });
   }, []);

   return (
      <div className="bg-white">
         <PageBanner title="Chairman's Message" breadcrumb="About Us / Chairman Message" />

         <div className="container mx-auto px-4 py-20">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
               {/* Image Column */}
               <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:w-1/3 w-full lg:sticky lg:top-24 relative"
               >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-b-8 border-accent">
                     <img 
                       src={imageUrl ? imageUrl : "https://citabu.ac.in/assets/images/gallery/chairman.jpg"} 
                       alt="Chairman" 
                       onError={(e) => { 
                         e.target.onerror = null; 
                         // Robust 1x1 transparent PNG fallback to prevent infinite loops
                         e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; 
                       }}
                       className="w-full aspect-[3/4] object-cover bg-gray-100 transition duration-500" 
                     />
                     <div className="absolute bottom-0 left-0 w-full bg-primary bg-opacity-90 p-6 text-center text-white">
                        <h3 className="text-xl font-bold">Mr. Kishore Gandhi</h3>
                        <p className="text-accent text-xs font-bold uppercase tracking-widest mt-1">Chairman, CIT Abu Road</p>
                     </div>
                  </div>

                  <div className="mt-8 bg-gray-50 p-6 rounded-2xl border border-dashed border-primary">
                     <p className="text-gray-500 text-sm italic font-semibold leading-relaxed">
                        "Education is the most powerful weapon which you can use to change the world."
                     </p>
                  </div>
               </motion.div>

               {/* Content Column */}
               <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:w-2/3"
               >
                  <h2 className="text-3xl md:text-5xl font-black text-primary mb-8 uppercase leading-tight">
                     Message From <br />
                     <span className="text-accent">The Desk Of Chairman</span>
                  </h2>
                  <div className="w-20 h-1.5 bg-accent mb-8 rounded-full"></div>

                  <div className="bg-blue-50/50 p-8 md:p-10 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                     <div
                        className="rich-text-content prose prose-lg max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-headings:text-primary prose-a:text-accent prose-strong:text-primary"
                        dangerouslySetInnerHTML={{ __html: content || "<p>Welcome to Chartered Institute of Technology...</p>" }}
                     />
                  </div>

                  <div className="mt-12 pt-12 border-t border-gray-100 italic font-bold text-primary">
                     Best Regards,<br />
                     <span className="text-2xl font-black text-accent mt-2 block">Mr. Kishore Gandhi</span>
                     <span className="text-sm opacity-60">Chairman</span>
                  </div>
               </motion.div>
            </div>
         </div>
      </div>
   );
};

export default ChairmanMessage;
