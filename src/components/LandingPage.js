import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './LandingPage.css'; // Import the CSS for other styles
import backgroundImage from '../assets/background.jpg'; // Import the image from src/assets

const LandingPage = () => {
  return (
    <div className="landing-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="content">
        <h1>Welcome to the Career Guidance System</h1>
        <p>Find the perfect career path with us!</p>
        <Link to="/admin/dashboard" className="get-started-btn"> {/* Update the link */}
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
