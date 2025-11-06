import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaSearch, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './Hero.css'

function Hero() {
  const navigate = useNavigate();
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
    <div
      className="d-flex flex-column align-items-start justify-content-center px-3 px-md-5 px-lg-6 px-xl-7 text-white"
      style={{
        backgroundImage: 'url("/src/assets/heroImage.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <p className="custom-pill">The Ultimate Hotel Experience</p>
      <h1 className="hero-heading">Discover Your Perfect Gateway Destination</h1>
      <p className="hero-paragraph">
        Unparalleled luxury and comfort await at the world's most exclusive
        hotels and resorts. Start your journey today.
      </p>

      <Form
        className="bg-white text-secondary rounded-4 px-4 py-4 mt-3 shadow-sm d-flex flex-column flex-md-row align-items-start gap-3"
        style={{ width: "80%", maxWidth: "925px" }}
        onSubmit={handleSearch}
      >
        {/* Destination */}
        <div>
          <div className="label-row">
            <FaMapMarkerAlt />
            <Form.Label>Destination</Form.Label>
          </div>
          <Form.Control
            list="destinations"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Type here"
            className="rounded border border-light-subtle"
            required
          />
          <datalist id="destinations">
            {uniqueDestinations.map((city, idx) => (
              <option key={idx} value={city} />
            ))}
          </datalist>
        </div>

        {/* Check In */}
        <div>
          <div className="label-row">
            <Form.Label>Check in</Form.Label>
          </div>
          <Form.Control
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
            className="rounded border border-light-subtle"
            required
          />
        </div>

        {/* Check Out */}
        <div>
          <div className="label-row">
            <Form.Label>Check out</Form.Label>
          </div>
          <Form.Control
            type="date"
            value={checkOut}
            min={checkIn || today}
            onChange={(e) => setCheckOut(e.target.value)}
            className="rounded border border-light-subtle"
            required
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
            type="submit"
          >
            <FaSearch style={{ color: "white" }} />
            <span>Search</span>
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Hero;
