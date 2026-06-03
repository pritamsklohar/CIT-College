import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaUsers, FaBullhorn, FaImage, FaEnvelopeOpenText } from 'react-icons/fa';

const Dashboard = () => {
  const [data, setData] = useState({
    counts: { notices: 0, faculty: 0, enquiries: 0, gallery: 0, departments: 0 },
    recentEnquiries: [],
    latestNotices: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/dashboard/stats');
        setData(res.data.data);
      } catch (err) {}
    };
    fetchData();
    const interval = setInterval(fetchData, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { label: 'Active Notices', value: data.counts.notices, icon: <FaBullhorn />, color: 'bg-blue-600' },
    { label: 'Faculty Members', value: data.counts.faculty, icon: <FaUsers />, color: 'bg-green-600' },
    { label: 'Unread Enquiries', value: data.counts.enquiries, icon: <FaEnvelopeOpenText />, color: 'bg-orange-600' },
    { label: 'Gallery Images', value: data.counts.gallery, icon: <FaImage />, color: 'bg-purple-600' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-black text-primary uppercase tracking-tight">Admin Dashboard</h1>
           <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">Real-time Institutional Oversight</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-sm font-black text-gray-700 uppercase tracking-widest">{new Date().toDateString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-50 flex items-center gap-8 relative overflow-hidden group hover:border-accent transition-all duration-300"
          >
            <div className={`${card.color} text-white p-5 rounded-2xl text-2xl shadow-xl transition-transform group-hover:scale-110`}>
              {card.icon}
            </div>
            <div className="z-10">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{card.label}</div>
              <div className="text-4xl font-black text-primary tracking-tighter">{card.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-50">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-primary uppercase tracking-wider">Recent Enquiries</h3>
              <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Live Feed</span>
           </div>
           <div className="space-y-4">
              {data.recentEnquiries.length > 0 ? data.recentEnquiries.map((enq, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-accent transition group">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-primary shadow-sm">{enq.fullName[0]}</div>
                      <div>
                         <div className="text-sm font-bold text-primary">{enq.fullName}</div>
                         <div className="text-[10px] text-gray-400 font-bold uppercase">{enq.subject || 'General Enquiry'}</div>
                      </div>
                   </div>
                   <div className="text-[10px] font-black text-gray-300 group-hover:text-accent uppercase tracking-tighter">{new Date(enq.createdAt).toLocaleDateString()}</div>
                </div>
              )) : (
                <div className="text-center py-20 text-gray-300 font-black uppercase tracking-widest italic">No Enquiries Yet</div>
              )}
           </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-50">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-primary uppercase tracking-wider">Latest Notices</h3>
              <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Current Board</span>
           </div>
           <div className="space-y-4">
              {data.latestNotices.length > 0 ? data.latestNotices.map((notice, i) => (
                <div key={i} className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition border border-transparent">
                   <div className="bg-white p-3 rounded-xl shadow-sm text-blue-600"><FaBullhorn /></div>
                   <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-primary truncate">{notice.title}</div>
                      <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{notice.category}</div>
                   </div>
                </div>
              )) : (
                <div className="text-center py-20 text-gray-300 font-black uppercase tracking-widest italic">No Notices Posted</div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
