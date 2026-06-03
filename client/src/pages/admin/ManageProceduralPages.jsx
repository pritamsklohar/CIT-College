import { useState, useEffect } from 'react';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';

const ManageProceduralPages = () => {
  const [pagesList, setPagesList] = useState([]);
  const [activeSlug, setActiveSlug] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    slug: '',
    pageTitle: '',
    pageSubtitle: '',
    heroIcon: '',
    noticeTitle: '',
    noticeContent: '',
    noticeType: 'yellow',
    documents: [],
    feesTitle: '',
    fees: [],
    feeNote: '',
    stepsTitle: '',
    steps: [],
    downloadLink: ''
  });

  // Fetch list of pages on load
  useEffect(() => {
    fetchPagesList();
  }, []);

  // Fetch specific page details when activeSlug changes
  useEffect(() => {
    if (activeSlug) {
      fetchPageDetails(activeSlug);
    }
  }, [activeSlug]);

  const fetchPagesList = async () => {
    try {
      const res = await API.get('/procedural-pages');
      if (res.data.success && res.data.data.length > 0) {
        setPagesList(res.data.data);
        setActiveSlug(res.data.data[0].slug); // Default to first page
      }
    } catch (err) {
      toast.error('Failed to fetch procedural pages list');
    } finally {
      setLoading(false);
    }
  };

  const fetchPageDetails = async (slug) => {
    setLoading(true);
    try {
      const res = await API.get(`/procedural-pages/${slug}`);
      if (res.data.success && res.data.data) {
        setFormData(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load page data');
    } finally {
      setLoading(false);
    }
  };

  // Helper arrays for adding new items
  const addDocument = () => setFormData({ ...formData, documents: [...formData.documents, { icon: 'FaCheck', title: '', desc: '' }] });
  const addFee = () => setFormData({ ...formData, fees: [...formData.fees, { label: '', amount: '' }] });
  const addStep = () => setFormData({ ...formData, steps: [...formData.steps, { title: '', desc: '' }] });

  // Helpers for removing items
  const removeDocument = (index) => setFormData({ ...formData, documents: formData.documents.filter((_, i) => i !== index) });
  const removeFee = (index) => setFormData({ ...formData, fees: formData.fees.filter((_, i) => i !== index) });
  const removeStep = (index) => setFormData({ ...formData, steps: formData.steps.filter((_, i) => i !== index) });

  // Helpers for handling dynamic array updates
  const handleDocumentChange = (i, field, value) => {
    const newDocs = [...formData.documents];
    newDocs[i][field] = value;
    setFormData({ ...formData, documents: newDocs });
  };
  const handleFeeChange = (i, field, value) => {
    const newFees = [...formData.fees];
    newFees[i][field] = value;
    setFormData({ ...formData, fees: newFees });
  };
  const handleStepChange = (i, field, value) => {
    const newSteps = [...formData.steps];
    newSteps[i][field] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const savePromise = API.put(`/procedural-pages/${activeSlug}`, formData);
    
    toast.promise(savePromise, {
      loading: 'Saving changes...',
      success: 'Page updated successfully!',
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

  if (loading && pagesList.length === 0) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      
      {/* Top Header & Selector */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Manage Service Pages</h2>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <select 
            value={activeSlug} 
            onChange={(e) => setActiveSlug(e.target.value)}
            className="p-2 border border-primary rounded font-bold text-primary focus:outline-none"
          >
            {pagesList.map(page => (
              <option key={page.slug} value={page.slug}>{page.pageTitle}</option>
            ))}
          </select>
          
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition"
          >
            <FaSave /> Save Changes
          </button>
        </div>
      </div>

      {loading && pagesList.length > 0 ? (
        <div className="py-20 text-center text-gray-400">Loading page details...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Header Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold text-primary mb-4 border-b pb-2">Header Section</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={formData.pageTitle}
                  onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Background Icon (React Icon)</label>
                <input
                  type="text"
                  value={formData.heroIcon}
                  onChange={(e) => setFormData({ ...formData, heroIcon: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Subtitle</label>
                <textarea
                  value={formData.pageSubtitle}
                  onChange={(e) => setFormData({ ...formData, pageSubtitle: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  rows="2"
                  required
                />
              </div>
            </div>
          </div>

          {/* Important Notice Alert */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold text-primary mb-4 border-b pb-2">Alert Notice Box</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notice Title</label>
                <input
                  type="text"
                  value={formData.noticeTitle}
                  onChange={(e) => setFormData({ ...formData, noticeTitle: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Alert Color Theme</label>
                <select
                  value={formData.noticeType}
                  onChange={(e) => setFormData({ ...formData, noticeType: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="yellow">Yellow (Warning)</option>
                  <option value="red">Red (Critical)</option>
                  <option value="blue">Blue (Info)</option>
                  <option value="green">Green (Success)</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notice Content</label>
                <textarea
                  value={formData.noticeContent}
                  onChange={(e) => setFormData({ ...formData, noticeContent: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="2"
                  required
                />
              </div>
            </div>
          </div>

          {/* Required Documents Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-primary">Required Documents Checklist</h3>
              <button type="button" onClick={addDocument} className="flex items-center gap-1 bg-accent text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition">
                <FaPlus /> Add Document
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.documents.map((obj, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded border relative">
                  <div className="w-full md:w-1/4">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Icon Name</label>
                    <input type="text" value={obj.icon} onChange={(e) => handleDocumentChange(i, 'icon', e.target.value)} className="w-full p-2 border rounded text-sm" />
                  </div>
                  <div className="w-full md:w-1/4">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Document Title</label>
                    <input type="text" value={obj.title} onChange={(e) => handleDocumentChange(i, 'title', e.target.value)} className="w-full p-2 border rounded text-sm" required />
                  </div>
                  <div className="w-full md:w-2/4">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Description</label>
                    <input type="text" value={obj.desc} onChange={(e) => handleDocumentChange(i, 'desc', e.target.value)} className="w-full p-2 border rounded text-sm" required />
                  </div>
                  <button type="button" onClick={() => removeDocument(i)} className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Structure Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-primary">Fee Structure</h3>
              <button type="button" onClick={addFee} className="flex items-center gap-1 bg-accent text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition">
                <FaPlus /> Add Fee Item
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
               <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Section Title</label>
                  <input type="text" value={formData.feesTitle} onChange={(e) => setFormData({ ...formData, feesTitle: e.target.value })} className="w-full p-2 border rounded" required />
               </div>
            </div>

            <div className="space-y-4 mb-4">
              {formData.fees.map((obj, i) => (
                <div key={i} className="flex gap-4 bg-white p-4 rounded border relative">
                  <div className="w-1/2">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Fee Label</label>
                    <input type="text" value={obj.label} onChange={(e) => handleFeeChange(i, 'label', e.target.value)} className="w-full p-2 border rounded text-sm" required />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Amount (e.g. ~ ₹ 500)</label>
                    <input type="text" value={obj.amount} onChange={(e) => handleFeeChange(i, 'amount', e.target.value)} className="w-full p-2 border rounded text-sm text-accent font-bold" required />
                  </div>
                  <button type="button" onClick={() => removeFee(i)} className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Important Fee Note (Italicized text at bottom)</label>
              <textarea value={formData.feeNote} onChange={(e) => setFormData({ ...formData, feeNote: e.target.value })} className="w-full p-2 border rounded text-sm" rows="2" />
            </div>
          </div>

          {/* Application Steps Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-primary">Application Flow Steps</h3>
              <button type="button" onClick={addStep} className="flex items-center gap-1 bg-accent text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition">
                <FaPlus /> Add Step
              </button>
            </div>
            
            <div className="mb-4">
               <label className="block text-xs font-bold text-gray-500 mb-1">Timeline Title</label>
               <input type="text" value={formData.stepsTitle} onChange={(e) => setFormData({ ...formData, stepsTitle: e.target.value })} className="w-full p-2 border rounded" required />
            </div>

            <div className="space-y-4">
              {formData.steps.map((obj, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded border relative">
                  <div className="w-full md:w-1/3">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Step {i + 1} Title</label>
                    <input type="text" value={obj.title} onChange={(e) => handleStepChange(i, 'title', e.target.value)} className="w-full p-2 border rounded text-sm" required />
                  </div>
                  <div className="w-full md:w-2/3">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Description</label>
                    <input type="text" value={obj.desc} onChange={(e) => handleStepChange(i, 'desc', e.target.value)} className="w-full p-2 border rounded text-sm" required />
                  </div>
                  <button type="button" onClick={() => removeStep(i)} className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-bold text-primary mb-4 border-b pb-2">Action Buttons</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Download Link URL</label>
              <input
                type="text"
                value={formData.downloadLink}
                onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="https://btu.ac.in"
              />
            </div>
          </div>

        </form>
      )}
    </div>
  );
};

export default ManageProceduralPages;
