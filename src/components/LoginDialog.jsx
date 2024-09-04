import React, { useState } from 'react';
import '../styles/LoginDialog.css';

const LoginDialog = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        onClose(); // Close the dialog on successful login
      } else {
        console.error(data.message);
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleClickOutside = (e) => {
    if (e.target.className === 'login-dialog-overlay') {
      onClose();
    }
  };

  return (
    <div className="login-dialog-overlay" onClick={handleClickOutside}>
      <div className="login-dialog">
        <h2>Hello, welcome back!</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className='signup-button'>Signup</button>
        <button className="login-button" onClick={handleLogin}> Let me in</button>
      </div>
    </div>
  );
};

export default LoginDialog;
