import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaToggleOn, FaToggleOff, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'Important', isActive: true, date: new Date().toISOString().split('T')[0]
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await API.get('/notices');
      setNotices(res.data.data);
    } catch (err) {}
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append('file', file);

    try {
      if (editId) {
        await API.put(`/notices/${editId}`, data);
        toast.success('Notice updated');
      } else {
        await API.post('/notices', data);
        toast.success('Notice added');
      }
      setShowModal(false);
      setEditId(null);
      fetchNotices();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (notice) => {
    setEditId(notice._id);
    setFormData({
      title: notice.title,
      description: notice.description,
      category: notice.category,
      isActive: notice.isActive,
      date: new Date(notice.date).toISOString().split('T')[0]
    });
    setFile(null);
    setShowModal(true);
  };

  const toggleStatus = async (id) => {
    try {
      await API.patch(`/notices/${id}/toggle`);
      fetchNotices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    }
  };

  const deleteNotice = async (id) => {
    try {
      await API.delete(`/notices/${id}`);
      toast.success('Deleted');
      fetchNotices();
    } catch (err) {}
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Notices</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-accent transition"
        >
          <FaPlus /> Add New Notice
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-700">Date</th>
              <th className="px-6 py-4 font-bold text-gray-700">Title</th>
              <th className="px-6 py-4 font-bold text-gray-700">Category</th>
              <th className="px-6 py-4 font-bold text-gray-700">Status</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {notices.map(notice => (
              <tr key={notice._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm">{new Date(notice.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">{notice.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    notice.category === 'Important' ? 'bg-red-100 text-red-600' : 
                    notice.category === 'Exam' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {notice.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                   <button onClick={() => toggleStatus(notice._id)} className="text-2xl">
                      {notice.isActive ? <FaToggleOn className="text-green-500" /> : <FaToggleOff className="text-gray-300" />}
                   </button>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                   <button onClick={() => handleEdit(notice)} className="text-primary hover:text-blue-700 p-2"><FaEdit /></button>
                   <button onClick={() => deleteNotice(notice._id)} className="text-red-500 hover:text-red-700 p-2"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
           >
              <div className="bg-primary p-6 text-white flex justify-between items-center">
                 <h3 className="font-bold text-lg">Add New Notice</h3>
                 <button onClick={() => setShowModal(false)} className="text-2xl">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Notice Title *</label>
                    <input 
                      type="text" required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                      <select 
                        className="w-full px-4 py-2 border rounded-lg"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                         <option value="Important">Important</option>
                         <option value="Exam">Exam Notice</option>
                         <option value="Media">CIT In Media</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                      <input 
                        type="date"
                        className="w-full px-4 py-2 border rounded-lg"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">File (PDF/Image)</label>
                    <input 
                      type="file"
                      className="w-full"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border font-bold rounded-lg">Cancel</button>
                    <button type="submit" className="flex-1 bg-primary text-white font-bold rounded-lg">Save Notice</button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageNotices;
