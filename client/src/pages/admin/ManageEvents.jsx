import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaCalendarAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', location: '', isActive: true
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await API.get('/events');
    setEvents(res.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    try {
      await API.post('/events', data);
      toast.success('Event added');
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      toast.error('Failed to add event');
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await API.delete(`/events/${id}`);
      toast.success('Deleted');
      fetchEvents();
    } catch (err) {}
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Events</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-accent transition"
        >
          <FaPlus /> Add New Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event._id} className="bg-white rounded-2xl shadow-sm border overflow-hidden group">
             <div className="h-40 bg-gray-100 relative">
                {event.imageUrl && <img src={event.imageUrl} className="w-full h-full object-cover" />}
                <div className="absolute top-2 right-2 flex gap-2">
                   <button onClick={() => deleteEvent(event._id)} className="bg-white p-2 rounded-lg text-red-500 shadow-lg hover:bg-red-50"><FaTrash /></button>
                </div>
             </div>
             <div className="p-6">
                <h3 className="font-bold text-gray-800 line-clamp-1 mb-2">{event.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase mb-4">
                   <FaCalendarAlt className="text-accent" /> {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="text-xs font-bold text-gray-500 truncate">{event.location}</div>
             </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
           <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white w-full max-w-xl rounded-2xl shadow-2xl">
              <div className="bg-primary p-6 text-white flex justify-between items-center">
                 <h3 className="font-bold text-lg">Add New Event</h3>
                 <button onClick={() => setShowModal(false)} className="text-2xl">&times;</button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Event Title</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-lg" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                       <input type="date" required className="w-full px-4 py-2 border rounded-lg" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                       <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Event Image</label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border font-bold rounded-lg">Cancel</button>
                    <button type="submit" className="flex-1 bg-primary text-white font-bold rounded-lg hover:bg-accent transition">Save Event</button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
