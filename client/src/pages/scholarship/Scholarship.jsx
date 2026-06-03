import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import { FaGraduationCap } from 'react-icons/fa';

const Scholarship = () => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await API.get('/scholarship-page');
        if (res.data.success) {
          setPageData(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch scholarship data');
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, []);

  if (loading) return <div className="py-20 text-center text-gray-400 font-bold">Loading...</div>;
  if (!pageData || !pageData.scholarships) return <div className="py-20 text-center text-red-500 font-bold">Failed to load content.</div>;

  return (
    <div className="bg-white">
      <PageBanner title="Scholarship" breadcrumb="Home / Scholarship" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-3/4">
             <div className="mb-12">
                {pageData.introText && (
                  <div 
                    className="text-lg text-gray-700 leading-relaxed bg-blue-50/50 p-6 rounded-2xl border-l-4 border-primary mb-12 shadow-sm"
                    dangerouslySetInnerHTML={{ __html: pageData.introText.replace('Chartered Institute of Technology', '<strong>Chartered Institute of Technology</strong>') }}
                  />
                )}

                <h2 className="text-3xl font-black text-primary mb-8 uppercase tracking-wider flex items-center gap-3">
                  <span className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg"><FaGraduationCap /></span>
                  Scholarship Details
                </h2>

                <div className="space-y-8">
                   {pageData.scholarships.map((scholarship, idx) => {
                     const isAccent = scholarship.colorTheme === 'accent';
                     return (
                       <div key={idx} className={`bg-white border border-gray-100 rounded-3xl p-8 shadow-xl relative overflow-hidden group hover:border-${isAccent ? 'accent' : 'primary'} transition duration-300`}>
                          <div className={`absolute top-0 left-0 w-2 h-full bg-${isAccent ? 'accent' : 'primary'} group-hover:w-3 transition-all duration-300`}></div>
                          <h3 className="text-xl font-black text-gray-800 mb-4 pr-12">{scholarship.title}</h3>
                          
                          <div className="grid md:grid-cols-2 gap-8">
                             <div>
                                <h4 className={`font-bold text-${isAccent ? 'accent' : 'primary'} mb-2 uppercase text-sm tracking-widest`}>Eligibility</h4>
                                <p className="text-gray-600 mb-4">{scholarship.eligibility}</p>
                                
                                {scholarship.incomeCriteria && scholarship.incomeCriteria.length > 0 && (
                                  <>
                                    <h4 className={`font-bold text-${isAccent ? 'accent' : 'primary'} mb-2 uppercase text-sm tracking-widest`}>Family Income Criteria</h4>
                                    <ul className="text-gray-600 space-y-1">
                                       {scholarship.incomeCriteria.map((criteria, cIdx) => {
                                          // Bold any monetary amount dynamically
                                          const formatted = criteria.replace(/(₹[0-9,]+(\/-)?)/g, '<span class="font-bold text-gray-800">$1</span>');
                                          return <li key={cIdx} dangerouslySetInnerHTML={{ __html: `• ${formatted}` }} />;
                                       })}
                                    </ul>
                                  </>
                                )}
                             </div>
                             <div className={`bg-${isAccent ? 'orange' : 'gray'}-50 p-6 rounded-2xl border border-${isAccent ? 'orange' : 'gray'}-100 flex flex-col justify-center`}>
                                <h4 className={`font-bold text-${isAccent ? 'primary' : 'accent'} mb-2 uppercase text-sm tracking-widest`}>Scholarship Amount</h4>
                                <p className={`text-${isAccent ? '3xl' : '2xl'} font-black text-${isAccent ? 'accent' : 'primary'}`}>{scholarship.amountMain}</p>
                                {scholarship.amountSubtext && <p className="text-sm text-gray-500 mt-1">{scholarship.amountSubtext}</p>}
                             </div>
                          </div>
                       </div>
                     );
                   })}
                </div>

                {/* Contact Info */}
                {(pageData.contactTitle || pageData.contactPerson) && (
                  <div className="mt-12 bg-gray-50 p-6 rounded-2xl border border-gray-200 inline-block">
                     <h4 className="font-bold text-gray-800 uppercase tracking-widest mb-1">{pageData.contactTitle}</h4>
                     <p className="text-primary font-bold text-lg">{pageData.contactPerson}</p>
                  </div>
                )}
             </div>
          </div>

          <div className="lg:w-1/4">
             <div className="bg-gray-50 p-8 rounded-3xl sticky top-24 border border-gray-200 shadow-sm">
                <h4 className="text-lg font-bold text-primary mb-6 border-b-2 border-accent pb-2 inline-block">{pageData.assistanceTitle}</h4>
                <p className="text-sm text-gray-500 mb-6 font-semibold">{pageData.assistanceDesc}</p>
                <div className="space-y-4">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Scholarship Incharge</span>
                      <span className="font-black text-primary text-lg">{pageData.assistancePhone}</span>
                   </div>
                </div>
                
                {pageData.requiredDocuments && pageData.requiredDocuments.length > 0 && (
                  <div className="mt-10 pt-10 border-t border-gray-200">
                     <h5 className="font-bold text-sm mb-4 uppercase tracking-widest text-gray-400">Required Documents</h5>
                     <ul className="text-xs font-bold text-gray-600 space-y-2">
                        {pageData.requiredDocuments.map((doc, idx) => (
                          <li key={idx} className="flex gap-2"><span>•</span> {doc}</li>
                        ))}
                     </ul>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholarship;
