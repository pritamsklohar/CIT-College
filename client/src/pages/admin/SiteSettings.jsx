import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const SiteSettings = () => {
  const [formData, setFormData] = useState({
    siteName: '', email: '', phone1: '', phone2: '', address: '',
    facebookUrl: '', twitterUrl: '', linkedinUrl: '', instagramUrl: '', youtubeUrl: '',
    googleMapsEmbed: '', admissionFormUrl: '', brochureUrl: '', trainingLetterUrl: '', academicCalendarUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState(null);
  const [academicCalendarPdf, setAcademicCalendarPdf] = useState(null);

  useEffect(() => {
    API.get('/settings').then(res => {
      if (res.data.data) setFormData(res.data.data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (logo) data.append('logo', logo);
    if (academicCalendarPdf) data.append('academicCalendarPdf', academicCalendarPdf);

    try {
      await API.put('/settings', data);
      toast.success('Settings updated');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Site Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">College Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg"
                value={formData.siteName}
                onChange={(e) => setFormData({...formData, siteName: e.target.value})}
              />
           </div>
           
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Primary Email</label>
              <input type="email" className="w-full px-4 py-2 border rounded-lg" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
           </div>
           
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number 1</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.phone1} onChange={(e) => setFormData({...formData, phone1: e.target.value})} />
           </div>

           <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Address</label>
              <textarea rows="3" className="w-full px-4 py-2 border rounded-lg" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
           </div>

           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">College Logo</label>
              <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
           </div>

           <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Academic Calendar PDF</label>
              <input type="file" accept=".pdf" onChange={(e) => setAcademicCalendarPdf(e.target.files[0])} />
              {formData.academicCalendarUrl && (
                <p className="text-xs text-gray-500 mt-2">
                  Current: <a href={formData.academicCalendarUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline">View Document</a>
                </p>
              )}
           </div>
        </div>

        <div className="pt-6 border-t">
           <h3 className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">Social Media Links</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Facebook URL" className="px-4 py-2 border rounded-lg" value={formData.facebookUrl} onChange={(e) => setFormData({...formData, facebookUrl: e.target.value})} />
              <input type="text" placeholder="Instagram URL" className="px-4 py-2 border rounded-lg" value={formData.instagramUrl} onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})} />
              <input type="text" placeholder="LinkedIn URL" className="px-4 py-2 border rounded-lg" value={formData.linkedinUrl} onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})} />
              <input type="text" placeholder="YouTube URL" className="px-4 py-2 border rounded-lg" value={formData.youtubeUrl} onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})} />
           </div>
        </div>

        <button type="submit" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-accent transition shadow-lg">
          Save All Changes
        </button>
      </form>
    </div>
  );
};

export default SiteSettings;
