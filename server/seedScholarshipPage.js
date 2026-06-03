const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ScholarshipPage = require('./models/ScholarshipPage');

dotenv.config();

const scholarshipPageData = {
  introText: 'The Academic Advisory Board of Chartered Institute of Technology, Abu Road consists of prominent academicians with academics experience of many years. The Board takes various decisions pertaining to academic functioning of the institute.',
  scholarships: [
    {
      title: '1. Social Justice & Empowerment Department, Government of Rajasthan',
      eligibility: 'Passed in qualifying Examination.',
      incomeCriteria: [
        '₹1,00,000/- for OBC Candidates',
        '₹2,50,000/- for ST, SC and SBC Candidates'
      ],
      amountMain: 'More than Tuition Fee',
      amountSubtext: '(Deposited Tuition Fee + SJED Norm)',
      colorTheme: 'primary'
    },
    {
      title: '2. Minority Welfare Scholarship',
      eligibility: 'Passed in qualifying Examination.',
      incomeCriteria: [
        '₹2,00,000/- for Minority Community Students (Muslim, Sikh etc.)'
      ],
      amountMain: '₹25,000/-',
      amountSubtext: 'Per Annum',
      colorTheme: 'accent'
    }
  ],
  contactTitle: 'Contact for Details:',
  contactPerson: 'Mr. Amir Mohammad',
  assistanceTitle: 'Need Assistance?',
  assistanceDesc: 'Visit our Scholarship Cell in the Admin block or contact the Scholarship Incharge.',
  assistancePhone: '+91 95880 13851',
  requiredDocuments: [
    'Income Certificate',
    'Domicile Certificate',
    'Caste Certificate',
    '10th & 12th Marksheets',
    'Bank Passbook Copy'
  ]
};

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB Connected');
  await ScholarshipPage.deleteMany({});
  await ScholarshipPage.create(scholarshipPageData);
  console.log('Scholarship page seeded successfully!');
  process.exit();
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
