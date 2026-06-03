import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageHero = () => {
  const [slides, setSlides] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', subtitle: '', link: '', buttonText: 'Learn More', order: 0, isActive: true
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    const res = await API.get('/hero');
    setSlides(res.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    try {
      if (editId) {
        await API.put(`/hero/${editId}`, data);
        toast.success('Slide updated');
      } else {
        await API.post('/hero', data);
        toast.success('Slide added');
      }
      setShowModal(false);
      fetchSlides();
      setFormData({ title: '', subtitle: '', link: '', buttonText: 'Learn More', order: 0, isActive: true });
      setImage(null);
      setEditId(null);
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (slide) => {
    setEditId(slide._id);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      link: slide.link,
      buttonText: slide.buttonText,
      order: slide.order,
      isActive: slide.isActive
    });
    setImage(null);
    setShowModal(true);
  };

  const deleteSlide = async (id) => {
    console.log('Deleting Hero Slide ID:', id);
    try {
      await API.delete(`/hero/${id}`);
      toast.success('Slide deleted');
      fetchSlides();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Manage Home Hero Slider</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-accent transition shadow-lg"
        >
          <FaPlus /> Add New Slide
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {slides.map(slide => (
          <div key={slide._id} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 group">
             <div className="relative h-48">
                <img src={slide.imageUrl} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={slide.title} />
                <div className="absolute top-4 right-4 flex gap-2">
                   <button onClick={() => handleEdit(slide)} className="bg-primary text-white p-2 rounded-full shadow-lg hover:bg-accent"><FaEdit /></button>
                   <button onClick={() => deleteSlide(slide._id)} className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"><FaTrash /></button>
                </div>
                <div className="absolute bottom-4 left-4">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${slide.isActive ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                      {slide.isActive ? 'Active' : 'Hidden'}
                   </span>
                </div>
             </div>
             <div className="p-6">
                <h3 className="font-black text-primary text-lg mb-1 truncate">{slide.title}</h3>
                <p className="text-gray-500 text-xs mb-4 truncate">{slide.subtitle}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Order: {slide.order}</span>
                   <a href={slide.link} target="_blank" className="text-accent font-bold text-xs uppercase tracking-widest">Preview Link →</a>
                </div>
             </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
           <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden">
              <div className="bg-primary p-8 text-white flex justify-between items-center">
                 <h3 className="font-black text-xl uppercase tracking-widest">Create Hero Slide</h3>
                 <button onClick={() => setShowModal(false)} className="text-3xl hover:text-accent">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="p-10 grid grid-cols-2 gap-6">
                 <div className="col-span-2">
                    <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2">Main Title *</label>
                    <input type="text" required className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-accent outline-none" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                 </div>
                 <div className="col-span-2">
                    <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2">Subtitle / Description</label>
                    <textarea rows="2" className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-accent outline-none" value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2">Button Text</label>
                    <input type="text" className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-accent outline-none" value={formData.buttonText} onChange={(e) => setFormData({...formData, buttonText: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2">Button Link (URL)</label>
                    <input type="text" placeholder="/admission" className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-accent outline-none" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2">Display Order</label>
                    <input type="number" className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-accent outline-none" value={formData.order} onChange={(e) => setFormData({...formData, order: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2">Background Image *</label>
                    <input type="file" required onChange={(e) => setImage(e.target.files[0])} className="text-xs" />
                 </div>
                 <div className="col-span-2 flex gap-4 mt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-5 py-3 border-2 border-gray-100 font-black uppercase text-xs tracking-widest rounded-2xl">Cancel</button>
                    <button type="submit" className="flex-1 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-accent transition shadow-xl">Publish Slide</button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageHero;
