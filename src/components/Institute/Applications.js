import React, { useState, useEffect } from 'react';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/applications');
        const data = await response.json();
        setApplications(data.applications || []);
      } catch (error) {
        setError('Failed to load applications.');
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h2>View Applications</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Applicant Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.applicantName}</td>
              <td>{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Applications;
