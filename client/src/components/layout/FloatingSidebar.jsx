import { FaFilePdf, FaDownload, FaBell, FaPhoneAlt, FaUserShield } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FloatingSidebar = () => {
  const items = [
    { icon: <FaFilePdf />, label: 'Brochure', color: 'bg-primary', link: 'https://citabu.ac.in/assets/pdf/CIT-COLLEGE-BROCHURE.pdf.pdf' },
    { icon: <FaDownload />, label: 'Scheme', color: 'bg-accent', link: '/academics/calendar' },
    { icon: <FaBell />, label: 'Notices', color: 'bg-primary', link: '/#notices' },
    { icon: <FaPhoneAlt />, label: 'Contact', color: 'bg-accent', link: '/contact' },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-0.5 items-end">
      {items.map((item, i) => (
        <motion.a
          key={i}
          href={item.link}
          target={item.link.startsWith('http') ? '_blank' : '_self'}
          initial={{ x: 60 }}
          whileHover={{ x: 0 }}
          className={`${item.color} text-white flex items-center p-4 rounded-l-xl shadow-2xl group transition-all duration-300 w-48`}
        >
          <span className="text-xl w-6 flex justify-center">{item.icon}</span>
          <span className="ml-4 font-black uppercase text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            {item.label}
          </span>
        </motion.a>
      ))}

      {/* Admin Login Circular Icon */}
      <motion.a
        href="/admin-login"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-4 mr-4 bg-gray-800 text-white p-3 rounded-full shadow-2xl hover:bg-accent transition-colors flex items-center justify-center cursor-pointer"
        title="Admin Login"
      >
        <FaUserShield className="text-xl" />
      </motion.a>
    </div>
  );
};

export default FloatingSidebar;
