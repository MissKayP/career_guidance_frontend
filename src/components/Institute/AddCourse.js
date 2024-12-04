import React, { useState } from 'react';

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [institutionId, setInstitutionId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend API call here
    fetch('http://localhost:5000/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseName, courseCode, institutionId }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || 'Course added successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to add course.');
      });
  };

  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course Name:
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </label>
        <label>
          Course Code:
          <input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
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
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
