import React, { useState } from 'react';
import './Dashboard.css'; // Adjust the path if necessary

const LoginAndRegister = () => {
  const [isRegistering, setIsRegistering] = useState(true); // Toggle between login and register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Registration failed');
        return;
      }

      setMessage('Registration successful! You can now log in.');
      setIsRegistering(false); // Switch to login after successful registration
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || 'Login failed');
        return;
      }

      setMessage(`Welcome back, ${username}!`);
      // Redirect or manage user session here
    } catch (err) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{isRegistering ? 'Register' : 'Login'}</h2>
      {message && <p className="message">{message}</p>}
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Username"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegistering ? (
          <button type="button" className="button" onClick={handleRegister}>
            Register
          </button>
        ) : (
          <button type="button" className="button" onClick={handleLogin}>
            Login
          </button>
        )}
      </form>
      <button
        type="button"
        className="toggle-button"
        onClick={() => {
          setIsRegistering(!isRegistering);
          setMessage('');
        }}
      >
        {isRegistering
          ? 'Already have an account? Log in'
          : 'New here? Register'}
      </button>
    </div>
  );
};

export default LoginAndRegister;
