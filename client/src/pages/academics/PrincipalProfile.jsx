import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import { motion } from 'framer-motion';

const PrincipalProfile = () => {
   const [content, setContent] = useState('');
   const [imageUrl, setImageUrl] = useState('');

   useEffect(() => {
      API.get('/static-pages/principal-profile').then(res => {
         setContent(res.data.data.content);
         setImageUrl(res.data.data.imageUrl);
      });
   }, []);

   return (
      <div className="bg-white">
         <PageBanner title="Principal's Profile" breadcrumb="Academics / Principal Profile" />

         <div className="container mx-auto px-4 py-20">
            <div className="flex flex-col lg:flex-row-reverse gap-16 items-start">
               {/* Image Column */}
               <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:w-1/3 w-full lg:sticky lg:top-24 relative"
               >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-b-8 border-primary">
                     <img 
                       src={imageUrl ? imageUrl : "https://citabu.ac.in/assets/images/gallery/principal.jpeg"} 
                       alt="Principal" 
                       onError={(e) => { 
                         e.target.onerror = null; 
                         e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; 
                       }}
                       className="w-full aspect-[3/4] object-cover bg-gray-100 transition duration-500" 
                     />
                     <div className="absolute bottom-0 left-0 w-full bg-accent bg-opacity-95 p-6 text-center text-white">
                        <h3 className="text-xl font-bold">Dr. Rajnesh Kumar Yadav</h3>
                        <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1">Principal, CIT Abu Road</p>
                     </div>
                  </div>

                  <div className="mt-8 bg-primary text-white p-8 rounded-3xl shadow-xl">
                     <h4 className="text-lg font-black mb-4 uppercase tracking-widest border-b border-white border-opacity-20 pb-2">Credentials</h4>
                     <ul className="space-y-3 text-sm font-semibold opacity-90">
                        <li className="flex gap-2"><span>✔</span>BE, M.Tech, Phd (Power System)</li>
                        <li className="flex gap-2"><span>✔</span>15 Years of Teaching & Research Experience</li>
                        <li className="flex gap-2"><span>✔</span> LISTE, MIEEE, MSESI</li>
                     </ul>
                  </div>
               </motion.div>

               {/* Content Column */}
               <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:w-2/3"
               >
                  <h2 className="text-3xl md:text-5xl font-black text-primary mb-8 uppercase leading-tight">
                     From The Desk Of <br />
                     <span className="text-accent">The Principal</span>
                  </h2>
                  <div className="w-20 h-1.5 bg-accent mb-8 rounded-full"></div>

                  <div className="bg-blue-50/50 p-8 md:p-10 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
                     <div
                        className="rich-text-content prose prose-lg max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-headings:text-primary prose-a:text-accent prose-strong:text-primary"
                        dangerouslySetInnerHTML={{ __html: content || "<p>At CIT, we believe in technical education that transcends textbooks...</p>" }}
                     />
                  </div>

                  <div className="mt-12 bg-gray-50 p-8 rounded-3xl border-l-4 border-primary italic font-bold text-gray-600">
                     "Our goal is to create engineers who are not only job-ready but also future-ready leaders of industry."
                  </div>
               </motion.div>
            </div>
         </div>
      </div>
   );
};

export default PrincipalProfile;
