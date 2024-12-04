import React, { useState } from 'react';

const AddFaculty = ({ addFaculty }) => {
  const [facultyName, setFacultyName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!facultyName) {
      setErrorMessage('Faculty name is required.');
      return;
    }

    addFaculty(facultyName);
    setFacultyName('');
    setErrorMessage('');
    alert('Faculty added successfully!');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        
        <input
          id="facultyName"
          type="text"
          placeholder="Enter Faculty Name"
          value={facultyName}
          onChange={(e) => setFacultyName(e.target.value)}
        />
        <button type="submit">Add Faculty</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AddFaculty;
