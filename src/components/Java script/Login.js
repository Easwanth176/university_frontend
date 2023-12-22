import React, { useState } from 'react';
import '../CSS/Login.css';
import { Link } from 'react-router-dom';


export default function Login() {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    password: '',
  });
  const [error, setError] = useState(null); // Add state for error

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful');
        // Redirect to Home.js or perform other actions
      } else {
        console.error('Login failed:', data.message);
        setError('Invalid registrationNumber or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal Server Error');
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="input-box">
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              required
            />
            <label>Registration Number</label>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <label>Password</label>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if it exists */}
          <div className="forgot-pass">
            <a href="#">Forgot your password?</a>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
