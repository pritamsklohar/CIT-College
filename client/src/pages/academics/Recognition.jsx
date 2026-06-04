import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import { motion } from 'framer-motion';
import { FaLink, FaGraduationCap, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Recognition = () => {
  const [recognitions, setRecognitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    // Fetch recognitions
    API.get('/recognitions')
      .then(res => {
        setRecognitions(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch latest news/notices for the sidebar
    API.get('/notices')
      .then(res => {
        setLatestNews(res.data.data.slice(0, 5));
      })
      .catch(() => {});
  }, []);

  const categories = [
    { name: "Principal Profile", path: "/academics/principal-profile" },
    { name: "Faculty Profile", path: "/academics/faculty-profile" },
    { name: "Admin Staff", path: "/academics/admin-staff" },
    { name: "Computer Science Engineering", path: "/academics/departments/computer-science-engineering" },
    { name: "Civil Engineering", path: "/academics/departments/civil-engineering" },
    { name: "Electrical Engineering", path: "/academics/departments/electrical-engineering" },
    { name: "Mechanical Engineering", path: "/academics/departments/mechanical-engineering" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner title="Recognition & Affiliations" breadcrumb="Academics / Recognition" />

      <div className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6 md:space-y-12">
            <div className="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-4 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-primary uppercase mb-3 md:mb-4">
                Approved & <span className="text-accent">Affiliated</span>
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mb-4 md:mb-6"></div>
              <p className="text-gray-600 leading-relaxed font-semibold text-sm md:text-base">
                Chartered Institute of Technology is recognized and accredited by leading national and international education boards, councils, and technical societies. We maintain high standards of academic quality and governance as per guidelines from regulatory authorities.
              </p>
            </div>

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-44 bg-white animate-pulse rounded-3xl border"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 md:space-y-8">
                {recognitions.map((item, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-4 md:p-8 rounded-3xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-100 transition duration-300 flex flex-col md:flex-row items-center gap-4 md:gap-8 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
                      
                      {/* Logo Section */}
                      <div className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gray-50 border p-2 md:p-3 flex items-center justify-center flex-shrink-0 order-1 ${isEven ? 'md:order-1' : 'md:order-3'}`}>
                        <img 
                          src={item.logoUrl} 
                          alt={item.title} 
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
                          }}
                        />
                      </div>

                      {/* Content Section */}
                      <div className={`flex-grow min-w-0 order-2 md:order-2 ${isEven ? 'text-left' : 'md:text-right text-left'}`}>
                        <h3 className="text-base md:text-xl font-bold text-primary mb-2 md:mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-semibold">
                          {item.description}
                        </p>
                        {item.websiteUrl && (
                          <div className={`mt-3 md:mt-4 ${!isEven ? 'flex md:justify-end justify-start' : ''}`}>
                            <a 
                              href={item.websiteUrl} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider text-accent hover:text-primary transition"
                            >
                              <FaLink /> Visit Website
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            {/* Categories */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-base md:text-lg font-black text-primary uppercase mb-4 md:mb-6 tracking-wider border-b pb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat, idx) => (
                  <Link 
                    key={idx} 
                    to={cat.path} 
                    className="flex items-center justify-between p-2.5 md:p-3 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest text-gray-500 hover:text-white hover:bg-primary transition group"
                  >
                    <span>{cat.name}</span>
                    <FaChevronRight className="text-accent group-hover:text-white transition" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Latest News */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-base md:text-lg font-black text-primary uppercase mb-4 md:mb-6 tracking-wider border-b pb-3">Latest News</h3>
              <div className="space-y-4 md:space-y-6">
                {latestNews.map((news) => (
                  <div key={news._id} className="group cursor-pointer">
                    <p className="text-[10px] text-accent font-bold uppercase mb-1">
                      {new Date(news.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <h4 className="text-xs md:text-sm font-bold text-primary group-hover:text-accent transition line-clamp-2">
                      {news.title}
                    </h4>
                  </div>
                ))}
                {latestNews.length === 0 && (
                  <p className="text-xs text-gray-400 italic">No news updates available.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Recognition;
