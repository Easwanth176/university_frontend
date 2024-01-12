import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Login.css';

import backgroundImage from '../../University.jpg';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userType: 'option',
    identifier: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (formData.userType === 'student' && !/^\d+$/.test(value)) {
      setError('Student does not exist');
    } else {
      setError(null);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading to true before the fetch operation

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
        const url = `/home?userType=${encodeURIComponent(formData.userType)}&identifier=${encodeURIComponent(
          formData.identifier
        )}&password=${encodeURIComponent(formData.password)}`;
        navigate(url);
      } else {
        console.error('Login failed:', data.message);
        setError('Invalid registration number, email, or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal Server Error');
    } finally {
      setLoading(false); // Set loading to false after the fetch operation, whether it succeeded or failed
    }
  };

  return (


    <section id="login-e">
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
                  name="identifier"
                  value={formData.identifier}
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
              {loading && <p style={{ color: 'blue' }}>Please wait...</p>} {/* Display loading message or spinner */}
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <div className="forgot-pass">
                <a href="#">Forgot your password?</a>
              </div>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </section>

  );
}
