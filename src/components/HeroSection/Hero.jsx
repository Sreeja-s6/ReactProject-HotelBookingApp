import React, { useEffect, useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { FaSearch, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [hotels, setHotels] = useState([]);
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setHotels(data.hotels))
      .catch((err) => console.error(err));
  }, []);

  const uniqueDestinations = [...new Set(hotels.map((h) => h.place))];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!destination || !checkIn || !checkOut) return;
    navigate(
      `/rooms?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}`
    );
  };

  useEffect(() => {
    if (checkIn && checkOut && checkOut <= checkIn) {
      setCheckOut("");
    }
  }, [checkIn, checkOut]);

  return (
    <section
      className={`hero-section ${theme === "dark" ? "dark" : "light"}`}
      data-theme={theme}
    >
      <div className="overlay"></div>

      <div className="hero-content container px-3 px-md-5">
        <span className="custom-pill">The Ultimate Hotel Experience</span>
        <h1 className="hero-heading">Discover Your Perfect Gateway Destination</h1>
        <p className="hero-paragraph">
          Unparalleled luxury and comfort await at the world's most exclusive
          hotels and resorts. Start your journey today.
        </p>

        <Form className="hero-form mt-3" onSubmit={handleSearch}>
          {/* Destination */}
          <div className="form-field">
            <div className="label-row">
              <FaMapMarkerAlt />
              <Form.Label>Destination</Form.Label>
            </div>
            <Form.Control
              list="destinations"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Type here"
              required
            />
            <datalist id="destinations">
              {uniqueDestinations.map((city, idx) => (
                <option key={idx} value={city} />
              ))}
            </datalist>
          </div>

          {/* Check In */}
          <div className="form-field">
            <div className="label-row">
              <Form.Label>Check in</Form.Label>
            </div>
            <Form.Control
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>

          {/* Check Out */}
          <div className="form-field">
            <div className="label-row">
              <Form.Label>Check out</Form.Label>
            </div>
            <Form.Control
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>

          {/* Guests */}
          <div className="form-field">
            <div className="label-row">
              <FaUser />
              <Form.Label>Guests</Form.Label>
            </div>
            <Form.Control type="number" placeholder="0" min="1" max="4" />
          </div>

          {/* Search Button */}
          <div className="form-field align-end">
            <Button
              type="submit"
              className="search-btn d-flex align-items-center gap-2 px-4 py-2"
            >
              <FaSearch />
              <span>Search</span>
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}

export default Hero;
