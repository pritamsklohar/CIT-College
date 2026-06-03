import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaLink, FaImage } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageRecognitions = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', websiteUrl: '', order: 0
  });
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await API.get('/recognitions');
      setItems(res.data.data);
    } catch (err) {
      toast.error('Failed to load recognition records');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (logo) data.append('logo', logo);

    try {
      if (editId) {
        await API.put(`/recognitions/${editId}`, data);
        toast.success('Accreditation/Recognition updated successfully');
      } else {
        await API.post('/recognitions', data);
        toast.success('Accreditation/Recognition created successfully');
      }
      setShowModal(false);
      setLogo(null);
      fetchItems();
    } catch (err) {
      toast.error('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      title: item.title,
      description: item.description,
      websiteUrl: item.websiteUrl || '',
      order: item.order || 0
    });
    setLogo(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recognition entry?')) return;
    try {
      await API.delete(`/recognitions/${id}`);
      toast.success('Deleted successfully');
      fetchItems();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-primary uppercase">Manage Recognition & Affiliations</h1>
          <p className="text-gray-500 text-sm">Add, edit, or remove accrediting bodies and affiliations</p>
        </div>
        <button 
          onClick={() => { 
            setShowModal(true); 
            setEditId(null); 
            setFormData({title: '', description: '', websiteUrl: '', order: 0});
            setLogo(null);
          }}
          className="bg-primary text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-accent transition shadow-lg"
        >
          <FaPlus /> Add New Recognition
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => (
          <div key={item._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-6 hover:shadow-md transition">
             <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border flex-shrink-0 flex items-center justify-center p-2">
                {item.logoUrl ? (
                  <img src={item.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                ) : (
                  <FaImage className="text-gray-300 text-3xl" />
                )}
             </div>
             <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                   <h3 className="font-bold text-primary truncate text-lg">{item.title}</h3>
                   <p className="text-gray-600 text-sm line-clamp-3 mt-1 font-medium">{item.description}</p>
                   {item.websiteUrl && (
                     <a href={item.websiteUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline text-xs font-bold inline-flex items-center gap-1 mt-2">
                       <FaLink /> Visit Website
                     </a>
                   )}
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                   <span className="bg-blue-50 text-primary font-bold text-xs px-2.5 py-1 rounded-md">Order: {item.order}</span>
                   <div className="flex gap-2">
                      <button onClick={() => handleEdit(item)} className="text-primary hover:bg-blue-50 p-2 rounded-lg border border-blue-100 transition"><FaEdit /></button>
                      <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg border border-red-100 transition"><FaTrash /></button>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 overflow-y-auto">
           <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl my-8">
              <div className="bg-primary p-6 text-white flex justify-between items-center">
                 <h3 className="font-bold text-lg">{editId ? 'Edit Recognition Entry' : 'Add Recognition Entry'}</h3>
                 <button onClick={() => setShowModal(false)} className="text-2xl font-black">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Body/Organization Title</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Description / Affiliation Text</label>
                    <textarea rows="4" required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Website URL</label>
                      <input type="url" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" value={formData.websiteUrl} onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})} />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Display Order (Lower order comes first)</label>
                      <input type="number" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" value={formData.order} onChange={(e) => setFormData({...formData, order: e.target.value})} />
                   </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Logo / Image</label>
                    <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
                 </div>
                 <div className="flex gap-4 pt-4 border-t mt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 border font-bold rounded-lg">Cancel</button>
                    <button type="submit" disabled={loading} className="flex-1 bg-primary text-white font-bold rounded-lg py-3 hover:bg-accent transition disabled:opacity-50">
                      {loading ? 'Saving...' : 'Save Profile'}
                    </button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageRecognitions;
