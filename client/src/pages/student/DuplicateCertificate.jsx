import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import * as FaIcons from 'react-icons/fa';

const DuplicateCertificate = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await API.get('/procedural-pages/duplicate-certificate');
        if (res.data.success) {
          setPageData(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch duplicate certificate data');
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, []);

  const getIcon = (iconName) => {
    const Icon = FaIcons[iconName];
    return Icon ? <Icon /> : <FaIcons.FaFileAlt />;
  };

  if (loading) return <div className="py-20 text-center text-gray-400 font-bold">Loading...</div>;
  if (!pageData) return <div className="py-20 text-center text-red-500 font-bold">Failed to load content.</div>;

  // Determine notice box color classes based on noticeType
  const noticeColors = {
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-500', textTitle: 'text-yellow-800', textBody: 'text-yellow-700', icon: 'text-yellow-600' },
    red: { bg: 'bg-red-50', border: 'border-red-500', textTitle: 'text-red-800', textBody: 'text-red-700', icon: 'text-red-600' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-500', textTitle: 'text-blue-800', textBody: 'text-blue-700', icon: 'text-blue-600' },
    green: { bg: 'bg-green-50', border: 'border-green-500', textTitle: 'text-green-800', textBody: 'text-green-700', icon: 'text-green-600' }
  };
  const theme = noticeColors[pageData.noticeType] || noticeColors.yellow;
  const HeroIcon = getIcon(pageData.heroIcon);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <PageBanner title={pageData.pageTitle} breadcrumb={`Student Corner / ${pageData.pageTitle}`} />

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          
          <div className="bg-primary p-8 md:p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 text-9xl">
               {HeroIcon}
             </div>
             <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-widest relative z-10">{pageData.pageTitle}</h2>
             <p className="text-lg text-gray-200 font-medium relative z-10 max-w-2xl">
               {pageData.pageSubtitle}
             </p>
          </div>

          <div className="p-8 md:p-12">
             <div className={`mb-10 ${theme.bg} border-l-4 ${theme.border} p-6 rounded-r-xl shadow-sm`}>
                <div className="flex gap-4 items-start">
                   <div className={`${theme.icon} text-2xl mt-1 shrink-0`}><FaIcons.FaExclamationTriangle /></div>
                   <div>
                      <h4 className={`font-bold ${theme.textTitle} text-lg mb-1`}>{pageData.noticeTitle}</h4>
                      <p className={`${theme.textBody}`}>{pageData.noticeContent}</p>
                   </div>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-12">
                <div>
                   <h3 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
                     <span className="bg-accent text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"><FaIcons.FaFileAlt className="text-xl" /></span>
                     Required Documents
                   </h3>
                   <ul className="space-y-4">
                      {pageData.documents.map((doc, idx) => (
                        <li key={idx} className="flex gap-4 items-start">
                           <div className="bg-green-100 text-green-600 p-2 rounded-lg shrink-0">
                             {getIcon(doc.icon)}
                           </div>
                           <div>
                              <span className="font-bold text-gray-800 block">{doc.title}</span>
                              <span className="text-sm text-gray-500">{doc.desc}</span>
                           </div>
                        </li>
                      ))}
                   </ul>
                </div>

                <div>
                   <h3 className="text-2xl font-black text-primary mb-6 flex items-center gap-3">
                     <span className="bg-accent text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"><FaIcons.FaMoneyCheckAlt className="text-xl" /></span>
                     {pageData.feesTitle}
                   </h3>
                   <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
                      {pageData.fees.map((fee, idx) => (
                        <div key={idx} className="flex justify-between items-center mb-4 border-b pb-4 last:border-0 last:pb-0">
                           <span className="font-bold text-gray-700">{fee.label}</span>
                           <span className="font-black text-accent text-xl">{fee.amount}</span>
                        </div>
                      ))}
                      {pageData.feeNote && (
                        <p className="text-xs text-gray-500 italic mt-4 border-t pt-4">{pageData.feeNote}</p>
                      )}
                   </div>
                </div>
             </div>

             <div className="mt-12 pt-12 border-t border-gray-100">
                <h3 className="text-2xl font-black text-primary mb-8 text-center uppercase tracking-widest">{pageData.stepsTitle}</h3>
                
                <div className={`grid gap-6 relative grid-cols-1 md:grid-cols-${Math.min(pageData.steps.length, 4)}`}>
                   <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-1 bg-gray-200 z-0"></div>
                   
                   {pageData.steps.map((item, idx) => (
                     <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-black shadow-xl mb-4 border-4 border-white">
                           {idx + 1}
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                     </div>
                   ))}
                </div>
             </div>

             {pageData.downloadLink && (
               <div className="mt-16 text-center">
                  <a href={pageData.downloadLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-orange-600 transition shadow-xl hover:-translate-y-1">
                     <FaIcons.FaDownload /> BTU Forms Portal
                  </a>
               </div>
             )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default DuplicateCertificate;
