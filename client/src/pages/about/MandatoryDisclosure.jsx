import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import { FaFilePdf, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa';

const MandatoryDisclosure = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    API.get('/static-pages/mandatory-disclosure').then(res => setContent(res.data.data.content));
  }, []);

  const documents = [
    { name: 'AICTE Approval Letter (Current)', link: '#' },
    { name: 'University Affiliation (BTU)', link: '#' },
    { name: 'NOC from State Government', link: '#' },
    { name: 'Anti-Ragging Committee', link: '#' },
    { name: 'Internal Complaint Committee', link: '#' },
    { name: 'Grievance Redressal Cell', link: '#' },
  ];

  return (
    <div className="bg-white">
      <PageBanner title="Mandatory Disclosure" breadcrumb="About Us / Disclosure" />

      <div className="container mx-auto px-4 py-10 md:py-20">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
          <div className="lg:w-2/3">
             <h2 className="text-2xl md:text-3xl font-black text-primary mb-4 md:mb-8 flex items-center gap-2 uppercase">
                <span className="w-1.5 h-6 md:h-8 bg-accent inline-block"></span> Statutory Compliance
             </h2>
             <div 
               className="rich-text-content prose prose-lg max-w-none text-gray-700 leading-relaxed mb-6 md:mb-12 text-sm md:text-base"
               dangerouslySetInnerHTML={{ __html: content || "<p>Chartered Institute of Technology complies with all norms and standards prescribed by AICTE, New Delhi and BTU/RTU, Rajasthan.</p>" }}
             />

             <div className="grid md:grid-cols-2 gap-4 md:grid-cols-2 lg:gap-6">
                {documents.map((doc, i) => (
                  <a 
                    key={i} 
                    href={doc.link} 
                    target="_blank"
                    className="flex items-center justify-between bg-gray-50 p-4 md:p-6 rounded-2xl border border-gray-100 hover:border-accent hover:bg-white hover:shadow-xl transition group"
                  >
                     <div className="flex items-center gap-3 md:gap-4">
                        <div className="bg-primary bg-opacity-10 p-2.5 md:p-3 rounded-xl text-primary group-hover:bg-accent group-hover:text-white transition"><FaFilePdf /></div>
                        <span className="font-bold text-gray-700 text-xs md:text-sm">{doc.name}</span>
                     </div>
                     <FaExternalLinkAlt className="text-xs text-gray-300 group-hover:text-accent transition" />
                  </a>
                ))}
             </div>
          </div>

          <div className="lg:w-1/3">
             <div className="bg-primary p-6 md:p-10 rounded-3xl text-white shadow-2xl sticky top-24">
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                   <FaCheckCircle className="text-accent" /> Institutional Norms
                </h3>
                <p className="text-xs md:text-sm opacity-80 leading-relaxed mb-6 md:mb-8 font-semibold">
                   We maintain 100% transparency in all our academic and administrative processes as per the guidelines of regulatory bodies.
                </p>
                <div className="space-y-4 md:space-y-6 pt-4 md:pt-6 border-t border-white border-opacity-10">
                   <div>
                      <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-2">BTU Code</h5>
                      <span className="text-xl md:text-2xl font-black">109</span>
                   </div>
                   <div>
                      <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-2">RTU Code</h5>
                      <span className="text-xl md:text-2xl font-black">086</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MandatoryDisclosure;
