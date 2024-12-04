import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Navbar and Footer Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Admin Components
import AdminDashboard from './components/Admin/AdminDashboard';
import AddInstitution from './components/Admin/AddInstitution';
import AddFaculty from './components/Admin/AddFaculty';
import AddCourse from './components/Admin/AddCourse';
import ManageAdmissions from './components/Admin/ManageAdmissions';
import AdminProfile from './components/Admin/AdminProfile';



// Institute Components
import InstituteDashboard from './components/Institute/InstituteDashboard';
import RegisterInstitute from './components/Institute/RegisterInstitute';
import InstituteProfile from './components/Institute/Profile';
import AddInstituteFaculty from './components/Institute/AddFaculty';
import AddInstituteCourse from './components/Institute/AddCourse';
import ManageApplications from './components/Institute/Applications';

// Student Components
import StudentDashboard from './components/Student/StudentDashboard';
import RegisterStudent from './components/Student/RegisterStudent';
import StudentProfile from './components/Student/StudentProfile';
import ApplyForCourse from './components/Student/ApplyForCourse';
import ViewAdmissions from './components/Student/ViewAdmissions';

// Landing Page Component
import LandingPage from './components/LandingPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated when the app loads
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');  // Remove user from localStorage
    setIsAuthenticated(false);  // Update state
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="App">
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-institution" element={<AddInstitution />} />
          <Route path="/admin/add-faculty" element={<AddFaculty />} />
          <Route path="/admin/add-course" element={<AddCourse />} />
          <Route path="/admin/manage-admissions" element={<ManageAdmissions />} />
          <Route path="/admin/profile" element={<AdminProfile />} />

          {/* Institute Routes */}
          <Route path="/institute/dashboard" element={<InstituteDashboard />} />
          <Route path="/institute/register" element={<RegisterInstitute />} />
          <Route path="/institute/profile" element={<InstituteProfile />} />
          <Route path="/institute/add-faculty" element={<AddInstituteFaculty />} />
          <Route path="/institute/add-course" element={<AddInstituteCourse />} />
          <Route path="/institute/manage-applications" element={<ManageApplications />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/register" element={<RegisterStudent />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/apply" element={<ApplyForCourse />} />
          <Route path="/student/view-admissions" element={<ViewAdmissions />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
