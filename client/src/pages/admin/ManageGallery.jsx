import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaTrash, FaPlus, FaFilter } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = ['All', 'Events', 'Campus', 'Sports', 'Cultural', 'Technical', 'General'];

  useEffect(() => {
    fetchImages();
  }, [activeCategory]);

  const fetchImages = async () => {
    const url = activeCategory === 'All' ? '/gallery' : `/gallery?category=${activeCategory}`;
    const res = await API.get(url);
    setImages(res.data.data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return toast.error('Select images first');
    
    setLoading(true);
    const data = new FormData();
    selectedFiles.forEach(file => data.append('images', file));
    data.append('category', activeCategory === 'All' ? 'General' : activeCategory);

    try {
      await API.post('/gallery', data);
      toast.success('Images uploaded');
      setSelectedFiles([]);
      fetchImages();
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id) => {
    console.log('Attempting to delete image with ID:', id);
    try {
      await API.delete(`/gallery/${id}`);
      toast.success('Deleted');
      fetchImages();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Gallery</h1>
      </div>

      {/* Upload Section */}
      <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-gray-200">
         <h3 className="font-bold text-primary mb-4 flex items-center gap-2 uppercase tracking-wider text-sm">
            <FaPlus /> Bulk Upload Images
         </h3>
         <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1 w-full">
               <input 
                 type="file" multiple 
                 className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
                 onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
               />
            </div>
            <button 
              disabled={loading}
              className="bg-primary text-white px-8 py-2 rounded-full font-bold hover:bg-accent transition shadow-lg disabled:opacity-50"
            >
              {loading ? 'Uploading...' : 'Upload Now'}
            </button>
         </form>
         {selectedFiles.length > 0 && (
           <p className="mt-2 text-xs font-bold text-accent">{selectedFiles.length} files selected</p>
         )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-bold transition ${
              activeCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map(img => (
          <div key={img._id} className="relative group rounded-xl overflow-hidden aspect-square shadow-sm border">
            <img src={img.imageUrl} className="w-full h-full object-cover transition duration-300 group-hover:scale-110" />
            <div className="absolute top-2 right-2 z-10">
               <button 
                 onClick={(e) => { e.stopPropagation(); deleteImage(img._id); }}
                 className="bg-red-600 text-white p-2 rounded shadow-lg hover:bg-red-700"
               >
                  <FaTrash size={12} />
               </button>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center pointer-events-none">
            </div>
            <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold text-primary uppercase shadow">
               {img.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageGallery;
