import { useState } from 'react';
import API from '../../api/axios';
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', subject: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState({ q: '', a: null });
  const [userAnswer, setUserAnswer] = useState('');

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ q: `${n1} + ${n2}`, a: n1 + n2 });
    setUserAnswer('');
  };

  useState(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(userAnswer) !== captcha.a) {
      toast.error('Incorrect CAPTCHA answer. Please try again.');
      generateCaptcha();
      return;
    }
    setLoading(true);
    try {
      await API.post('/enquiries', formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ fullName: '', phone: '', email: '', subject: '', message: '' });
      generateCaptcha();
    } catch (err) {
      toast.error('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-primary py-24 text-center text-white relative">
         <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase">CONTACT US</h1>
         <p className="text-accent font-bold tracking-widest uppercase text-sm">Reach Out / Contact</p>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Form */}
          <div className="lg:w-3/5 bg-gray-50 p-8 md:p-12 rounded-3xl shadow-xl">
             <h2 className="text-3xl font-black text-primary mb-8">Send Us A <span className="text-accent">Message</span></h2>
             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent outline-none transition"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent outline-none transition"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent outline-none transition"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent outline-none transition"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your Message *</label>
                  <textarea 
                    rows="5" required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent outline-none transition"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <div className="md:col-span-2 bg-white p-6 rounded-2xl border-2 border-gray-100 flex flex-col md:flex-row items-center gap-6">
                   <div className="flex items-center gap-4 shrink-0">
                      <span className="text-sm font-black text-primary uppercase tracking-widest">Verify You Are Human:</span>
                      <span className="bg-accent text-white px-4 py-2 rounded-lg font-black text-xl shadow-inner">{captcha.q} = ?</span>
                   </div>
                   <input 
                     type="number" required
                     placeholder="Enter Result"
                     className="flex-1 w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-accent outline-none transition font-bold text-center"
                     value={userAnswer}
                     onChange={(e) => setUserAnswer(e.target.value)}
                   />
                </div>
                <button 
                  disabled={loading}
                  className="bg-primary text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-accent transition shadow-lg w-full md:w-auto"
                >
                  {loading ? 'Sending...' : <>Send Message <FaPaperPlane /></>}
                </button>
             </form>
          </div>

          {/* Info */}
          <div className="lg:w-2/5 space-y-8">
             <div className="bg-primary p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:scale-150 transition duration-500"></div>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-accent inline-block"></span> Contact Information
                </h3>
                <div className="space-y-8">
                   <div className="flex items-start gap-5">
                      <div className="bg-white bg-opacity-10 p-4 rounded-2xl text-accent text-xl"><FaMapMarkerAlt /></div>
                      <div>
                         <h5 className="font-bold text-accent uppercase tracking-widest text-xs mb-1">Address</h5>
                         <p className="text-sm opacity-90">Village Danvav, Mt. Road, Abu Road, Dist. Sirohi, Rajasthan - 307510</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-5">
                      <div className="bg-white bg-opacity-10 p-4 rounded-2xl text-accent text-xl"><FaPhoneAlt /></div>
                      <div>
                         <h5 className="font-bold text-accent uppercase tracking-widest text-xs mb-1">Call Us</h5>
                         <p className="text-sm opacity-90">+91 99505 30301</p>
                         <p className="text-sm opacity-90">+91 95880 13851</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-5">
                      <div className="bg-white bg-opacity-10 p-4 rounded-2xl text-accent text-xl"><FaEnvelope /></div>
                      <div>
                         <h5 className="font-bold text-accent uppercase tracking-widest text-xs mb-1">Email</h5>
                         <p className="text-sm opacity-90">citaburoad@gmail.com</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="rounded-3xl overflow-hidden h-64 shadow-xl grayscale hover:grayscale-0 transition duration-500 border-2 border-gray-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.336443425421!2d72.7846563!3d24.4754701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395d7350435b67bb%3A0xc391b1f618a8047!2sChartered%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1715615615615!5m2!1sen!2sin" 
                  width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy">
                </iframe>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
