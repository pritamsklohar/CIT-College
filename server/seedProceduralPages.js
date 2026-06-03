const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ProceduralPage = require('./models/ProceduralPage');

dotenv.config();

const pages = [
  {
    slug: 'duplicate-certificate',
    pageTitle: 'Duplicate Certificate / Mark Sheet',
    pageSubtitle: 'Follow the official Bikaner Technical University (BTU) guidelines below to apply for a duplicate mark sheet or degree certificate.',
    heroIcon: 'FaFileAlt',
    noticeTitle: 'Important Notice',
    noticeContent: 'Fees and required forms are subject to BTU notifications. Please verify the exact fee amount with the CIT administration desk before creating a Demand Draft.',
    noticeType: 'yellow',
    documents: [
      { icon: 'FaIdCard', title: 'FIR Copy / Affidavit', desc: 'Original Police FIR copy or a notarized affidavit stating the loss of the original document.' },
      { icon: 'FaEnvelopeOpenText', title: 'College Forwarding Letter', desc: 'An official forwarding letter signed by the Principal/Director of CIT.' },
      { icon: 'FaIdCard', title: 'Identity Proof', desc: 'A clear, self-attested photocopy of a valid ID (Aadhar Card, Voter ID, etc.).' },
      { icon: 'FaFileAlt', title: 'Previous Copy (If Available)', desc: 'A photocopy of the lost mark sheet or certificate to expedite the search.' }
    ],
    feesTitle: 'Fee Structure',
    fees: [
      { label: 'Duplicate Mark Sheet', amount: '~ ₹ 500' },
      { label: 'Consolidated Mark Sheet', amount: '~ ₹ 1100' }
    ],
    feeNote: '* Fees must be paid via Demand Draft (DD) drawn in favor of "Bikaner Technical University, Bikaner" payable at Bikaner.',
    stepsTitle: 'Steps to Apply',
    steps: [
      { title: 'Download Form', desc: 'Get the official application form.' },
      { title: 'Get Verified', desc: 'Obtain Principal signature & seal.' },
      { title: 'Prepare DD', desc: 'Draft the fee payable to BTU.' },
      { title: 'Dispatch to COE', desc: 'Send by Speed Post to BTU, Bikaner.' }
    ],
    downloadLink: 'https://btu.ac.in'
  },
  {
    slug: 'migration-certificate',
    pageTitle: 'Migration Process',
    pageSubtitle: 'A migration certificate is issued by BTU for students who wish to pursue higher education in another university.',
    heroIcon: 'FaGraduationCap',
    noticeTitle: 'Pre-requisite Check',
    noticeContent: "Before applying for a migration certificate, ensure that all college dues (Library, Hostel, Tuition Fees) are completely cleared. A 'No Dues' certificate from CIT is mandatory.",
    noticeType: 'blue',
    documents: [
      { icon: 'FaClipboardCheck', title: 'No Dues Certificate', desc: 'Original No Dues slip authorized by CIT administration and Library.' },
      { icon: 'FaGraduationCap', title: 'Final Degree / Mark Sheets', desc: 'Self-attested photocopies of all semester mark sheets or provisional degree.' },
      { icon: 'FaBuilding', title: 'College Forwarding Letter', desc: 'A request letter forwarded by the Principal of CIT.' }
    ],
    feesTitle: 'Fee Details',
    fees: [
      { label: 'Migration Fee', amount: '~ ₹ 300' }
    ],
    feeNote: '* Fees must be paid via Demand Draft (DD) drawn in favor of "Bikaner Technical University, Bikaner" payable at Bikaner. Please confirm the exact amount with the administration.',
    stepsTitle: 'Application Flow',
    steps: [
      { title: 'Clear Dues', desc: 'Obtain No Dues Certificate from CIT.' },
      { title: 'Apply & Pay', desc: 'Fill form and prepare BTU DD.' },
      { title: 'Submit', desc: 'Send documents to BTU COE.' }
    ],
    downloadLink: 'https://btu.ac.in'
  },
  {
    slug: 'name-correction',
    pageTitle: 'Name Correction Procedure',
    pageSubtitle: 'Process for rectifying spelling mistakes or updating names in BTU university records and mark sheets.',
    heroIcon: 'FaUserEdit',
    noticeTitle: 'Strict Proof Required',
    noticeContent: 'BTU relies heavily on your 10th Class (Secondary) Board Mark Sheet as the primary legal proof for name correction. If a completely new name is adopted, a Gazette notification or newspaper advertisement clip may also be mandatory.',
    noticeType: 'red',
    documents: [
      { icon: 'FaBookOpen', title: '10th Class Mark Sheet', desc: 'Self-attested copy of the 10th-grade board mark sheet (used as baseline truth).' },
      { icon: 'FaUserEdit', title: 'Original Incorrect Documents', desc: 'The original BTU mark sheets or certificates that contain the error must be surrendered.' },
      { icon: 'FaFileSignature', title: 'Affidavit (If Applicable)', desc: 'A legal affidavit detailing the correct name, signed by a Notary Public.' },
      { icon: 'FaFileSignature', title: 'Forwarding Letter', desc: 'Application forwarded and sealed by the Principal of CIT.' }
    ],
    feesTitle: 'Correction Fee',
    fees: [
      { label: 'Per Document Correction', amount: '~ ₹ 250 - 500' }
    ],
    feeNote: '* Exact fees depend on the number of documents needing reissue. Fees must be paid via Demand Draft (DD) drawn in favor of "Bikaner Technical University, Bikaner" payable at Bikaner.',
    stepsTitle: 'Correction Process',
    steps: [
      { title: 'Gather Proofs', desc: 'Copy of 10th mark sheet & ID.' },
      { title: 'College Approval', desc: 'Forward application through CIT.' },
      { title: 'Surrender Docs', desc: 'Return incorrect original docs.' },
      { title: 'Submit to BTU', desc: 'Send package with DD to COE.' }
    ],
    downloadLink: 'https://btu.ac.in'
  }
];

const seedProceduralPages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    await ProceduralPage.deleteMany();
    console.log('Procedural Pages cleared');

    await ProceduralPage.insertMany(pages);
    console.log('Procedural Pages seeded successfully');

    process.exit();
  } catch (error) {
    console.error('Error with data import:', error);
    process.exit(1);
  }
};

seedProceduralPages();
