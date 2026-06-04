import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaEdit, FaSave } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';

const ManageStaticPages = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPage();
    }
  }, [slug]);

  const fetchPage = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/static-pages/${slug}`);
      setContent(res.data.data.content || '');
      setTitle(res.data.data.title || '');
      setMetaDescription(res.data.data.metaDescription || '');
      setCurrentImageUrl(res.data.data.imageUrl || '');
      setImage(null);
    } catch (err) {
      setContent('');
      setTitle(slug.split('-').join(' ').toUpperCase());
      setMetaDescription('');
      setCurrentImageUrl('');
      setImage(null);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('metaDescription', metaDescription);
      if (image) formData.append('image', image);

      await API.put(`/static-pages/${slug}`, formData);
      toast.success('Page updated successfully');
      fetchPage();
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
    ],
  };

  return (
    <div className="max-w-5xl mx-auto min-h-[calc(100vh-200px)]">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black text-primary uppercase tracking-wider flex items-center gap-2">
            <FaEdit className="text-accent" /> Editing: {slug ? slug.split('-').join(' ') : 'Page'}
          </h2>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-accent transition shadow-xl disabled:opacity-50"
          >
            {loading ? 'Saving...' : <><FaSave /> Save Changes</>}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2">Page Title</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary outline-none transition font-bold"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2">SEO Meta Description</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary outline-none transition"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-gray-400 uppercase mb-2">Page Featured Image (Optional)</label>
            <div className="flex items-center gap-4">
               {currentImageUrl && (
                 <img src={currentImageUrl} alt="Current" className="w-16 h-16 object-cover rounded-lg border" />
               )}
               <input
                 key={`file-input-${slug}`}
                 type="file"
                 accept="image/*"
                 className="flex-1 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-primary outline-none transition"
                 onChange={(e) => setImage(e.target.files[0])}
               />
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-[500px]">
          <label className="block text-xs font-black text-gray-400 uppercase mb-2">Page Content (Rich Text)</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className="h-[450px] mb-12"
          />
        </div>
      </div>
    </div>
  );
};
export default ManageStaticPages;
