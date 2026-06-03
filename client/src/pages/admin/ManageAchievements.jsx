import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', studentName: '', category: 'Academic', description: '', date: '', isActive: true
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await API.get('/achievements');
      setAchievements(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch achievements');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    try {
      if (editId) {
        await API.put(`/achievements/${editId}`, data);
        toast.success('Achievement updated');
      } else {
        await API.post('/achievements', data);
        toast.success('Achievement added');
      }
      setShowModal(false);
      fetchAchievements();
      resetForm();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (ach) => {
    setEditId(ach._id);
    setFormData({
      title: ach.title,
      studentName: ach.studentName,
      category: ach.category,
      description: ach.description,
      date: ach.date ? ach.date.split('T')[0] : '',
      isActive: ach.isActive !== undefined ? ach.isActive : true
    });
    setImage(null);
    setShowModal(true);
  };

  const deleteAchievement = async (id) => {
    if(!window.confirm('Are you sure you want to delete this achievement?')) return;
    try {
      await API.delete(`/achievements/${id}`);
      toast.success('Achievement deleted');
      fetchAchievements();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', studentName: '', category: 'Academic', description: '', date: '', isActive: true });
    setImage(null);
    setEditId(null);
  };

  const handleAddNew = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Manage Student Achievements</h1>
        <button 
          onClick={handleAddNew}
          className="bg-primary text-white px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-accent transition shadow-lg"
        >
          <FaPlus /> Add Achievement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map(ach => (
          <div key={ach._id} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 group">
             <div className="relative h-48">
                <img src={ach.imageUrl || 'https://via.placeholder.com/500x400?text=Achievement'} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt={ach.title} />
                <div className="absolute top-4 right-4 flex gap-2">
                   <button onClick={() => handleEdit(ach)} className="bg-primary text-white p-2 rounded-full shadow-lg hover:bg-accent"><FaEdit /></button>
                   <button onClick={() => deleteAchievement(ach._id)} className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600"><FaTrash /></button>
                </div>
                <div className="absolute bottom-4 left-4">
                   <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-accent text-white">
                      {ach.category}
                   </span>
                </div>
             </div>
             <div className="p-6">
                <h3 className="font-black text-primary text-lg mb-1 truncate">{ach.title}</h3>
                <p className="text-gray-500 text-sm font-bold mb-2 truncate">— {ach.studentName}</p>
                <p className="text-gray-500 text-xs mb-4 line-clamp-2">{ach.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                     {new Date(ach.date).toLocaleDateString()}
                   </span>
                </div>
             </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
           <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden">
              <div className="bg-primary p-8 text-white flex justify-between items-center">
                 <h3 className="font-black text-xl uppercase tracking-widest">{editId ? 'Edit' : 'Add'} Achievement</h3>
                 <button onClick={() => setShowModal(false)} className="text-3xl hover:text-accent">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="p-10 grid grid-cols-2 gap-6">
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2">Title *</label>
                    <input type="text" required className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-accent outline-none" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                 </div>
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2">Student Name *</label>
                    <input type="text" required className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-accent outline-none" value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} />
                 </div>
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2">Category *</label>
                    <select required className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-accent outline-none bg-white" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                      <option value="Academic">Academic</option>
                      <option value="Sports">Sports</option>
                      <option value="Technical">Technical</option>
                      <option value="Cultural">Cultural</option>
                    </select>
                 </div>
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2">Date *</label>
                    <input type="date" required className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-accent outline-none" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                 </div>
                 <div className="col-span-2">
                    <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2">Description *</label>
                    <textarea rows="3" required className="w-full px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-accent outline-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                 </div>
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2">Image {editId ? '' : '*'}</label>
                    <input type="file" required={!editId} onChange={(e) => setImage(e.target.files[0])} className="text-xs" accept="image/*" />
                 </div>
                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-black text-primary uppercase tracking-widest mb-2">Status</label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="w-5 h-5 accent-primary" />
                      <span className="text-sm font-bold text-gray-700">Is Active</span>
                    </label>
                 </div>
                 <div className="col-span-2 flex gap-4 mt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-5 py-3 border-2 border-gray-100 font-black uppercase text-xs tracking-widest rounded-2xl">Cancel</button>
                    <button type="submit" className="flex-1 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-accent transition shadow-xl">Save Achievement</button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageAchievements;
