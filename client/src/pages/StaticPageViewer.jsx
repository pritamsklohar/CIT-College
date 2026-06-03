import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import PageBanner from '../components/common/PageBanner';

const StaticPageViewer = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { data } = await API.get(`/static-pages/${slug}`);
        setPage(data.data);
      } catch (err) {
        setPage(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  if (loading) return <div className="py-20 text-center font-bold text-gray-400">Loading Page...</div>;
  
  if (!page) return (
    <div className="py-40 text-center">
       <h2 className="text-3xl font-black text-primary">404 - Page Not Found</h2>
       <p className="text-gray-500 mt-4">The content for this page has not been added yet.</p>
    </div>
  );

  return (
    <div className="bg-white pb-20">
      <PageBanner title={page.title} subtitle="Institutional Information" />
      <div className="container mx-auto px-4 py-16">
         <div 
           className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-black prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-accent prose-li:text-gray-600"
           dangerouslySetInnerHTML={{ __html: page.content }}
         />
      </div>
    </div>
  );
};

export default StaticPageViewer;
