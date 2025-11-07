import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return /^[A-Za-z ]+$/.test(value)
          ? ''
          : 'Name can contain only letters and spaces';
      case 'email':
        return /^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(value)
          ? ''
          : 'Enter a valid email';
      case 'password':
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
          ? ''
          : 'Password must be at least 8 chars, with uppercase, lowercase, number & special char';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    const errorMsg = validateField(name, value);
    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(user).forEach((key) => {
      const errorMsg = validateField(key, user[key]);
      if (errorMsg) newErrors[key] = errorMsg;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Get existing users or empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    const emailExists = users.some(u => u.email === user.email);
    if (emailExists) {
      alert('Email already registered!');
      return;
    }

    // Add new user
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please login.');
    navigate('/login');
  };

  // Styles (same as before)
  const overlayStyle = { position: 'fixed', top:0,left:0,width:'100%',height:'100%', backgroundColor:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000 };
  const boxStyle = { backgroundColor:'#000', color:'#fff', padding:'30px', borderRadius:'10px', width:'400px', boxShadow:'0 8px 20px rgba(0,0,0,0.5)', position:'relative' };
  const closeStyle = { position:'absolute', top:'10px', right:'15px', fontSize:'20px', fontWeight:'bold', border:'none', background:'none', cursor:'pointer', color:'#fff' };
  const inputStyle = { padding:'10px', fontSize:'14px', width:'100%', marginBottom:'15px', marginTop:'5px', borderRadius:'6px', border:'1px solid #555', backgroundColor:'#111', color:'#fff' };
  const labelStyle = { marginTop:'10px', fontWeight:'500', display:'block' };
  const buttonStyle = { backgroundColor:'#fff', color:'#000', padding:'10px', border:'none', cursor:'pointer', marginTop:'15px', width:'100%', fontWeight:'bold' };
  const errorStyle = { color:'red', fontSize:'12px', marginBottom:'10px' };

  return (
    <div style={overlayStyle}>
      <div style={boxStyle}>
        <button style={closeStyle} onClick={() => navigate('/')}>×</button>
        <h2 style={{ textAlign:'center', marginBottom:'20px' }}>REGISTER</h2>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="name" style={labelStyle}>Name:</label>
          <input type="text" name="name" id="name" placeholder="Enter your name" value={user.name} onChange={handleChange} style={inputStyle} />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}

          <label htmlFor="email" style={labelStyle}>Email:</label>
          <input type="email" name="email" id="email" placeholder="Enter your email" value={user.email} onChange={handleChange} style={inputStyle} />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}

          <label htmlFor="password" style={labelStyle}>Password:</label>
          <input type="password" name="password" id="password" placeholder="Enter your password" value={user.password} onChange={handleChange} style={inputStyle} />
          {errors.password && <div style={errorStyle}>{errors.password}</div>}

          <button type="submit" style={buttonStyle}>Register</button>

          <p style={{ marginTop:'15px', textAlign:'center', color:'#fff' }}>
            Already have an account? <Link to="/login" style={{ textDecoration:'none', color:'#4dabf7' }}>Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
