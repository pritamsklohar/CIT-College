import { FaWhatsapp, FaHeadset, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FloatingEnquiry = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
      <a 
        href="https://wa.me/919588013851" 
        target="_blank" 
        className="bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-2xl hover:scale-110 transition animate-bounce"
        title="WhatsApp Chat"
      >
        <FaWhatsapp />
      </a>
      <button 
        className="bg-accent text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-2xl hover:scale-110 transition"
        onClick={() => window.location.href = '/contact'}
        title="Enquiry / Contact"
      >
        <FaHeadset />
      </button>
      <Link 
        to="/admin-login" 
        className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-2xl hover:scale-110 transition border border-white/20"
        title="Admin Portal Login"
      >
        <FaLock />
      </Link>
    </div>
  );
};

export default FloatingEnquiry;
