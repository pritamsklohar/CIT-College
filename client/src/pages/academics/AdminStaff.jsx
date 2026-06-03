import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';
import { motion } from 'framer-motion';

const AdminStaff = () => {
  const [academicAdmin, setAcademicAdmin] = useState([]);
  const [adminStaff, setAdminStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/faculty').then(res => {
      const allStaff = res.data.data;
      setAcademicAdmin(allStaff.filter(s => s.department === 'Academic Administration').sort((a,b) => a.order - b.order));
      setAdminStaff(allStaff.filter(s => s.department === 'Administration Staff').sort((a,b) => a.order - b.order));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const StaffTable = ({ title, staff }) => (
    <div className="mb-16">
      <h3 className="text-2xl font-black text-primary uppercase mb-6 border-b-2 border-accent pb-2 inline-block">
        {title}
      </h3>
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50/50">
                <th className="py-5 px-6 font-black text-gray-400 uppercase tracking-widest text-xs border-b">S.No.</th>
                <th className="py-5 px-6 font-black text-gray-400 uppercase tracking-widest text-xs border-b">Photo</th>
                <th className="py-5 px-6 font-black text-gray-400 uppercase tracking-widest text-xs border-b">Name</th>
                <th className="py-5 px-6 font-black text-gray-400 uppercase tracking-widest text-xs border-b">Designation</th>
                <th className="py-5 px-6 font-black text-gray-400 uppercase tracking-widest text-xs border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member, index) => (
                <tr key={member._id} className="hover:bg-gray-50 transition duration-300 group">
                  <td className="py-4 px-6 border-b border-gray-50 text-gray-400 font-bold">{index + 1}</td>
                  <td className="py-4 px-6 border-b border-gray-50">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm group-hover:border-accent transition">
                      <img src={member.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=183358&color=fff`} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="py-4 px-6 border-b border-gray-50 font-bold text-primary">{member.name}</td>
                  <td className="py-4 px-6 border-b border-gray-50 text-gray-600 font-semibold">{member.designation}</td>
                  <td className="py-4 px-6 border-b border-gray-50 text-accent font-medium text-sm"><a href={`mailto:${member.email}`}>{member.email}</a></td>
                </tr>
              ))}
              {staff.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-400 font-bold italic">No staff members found in this category.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageBanner title="Administrative Staff" breadcrumb="Academics / Admin Staff" />

      <div className="container mx-auto px-4 py-20 max-w-6xl">
         <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-primary uppercase">SUPPORTING <span className="text-accent">PILLARS</span></h2>
            <p className="text-gray-500 font-bold uppercase tracking-[0.2em] mt-2">The team behind smooth campus operations</p>
         </div>

         {loading ? (
           <div className="flex flex-col gap-6">
             {[1,2,3,4].map(i => <div key={i} className="h-16 bg-white animate-pulse rounded-2xl"></div>)}
           </div>
         ) : (
           <>
             <StaffTable title="Academic Administration" staff={academicAdmin} />
             <StaffTable title="Administration Staff" staff={adminStaff} />
           </>
         )}
      </div>
    </div>
  );
};

export default AdminStaff;
