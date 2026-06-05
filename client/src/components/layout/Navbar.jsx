import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import API from '../../api/axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [logo, setLogo] = useState('/logo-cit.png');
  const location = useLocation();
  const navRef = useRef();
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setActiveMobileSubmenu(null);
    }
  }, [isOpen]);

  const toggleMobileSubmenu = (title) => {
    setActiveMobileSubmenu(activeMobileSubmenu === title ? null : title);
  };

  useGSAP(() => {
    gsap.from('.nav-item', {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.2,
      clearProps: 'all'
    });
  }, { scope: navRef });

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    API.get('/settings').then(res => {
      if (res.data.data.logoUrl) setLogo(res.data.data.logoUrl);
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', path: '/' },
    {
      title: 'About',
      submenu: [
        { title: 'The Institute', path: '/about/institute' },
        { title: 'Vision & Mission', path: '/about/vision-mission' },
        { title: 'Location', path: '/about/location' },
        { title: 'Mandatory Disclosure', path: '/about/mandatory-disclosure' },
        { title: 'Chairman Message', path: '/about/chairman-message' },
        { title: 'Board Of Management', path: '/about/board-of-management' },
      ]
    },
    {
      title: 'Academics',
      submenu: [
        { title: 'Principal Profile', path: '/academics/principal-profile' },
        { title: 'Faculty Profile', path: '/academics/faculty-profile' },
        { title: 'Admin Staff', path: '/academics/admin-staff' },
        { title: 'Recognition', path: '/academics/recognition' },
        { title: 'Scheme/Syllabus', path: '/academics/scheme-syllabus' },
        { title: 'Academic Calendar', path: '/academics/calendar' },
      ]
    },
    { title: 'Admission', path: '/admission' },
    {
      title: 'Student Corner',
      submenu: [
        { title: 'Achievements', path: '/student/achievements' },
        { title: 'Alumni Cell', path: '/student/alumni' },
        { title: 'Duplicate Certificate', path: '/student/duplicate-certificate' },
        { title: 'Migration Certificate', path: '/student/migration-certificate' },
        { title: 'Correction In Name', path: '/student/name-correction' },
        { title: 'NCC', path: '/student/ncc' },
      ]
    },
    { title: 'Scholarship', path: '/scholarship' },
    {
      title: 'Placement',
      submenu: [
        { title: 'T&P Cell', path: '/placement/tnp-cell' },
        { title: 'CRT Program', path: '/placement/crt' },
      ]
    },
    { title: 'Gallery', path: '/gallery' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <nav ref={navRef} className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isSticky ? 'shadow-lg py-1.5' : 'py-3 md:py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center nav-item">
          <img src={logo} alt="CIT Logo" className="h-9 lg:h-12 xl:h-16 mr-3 object-contain py-0.5" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-nowrap items-center gap-3 xl:gap-5 font-bold text-gray-700 text-[12px] xl:text-[14px] 2xl:text-base whitespace-nowrap">
          {navLinks.map((link, i) => (
            <div key={i} className="relative group nav-item">
              {link.submenu ? (
                <>
                  <button className="flex items-center hover:text-accent uppercase tracking-wide">
                    {link.title} <FaChevronDown className="ml-1 text-[10px]" />
                  </button>
                  <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-2xl border-t-2 border-accent min-w-[240px] py-2 z-50 animate-fade-in">
                    {link.submenu.map((sub, j) => (
                      <Link
                        key={j}
                        to={sub.path}
                        className="block px-6 py-3 hover:bg-gray-50 hover:text-accent border-b border-gray-100 last:border-0 transition"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link to={link.path} className={`hover:text-accent uppercase tracking-wide ${location.pathname === link.path ? 'text-accent' : ''}`}>
                  {link.title}
                </Link>
              )}
            </div>
          ))}
          <a href="https://forms.gle/KT257DVQEjc5HBTh9" target="_blank" className="nav-item bg-accent text-white px-3 py-2 xl:px-5 xl:py-2.5 rounded shadow-lg font-bold hover:bg-primary transition-all duration-300 scale-95 hover:scale-100 uppercase text-[11px] xl:text-xs 2xl:text-sm">
            Online Admission
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-primary text-2xl p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-white z-[60] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`} data-lenis-prevent>
        <div className="p-6 flex justify-between items-center border-b">
          <img src={logo} alt="Logo" className="h-12" />
          <button onClick={() => setIsOpen(false)} className="text-2xl text-primary"><FaTimes /></button>
        </div>
        <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]" data-lenis-prevent>
          {navLinks.map((link, i) => (
            <div key={i} className="mb-3 border-b border-gray-50 pb-2 last:border-0 last:pb-0">
              {link.submenu ? (
                <>
                  <button 
                    onClick={() => toggleMobileSubmenu(link.title)} 
                    className="flex justify-between items-center w-full font-extrabold text-primary text-base uppercase py-1.5 tracking-wide text-left hover:text-accent transition-colors duration-200"
                  >
                    <span>{link.title}</span>
                    <FaChevronDown className={`text-xs text-accent transition-transform duration-300 ${activeMobileSubmenu === link.title ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`pl-4 border-l-2 border-accent mt-2 space-y-2.5 ${activeMobileSubmenu === link.title ? 'block' : 'hidden'}`}>
                    {link.submenu.map((sub, j) => (
                      <Link 
                        key={j} 
                        to={sub.path} 
                        onClick={() => setIsOpen(false)} 
                        className={`block py-1 text-sm font-semibold transition-colors duration-200 ${location.pathname === sub.path ? 'text-accent' : 'text-gray-600 hover:text-accent'}`}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link 
                  to={link.path} 
                  onClick={() => setIsOpen(false)} 
                  className={`block font-extrabold text-base uppercase py-1.5 tracking-wide transition-colors duration-200 ${location.pathname === link.path ? 'text-accent' : 'text-primary hover:text-accent'}`}
                >
                  {link.title}
                </Link>
              )}
            </div>
          ))}
          <div className="mt-6 border-t pt-6">
            <a href="https://forms.gle/KT257DVQEjc5HBTh9" target="_blank" className="block w-full text-center bg-accent text-white px-5 py-3 rounded-lg shadow-lg font-bold hover:bg-primary transition-all uppercase tracking-wide text-sm">
              Online Admission
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
