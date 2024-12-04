import React, { useState, useEffect } from 'react';

const ApplyForCourse = () => {
  const [courses, setCourses] = useState([]); // To hold the list of available courses
  const [selectedCourse, setSelectedCourse] = useState(''); // To hold the selected course
  const [error, setError] = useState(''); // For error handling
  const [successMessage, setSuccessMessage] = useState(''); // For success feedback

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses'); // Your API endpoint to fetch courses
        const data = await response.json();
        setCourses(data.courses); // Assuming the response contains a "courses" field
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      }
    };

    fetchCourses();
  }, []);

  // Handle course application submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourse) {
      setError('Please select a course to apply for.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course: selectedCourse }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('You have successfully applied for the course!');
        setError('');
      } else {
        setError(data.error || 'An error occurred while applying for the course.');
        setSuccessMessage('');
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      setError('Something went wrong. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Apply for Course</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select a course</option>
          {courses.length > 0 ? (
            courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))
          ) : (
            <option disabled>No courses available</option>
          )}
        </select>
        <button type="submit">Apply</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default ApplyForCourse;
