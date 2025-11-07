import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );

    if (matchedUser) {
      localStorage.setItem("authUser", JSON.stringify(matchedUser));
      navigate(from, { replace: true });
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div style={{ position:"fixed", top:0, left:0, width:"100vw", height:"100vh", backgroundColor:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9999 }}>
      <div style={{ backgroundColor:"#000", color:"#fff", borderRadius:"12px", padding:"30px 25px", width:"100%", maxWidth:"400px", position:"relative", boxShadow:"0 4px 20px rgba(0,0,0,0.5)" }}>
        <button onClick={handleClose} style={{ position:"absolute", top:"12px", right:"12px", background:"transparent", border:"none", fontSize:"1.5rem", cursor:"pointer", fontWeight:"bold", color:"#fff" }}>&times;</button>
        <h2 style={{ textAlign:"center", marginBottom:"25px" }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column" }}>
          <label htmlFor="email" style={{ marginBottom:"5px" }}>Email:</label>
          <input type="email" name="email" id="email" placeholder="Enter your email" value={loginData.email} onChange={handleChange} style={{ marginBottom:"15px", padding:"10px", borderRadius:"6px", border:"1px solid #555", backgroundColor:"#111", color:"#fff" }} required />

          <label htmlFor="password" style={{ marginBottom:"5px" }}>Password:</label>
          <input type="password" name="password" id="password" placeholder="Enter your password" value={loginData.password} onChange={handleChange} style={{ marginBottom:"20px", padding:"10px", borderRadius:"6px", border:"1px solid #555", backgroundColor:"#111", color:"#fff" }} required />

          <button type="submit" style={{ backgroundColor:"#fff", color:"#000", padding:"12px", border:"none", borderRadius:"8px", cursor:"pointer", fontWeight:"bold", transition:"all 0.3s" }} onMouseOver={(e)=>e.target.style.backgroundColor="#ddd"} onMouseOut={(e)=>e.target.style.backgroundColor="#fff"}>Login</button>
        </form>

        <p style={{ marginTop:"15px", textAlign:"center" }}>
          Don’t have an account? <Link to="/register" style={{ textDecoration:"none", color:"#4dabf7" }}>Click here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
