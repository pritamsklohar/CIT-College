import { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import AlumniWall from '../../components/home/AlumniWall';
import API from '../../api/axios';

const AlumniCell = () => {
  const [data, setData] = useState({
    pageTitle: 'CIT Alumni Cell',
    pageSubtitle: 'Bridging the gap between our glorious past and a promising future. Stay connected with your alma mater.',
    aboutTitle: 'About the Association',
    aboutContent: 'The CIT Alumni Association is a vibrant global network of professionals who have graduated from the Chartered Institute of Technology...\n\nThe Alumni Cell serves as a bridge, fostering continuous interaction between the institute, current students, and our esteemed graduates.',
    objectives: [
      { icon: 'FaNetworkWired', title: 'Strong Networking', desc: 'Build and maintain a lifelong relationship.' },
      { icon: 'FaHandsHelping', title: 'Student Mentorship', desc: 'Provide career guidance.' },
      { icon: 'FaUserTie', title: 'Placements & Internships', desc: 'Facilitate recruitment opportunities.' },
      { icon: 'FaGraduationCap', title: 'Alumni Meets', desc: 'Organize annual reunions.' }
    ]
  });

  useEffect(() => {
    API.get('/alumni-page')
      .then(res => {
        if (res.data.success && res.data.data) {
          setData(res.data.data);
        }
      })
      .catch(err => console.error("Failed to load alumni page data:", err));
  }, []);

  // Helper to dynamically render icon from string
  const renderIcon = (iconName) => {
    const IconComponent = FaIcons[iconName] || FaIcons.FaRegStar;
    return <IconComponent />;
  };

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-primary pt-24 pb-12 md:pt-32 md:pb-20 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${data.heroImageUrl || 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2000&auto=format&fit=crop'}')` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-2xl md:text-5xl font-black mb-3 md:mb-4 uppercase tracking-widest text-white">
            {data.pageTitle.split(' ').map((word, i, arr) => 
              i === arr.length - 1 || i === arr.length - 2 ? <span key={i} className="text-accent">{word} </span> : <span key={i}>{word} </span>
            )}
          </h1>
          <p className="text-sm md:text-xl text-gray-200 max-w-2xl mx-auto font-medium">
            {data.pageSubtitle}
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-wider mb-4 md:mb-6">
              {data.aboutTitle.split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? <span key={i} className="text-accent">{word}</span> : <span key={i}>{word} </span>
              )}
            </h2>
            {data.aboutContent.split('\n').map((paragraph, idx) => (
              paragraph.trim() && <p key={idx} className="text-gray-600 text-sm md:text-lg leading-relaxed mb-4 md:mb-6">{paragraph}</p>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {data.objectives.map((obj, index) => (
              <div key={index} className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border-b-4 border-accent hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-50 text-accent rounded-full flex items-center justify-center text-xl md:text-3xl mb-4 md:mb-6 shadow-inner">
                  {renderIcon(obj.icon)}
                </div>
                <h3 className="text-base md:text-xl font-bold text-primary mb-2 md:mb-3">{obj.title}</h3>
                <p className="text-gray-500 font-medium text-xs md:text-sm">{obj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Wall Component */}
      <div className="pb-10">
        <AlumniWall />
      </div>

    </div>
  );
};

export default AlumniCell;
