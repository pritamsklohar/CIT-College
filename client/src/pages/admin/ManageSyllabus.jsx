import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageSyllabus = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', department: 'Computer Science Engineering', semester: 'III Semester', type: 'Syllabus', order: 0
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const departments = ['Computer Science Engineering', 'Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Humanities & Sciences', 'General'];
  const semesters = ['1st Year (Sem I & II)', 'III Semester', 'IV Semester', 'V Semester', 'VI Semester', 'VII Semester', 'VIII Semester', 'General'];
  const types = ['Scheme', 'Syllabus', 'Scheme & Syllabus'];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await API.get('/syllabus');
      setItems(res.data.data);
    } catch (err) {
      toast.error('Failed to load syllabus items');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !editId) {
      toast.error('Please upload a PDF document');
      return;
    }
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append('file', file);

    try {
      if (editId) {
        await API.put(`/syllabus/${editId}`, data);
        toast.success('Document updated successfully');
      } else {
        await API.post('/syllabus', data);
        toast.success('Document created successfully');
      }
      setShowModal(false);
      setFile(null);
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      title: item.title,
      department: item.department,
      semester: item.semester,
      type: item.type,
      order: item.order || 0
    });
    setFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this syllabus/scheme document?')) return;
    try {
      await API.delete(`/syllabus/${id}`);
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
          <h1 className="text-2xl font-black text-primary uppercase">Manage Scheme & Syllabus</h1>
          <p className="text-gray-500 text-sm">Upload schemes, syllabi, and official curriculum PDFs</p>
        </div>
        <button 
          onClick={() => { 
            setShowModal(true); 
            setEditId(null); 
            setFormData({title: '', department: 'Computer Science Engineering', semester: 'III Semester', type: 'Syllabus', order: 0});
            setFile(null);
          }}
          className="bg-primary text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-accent transition shadow-lg"
        >
          <FaPlus /> Add Document
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50/50">
                <th className="py-5 px-6 font-black text-gray-400 uppercase tracking-widest text-xs border-b">Order</th>
                <th className="py-5 px-6 font-black text-gray-400 uppercase tracking-widest text-xs border-b">Document Title</th>
                <th className="py-5 px-6 font-black text-gray-400 uppercase tracking-widest text-xs border-b">Department</th>
                <th className="py-5 px-6 font-black text-gray-400 uppercase tracking-widest text-xs border-b">Semester</th>
                <th className="py-5 px-6 font-black text-gray-400 uppercase tracking-widest text-xs border-b">Type</th>
                <th className="py-5 px-6 font-black text-gray-400 uppercase tracking-widest text-xs border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id} className="hover:bg-gray-50/50 transition">
                  <td className="py-4 px-6 border-b text-gray-400 font-bold">{item.order}</td>
                  <td className="py-4 px-6 border-b">
                    <div className="flex items-center gap-3">
                      <FaFilePdf className="text-red-500 text-xl flex-shrink-0" />
                      <span className="font-bold text-primary">{item.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 border-b text-gray-600 font-semibold">{item.department}</td>
                  <td className="py-4 px-6 border-b text-accent font-bold text-sm">{item.semester}</td>
                  <td className="py-4 px-6 border-b">
                    <span className="bg-blue-50 text-primary px-2.5 py-1 rounded-md font-bold text-xs">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 border-b">
                    <div className="flex gap-2">
                      <a href={item.fileUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:bg-gray-50 p-2 rounded-lg border transition">
                        <FaExternalLinkAlt />
                      </a>
                      <button onClick={() => handleEdit(item)} className="text-primary hover:bg-blue-50 p-2 rounded-lg border border-blue-100 transition">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg border border-red-100 transition">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-400 font-semibold italic">No syllabus documents found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 overflow-y-auto">
           <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl my-8">
              <div className="bg-primary p-6 text-white flex justify-between items-center">
                 <h3 className="font-bold text-lg">{editId ? 'Edit Syllabus Document' : 'Upload Syllabus Document'}</h3>
                 <button onClick={() => setShowModal(false)} className="text-2xl font-black">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Document Title</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Department</label>
                      <select className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>
                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Semester</label>
                      <select className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})}>
                        {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Document Type</label>
                      <select className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                        {types.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Display Order</label>
                      <input type="number" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" value={formData.order} onChange={(e) => setFormData({...formData, order: e.target.value})} />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">PDF File</label>
                      <input type="file" accept="application/pdf" className="w-full px-4 py-1.5 border rounded-lg" onChange={(e) => setFile(e.target.files[0])} />
                   </div>
                 </div>

                 <div className="flex gap-4 pt-4 border-t mt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 border font-bold rounded-lg">Cancel</button>
                    <button type="submit" disabled={loading} className="flex-1 bg-primary text-white font-bold rounded-lg py-3 hover:bg-accent transition disabled:opacity-50">
                      {loading ? 'Saving...' : 'Save Document'}
                    </button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageSyllabus;
