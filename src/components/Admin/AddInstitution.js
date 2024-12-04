import React, { useState } from 'react';

const AddInstitution = ({ addInstitution }) => {
  const [institutionName, setInstitutionName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!institutionName) {
      setErrorMessage('Institution name is required.');
      return;
    }

    addInstitution(institutionName); // Pass the new institution name to the parent function
    setInstitutionName('');
    setErrorMessage('');
    alert('Institution added successfully!');
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Institution Name"
          value={institutionName}
          onChange={(e) => setInstitutionName(e.target.value)}
        />
        <button type="submit">Add Institution</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AddInstitution;
