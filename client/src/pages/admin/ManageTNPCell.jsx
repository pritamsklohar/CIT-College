import { useState, useEffect } from 'react';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { FaSave, FaChartBar } from 'react-icons/fa';

const ManageTNPCell = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    tnpHighestPackage: '',
    tnpAveragePackage: '',
    tnpStudentsPlaced: '',
    tnpPartnerships: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await API.get('/settings');
      if (res.data.data) {
        setFormData({
          tnpHighestPackage: res.data.data.tnpHighestPackage || '18 LPA',
          tnpAveragePackage: res.data.data.tnpAveragePackage || '4.5 LPA',
          tnpStudentsPlaced: res.data.data.tnpStudentsPlaced || '85%',
          tnpPartnerships: res.data.data.tnpPartnerships || '150+'
        });
      }
    } catch (err) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.put('/settings', formData);
      toast.success('T&P Statistics updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update stats');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaChartBar className="text-primary" /> Manage T&P Statistics
        </h1>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-accent transition flex items-center gap-2"
        >
          <FaSave /> {submitting ? 'Saving...' : 'Save Statistics'}
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border">
        <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Placement Highlights</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Highest Package</label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none font-semibold text-lg"
              placeholder="e.g. 18 LPA"
              value={formData.tnpHighestPackage}
              onChange={(e) => setFormData({ ...formData, tnpHighestPackage: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">Displayed on the first statistic card.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Average Package</label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none font-semibold text-lg"
              placeholder="e.g. 4.5 LPA"
              value={formData.tnpAveragePackage}
              onChange={(e) => setFormData({ ...formData, tnpAveragePackage: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">Displayed on the second statistic card.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Students Placed</label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none font-semibold text-lg"
              placeholder="e.g. 85%"
              value={formData.tnpStudentsPlaced}
              onChange={(e) => setFormData({ ...formData, tnpStudentsPlaced: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">Displayed on the third statistic card.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Corporate Partnerships</label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none font-semibold text-lg"
              placeholder="e.g. 150+"
              value={formData.tnpPartnerships}
              onChange={(e) => setFormData({ ...formData, tnpPartnerships: e.target.value })}
            />
            <p className="text-xs text-gray-500 mt-1">Displayed on the fourth statistic card.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageTNPCell;
