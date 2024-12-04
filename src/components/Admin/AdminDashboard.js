import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Dashboard.css'; // Import the shared CSS
import AddInstitution from './AddInstitution';
import AddFaculty from './AddFaculty';
import AddCourse from './AddCourse'; // Ensure AddCourse is imported

const Login = ({ onLogin }) => (
  <div className="form-container">
    <h2 className="form-title">Login</h2>
    <form className="form">
      <input type="text" placeholder="Username" className="input" />
      <input type="password" placeholder="Password" className="input" />
      <button type="button" className="button" onClick={onLogin}>
        Login
      </button>
    </form>
  </div>
);

const Register = ({ onRegister }) => (
  <div className="form-container">
    <h2 className="form-title">Register</h2>
    <form className="form">
      <input type="text" placeholder="Username" className="input" />
      <input type="password" placeholder="Password" className="input" />
      <button type="button" className="button" onClick={onRegister}>
        Register
      </button>
    </form>
  </div>
);

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [courses, setCourses] = useState([]);
  const [institutionsCount, setInstitutionsCount] = useState(0);
  const [facultiesCount, setFacultiesCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);

  const quotes = [
    "Behind every successful system, there is a great admin."
  ];

  const navigate = useNavigate();

  // Handle login action
  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true'); // Persist authentication state
    setIsAuthenticated(true);
    navigate('/admin/dashboard');
  };

  // Handle register action
  const handleRegister = () => {
    localStorage.setItem('isAuthenticated', 'true'); // Persist authentication state
    setIsAuthenticated(true);
    navigate('/admin/dashboard');
  };

  // Add institution
  const addInstitution = (institutionName) => {
    const updatedInstitutions = [...institutions, institutionName];
    setInstitutions(updatedInstitutions);
    localStorage.setItem('institutions', JSON.stringify(updatedInstitutions)); // Save to localStorage
  };

  // Add faculty
  const addFaculty = (facultyName) => {
    const updatedFaculties = [...faculties, facultyName];
    setFaculties(updatedFaculties);
    localStorage.setItem('faculties', JSON.stringify(updatedFaculties)); // Save to localStorage
  };

  // Add course
  const addCourse = (courseName) => {
    const updatedCourses = [...courses, courseName];
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses)); // Save to localStorage
  };

  // Delete institution
  const deleteInstitution = (index) => {
    const updatedInstitutions = institutions.filter((_, i) => i !== index);
    setInstitutions(updatedInstitutions);
    localStorage.setItem('institutions', JSON.stringify(updatedInstitutions)); // Save to localStorage
  };

  // Delete faculty
  const deleteFaculty = (index) => {
    const updatedFaculties = faculties.filter((_, i) => i !== index);
    setFaculties(updatedFaculties);
    localStorage.setItem('faculties', JSON.stringify(updatedFaculties)); // Save to localStorage
  };

  // Delete course
  const deleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses)); // Save to localStorage
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    // Check if user is authenticated
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }

    // Retrieve data from localStorage
    const storedInstitutions = JSON.parse(localStorage.getItem('institutions')) || [];
    const storedFaculties = JSON.parse(localStorage.getItem('faculties')) || [];
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];

    setInstitutions(storedInstitutions);
    setFaculties(storedFaculties);
    setCourses(storedCourses);

    // Faster counting animation
    const animateCount = (finalCount, setState) => {
      let currentCount = 0;
      const increment = finalCount / 50; // Increase the step size for a faster count
      const interval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= finalCount) {
          clearInterval(interval);
          setState(finalCount); // Ensure it stops at the final count
        } else {
          setState(Math.floor(currentCount));
        }
      }, 10); // Reduce interval time for faster updates (faster animation)
    };

    animateCount(storedInstitutions.length, setInstitutionsCount);
    animateCount(storedFaculties.length, setFacultiesCount);
    animateCount(storedCourses.length, setCoursesCount);
  }, []); // Runs once when the component mounts

  return (
    <div className="dashboard">
      {!isAuthenticated ? (
        <div className="auth-section">
          {!showRegister ? (
            <>
              <Login onLogin={handleLogin} />
              <p className="toggle-form">
                Don’t have an account?{' '}
                <span onClick={() => setShowRegister(true)} className="toggle-link">
                  Register here
                </span>
              </p>
            </>
          ) : (
            <>
              <Register onRegister={handleRegister} />
              <p className="toggle-form">
                Already have an account?{' '}
                <span onClick={() => setShowRegister(false)} className="toggle-link">
                  Login here
                </span>
              </p>
            </>
          )}
        </div>
      ) : (
        <div>
          <h2>Admin Dashboard</h2>

          {/* Display the single static quote */}
          <div className="quote-display">
            <p>{quotes[0]}</p>
          </div>

          <div className="dashboard-cards">
            <div className="card">
              <h3>Total Institutions</h3>
              <p>{institutionsCount}</p> {/* Animated count */}
            </div>
            <div className="card">
              <h3>Total Faculties</h3>
              <p>{facultiesCount}</p> {/* Animated count */}
            </div>
            <div className="card">
              <h3>Total Courses</h3>
              <p>{coursesCount}</p> {/* Animated count */}
            </div>
          </div>

          <div className="dashboard-cards">
            <div className="card">
              <h3>Add Institution</h3>
              <AddInstitution addInstitution={addInstitution} />
            </div>

            <div className="card">
              <h3>Add Faculty</h3>
              <AddFaculty addFaculty={addFaculty} />
            </div>

            <div className="card">
              <h3>Add Course</h3>
              <AddCourse addCourse={addCourse} />
            </div>
          </div>

          <div className="dashboard-cards">
            <div className="card">
              <h3>Manage Admissions</h3>
              <Link to="/admin/manage-admissions" className="button">
                Go to Manage Admissions
              </Link>
            </div>
            <div className="card">
              <h3>Profile</h3>
              <Link to="/admin/profile" className="button">
                Go to Profile
              </Link>
            </div>
          </div>

          {/* Institutions Table */}
          <h3>Institutions</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Institution Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {institutions.map((institution, index) => (
                <tr key={index}>
                  <td>{institution}</td>
                  <td>
                    <button
                      onClick={() => deleteInstitution(index)}
                      className="button delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Faculties Table */}
          <h3>Faculties</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Faculty Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculties.map((faculty, index) => (
                <tr key={index}>
                  <td>{faculty}</td>
                  <td>
                    <button
                      onClick={() => deleteFaculty(index)}
                      className="button delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Courses Table */}
          <h3>Courses</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course}</td>
                  <td>
                    <button
                      onClick={() => deleteCourse(index)}
                      className="button delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
