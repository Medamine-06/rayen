import { useState } from 'react';
import '../styles/LoginDialog.css';

const LoginDialog = ({ onClose, setSession }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggle, setToggle]= useState(false);

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
        localStorage.setItem('authToken', data.accessToken );
        setSession({data})
        
        onClose(); 
      } else {
        console.error(data);
        alert('Login failed: ' + data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignUp = async ()=>{
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password,isAdmin: false }),
      });
      console.log(JSON.stringify({ email, password,isAdmin: false }));
  
      const data = await response.json();
  
      if (data) {
        console.log(data);
        
        onClose(); 
      } else {
        console.error(data);
        alert('Login failed: ' + data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  

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

        <button className="signup-button" onClick={() => setToggle(!toggle)}>
          {toggle ? 'Log in' : 'Sign up'}
        </button>
        <button className="login-button" onClick={toggle ? handleSignUp:handleLogin}>{toggle ? 'Sign in':'Log in'}</button>
      </div>
    </div>
  );
};

export default LoginDialog;
