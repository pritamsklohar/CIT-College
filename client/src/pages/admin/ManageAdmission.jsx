import { useState, useEffect } from 'react';
import API from '../../api/axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';

const ManageAdmission = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    content: '',
    applyOnlineUrl: '',
    helplineGeneral: '',
    helplineIncharge: '',
    helplineEmail: '',
    seatMatrix: []
  });

  useEffect(() => {
    fetchAdmissionData();
  }, []);

  const fetchAdmissionData = async () => {
    try {
      const res = await API.get('/admission-page');
      setFormData(res.data.data);
    } catch (err) {
      toast.error('Failed to load admission data');
    } finally {
      setLoading(false);
    }
  };

  const handleSeatChange = (index, field, value) => {
    const newSeats = [...formData.seatMatrix];
    if (field === 'branch') {
      newSeats[index][field] = value;
    } else {
      newSeats[index][field] = Number(value) || 0;
    }
    setFormData({ ...formData, seatMatrix: newSeats });
  };

  const addBranch = () => {
    setFormData({
      ...formData,
      seatMatrix: [
        ...formData.seatMatrix, 
        { branch: 'New Branch', intake: 60, stateSeats: 42, outOfStateSeats: 9, managementSeats: 9 }
      ]
    });
  };

  const removeBranch = (index) => {
    const newSeats = [...formData.seatMatrix];
    newSeats.splice(index, 1);
    setFormData({ ...formData, seatMatrix: newSeats });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = new FormData();
    payload.append('content', formData.content);
    payload.append('applyOnlineUrl', formData.applyOnlineUrl);
    payload.append('helplineGeneral', formData.helplineGeneral);
    payload.append('helplineIncharge', formData.helplineIncharge);
    payload.append('helplineEmail', formData.helplineEmail);
    payload.append('seatMatrix', JSON.stringify(formData.seatMatrix));

    if (file) {
      payload.append('prospectusFile', file);
    }

    try {
      await API.put('/admission-page', payload);
      toast.success('Admission page updated successfully');
      fetchAdmissionData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Admission Page</h1>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-accent transition flex items-center gap-2"
        >
          <FaSave /> {submitting ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border space-y-8">
        
        {/* Basic Info & Helplines */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Admission Settings & Helplines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-bold text-gray-700 mb-2">Apply Online URL (Google Form)</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={formData.applyOnlineUrl}
                onChange={(e) => setFormData({ ...formData, applyOnlineUrl: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">General Helpline</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={formData.helplineGeneral}
                onChange={(e) => setFormData({ ...formData, helplineGeneral: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Admission Incharge</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={formData.helplineIncharge}
                onChange={(e) => setFormData({ ...formData, helplineIncharge: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={formData.helplineEmail}
                onChange={(e) => setFormData({ ...formData, helplineEmail: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Prospectus PDF (Optional Update)</label>
              <input
                type="file"
                accept=".pdf"
                className="w-full px-4 py-2 border rounded-lg text-sm"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {formData.prospectusUrl && (
                <a href={formData.prospectusUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 mt-2 block">View Current Prospectus</a>
              )}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Main Content</h2>
          <div className="h-64 mb-12">
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(val) => setFormData({ ...formData, content: val })}
              className="h-full"
            />
          </div>
        </div>

        {/* Seat Matrix */}
        <div>
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-lg font-bold text-gray-800">Courses & Seat Matrix</h2>
            <button onClick={addBranch} className="text-sm bg-gray-100 px-3 py-1 rounded text-primary font-bold hover:bg-gray-200 flex items-center gap-1">
              <FaPlus /> Add Branch
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-600">
                <tr>
                  <th className="p-3">Branch Name</th>
                  <th className="p-3 w-24">Intake</th>
                  <th className="p-3 w-28">State (70%)</th>
                  <th className="p-3 w-28">Out State (15%)</th>
                  <th className="p-3 w-28">Mgmt (15%)</th>
                  <th className="p-3 w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {formData.seatMatrix.map((seat, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <input type="text" className="w-full border rounded p-1 text-sm outline-none focus:border-primary" value={seat.branch} onChange={e => handleSeatChange(index, 'branch', e.target.value)} />
                    </td>
                    <td className="p-2">
                      <input type="number" className="w-full border rounded p-1 text-sm outline-none focus:border-primary" value={seat.intake} onChange={e => handleSeatChange(index, 'intake', e.target.value)} />
                    </td>
                    <td className="p-2">
                      <input type="number" className="w-full border rounded p-1 text-sm outline-none focus:border-primary" value={seat.stateSeats} onChange={e => handleSeatChange(index, 'stateSeats', e.target.value)} />
                    </td>
                    <td className="p-2">
                      <input type="number" className="w-full border rounded p-1 text-sm outline-none focus:border-primary" value={seat.outOfStateSeats} onChange={e => handleSeatChange(index, 'outOfStateSeats', e.target.value)} />
                    </td>
                    <td className="p-2">
                      <input type="number" className="w-full border rounded p-1 text-sm outline-none focus:border-primary" value={seat.managementSeats} onChange={e => handleSeatChange(index, 'managementSeats', e.target.value)} />
                    </td>
                    <td className="p-2 text-center">
                      <button onClick={() => removeBranch(index)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                        <FaTrash size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageAdmission;
