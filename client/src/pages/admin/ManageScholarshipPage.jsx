import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageScholarshipPage = () => {
  const [pageData, setPageData] = useState({
    introText: '',
    scholarships: [],
    contactTitle: '',
    contactPerson: '',
    assistanceTitle: '',
    assistanceDesc: '',
    assistancePhone: '',
    requiredDocuments: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const res = await API.get('/scholarship-page');
      if (res.data.success && res.data.data) {
        setPageData(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load scholarship page data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await API.put('/scholarship-page', pageData);
      toast.success('Scholarship page updated successfully!');
    } catch (err) {
      toast.error('Failed to update page');
    } finally {
      setSaving(false);
    }
  };

  const handleScholarshipChange = (index, field, value) => {
    const updated = [...pageData.scholarships];
    updated[index][field] = value;
    setPageData({ ...pageData, scholarships: updated });
  };

  const addScholarship = () => {
    setPageData({
      ...pageData,
      scholarships: [
        ...pageData.scholarships,
        {
          title: 'New Scholarship',
          eligibility: '',
          incomeCriteria: [''],
          amountMain: '',
          amountSubtext: '',
          colorTheme: 'primary'
        }
      ]
    });
  };

  const removeScholarship = (index) => {
    const updated = pageData.scholarships.filter((_, i) => i !== index);
    setPageData({ ...pageData, scholarships: updated });
  };

  const addCriteria = (scholarshipIndex) => {
    const updated = [...pageData.scholarships];
    updated[scholarshipIndex].incomeCriteria.push('');
    setPageData({ ...pageData, scholarships: updated });
  };

  const removeCriteria = (scholarshipIndex, criteriaIndex) => {
    const updated = [...pageData.scholarships];
    updated[scholarshipIndex].incomeCriteria = updated[scholarshipIndex].incomeCriteria.filter((_, i) => i !== criteriaIndex);
    setPageData({ ...pageData, scholarships: updated });
  };

  const handleCriteriaChange = (scholarshipIndex, criteriaIndex, value) => {
    const updated = [...pageData.scholarships];
    updated[scholarshipIndex].incomeCriteria[criteriaIndex] = value;
    setPageData({ ...pageData, scholarships: updated });
  };

  const addDocument = () => {
    setPageData({ ...pageData, requiredDocuments: [...(pageData.requiredDocuments || []), ''] });
  };

  const removeDocument = (index) => {
    const updated = pageData.requiredDocuments.filter((_, i) => i !== index);
    setPageData({ ...pageData, requiredDocuments: updated });
  };

  const handleDocumentChange = (index, value) => {
    const updated = [...pageData.requiredDocuments];
    updated[index] = value;
    setPageData({ ...pageData, requiredDocuments: updated });
  };

  if (loading) return <div className="p-8 text-center text-gray-500 font-bold">Loading Editor...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-primary">Manage Scholarship Page</h2>
          <p className="text-gray-500 text-sm">Edit the dynamic scholarship cards and requirements.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-accent text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition flex items-center gap-2"
        >
          {saving ? 'Saving...' : <><FaSave /> Save Changes</>}
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h3 className="font-bold text-gray-800 mb-4 uppercase tracking-widest text-sm border-b pb-2">Page Header</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-1">Introductory Text</label>
          <textarea
            value={pageData.introText || ''}
            onChange={(e) => setPageData({ ...pageData, introText: e.target.value })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            rows="3"
            placeholder="e.g. The Academic Advisory Board..."
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center border-b pb-2 mb-6">
          <h3 className="font-bold text-gray-800 uppercase tracking-widest text-sm">Scholarship Cards</h3>
          <button onClick={addScholarship} className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-bold hover:bg-green-200 flex items-center gap-1">
            <FaPlus /> Add Scholarship
          </button>
        </div>

        <div className="space-y-8">
          {pageData.scholarships?.map((scholarship, sIndex) => (
            <div key={sIndex} className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group">
              <button
                onClick={() => removeScholarship(sIndex)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 p-2 bg-white rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition"
                title="Remove Scholarship"
              >
                <FaTrash />
              </button>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Scholarship Title</label>
                  <input
                    type="text"
                    value={scholarship.title}
                    onChange={(e) => handleScholarshipChange(sIndex, 'title', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Eligibility Details</label>
                  <input
                    type="text"
                    value={scholarship.eligibility}
                    onChange={(e) => handleScholarshipChange(sIndex, 'eligibility', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Main Amount (e.g., ₹25,000/-)</label>
                  <input
                    type="text"
                    value={scholarship.amountMain}
                    onChange={(e) => handleScholarshipChange(sIndex, 'amountMain', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Amount Subtext (e.g., Per Annum)</label>
                  <input
                    type="text"
                    value={scholarship.amountSubtext}
                    onChange={(e) => handleScholarshipChange(sIndex, 'amountSubtext', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Theme Color</label>
                  <select
                    value={scholarship.colorTheme}
                    onChange={(e) => handleScholarshipChange(sIndex, 'colorTheme', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="primary">Primary (Blue)</option>
                    <option value="accent">Accent (Orange)</option>
                  </select>
                </div>
              </div>

              {/* Income Criteria */}
              <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-xs font-bold text-gray-700 uppercase">Family Income Criteria (Bullet Points)</label>
                  <button onClick={() => addCriteria(sIndex)} className="text-xs text-primary hover:underline font-bold">+ Add Bullet</button>
                </div>
                <div className="space-y-2">
                  {scholarship.incomeCriteria?.map((criteria, cIndex) => (
                    <div key={cIndex} className="flex gap-2">
                      <input
                        type="text"
                        value={criteria}
                        onChange={(e) => handleCriteriaChange(sIndex, cIndex, e.target.value)}
                        className="w-full p-2 border rounded-md text-sm"
                        placeholder="e.g. ₹1,00,000/- for OBC"
                      />
                      <button
                        onClick={() => removeCriteria(sIndex, cIndex)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-md"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                  {scholarship.incomeCriteria?.length === 0 && <p className="text-xs text-gray-400">No criteria added.</p>}
                </div>
              </div>

            </div>
          ))}
          {pageData.scholarships?.length === 0 && (
            <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 font-bold">
              No scholarships added yet.
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h3 className="font-bold text-gray-800 mb-4 uppercase tracking-widest text-sm border-b pb-2">Footer Contact Details</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Contact Title</label>
            <input
              type="text"
              value={pageData.contactTitle || ''}
              onChange={(e) => setPageData({ ...pageData, contactTitle: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="e.g. Contact for Details:"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Contact Person Name</label>
            <input
              type="text"
              value={pageData.contactPerson || ''}
              onChange={(e) => setPageData({ ...pageData, contactPerson: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="e.g. Mr. Amir Mohammad"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h3 className="font-bold text-gray-800 mb-4 uppercase tracking-widest text-sm border-b pb-2">Need Assistance Sidebar</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Assistance Title</label>
            <input
              type="text"
              value={pageData.assistanceTitle || ''}
              onChange={(e) => setPageData({ ...pageData, assistanceTitle: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Assistance Description</label>
            <textarea
              value={pageData.assistanceDesc || ''}
              onChange={(e) => setPageData({ ...pageData, assistanceDesc: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              rows="2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Assistance Phone Number</label>
            <input
              type="text"
              value={pageData.assistancePhone || ''}
              onChange={(e) => setPageData({ ...pageData, assistancePhone: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
           <div className="flex justify-between items-center mb-4">
             <h4 className="font-bold text-gray-700 uppercase text-sm">Required Documents List</h4>
             <button onClick={addDocument} className="text-xs text-primary font-bold hover:underline">+ Add Document</button>
           </div>
           
           <div className="space-y-2">
             {pageData.requiredDocuments?.map((doc, idx) => (
               <div key={idx} className="flex gap-2">
                 <input
                   type="text"
                   value={doc}
                   onChange={(e) => handleDocumentChange(idx, e.target.value)}
                   className="w-full p-2 border rounded-md"
                   placeholder="e.g. Income Certificate"
                 />
                 <button onClick={() => removeDocument(idx)} className="text-red-500 hover:bg-red-50 p-2 rounded-md">
                   <FaTrash />
                 </button>
               </div>
             ))}
             {(!pageData.requiredDocuments || pageData.requiredDocuments.length === 0) && (
               <p className="text-xs text-gray-400">No documents listed.</p>
             )}
           </div>
        </div>
      </div>

    </div>
  );
};

export default ManageScholarshipPage;
