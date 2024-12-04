import React, { useState } from 'react';

const RegisterInstitute = () => {
  const [email, setEmail] = useState('');
  const [institutionName, setInstitutionName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Institute Registered:', institutionName, email);
  };

  return (
    <div>
      <h2>Register Institute</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Institution Name"
          value={institutionName}
          onChange={(e) => setInstitutionName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterInstitute;
