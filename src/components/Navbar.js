import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; // Make sure to import the CSS file

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear the authentication state
    setIsAuthenticated(false); // Update the state to reflect that user is logged out
    navigate('/'); // Redirect to the homepage or login page
  };

  return (
    <>
      <header className="header">
        <h1 className="blinking-text">Khothatso - A Hope For A Brighter Future</h1>
      </header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li> {/* Link to the landing page */}
          <li><Link to="/admin/dashboard">Admin</Link></li>
          <li><Link to="/institute/dashboard">Institute</Link></li>
          <li><Link to="/student/dashboard">Student</Link></li>
          
          {/* Conditionally render the Logout button based on authentication status */}
          {isAuthenticated && (
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
