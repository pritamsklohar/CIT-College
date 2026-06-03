const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });
connectDB();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:5180'],
  credentials: true
}));

// Static folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/faculty', require('./routes/facultyRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));
app.use('/api/static-pages', require('./routes/staticPageRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/recruiters', require('./routes/recruiterRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/hero', require('./routes/heroRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/academic-calendars', require('./routes/academicCalendarRoutes'));
app.use('/api/alumni-page', require('./routes/alumniPageRoutes'));
app.use('/api/achievements', require('./routes/achievementRoutes'));
app.use('/api/procedural-pages', require('./routes/proceduralPageRoutes'));
app.use('/api/admission-page', require('./routes/admissionPageRoutes'));
app.use('/api/scholarship-page', require('./routes/scholarshipPageRoutes'));
app.use('/api/board-members', require('./routes/boardMemberRoutes'));
app.use('/api/recognitions', require('./routes/recognitionRoutes'));
app.use('/api/syllabus', require('./routes/syllabusRoutes'));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running. Please set NODE_ENV to production to serve the frontend.');
  });
}

// Error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
