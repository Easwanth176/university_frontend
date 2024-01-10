import React, { useState } from 'react';
import '../CSS/Login.css';
import { Link } from 'react-router-dom';


import backgroundImage from '../../University.jpg'; 

export default function Login() {
  const [formData, setFormData] = useState({
    userType: 'option', 
    identifier: '', 
    password: '',
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://sathyabama-backend.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful');
        // Redirect using Link component
        const url = `/home?userType=${encodeURIComponent(formData.userType)}&identifier=${encodeURIComponent(
          formData.identifier
        )}&password=${encodeURIComponent(formData.password)}`;
        return <Link to={url} />;
      } else {
        console.error('Login failed:', data.message);
        setError('Invalid registrationNumber, email, or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal Server Error');
    }
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="left-half">
          <img src={backgroundImage} alt="Background" width="1000" height="600" />
        </div>
        <div className="right-half">
          <div className="login-box">
            <h2>Sathyabama</h2>
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="input-box">
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="option">Choose an option</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  name="identifier" // Changed to a more generic 'identifier'
                  value={formData.identifier}
                  onChange={handleInputChange}
                  required
                />
                <label>Registration Number or Email</label>
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
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="forgot-pass">
                <a href="#">Forgot your password?</a>
              </div>
              <button type="submit" className="btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
