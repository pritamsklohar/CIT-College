import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', company: '', batch: '', message: '', rating: 5, isActive: true
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    // Assuming /testimonials route exists
    const res = await API.get('/testimonials');
    setTestimonials(res.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    try {
      await API.post('/testimonials', data);
      toast.success('Testimonial saved');
      setShowModal(false);
      fetchTestimonials();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Student Success Stories</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-accent transition"
        >
          <FaPlus /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(t => (
          <div key={t._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
             <div>
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-14 h-14 bg-gray-50 rounded-full overflow-hidden shrink-0 border-2 border-accent p-0.5">
                      <img src={t.imageUrl || 'https://via.placeholder.com/150'} className="w-full h-full object-cover rounded-full" />
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-800 leading-none">{t.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{t.company} | Batch {t.batch}</p>
                   </div>
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed line-clamp-4">"{t.message}"</p>
             </div>
             <div className="mt-6 pt-4 border-t flex justify-between items-center">
                <div className="flex text-accent text-xs">
                   {[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}
                </div>
                <button className="text-red-400 hover:text-red-600 transition"><FaTrash /></button>
             </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
           <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-xl rounded-2xl shadow-2xl">
              <div className="bg-primary p-6 text-white flex justify-between items-center">
                 <h3 className="font-bold text-lg">Add New Testimonial</h3>
                 <button onClick={() => setShowModal(false)} className="text-2xl">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Student Name" required className="px-4 py-2 border rounded-lg" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    <input type="text" placeholder="Placed At (Company)" className="px-4 py-2 border rounded-lg" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Batch Year" className="px-4 py-2 border rounded-lg" value={formData.batch} onChange={(e) => setFormData({...formData, batch: e.target.value})} />
                    <select className="px-4 py-2 border rounded-lg" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})}>
                       {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                    </select>
                 </div>
                 <textarea placeholder="Success Message" rows="4" required className="w-full px-4 py-2 border rounded-lg" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                 <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border font-bold rounded-lg text-sm">Cancel</button>
                    <button type="submit" className="flex-1 bg-primary text-white font-bold rounded-lg text-sm uppercase tracking-widest py-3">Save Story</button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageTestimonials;
