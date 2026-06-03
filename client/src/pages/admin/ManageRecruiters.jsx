import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaCheckCircle, FaGlobe } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '', website: '', sector: '', isActive: true, order: 0
  });
  const [logo, setLogo] = useState(null);

  const fetchRecruiters = async () => {
    const res = await API.get('/recruiters');
    setRecruiters(res.data.data);
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (logo) data.append('logo', logo);

    try {
      await API.post('/recruiters', data);
      toast.success('Recruiter added');
      setShowModal(false);
      fetchRecruiters();
    } catch (err) {
      toast.error('Failed to add');
    }
  };

  const deleteRecruiter = async (id) => {
    if (!window.confirm('Delete this recruiter?')) return;
    try {
      await API.delete(`/recruiters/${id}`);
      toast.success('Deleted');
      fetchRecruiters();
    } catch (err) {}
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Placement Partners</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-accent transition"
        >
          <FaPlus /> Add Recruiter
        </button>
      </div>

      {recruiters.length === 0 ? (
        <div className="text-center text-gray-500 py-10 bg-white rounded-2xl shadow-sm border col-span-full">
          No recruiters added yet. Click "Add Recruiter" to add one!
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {recruiters.map(r => (
            <div key={r._id} className="bg-white p-4 rounded-2xl shadow-sm border relative group flex flex-col items-center">
               <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                  <button onClick={() => deleteRecruiter(r._id)} className="text-red-500 hover:text-red-700 bg-white p-1 rounded shadow-md"><FaTrash /></button>
               </div>
               <div className="h-20 w-full flex items-center justify-center mb-4">
                  <img src={r.logoUrl} className="max-h-full max-w-full object-contain" />
               </div>
               <div className="text-center">
                  <h4 className="text-xs font-black text-gray-700 truncate w-24 uppercase tracking-tighter">{r.companyName}</h4>
                  <p className="text-[10px] text-gray-400 font-bold">{r.sector}</p>
               </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
           <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-lg rounded-2xl shadow-2xl">
              <div className="bg-primary p-6 text-white flex justify-between items-center">
                 <h3 className="font-bold text-lg">Add Placement Partner</h3>
                 <button onClick={() => setShowModal(false)} className="text-2xl">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company Name *</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-lg" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Sector</label>
                       <input type="text" placeholder="e.g. IT, Banking" className="w-full px-4 py-2 border rounded-lg" value={formData.sector} onChange={(e) => setFormData({...formData, sector: e.target.value})} />
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Website</label>
                       <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company Logo *</label>
                    <input type="file" required onChange={(e) => setLogo(e.target.files[0])} />
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border font-bold rounded-lg">Cancel</button>
                    <button type="submit" className="flex-1 bg-primary text-white font-bold rounded-lg hover:bg-accent transition">Save Partner</button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageRecruiters;
