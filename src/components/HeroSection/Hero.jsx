import React from 'react'
import './Hero.css'
import { assets, cities } from '../../assets/assets'
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch, FaMapMarkerAlt, FaUser } from "react-icons/fa";


function Hero() {
  return (
    <div className="d-flex flex-column align-items-start justify-content-center px-3 px-md-5 px-lg-6 px-xl-7 text-white"
      style={{
        backgroundImage: 'url("/src/assets/heroImage.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'none',
        height: '100vh'
      }}>

      <p className='custom-pill'>The Ultimate Hotel Experience</p>
      <h1 className="hero-heading">Discover Your Perfect Gateway Destination</h1>
      <p className="hero-paragraph">Unparalleled luxury and comfort await at the world's most exclusive hotels ans resort's. Start your journey today.</p>

      <Form
        className="bg-white text-secondary rounded-4 px-4 py-4 mt-3 shadow-sm d-flex flex-column flex-md-row align-items-start gap-3"
        style={{ width: "80%", maxWidth: "925px" }}
      >
        {/* Destination */}
        <div>
          <div className="label-row">
            <FaMapMarkerAlt />
            <Form.Label>Destination</Form.Label>
          </div>
          <Form.Control
            type="text"
            placeholder="Type here"
            className="rounded border border-light-subtle"
            list='destinations'
            required
          />
          <datalist id='destinations'>
            {cities.map((city, index) => (
              <option value={city} key={index} />
            ))}
          </datalist>
        </div>

        {/* Check In */}
        <div>
          <div className="label-row">
            <img src={assets.calenderIcon} alt="" style={{ fontSize: "10px" }} />
            <Form.Label>Check in</Form.Label>
          </div>
          <Form.Control
            type="date"
            className="rounded border border-light-subtle"
          />
        </div>

        {/* Check Out */}
        <div>
          <div className="label-row">
            <img src={assets.calenderIcon} alt="" />
            <Form.Label>Check out</Form.Label>
          </div>
          <Form.Control
            type="date"
            className="rounded border border-light-subtle"
          />
        </div>

        {/* Guests */}
        <div>
          <div className="label-row">
            <FaUser />
            <Form.Label>Guests</Form.Label>
          </div>
          <Form.Control
            type="number"
            placeholder="0"
            min="1"
            max="4"
            className="rounded border border-light-subtle"
            style={{ width: "80px" }}
          />
        </div>

        {/* Search Button */}
        <div className="label-row ms-md-3 text-center">
          <Button
            variant="dark"
            className="d-flex align-items-center gap-2 px-4 py-2"
          >
            <FaSearch style={{color:"white"}} />
            <span>Search</span>
          </Button>
        </div>

      </Form>
    </div>
  )
}

export default Hero