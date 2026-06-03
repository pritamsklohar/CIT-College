import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaFilePdf, FaCalendarAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageAcademicCalendar = () => {
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Calendar',
    academicYear: '2023-24',
  });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    try {
      const res = await API.get('/academic-calendars');
      setCalendars(res.data.data);
    } catch (err) {
      toast.error('Failed to load calendars');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return toast.error('Please select a PDF document');
    }

    setSubmitting(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('type', formData.type);
    data.append('academicYear', formData.academicYear);
    data.append('file', file);

    try {
      await API.post('/academic-calendars', data);
      toast.success('Calendar added successfully');
      setShowForm(false);
      setFormData({ title: '', description: '', type: 'Calendar', academicYear: '2023-24' });
      setFile(null);
      fetchCalendars();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add calendar');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this calendar?')) {
      try {
        await API.delete(`/academic-calendars/${id}`);
        toast.success('Deleted successfully');
        fetchCalendars();
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaCalendarAlt className="text-primary" /> Manage Academic Calendar
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-accent transition flex items-center gap-2"
        >
          <FaPlus /> {showForm ? 'Cancel' : 'Add New Document'}
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-sm border mb-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Document Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Academic Year</label>
              <input
                type="text"
                required
                placeholder="e.g., 2023-24"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="Calendar">Academic Calendar</option>
                <option value="Exam Schedule">Exam Schedule</option>
                <option value="Holiday List">Holiday List</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">PDF Document</label>
              <input
                type="file"
                accept=".pdf"
                required
                className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Description (Optional)</label>
              <textarea
                rows="2"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-accent transition"
            >
              {submitting ? 'Uploading...' : 'Save Document'}
            </button>
          </div>
        </motion.form>
      )}

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : calendars.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No documents added yet.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-600 font-bold text-sm uppercase">
              <tr>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Type & Year</th>
                <th className="px-6 py-4 text-left">Document</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {calendars.map((calendar) => (
                <tr key={calendar._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-bold text-primary">{calendar.title}</p>
                    {calendar.description && <p className="text-xs text-gray-500 mt-1">{calendar.description}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold">{calendar.type}</span>
                    <span className="block text-xs text-gray-500 mt-1">{calendar.academicYear}</span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={calendar.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 font-bold text-sm"
                    >
                      <FaFilePdf /> View PDF
                    </a>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(calendar._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageAcademicCalendar;
