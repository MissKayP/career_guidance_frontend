import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const StudentDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [admissionStatus, setAdmissionStatus] = useState(null);
  const [admissionDate, setAdmissionDate] = useState(null);
  const [admissions, setAdmissions] = useState([]); // To store fetched admissions
  const studentId = 'student-id'; // Replace with dynamic student ID from authentication (session/cookie)

  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'admissions') {
      const fetchAdmissions = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/admissions/available', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // To send cookies (for session-based authentication)
          });

          if (!response.ok) {
            throw new Error('Error fetching admissions');
          }

          const data = await response.json();
          setAdmissions(data.admissions); // Set the fetched admissions
        } catch (error) {
          console.error('Error fetching admission status:', error);
        }
      };

      fetchAdmissions();
    }
  }, [activeTab]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/student/dashboard');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h3>Overview</h3>
            <p>Total Applications: 5</p>
            <p>Accepted Courses: 3</p>
          </div>
        );
      case 'applications':
        return (
          <div>
            <h3>Applications</h3>
            <button>Apply for Courses</button>
          </div>
        );
      case 'admissions':
        return (
          <div>
            <h3>Admissions</h3>
            {admissions.length > 0 ? (
              admissions.map((admission) => (
                <div key={admission.id}>
                  <p><strong>{admission.institution}</strong> - {admission.course}</p>
                  <p>{admission.description}</p>
                  <p><em>{new Date(admission.date).toLocaleDateString()}</em></p>
                </div>
              ))
            ) : (
              <p>No admissions available.</p>
            )}
          </div>
        );
      case 'profile':
        return (
          <div>
            <h3>Your Profile</h3>
            <button>Go to Profile</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      {!isAuthenticated ? (
        <div>
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Student Dashboard</h2>
          <button className="back-button" onClick={handleBack}>
            &#8592; Back
          </button>

          <div className="tabs">
            <button
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              Applications
            </button>
            <button
              className={`tab ${activeTab === 'admissions' ? 'active' : ''}`}
              onClick={() => setActiveTab('admissions')}
            >
              Admissions
            </button>
            <button
              className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
          </div>

          <div className="tab-content">{renderContent()}</div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
