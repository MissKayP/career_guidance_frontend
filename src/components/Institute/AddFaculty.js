import React, { useState } from 'react';

const AddFaculty = () => {
  const [facultyName, setFacultyName] = useState('');
  const [institutionId, setInstitutionId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend API call here
    fetch('http://localhost:5000/api/faculties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ facultyName, institutionId }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || 'Faculty added successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to add faculty.');
      });
  };

  return (
    <div>
      <h2>Add Faculty</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Faculty Name:
          <input
            type="text"
            value={facultyName}
            onChange={(e) => setFacultyName(e.target.value)}
            required
          />
        </label>
        <label>
          Institution ID:
          <input
            type="text"
            value={institutionId}
            onChange={(e) => setInstitutionId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Faculty</button>
      </form>
    </div>
  );
};

export default AddFaculty;
