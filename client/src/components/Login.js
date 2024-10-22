import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import ReCAPTCHA from 'react-google-recaptcha';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCaptchaChange = (value) => {
    setCaptcha(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!captcha) {
      setError('Please complete the CAPTCHA.');
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store token in localStorage
      localStorage.setItem('token', data.token);

      // Check the user type and redirect accordingly
      if (data.userType === 'admin') {
        alert('Login successful! Redirecting to admin dashboard...');
        navigate('/user'); // Redirect to admin dashboard
        setSuccess('Login Successfull!!')
      } else {
        alert('Login successful! Redirecting to user dashboard...');
        navigate('/user'); // Redirect to user dashboard (adjust the path as needed)
      }
    } else {
      alert(data.message || 'Login failed');
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <>
      <div>
        <button className='home-btn' onClick={goToHome}> Home</button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <ReCAPTCHA
          sitekey="6LdfwVMqAAAAACPJG3OrSSml2PEqSivFS4yB4Got" // Replace with your site key
          onChange={handleCaptchaChange}
        />
        <button type="submit">Login</button>
        Don't have an account? <a href='/register'>register</a><br/>
        Signin as admin <a href='/adminLogin'>click here</a>
      </form>
    </>
  );
}

export default Login;
