import { useState, useEffect, useRef } from 'react';
import API from '../../api/axios';
import { FaCalendarAlt, FaFilePdf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NoticeBoard = () => {
  const [activeTab, setActiveTab] = useState('Important');
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef();

  useGSAP(() => {
    if (!loading && notices.length > 0) {
      gsap.fromTo('.notice-item', 
        { x: -20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
          },
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }
  }, { scope: containerRef, dependencies: [loading, notices] });

  const tabs = ['Important', 'Exam', 'Media'];

  useEffect(() => {
    setLoading(true);
    API.get(`/notices?category=${activeTab}`).then(res => {
      setNotices(res.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [activeTab]);

  return (
    <div ref={containerRef} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full">
      <div className="bg-primary p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-8 bg-accent rounded-full inline-block"></span>
          LATEST NOTICES
        </h3>
      </div>
      
      <div className="flex border-b">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 md:py-4 text-[10px] min-[360px]:text-xs md:text-sm px-1 font-bold uppercase tracking-wider transition min-w-0 ${
              activeTab === tab ? 'text-accent border-b-2 border-accent bg-orange-50' : 'text-gray-500 hover:text-primary'
            }`}
          >
            {tab === 'Media' ? (
              <span>
                <span className="sm:hidden">Media</span>
                <span className="hidden sm:inline">CIT In Media</span>
              </span>
            ) : (
              <span>
                {tab}
                <span className="hidden sm:inline"> Notice</span>
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="p-3 md:p-4 overflow-y-auto max-h-[300px] md:max-h-[450px] custom-scrollbar">
        {loading ? (
          <div className="space-y-3 p-3">
             {[1,2,3,4].map(i => <div key={i} className="h-14 bg-gray-100 animate-pulse rounded-lg"></div>)}
          </div>
        ) : notices.length > 0 ? (
          <div className="space-y-3">
            {notices.map((notice, index) => (
              <a
                key={notice._id}
                href={notice.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="notice-item flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition group"
              >
                <div className="bg-primary bg-opacity-10 text-primary p-2 md:p-3 rounded-lg flex flex-col items-center justify-center min-w-[55px] md:min-w-[65px] group-hover:bg-accent group-hover:text-white transition-colors">
                   <span className="text-[10px] md:text-xs font-bold uppercase">{new Date(notice.date).toLocaleString('default', { month: 'short' })}</span>
                   <span className="text-base md:text-xl font-bold">{new Date(notice.date).getDate()}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 line-clamp-2 mb-1 text-sm md:text-base group-hover:text-primary">{notice.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold">
                    <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(notice.date).toLocaleDateString()}</span>
                    {notice.fileUrl && <span className="flex items-center gap-1 text-accent"><FaFilePdf /> Download PDF</span>}
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest">
            No notices available in this category
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-gray-50 text-center">
        <Link to="/media" className="text-primary font-bold text-sm hover:text-accent uppercase tracking-wide">View All Announcements →</Link>
      </div>
    </div>
  );
};

export default NoticeBoard;
