import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Events', 'Campus', 'Sports', 'Cultural', 'Technical', 'General'];

  useEffect(() => {
    setLoading(true);
    const url = category === 'All' ? '/gallery' : `/gallery?category=${category}`;
    API.get(url).then(res => {
      setImages(res.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [category]);

  return (
    <div className="bg-white min-h-screen">
      <PageBanner title="Photo Gallery" breadcrumb="Home / Media / Gallery" />

      <div className="container mx-auto px-4 py-20">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all ${
                category === cat ? 'bg-accent text-white shadow-xl scale-105' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-3xl"></div>)}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {images.map((img, index) => (
                <motion.div
                  key={img._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-square rounded-3xl overflow-hidden shadow-lg cursor-pointer bg-gray-100"
                >
                   <img 
                     src={img.imageUrl} 
                     alt={img.title || 'CIT Gallery'} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                   />
                   <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-500 flex flex-col justify-end p-8">
                      <div className="translate-y-10 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                         <span className="bg-accent text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
                            {img.category}
                         </span>
                         <h4 className="text-white font-bold text-lg line-clamp-2">{img.title || 'CIT Campus Life'}</h4>
                      </div>
                   </div>
                   {/* Decorative corner */}
                   <div className="absolute top-0 right-0 w-12 h-12 bg-white bg-opacity-20 translate-x-1/2 -translate-y-1/2 rotate-45 pointer-events-none transition duration-500 group-hover:scale-150"></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {images.length === 0 && !loading && (
          <div className="py-20 text-center text-gray-400 font-black uppercase tracking-[0.2em] italic">
             No memories captured in this category yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
