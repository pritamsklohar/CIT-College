import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaUserShield } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageBoardMembers = () => {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', designation: '', type: 'Management', profile: '', order: 0, isActive: true
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const res = await API.get('/board-members');
    setMembers(res.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    try {
      await API.post('/board-members', data);
      toast.success('Member added');
      setShowModal(false);
      fetchMembers();
    } catch (err) {
      toast.error('Failed to add');
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm('Delete this member?')) return;
    try {
      await API.delete(`/board-members/${id}`);
      toast.success('Deleted');
      fetchMembers();
    } catch (err) {}
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Leadership</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-accent transition"
        >
          <FaPlus /> Add Board Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map(member => (
          <div key={member._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
             <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                <img src={member.imageUrl || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" />
             </div>
             <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                   <h3 className="font-bold text-gray-800 truncate">{member.name}</h3>
                   <button onClick={() => deleteMember(member._id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                </div>
                <p className="text-xs font-bold text-accent uppercase tracking-widest">{member.designation}</p>
                <div className="mt-2 inline-block px-2 py-0.5 bg-blue-50 text-primary text-[10px] font-black rounded uppercase tracking-tighter">
                   {member.type}
                </div>
             </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
           <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-xl rounded-2xl shadow-2xl">
              <div className="bg-primary p-6 text-white flex justify-between items-center">
                 <h3 className="font-bold text-lg">Add Leadership Member</h3>
                 <button onClick={() => setShowModal(false)} className="text-2xl">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                       <input type="text" required className="w-full px-4 py-2 border rounded-lg" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Designation</label>
                       <input type="text" required className="w-full px-4 py-2 border rounded-lg" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Board Type</label>
                    <select className="w-full px-4 py-2 border rounded-lg" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                       <option value="Management">Management</option>
                       <option value="AcademicAdvisory">Academic Advisory</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Short Bio/Profile</label>
                    <textarea rows="3" className="w-full px-4 py-2 border rounded-lg" value={formData.profile} onChange={(e) => setFormData({...formData, profile: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Profile Image</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border font-bold rounded-lg">Cancel</button>
                    <button type="submit" className="flex-1 bg-primary text-white font-bold rounded-lg">Save Member</button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageBoardMembers;
