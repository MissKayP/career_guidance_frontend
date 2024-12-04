// ManageAdmissions.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageAdmissions = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [applications, setApplications] = useState([
    { id: 1, name: 'Khahliso Pii', status: 'pending' },
    { id: 2, name: 'Josphina Moerane', status: 'pending' },
    { id: 3, name: 'Mpeoane Maapesa', status: 'approved' },
    { id: 3, name: 'Ntsoaki Mokone', status: 'approved' },
  ]);

  const handleApprove = (id) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === id ? { ...app, status: 'approved' } : app
      )
    );
  };

  const handleReject = (id) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === id ? { ...app, status: 'rejected' } : app
      )
    );
  };

  // Back button click handler
  const handleBack = () => {
    navigate(-1); // Go back to the previous page without logging out
  };

  return (
    <div>
      <h2>Manage Admissions</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.name}</td>
              <td>{application.status}</td>
              <td>
                {application.status === 'pending' ? (
                  <>
                    <button onClick={() => handleApprove(application.id)}>
                      Approve
                    </button>
                    <button onClick={() => handleReject(application.id)}>
                      Reject
                    </button>
                  </>
                ) : (
                  <button disabled>Processed</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleBack} className="back-button">
        Back
      </button>
    </div>
  );
};

export default ManageAdmissions;
