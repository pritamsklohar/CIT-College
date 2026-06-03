import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaUserCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageAdminStaff = () => {
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', designation: '', department: 'Academic Administration', email: '', order: 0
  });
  const [image, setImage] = useState(null);

  const departments = ['Academic Administration', 'Administration Staff'];

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    const res = await API.get('/faculty');
    const allFaculty = res.data.data;
    const adminStaff = allFaculty.filter(f => departments.includes(f.department));
    setStaff(adminStaff.sort((a, b) => a.order - b.order));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    try {
      if (editId) {
        await API.put(`/faculty/${editId}`, data);
      } else {
        await API.post('/faculty', data);
      }
      toast.success('Staff saved');
      setShowModal(false);
      fetchStaff();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (member) => {
    setEditId(member._id);
    setFormData({
      name: member.name,
      designation: member.designation,
      department: member.department,
      email: member.email || '',
      order: member.order || 0
    });
    setImage(null);
    setShowModal(true);
  };

  const deleteStaff = async (id) => {
    try {
      await API.delete(`/faculty/${id}`);
      toast.success('Deleted');
      fetchStaff();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Admin Staff</h1>
        <button 
          onClick={() => { setShowModal(true); setEditId(null); setFormData({name: '', designation: '', department: 'Academic Administration', email: '', order: 0}) }}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-accent transition"
        >
          <FaPlus /> Add New Staff
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {staff.map(member => (
          <div key={member._id} className="bg-white p-4 rounded-2xl shadow-sm border flex gap-4">
             <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                {member.imageUrl ? <img src={member.imageUrl} className="w-full h-full object-cover" /> : <FaUserCircle className="w-full h-full text-gray-300" />}
             </div>
             <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 truncate">{member.name}</h3>
                <p className="text-accent text-xs font-bold uppercase tracking-wide">{member.designation}</p>
                <p className="text-xs text-gray-500 mt-1 font-semibold">{member.department}</p>
                <div className="flex gap-2 mt-4">
                   <button onClick={() => handleEdit(member)} className="text-primary hover:bg-blue-50 p-2 rounded-lg border transition"><FaEdit /></button>
                   <button onClick={() => deleteStaff(member._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg border transition"><FaTrash /></button>
                </div>
             </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 overflow-y-auto">
           <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl my-8">
              <div className="bg-primary p-6 text-white flex justify-between items-center">
                 <h3 className="font-bold text-lg">Add/Edit Staff Profile</h3>
                 <button onClick={() => setShowModal(false)} className="text-2xl">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Full Name</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-lg" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Designation</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-lg" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Department Category</label>
                    <select className="w-full px-4 py-2 border rounded-lg" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>
                       {departments.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email Address</label>
                    <input type="email" className="w-full px-4 py-2 border rounded-lg" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Display Order (1 is first)</label>
                    <input type="number" className="w-full px-4 py-2 border rounded-lg" value={formData.order} onChange={(e) => setFormData({...formData, order: e.target.value})} />
                 </div>
                 <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Profile Image</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                 </div>
                 <div className="col-span-2 flex gap-4 pt-4 border-t mt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 border font-bold rounded-lg">Cancel</button>
                    <button type="submit" className="flex-1 bg-primary text-white font-bold rounded-lg py-3 hover:bg-accent transition">Save Profile</button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageAdminStaff;
