import React, { useState } from 'react';
import '../styles/LoginDialog.css';

const LoginDialog = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    console.log('Email:', email, 'Password:', password);
    // Fermez la boîte de dialogue après la connexion
    onClose();
  };

  // Fonction pour détecter les clics en dehors de la boîte de dialogue
  const handleClickOutside = (e) => {
    if (e.target.className === 'login-dialog-overlay') {
      onClose();
    }
  };

  return (
    <div className="login-dialog-overlay" onClick={handleClickOutside}>
      <div className="login-dialog">
        <h2>Hello, welcome back!</h2>
        <button className="signup-button">Sign up</button>
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
        <div className="forgot-password">Forgot password?</div>
        <button className="login-button" onClick={handleLogin}>Let me in</button>
        <div className="login-options">
          <button className="google-login">Sign in with Google</button>
          <button className="apple-login">Sign in with Apple</button>
        </div>
       
      </div>
    </div>
  );
};

export default LoginDialog;
