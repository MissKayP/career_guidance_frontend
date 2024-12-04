import React, { useState } from 'react';

const PublishAdmissions = () => {
  const [message, setMessage] = useState('');

  const handlePublish = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admissions/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      setMessage(data.message || 'Admissions published successfully.');
    } catch (error) {
      setMessage('Failed to publish admissions.');
    }
  };

  return (
    <div>
      <h2>Publish Admissions</h2>
      <button onClick={handlePublish}>Publish Admissions</button>
      <p>{message}</p>
    </div>
  );
};

export default PublishAdmissions;
