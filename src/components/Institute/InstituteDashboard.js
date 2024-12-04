import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const InstituteDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [quotes] = useState([
    "Education is the most powerful weapon you can use to change the world.",
    "An investment in knowledge pays the best interest.",
    "Teaching is the one profession that creates all other professions.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Education is not preparation for life; education is life itself.",
  ]);

  const navigate = useNavigate();

  // Change quote every 5 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/institute/dashboard');
  };

  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div className="dashboard">
      {!isAuthenticated ? (
        <div className="auth-section">
          <div className="form-container">
            <h2 className="form-title">Login</h2>
            <form className="form">
              <input type="text" placeholder="Username" className="input" />
              <input type="password" placeholder="Password" className="input" />
              <button type="button" className="button" onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h2>Institute Dashboard</h2>

          {/* Back Button */}
          <button className="back-button" onClick={handleBack}>
            &#8592; Back
          </button>

          {/* Quote Section */}
          <div className="quote-display">{quotes[currentQuoteIndex]}</div>

          {/* Dashboard Content */}
          <div className="data-section">
            <h3>Overview</h3>
            <p>Total Faculties: 15</p>
            <p>Total Courses: 12</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Add Faculty</td>
                <td><Link to="/institute/add-faculty">Go to Add Faculty</Link></td>
              </tr>
              <tr>
                <td>Add Course</td>
                <td><Link to="/institute/add-course">Go to Add Course</Link></td>
              </tr>
              <tr>
                <td>View Applications</td>
                <td><Link to="/institute/view-applications">Go to View Applications</Link></td>
              </tr>
              <tr>
                <td>Publish Admissions</td>
                <td><Link to="/institute/publish-admissions">Go to Publish Admissions</Link></td>
              </tr>
              <tr>
                <td>Profile</td>
                <td><Link to="/institute/profile">Go to Profile</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InstituteDashboard;
