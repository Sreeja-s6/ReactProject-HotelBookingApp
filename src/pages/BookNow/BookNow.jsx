import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import "./BookNow.css";

function BookNow() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    checkIn: "",
    checkOut: "",
    guests: 1, // default to 1
  });

  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch hotel by id
  useEffect(() => {
    fetch(`http://localhost:5001/hotels/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setHotel(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hotel:", err);
        setLoading(false);
      });
  }, [id]);

  // Calculate total price when dates or guests change
  useEffect(() => {
    if (!hotel) {
      setTotalPrice(0);
      return;
    }

    const { checkIn, checkOut, guests } = formData;
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      if (checkOutDate > checkInDate) {
        const msPerDay = 1000 * 60 * 60 * 24;
        const diffTime = checkOutDate - checkInDate;
        // use exact day difference (should be integer because date inputs are midnight)
        const diffDays = Math.round(diffTime / msPerDay);
        const validGuests = Number.isInteger(+guests) && +guests >= 1 ? +guests : 1;
        setTotalPrice(diffDays * hotel.pricePerNight * validGuests);
      } else {
        setTotalPrice(0);
      }
    } else {
      setTotalPrice(0);
    }
  }, [formData.checkIn, formData.checkOut, formData.guests, hotel]);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required" : (/^[A-Za-z ]+$/.test(value) ? "" : "Name can contain only letters and spaces");
      case "email":
        return value.trim() === "" ? "Email is required" : (/^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(value) ? "" : "Enter a valid email");
      case "contact":
        return value.trim() === "" ? "Contact is required" : (/^\d{10}$/.test(value) ? "" : "Enter a valid 10-digit phone number");
      case "guests":
        return Number(value) >= 1 ? "" : "At least 1 guest is required";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "guests" ? (value === "" ? "" : parseInt(value, 10)) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
  };

  const handlePayNow = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    // Date-specific checks
    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required";
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = "Check-out date must be after check-in date";
      }
    }

    // Guests default/validation
    if (formData.guests === "" || formData.guests < 1) {
      newErrors.guests = "At least 1 guest is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Build booking object in the shape MyBookings.jsx expects
    const booking = {
      id: Date.now(), // unique id
      hotel: hotel, // full hotel object (so MyBookings can access hotel.name, hotel.images[0], hotel.address, roomType if present)
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      checkInDate: formData.checkIn,
      checkOutDate: formData.checkOut,
      guests: formData.guests,
      totalPrice,
    };

    // Save to localStorage (append to existing bookings)
    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    existing.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    // Show confirmation alert (synchronous; code continues after user clicks OK)
    window.alert(`Booking confirmed for ${hotel.name}!\nGuests: ${formData.guests}\nTotal Price: ₹${totalPrice}`);

    // Clear form and errors
    setFormData({
      name: "",
      email: "",
      contact: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
    });
    setErrors({});
    setTotalPrice(0);

    // Redirect to My Bookings page
    navigate("/my-bookings");
  };

  if (loading) {
    return (
      <div className="loading text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!hotel) {
    return <div className="text-center mt-5">Hotel not found!</div>;
  }

  return (
    <div className="book-now-page py-5">
      <Container>
        <Row className="g-4 align-items-stretch">
          {/* Left Column - Hotel Image */}
          <Col md={6}>
            <Card className="shadow-sm h-100">
              <Card.Img
                variant="top"
                src={hotel.images && hotel.images.length ? hotel.images[0] : ""}
                alt={hotel.name}
                className="rounded-4"
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Card.Body>
                <h5 className="fw-semibold">{hotel.name}</h5>
                <p className="text-muted">{hotel.address}</p>
                <p className="fw-semibold">Price per Night: ₹{hotel.pricePerNight}</p>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column - Booking Form */}
          <Col md={6}>
            <Card className="shadow-sm p-4 h-100 rounded-4">
              <h4 className="mb-4">Book Your Stay</h4>
              <Form onSubmit={handlePayNow} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    isInvalid={!!errors.contact}
                  />
                  <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Number of Guests</Form.Label>
                  <Form.Control
                    type="number"
                    name="guests"
                    min="1"
                    value={formData.guests}
                    onChange={handleChange}
                    isInvalid={!!errors.guests}
                  />
                  <Form.Control.Feedback type="invalid">{errors.guests}</Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Check-in</Form.Label>
                      <Form.Control
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        isInvalid={!!errors.checkIn}
                      />
                      <Form.Control.Feedback type="invalid">{errors.checkIn}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Check-out</Form.Label>
                      <Form.Control
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        min={formData.checkIn || ""}
                        isInvalid={!!errors.checkOut}
                      />
                      <Form.Control.Feedback type="invalid">{errors.checkOut}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <p className="fw-semibold">Total Price: ₹{totalPrice}</p>

                <Button type="submit" variant="primary" className="w-100">
                  Pay Now
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BookNow;
