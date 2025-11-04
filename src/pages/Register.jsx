import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // ✅ should be 'react-router-dom', not 'react-router'

function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // ✅ Simple validation (optional)
    if (!user.name || !user.email || !user.password) {
      alert("Please fill all fields!")
      return
    }

    // ✅ Save user to localStorage (mock database)
    localStorage.setItem("registeredUser", JSON.stringify(user))
    alert("Registration successful! Please login.")

    navigate("/login") // ✅ redirect to login page instead of home
  }

  const myStyle = {
    backgroundColor: "lightgreen",
    marginTop: "10px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "350px" }}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder='Enter your name'
          value={user.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder='Enter your email'
          value={user.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password" // ✅ fixed spelling (was "passwword")
          placeholder='Enter password'
          value={user.password}
          onChange={handleChange}
        />

        <button type='submit' style={myStyle}>Submit</button>
      </form>
    </div>
  )
}

export default Register
