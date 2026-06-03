import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';

const Admission = () => {
   const [data, setData] = useState({
     content: '',
     seatMatrix: [],
     applyOnlineUrl: '',
     helplineGeneral: '',
     helplineIncharge: '',
     helplineEmail: '',
     prospectusUrl: ''
   });

   useEffect(() => {
      API.get('/admission-page').then(res => {
         if (res.data.data) setData(res.data.data);
      }).catch(err => console.error("Failed to fetch admission page data:", err));
   }, []);

   const calculateTotal = (field) => {
      return data.seatMatrix.reduce((acc, curr) => acc + (curr[field] || 0), 0);
   };

   return (
      <div className="bg-white">
         <PageBanner title="Admission" breadcrumb="Home / Admission" />

         <div className="container mx-auto px-4 py-20">
            <div className="flex flex-col lg:flex-row gap-16">
               {/* Main Info */}
               <div className="lg:w-2/3">
                  <div
                     className="rich-text-content prose prose-lg max-w-none"
                     dangerouslySetInnerHTML={{ __html: data.content || '<p>Loading admission information...</p>' }}
                  />

                  {/* Dynamic Admission Tables */}
                  {data.seatMatrix.length > 0 && (
                  <div className="mt-12 bg-gray-50 p-8 rounded-3xl border overflow-x-auto">
                     <h3 className="text-2xl font-black text-primary mb-6 uppercase tracking-wider">Courses & Seat Matrix</h3>
                     <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                           <tr className="bg-primary text-white text-sm">
                              <th className="p-4 rounded-tl-xl border-r border-white border-opacity-10">
                                 Branch (Code)
                              </th>
                              <th className="p-4 border-r border-white border-opacity-10 text-center">
                                 Approved Intake
                              </th>
                              <th className="p-4 border-r border-white border-opacity-10 text-center">
                                 State Seats (70%)
                              </th>
                              <th className="p-4 border-r border-white border-opacity-10 text-center">
                                 Out of State Seats (15%)
                              </th>
                              <th className="p-4 rounded-tr-xl text-center">
                                 Management Quota (15%)
                              </th>
                           </tr>
                        </thead>

                        <tbody className="divide-y font-semibold text-gray-700 text-sm">
                           {data.seatMatrix.map((seat, idx) => (
                             <tr key={idx} className="hover:bg-gray-100 transition">
                                <td className="p-4 border-r">{seat.branch}</td>
                                <td className="p-4 border-r text-center">{seat.intake}</td>
                                <td className="p-4 border-r text-center">{seat.stateSeats}</td>
                                <td className="p-4 border-r text-center">{seat.outOfStateSeats}</td>
                                <td className="p-4 text-center">{seat.managementSeats}</td>
                             </tr>
                           ))}

                           <tr className="font-bold bg-gray-200 text-primary text-base border-t-2 border-primary">
                              <td className="p-4 border-r">Total</td>
                              <td className="p-4 border-r text-center">{calculateTotal('intake')}</td>
                              <td className="p-4 border-r text-center">{calculateTotal('stateSeats')}</td>
                              <td className="p-4 border-r text-center">{calculateTotal('outOfStateSeats')}</td>
                              <td className="p-4 text-center">{calculateTotal('managementSeats')}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  )}
               </div>

               {/* Sidebar Actions */}
               <div className="lg:w-1/3">
                  <div className="space-y-6 sticky top-24">
                     {data.applyOnlineUrl && (
                     <a href={data.applyOnlineUrl} target="_blank" rel="noreferrer" className="block bg-accent text-white p-8 rounded-3xl text-center shadow-xl hover:bg-primary transition-all group">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition">📝</div>
                        <h4 className="text-2xl font-black uppercase">APPLY ONLINE</h4>
                        <p className="opacity-80 text-sm font-bold mt-1 uppercase">Direct Admission Form</p>
                     </a>
                     )}

                     <div className="bg-white p-8 rounded-3xl border-2 border-primary shadow-lg">
                        <h4 className="text-xl font-bold text-primary mb-6 border-b-2 border-accent pb-2">Admission Helpline</h4>
                        <div className="space-y-4">
                           {data.helplineGeneral && (
                           <div className="flex flex-col">
                              <span className="text-xs font-bold text-gray-400 uppercase">General Query</span>
                              <a href={`tel:${data.helplineGeneral}`} className="text-lg font-black text-primary">{data.helplineGeneral}</a>
                           </div>
                           )}
                           {data.helplineIncharge && (
                           <div className="flex flex-col">
                              <span className="text-xs font-bold text-gray-400 uppercase">Admission Incharge</span>
                              <a href={`tel:${data.helplineIncharge}`} className="text-lg font-black text-primary">{data.helplineIncharge}</a>
                           </div>
                           )}
                           {data.helplineEmail && (
                           <div className="flex flex-col">
                              <span className="text-xs font-bold text-gray-400 uppercase">Email Us</span>
                              <a href={`mailto:${data.helplineEmail}`} className="text-lg font-black text-accent">{data.helplineEmail}</a>
                           </div>
                           )}
                        </div>
                     </div>

                     {data.prospectusUrl && (
                     <a href={data.prospectusUrl} target="_blank" rel="noreferrer" className="block bg-gray-100 p-6 rounded-2xl font-bold text-gray-700 hover:bg-primary hover:text-white transition group border border-transparent hover:border-accent">
                        <span className="flex items-center justify-between">Download Prospectus <span>📄</span></span>
                     </a>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Admission;
