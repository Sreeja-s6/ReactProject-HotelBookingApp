import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (
      registeredUser &&
      registeredUser.email === loginData.email &&
      registeredUser.password === loginData.password
    ) {
      localStorage.setItem('authUser', JSON.stringify(registeredUser));
      navigate('/'); // redirect to home after login
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleClose = () => {
    navigate('/'); // redirect to home page
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '30px 25px',
          width: '100%',
          maxWidth: '400px',
          position: 'relative',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          &times;
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Login</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="email" style={{ marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={handleChange}
            style={{ marginBottom: '15px', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />

          <label htmlFor="password" style={{ marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            style={{ marginBottom: '20px', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
            required
          />

          <button
            type="submit"
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#333')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'black')}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Don’t have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#007bff' }}>
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
