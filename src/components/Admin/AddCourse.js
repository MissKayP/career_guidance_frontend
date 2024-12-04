import React, { useState } from 'react';

const AddCourse = ({ addCourse }) => {
  const [courseName, setCourseName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!courseName) {
      setErrorMessage('Course name is required.');
      return;
    }

    addCourse(courseName);
    setCourseName('');
    setErrorMessage('');
    alert('Course added successfully!');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        
        <input
          id="courseName"
          type="text"
          placeholder="Enter Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <button type="submit">Add Course</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AddCourse;
