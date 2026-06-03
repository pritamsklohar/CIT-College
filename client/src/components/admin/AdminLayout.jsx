import { useState, useEffect } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTachometerAlt, FaBullhorn, FaUserTie, FaCog, FaSignOutAlt, 
  FaImage, FaAward, FaBookOpen, FaCalendarAlt, FaHandshake, 
  FaChartBar, FaChevronDown, FaEnvelope 
} from 'react-icons/fa';

const AdminLayout = () => {
  const { admin, loading, logout } = useAuth();
  const location = useLocation();
  const [openGroup, setOpenGroup] = useState(null);

  const menuGroups = [
    {
      title: 'Dashboard',
      icon: <FaTachometerAlt />,
      path: '/admin/dashboard'
    },
    {
      title: 'Home Page',
      icon: <FaImage />,
      submenu: [
        { label: 'Hero Slider', path: '/admin/hero' },
        { label: 'Notices', path: '/admin/notices' },
        { label: 'Events', path: '/admin/events' },
        { label: 'Testimonials', path: '/admin/testimonials' },
        { label: 'Top Recruiters', path: '/admin/recruiters' }
      ]
    },
    {
      title: 'About',
      icon: <FaBookOpen />,
      submenu: [
        { label: 'Institute', path: '/admin/static-pages/institute' },
        { label: 'Vision & Mission', path: '/admin/static-pages/vision-mission' },
        { label: 'Chairman Message', path: '/admin/static-pages/chairman-message' },
        { label: 'Location', path: '/admin/static-pages/location' },
        { label: 'Mandatory Disclosure', path: '/admin/static-pages/mandatory-disclosure' },
        { label: 'Board Members', path: '/admin/board-members' }
      ]
    },
    {
      title: 'Academics',
      icon: <FaAward />,
      submenu: [
        { label: 'Principal Profile', path: '/admin/static-pages/principal-profile' },
        { label: 'Faculty Profile', path: '/admin/faculty' },
        { label: 'Admin Staff', path: '/admin/admin-staff' },
        { label: 'Recognitions', path: '/admin/recognitions' },
        { label: 'Scheme/Syllabus', path: '/admin/syllabus' },
        { label: 'Academic Calendar', path: '/admin/academic-calendar' },
        { label: 'Academic Details', path: '/admin/static-pages/academic-calendar' },
        { label: 'Departments', path: '/admin/departments' }
      ]
    },
    {
      title: 'Admission',
      icon: <FaUserTie />,
      path: '/admin/admission-page'
    },
    {
      title: 'Student Corner',
      icon: <FaUserTie />,
      submenu: [
        { label: 'Achievements', path: '/admin/achievements' },
        { label: 'Alumni Cell', path: '/admin/alumni-page' },
        { label: 'Service Pages', path: '/admin/service-pages' }
      ]
    },
    {
      title: 'Scholarship',
      icon: <FaAward />,
      path: '/admin/scholarship-page'
    },
    {
      title: 'Placement',
      icon: <FaChartBar />,
      path: '/admin/tnp-cell'
    },
    {
      title: 'Gallery',
      icon: <FaImage />,
      path: '/admin/gallery'
    },
    {
      title: 'Contact & Settings',
      icon: <FaCog />,
      submenu: [
        { label: 'Enquiries', path: '/admin/enquiries' },
        { label: 'Site Settings', path: '/admin/settings' }
      ]
    }
  ];

  // Auto-open group based on location path
  useEffect(() => {
    const activeIndex = menuGroups.findIndex(group => 
      group.submenu && group.submenu.some(sub => sub.path === location.pathname)
    );
    if (activeIndex !== -1) {
      setOpenGroup(activeIndex);
    }
  }, [location.pathname]);

  const toggleGroup = (index) => {
    setOpenGroup(openGroup === index ? null : index);
  };

  if (loading) return <div>Loading...</div>;
  if (!admin) return <Navigate to="/admin-login" />;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col shadow-2xl z-30">
        <div className="p-6 text-center border-b border-white/10">
          <img src="/logo-cit.png" alt="Logo" className="h-12 mx-auto mb-2 brightness-0 invert" />
          <h2 className="font-black text-accent uppercase tracking-widest text-sm">CIT Admin Panel</h2>
        </div>
        
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {menuGroups.map((group, index) => {
            const hasSubmenu = !!group.submenu;
            const isOpen = openGroup === index;
            const isActive = group.path === location.pathname || 
                             (hasSubmenu && group.submenu.some(sub => sub.path === location.pathname));

            return (
              <div key={index} className="space-y-1">
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={() => toggleGroup(index)}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition font-bold text-xs uppercase tracking-wider text-left ${
                        isActive ? 'bg-white/5 text-accent' : 'text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base text-gray-400 group-hover:text-accent">{group.icon}</span>
                        <span>{group.title}</span>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaChevronDown className="text-[10px]" />
                      </motion.span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-6 pr-2 py-1 space-y-1 border-l-2 border-white/10 ml-6"
                        >
                          {group.submenu.map((sub, subIndex) => {
                            const isSubActive = sub.path === location.pathname;
                            return (
                              <Link
                                key={subIndex}
                                to={sub.path}
                                className={`block px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition ${
                                  isSubActive 
                                    ? 'bg-accent text-white shadow-lg shadow-accent/25' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                {sub.label}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={group.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition font-bold text-xs uppercase tracking-wider ${
                      isActive ? 'bg-accent text-white shadow-lg shadow-accent/25' : 'text-gray-300'
                    }`}
                  >
                    <span className="text-base">{group.icon}</span>
                    <span>{group.title}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
        
        <button
          onClick={logout}
          className="m-4 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 p-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition shadow-lg shadow-red-600/20"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow flex items-center justify-between px-8 z-20">
          <h2 className="font-bold text-gray-700 text-sm">Welcome, <span className="text-primary font-black uppercase tracking-wider">{admin.username}</span></h2>
          <div className="flex items-center gap-4">
            <Link to="/" className="bg-gray-100 hover:bg-gray-200 text-primary font-bold px-4 py-2 rounded-xl text-xs transition uppercase tracking-widest">
              View Website
            </Link>
          </div>
        </header>
        <main className="flex-grow overflow-auto p-8 bg-gray-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
