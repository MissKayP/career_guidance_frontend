// AdminProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('adminName') || 'Admin';
    const storedEmail = localStorage.getItem('adminEmail') || 'admin@example.com';
    setName(storedName);
    setEmail(storedEmail);
  }, []);

  const handleSaveChanges = () => {
    localStorage.setItem('adminName', name);
    localStorage.setItem('adminEmail', email);
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (password && newPassword) {
      alert('Password changed successfully!');
      setPassword('');
      setNewPassword('');
    } else {
      alert('Please provide both current and new password.');
    }
  };

  // Back button click handler
  const handleBack = () => {
    navigate(-1); // Go back to the previous page without logging out
  };

  return (
    <div>
      <h2>Admin Profile</h2>
      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <button type="button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </form>

      <h3>Change Password</h3>
      <form>
        <div>
          <label>Current Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter current password"
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div>
          <button type="button" onClick={handleChangePassword}>
            Change Password
          </button>
        </div>
      </form>

      <button onClick={handleBack} className="back-button">
        Back
      </button>
    </div>
  );
};

export default AdminProfile;
