import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaFlask } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', slug: '', description: '', vision: '', mission: '', isActive: true
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const res = await API.get('/departments');
    setDepartments(res.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    try {
      // Assuming a POST /api/departments exists in backend
      await API.post('/departments', data);
      toast.success('Department created');
      setShowModal(false);
      fetchDepartments();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const deleteDept = async (id) => {
    try {
      await API.delete(`/departments/${id}`);
      toast.success('Deleted');
      fetchDepartments();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Departments</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-accent transition"
        >
          <FaPlus /> New Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map(dept => (
          <div key={dept._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
             <div>
                <div className="flex justify-between items-start mb-4">
                   <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-xl"><FaFlask /></div>
                   <button onClick={() => deleteDept(dept._id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{dept.name}</h3>
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">Slug: {dept.slug}</p>
                <p className="text-sm text-gray-500 line-clamp-3 mb-6" dangerouslySetInnerHTML={{ __html: dept.description }}></p>
             </div>
             <Link to={`/academics/departments/${dept.slug}`} className="text-center bg-gray-50 py-2 rounded-xl text-xs font-bold text-primary hover:bg-primary hover:text-white transition uppercase tracking-wider">
                View Public Page
             </Link>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4 overflow-y-auto">
           <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl my-8">
              <div className="bg-primary p-6 text-white flex justify-between items-center">
                 <h3 className="font-bold text-lg">Create New Academic Department</h3>
                 <button onClick={() => setShowModal(false)} className="text-2xl">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Department Name</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-lg" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">URL Slug (lowercase)</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-lg" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase()})} />
                 </div>
                 <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea rows="3" className="w-full px-4 py-2 border rounded-lg" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Vision</label>
                    <textarea rows="2" className="w-full px-4 py-2 border rounded-lg" value={formData.vision} onChange={(e) => setFormData({...formData, vision: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mission</label>
                    <textarea rows="2" className="w-full px-4 py-2 border rounded-lg" value={formData.mission} onChange={(e) => setFormData({...formData, mission: e.target.value})} />
                 </div>
                 <div className="col-span-2 pt-4">
                    <button type="submit" className="w-full bg-primary text-white font-black py-3 rounded-xl hover:bg-accent transition shadow-xl uppercase tracking-widest">Register Department</button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
};

import { Link } from 'react-router-dom';
export default ManageDepartments;
