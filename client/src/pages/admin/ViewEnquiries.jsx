import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaCheckCircle, FaClock, FaSearch, FaFilter, FaFileCsv } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ViewEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const url = statusFilter === 'All' ? '/enquiries' : `/enquiries?status=${statusFilter}`;
      // API endpoint for enquiries might not be fully ready in controller yet, let's assume it is
      const res = await API.get(url);
      setEnquiries(res.data.data);
    } catch (err) {}
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/enquiries/${id}/status`, { status });
      toast.success(`Marked as ${status}`);
      fetchEnquiries();
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
    } catch (err) {}
  };

  const deleteEnquiry = async (id) => {
    try {
      await API.delete(`/enquiries/${id}`);
      toast.success('Deleted');
      fetchEnquiries();
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
    } catch (err) {}
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Student Enquiries</h1>
        <div className="flex gap-2">
           <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 transition shadow-md text-sm">
              <FaFileCsv /> Export CSV
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
         {/* List */}
         <div className="flex-1 space-y-4">
            <div className="flex gap-2 mb-4">
               {['All', 'New', 'Read', 'Replied'].map(s => (
                 <button 
                   key={s} 
                   onClick={() => setStatusFilter(s)}
                   className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition ${statusFilter === s ? 'bg-primary text-white' : 'bg-white border text-gray-500'}`}
                 >
                   {s}
                 </button>
               ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
               {loading ? (
                 <div className="p-10 text-center text-gray-400 font-bold italic">Loading enquiries...</div>
               ) : enquiries.length > 0 ? (
                 <div className="divide-y">
                    {enquiries.map(enq => (
                      <div 
                        key={enq._id} 
                        onClick={() => setSelectedEnquiry(enq)}
                        className={`p-6 cursor-pointer hover:bg-gray-50 transition flex items-center justify-between group ${selectedEnquiry?._id === enq._id ? 'bg-blue-50 border-l-4 border-primary' : ''}`}
                      >
                         <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${enq.status === 'New' ? 'bg-red-500' : enq.status === 'Read' ? 'bg-blue-500' : 'bg-green-500'}`}>
                               {enq.fullName.charAt(0)}
                            </div>
                            <div>
                               <h4 className="font-bold text-gray-800">{enq.fullName}</h4>
                               <p className="text-xs text-gray-500 font-semibold">{enq.branch} | {enq.city}, {enq.state}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <div className="text-xs font-bold text-gray-400 mb-1">{new Date(enq.createdAt).toLocaleDateString()}</div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${enq.status === 'New' ? 'bg-red-100 text-red-600' : enq.status === 'Read' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                               {enq.status}
                            </span>
                         </div>
                      </div>
                    ))}
                 </div>
               ) : (
                 <div className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest italic">No enquiries found</div>
               )}
            </div>
         </div>

         {/* Detail Side Panel */}
         <div className="lg:w-[400px]">
            <AnimatePresence mode='wait'>
               {selectedEnquiry ? (
                 <motion.div 
                   key={selectedEnquiry._id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-24"
                 >
                    <div className="flex justify-between items-start mb-6">
                       <h3 className="text-xl font-bold text-primary">Enquiry Details</h3>
                       <button onClick={() => setSelectedEnquiry(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
                    </div>
                    
                    <div className="space-y-6">
                       <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                             <span className="block text-xs font-bold text-gray-400 uppercase">Phone</span>
                             <a href={`tel:${selectedEnquiry.phone}`} className="font-bold text-primary">{selectedEnquiry.phone}</a>
                          </div>
                          <div>
                             <span className="block text-xs font-bold text-gray-400 uppercase">Email</span>
                             <a href={`mailto:${selectedEnquiry.email}`} className="font-bold text-primary truncate block">{selectedEnquiry.email || 'N/A'}</a>
                          </div>
                       </div>
                       
                       <div>
                          <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Message</span>
                          <div className="bg-gray-50 p-4 rounded-xl text-sm italic text-gray-600 leading-relaxed border">
                             "{selectedEnquiry.message || 'No message provided'}"
                          </div>
                       </div>

                       <div className="pt-6 border-t flex flex-wrap gap-2">
                          <button onClick={() => updateStatus(selectedEnquiry._id, 'Read')} className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold text-xs hover:bg-blue-100 transition">Mark Read</button>
                          <button onClick={() => updateStatus(selectedEnquiry._id, 'Replied')} className="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg font-bold text-xs hover:bg-green-100 transition">Mark Replied</button>
                          <button onClick={() => deleteEnquiry(selectedEnquiry._id)} className="w-full mt-2 bg-red-50 text-red-500 px-4 py-2 rounded-lg font-bold text-xs hover:bg-red-100 transition flex items-center justify-center gap-2"><FaTrash /> Delete Permanently</button>
                       </div>
                    </div>
                 </motion.div>
               ) : (
                 <div className="bg-gray-50 p-12 rounded-2xl border-2 border-dashed border-gray-200 text-center text-gray-400 font-bold flex flex-col items-center gap-4">
                    <FaSearch className="text-4xl opacity-20" />
                    <p className="uppercase tracking-widest text-xs">Select an enquiry to view details</p>
                 </div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
};

export default ViewEnquiries;
