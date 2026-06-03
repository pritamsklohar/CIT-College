import { useState, useEffect } from 'react';
import API from '../../api/axios';
import PageBanner from '../../components/common/PageBanner';

const BoardOfManagement = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch only Management type board members, and sort them by order if possible
    API.get('/board-members?type=Management').then(res => {
      // Sort by order or just use the returned order
      const sorted = res.data.data.sort((a, b) => a.order - b.order);
      setMembers(sorted);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <PageBanner title="Board of Management" breadcrumb="About Us / Board Members" />

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-primary uppercase mb-4">THE <span className="text-accent">LEADERSHIP</span></h2>
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm">Empowering minds, building futures</p>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-10 text-center text-gray-400 font-bold">Loading members...</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-50 border-b-2 border-blue-100">
                    <th className="py-5 px-6 font-black text-primary uppercase tracking-wider text-sm w-24 text-center">Sr. No</th>
                    <th className="py-5 px-6 font-black text-primary uppercase tracking-wider text-sm">Name</th>
                    <th className="py-5 px-6 font-black text-primary uppercase tracking-wider text-sm">Designation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {members.map((member, idx) => (
                    <tr key={member._id} className="hover:bg-gray-50 transition duration-200">
                      <td className="py-5 px-6 text-center">
                        <span className="font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                           {String(idx + 1).padStart(2, '0')}
                        </span>
                      </td>
                      <td className="py-5 px-6 font-bold text-gray-800 text-lg">
                        {member.name}
                      </td>
                      <td className="py-5 px-6 font-semibold text-gray-600">
                        {member.designation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {!loading && members.length === 0 && (
              <div className="p-10 text-center text-gray-400 font-bold">No management board members found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardOfManagement;
