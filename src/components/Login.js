// Login.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showSignup, setShowSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = () => {
    // Perform any authentication logic here
    // For simplicity, any username and password combination will log the user in
    onLogin();
  };

  const handleSignup = () => {
    setShowSignup(false);
    setFormData({ username: signupData.username, password: signupData.password });
  };

  return (
    <div className="login-container blur-background">
      {!showSignup ? (
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label>Username:</label>
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <button type="button" onClick={handleLogin}>Login</button>
            </div>
            <div className="signup-link">
              <Link to="#" onClick={() => setShowSignup(true)}>New user? Signup</Link>
            </div>
          </form>
        </div>
      ) : (
        <div className="signup-box">
          <h2>Signup</h2>
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={signupData.name} onChange={handleSignupInputChange} />
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input type="text" name="username" value={signupData.username} onChange={handleSignupInputChange} />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" value={signupData.password} onChange={handleSignupInputChange} />
            </div>
            <div className="form-group">
              <button type="button" onClick={handleSignup}>Register</button>
            </div>
            <div className="signup-link">
              <Link to="#" onClick={() => setShowSignup(false)}>Back to Login</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
