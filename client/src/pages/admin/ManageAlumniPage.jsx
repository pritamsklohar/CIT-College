import { useState, useEffect } from 'react';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';

const ManageAlumniPage = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    pageTitle: '',
    pageSubtitle: '',
    heroImageUrl: '',
    aboutTitle: '',
    aboutContent: '',
    objectives: []
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const res = await API.get('/alumni-page');
      if (res.data.success && res.data.data) {
        setFormData(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to fetch alumni page settings');
    } finally {
      setLoading(false);
    }
  };

  const handleObjectiveChange = (index, field, value) => {
    const updatedObjectives = [...formData.objectives];
    updatedObjectives[index][field] = value;
    setFormData({ ...formData, objectives: updatedObjectives });
  };

  const addObjective = () => {
    setFormData({
      ...formData,
      objectives: [...formData.objectives, { icon: 'FaCheck', title: '', desc: '' }]
    });
  };

  const removeObjective = (index) => {
    const updatedObjectives = formData.objectives.filter((_, i) => i !== index);
    setFormData({ ...formData, objectives: updatedObjectives });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('pageTitle', formData.pageTitle);
    data.append('pageSubtitle', formData.pageSubtitle);
    data.append('aboutTitle', formData.aboutTitle);
    data.append('aboutContent', formData.aboutContent);
    data.append('objectives', JSON.stringify(formData.objectives));
    
    if (imageFile) {
      data.append('heroImage', imageFile);
    } else {
      data.append('heroImageUrl', formData.heroImageUrl); // Keep existing if no new file
    }

    const savePromise = API.put('/alumni-page', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    toast.promise(savePromise, {
      loading: 'Saving changes...',
      success: 'Alumni page updated successfully!',
      error: 'Failed to update page'
    });

    try {
      const res = await savePromise;
      if (res.data.success) {
        setFormData(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Alumni Page</h2>
        <button 
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition"
        >
          <FaSave /> Save Changes
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Header Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-primary mb-4 border-b pb-2">Hero Section</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
              <input
                type="text"
                value={formData.pageTitle}
                onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Page Subtitle</label>
              <textarea
                value={formData.pageSubtitle}
                onChange={(e) => setFormData({ ...formData, pageSubtitle: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                rows="2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hero Background Image (Upload File)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {formData.heroImageUrl && !imageFile && (
                <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
                  <span>Current Image:</span>
                  <img src={formData.heroImageUrl} alt="Current hero" className="h-8 w-12 object-cover rounded" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-primary mb-4 border-b pb-2">About Section</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Title</label>
              <input
                type="text"
                value={formData.aboutTitle}
                onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Content (Supports multi-line)</label>
              <textarea
                value={formData.aboutContent}
                onChange={(e) => setFormData({ ...formData, aboutContent: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary h-32"
                required
              />
            </div>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-lg font-bold text-primary">Key Objectives / Features</h3>
            <button 
              type="button" 
              onClick={addObjective}
              className="flex items-center gap-1 bg-accent text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition"
            >
              <FaPlus /> Add Objective
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.objectives.map((obj, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded border relative">
                <div className="w-full md:w-1/4">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Icon Name (React Icons)</label>
                  <input
                    type="text"
                    value={obj.icon}
                    onChange={(e) => handleObjectiveChange(index, 'icon', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="e.g. FaNetworkWired"
                  />
                </div>
                <div className="w-full md:w-1/4">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Title</label>
                  <input
                    type="text"
                    value={obj.title}
                    onChange={(e) => handleObjectiveChange(index, 'title', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    required
                  />
                </div>
                <div className="w-full md:w-2/4">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Description</label>
                  <textarea
                    value={obj.desc}
                    onChange={(e) => handleObjectiveChange(index, 'desc', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    rows="2"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeObjective(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </form>
    </div>
  );
};

export default ManageAlumniPage;
