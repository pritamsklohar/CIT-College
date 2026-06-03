import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/admin/AdminLayout';

// Pages
import Home from './pages/Home';
import Institute from './pages/about/Institute';
import VisionMission from './pages/about/VisionMission';
import ChairmanMessage from './pages/about/ChairmanMessage';
import BoardOfManagement from './pages/about/BoardOfManagement';
import MandatoryDisclosure from './pages/about/MandatoryDisclosure';
import Location from './pages/about/Location';
import FacultyProfile from './pages/academics/FacultyProfile';
import PrincipalProfile from './pages/academics/PrincipalProfile';
import AdminStaff from './pages/academics/AdminStaff';
import Recognition from './pages/academics/Recognition';
import DepartmentPage from './pages/academics/departments/DepartmentPage';
import AcademicCalendar from './pages/academics/AcademicCalendar';
import SchemeSyllabus from './pages/academics/SchemeSyllabus';
import Admission from './pages/admission/Admission';
import Scholarship from './pages/scholarship/Scholarship';
import TNPCell from './pages/placement/TNPCell';
import CRTProgram from './pages/placement/CRTProgram';
import StudentAchievements from './pages/student/StudentAchievements';
import AlumniCell from './pages/student/AlumniCell';
import DuplicateCertificate from './pages/student/DuplicateCertificate';
import MigrationCertificate from './pages/student/MigrationCertificate';
import NameCorrection from './pages/student/NameCorrection';
import NCC from './pages/student/NCC';
import Contact from './pages/contact/Contact';
import Gallery from './pages/gallery/Gallery';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ManageNotices from './pages/admin/ManageNotices';
import ManageHero from './pages/admin/ManageHero';
import ManageFaculty from './pages/admin/ManageFaculty';
import ManageAdminStaff from './pages/admin/ManageAdminStaff';
import ManageRecognitions from './pages/admin/ManageRecognitions';
import ManageSyllabus from './pages/admin/ManageSyllabus';
import ManageAcademicCalendar from './pages/admin/ManageAcademicCalendar';
import ManageGallery from './pages/admin/ManageGallery';
import ManageEvents from './pages/admin/ManageEvents';
import ManageRecruiters from './pages/admin/ManageRecruiters';
import ManageDepartments from './pages/admin/ManageDepartments';
import ManageBoardMembers from './pages/admin/ManageBoardMembers';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ViewEnquiries from './pages/admin/ViewEnquiries';
import SiteSettings from './pages/admin/SiteSettings';
import ManageAchievements from './pages/admin/ManageAchievements';
import ManageAlumniPage from './pages/admin/ManageAlumniPage';
import ManageProceduralPages from './pages/admin/ManageProceduralPages';
import ManageScholarshipPage from './pages/admin/ManageScholarshipPage';
import ManageStaticPages from './pages/admin/ManageStaticPages';
import ManageTNPCell from './pages/admin/ManageTNPCell';
import ManageAdmission from './pages/admin/ManageAdmission';
import StaticPageViewer from './pages/StaticPageViewer';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about/institute" element={<Institute />} />
            <Route path="about/vision-mission" element={<VisionMission />} />
            <Route path="about/chairman-message" element={<ChairmanMessage />} />
            <Route path="about/board-of-management" element={<BoardOfManagement />} />
            <Route path="about/mandatory-disclosure" element={<MandatoryDisclosure />} />
            <Route path="about/location" element={<Location />} />
            <Route path="academics/faculty-profile" element={<FacultyProfile />} />
            <Route path="academics/principal-profile" element={<PrincipalProfile />} />
            <Route path="academics/admin-staff" element={<AdminStaff />} />
            <Route path="academics/departments/:slug" element={<DepartmentPage />} />
            <Route path="academics/calendar" element={<AcademicCalendar />} />
            <Route path="academics/recognition" element={<Recognition />} />
            <Route path="academics/scheme-syllabus" element={<SchemeSyllabus />} />
            <Route path="admission" element={<Admission />} />
            <Route path="scholarship" element={<Scholarship />} />
            <Route path="placement/tnp-cell" element={<TNPCell />} />
            <Route path="placement/crt" element={<CRTProgram />} />
            <Route path="student/achievements" element={<StudentAchievements />} />
            <Route path="student/alumni" element={<AlumniCell />} />
            <Route path="student/duplicate-certificate" element={<DuplicateCertificate />} />
            <Route path="student/migration-certificate" element={<MigrationCertificate />} />
            <Route path="student/name-correction" element={<NameCorrection />} />
            <Route path="student/ncc" element={<NCC />} />
            <Route path="contact" element={<Contact />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="page/:slug" element={<StaticPageViewer />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="hero" element={<ManageHero />} />
            <Route path="notices" element={<ManageNotices />} />
            <Route path="faculty" element={<ManageFaculty />} />
            <Route path="admin-staff" element={<ManageAdminStaff />} />
            <Route path="recognitions" element={<ManageRecognitions />} />
            <Route path="syllabus" element={<ManageSyllabus />} />
            <Route path="academic-calendar" element={<ManageAcademicCalendar />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="recruiters" element={<ManageRecruiters />} />
            <Route path="departments" element={<ManageDepartments />} />
            <Route path="board-members" element={<ManageBoardMembers />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="enquiries" element={<ViewEnquiries />} />
            <Route path="static-pages/:slug" element={<ManageStaticPages />} />
            <Route path="achievements" element={<ManageAchievements />} />
            <Route path="alumni-page" element={<ManageAlumniPage />} />
            <Route path="scholarship-page" element={<ManageScholarshipPage />} />
            <Route path="service-pages" element={<ManageProceduralPages />} />
            <Route path="admission-page" element={<ManageAdmission />} />
            <Route path="settings" element={<SiteSettings />} />
            <Route path="tnp-cell" element={<ManageTNPCell />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
