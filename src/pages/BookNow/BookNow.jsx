import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import "./BookNow.css";

function BookNow() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    checkIn: "",
    checkOut: "",
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
      .catch((err) => console.error("Error fetching hotel:", err));
  }, [id]);

  // Calculate total price when dates change
  useEffect(() => {
    if (hotel && formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);

      if (checkOutDate > checkInDate) {
        const diffTime = checkOutDate - checkInDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setTotalPrice(diffDays * hotel.pricePerNight);
      } else {
        setTotalPrice(0);
      }
    }
  }, [formData.checkIn, formData.checkOut, hotel]);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return /^[A-Za-z ]+$/.test(value) ? "" : "Name can contain only letters and spaces";
      case "email":
        return /^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(value) ? "" : "Enter a valid email";
      case "contact":
        return /^\d{10}$/.test(value) ? "" : "Enter a valid 10-digit phone number";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handlePayNow = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required";
    if (
      formData.checkIn &&
      formData.checkOut &&
      new Date(formData.checkOut) <= new Date(formData.checkIn)
    ) {
      newErrors.checkOut = "Check-out date must be after check-in date";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert(`Booking confirmed for ${hotel.name}!\nTotal Price: ₹${totalPrice}`);
    console.log({ ...formData, totalPrice, hotelName: hotel.name });

    // Clear the form after confirmation
  setFormData({
    name: "",
    email: "",
    contact: "",
    checkIn: "",
    checkOut: "",
  });
  setErrors({});
  setTotalPrice(0);
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
                src={hotel.images[0]}
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
