import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const AddInstitution = () => {
  const [institutionName, setInstitutionName] = useState('');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleAddInstitution = () => {
    // Add institution logic goes here
    console.log('Institution Added:', institutionName);
  };

  return (
    <div className="form-container">
      <h2>Add Institution</h2>

      {/* Back Button */}
      <button className="back-button" onClick={handleBack}>
        &#8592; Back
      </button>

      <form className="form">
        <input
          type="text"
          placeholder="Institution Name"
          value={institutionName}
          onChange={(e) => setInstitutionName(e.target.value)}
          className="input"
        />
        <button type="button" className="button" onClick={handleAddInstitution}>
          Add Institution
        </button>
      </form>
    </div>
  );
};

export default AddInstitution;
