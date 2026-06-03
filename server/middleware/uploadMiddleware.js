const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isPDF = file.mimetype === 'application/pdf' || file.originalname.endsWith('.pdf');
    const cleanName = file.originalname.split('.')[0].replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 20);
    
    return {
      folder: 'cit_abu_road',
      public_id: `${cleanName}_${Date.now()}`,
      resource_type: 'auto',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif', 'pdf']
    };
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

module.exports = upload;
