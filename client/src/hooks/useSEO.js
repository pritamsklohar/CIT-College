import { useEffect } from 'react';

const useSEO = ({ title, description, keywords }) => {
  useEffect(() => {
    // Document Title
    const baseTitle = 'Chartered Institute of Technology | Abu Road';
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    // Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content', 
      description || 'Chartered Institute of Technology (CIT), Abu Road, is a premier engineering college in Rajasthan. Offering AICTE-approved B.Tech programs, advanced labs, and excellent placements.'
    );

    // Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      'content', 
      keywords || 'CIT Abu Road, Chartered Institute of Technology, best engineering college Rajasthan, B.Tech admissions Abu Road, computer science engineering Rajasthan, AICTE approved colleges'
    );

    // Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title ? `${title} | CIT Abu Road` : baseTitle);

    // Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description || 'Discover Chartered Institute of Technology (CIT), Abu Road - a hub of academic excellence, innovation, and career growth.');

  }, [title, description, keywords]);
};

export default useSEO;
