import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ✅ import Link

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
      navigate('/'); // ✅ redirect to home after login
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h2 className="fw-bold">LOGIN</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '350px',
          margin: '20px auto',
          textAlign: 'left',
        }}
      >
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={loginData.email}
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '8px' }}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          value={loginData.password}
          onChange={handleChange}
          style={{ marginBottom: '10px', padding: '8px' }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>

        {/* ✅ Add this below the button */}
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Don’t have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#007bff' }}>
            Click here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
