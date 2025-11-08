import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Spinner } from "react-bootstrap";
import "./BookNow.css";

function BookNow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const existingBooking = location.state?.booking;

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  // Today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Fetch hotel data
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

  // Pre-fill form if editing
  useEffect(() => {
    if (existingBooking) {
      setFormData({
        name: existingBooking.name || "",
        email: existingBooking.email || "",
        contact: existingBooking.contact || "",
        checkIn: existingBooking.checkInDate || "",
        checkOut: existingBooking.checkOutDate || "",
        guests: existingBooking.guests || 1,
      });
    }
  }, [existingBooking]);

  // Reset check-out if invalid after check-in change
  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      if (checkOutDate <= checkInDate) {
        setFormData((prev) => ({ ...prev, checkOut: "" }));
      }
    }
  }, [formData.checkIn]);

  // Calculate total price
  useEffect(() => {
    if (!hotel) return setTotalPrice(0);

    const { checkIn, checkOut } = formData;

    if (checkIn && checkOut) {
      // Parse dates as UTC to avoid timezone issues
      const checkInDate = new Date(checkIn + "T00:00:00Z");
      const checkOutDate = new Date(checkOut + "T00:00:00Z");

      if (checkOutDate > checkInDate) {
        const msPerDay = 1000 * 60 * 60 * 24;
        const diffDays = Math.ceil((checkOutDate - checkInDate) / msPerDay);

        setTotalPrice(diffDays * hotel.pricePerNight);
      } else {
        setTotalPrice(0); // Invalid check-out
      }
    } else {
      setTotalPrice(0); // Missing dates
    }
  }, [formData.checkIn, formData.checkOut, hotel]);


  // Validation
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === ""
          ? "Name is required"
          : /^[A-Za-z ]+$/.test(value)
            ? ""
            : "Name can contain only letters and spaces";
      case "email":
        return value.trim() === ""
          ? "Email is required"
          : /^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(value)
            ? ""
            : "Enter a valid email";
      case "contact":
        return value.trim() === ""
          ? "Contact is required"
          : /^\d{10}$/.test(value)
            ? ""
            : "Enter a valid 10-digit phone number";
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

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required";
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      if (checkOutDate <= checkInDate) newErrors.checkOut = "Check-out must be after check-in";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const booking = {
      id: existingBooking ? existingBooking.id : Date.now(),
      hotel,
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      checkInDate: formData.checkIn,
      checkOutDate: formData.checkOut,
      guests: formData.guests,
      totalPrice,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    const updatedBookings = existingBooking
      ? existing.map((b) => (b.id === existingBooking.id ? booking : b))
      : [...existing, booking];

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    window.alert(
      `${existingBooking ? "Booking updated" : "Booking confirmed"} for ${hotel.name}!\nGuests: ${formData.guests}\nTotal Price: ₹${totalPrice}`
    );

    navigate("/my-bookings");
  };

  if (loading) return <div className="loading text-center mt-5"><Spinner animation="border" variant="primary" /></div>;
  if (!hotel) return <div className="text-center mt-5">Hotel not found!</div>;

  return (
    <div className="book-now-page py-5">
      <Container>
        <Row className="g-4 align-items-stretch">
          <Col md={6}>
            <Card className="shadow-sm h-100">
              <Card.Img
                variant="top"
                src={hotel.images?.[0] || ""}
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

          <Col md={6}>
            <Card className="shadow-sm p-4 h-100 rounded-4">
              <h4 className="mb-4">{existingBooking ? "Edit Booking" : "Book Your Stay"}</h4>
              <Form onSubmit={handlePayNow} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control type="tel" name="contact" value={formData.contact} onChange={handleChange} isInvalid={!!errors.contact} />
                  <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Number of Guests</Form.Label>
                  <Form.Control type="number" name="guests" min="1" value={formData.guests} onChange={handleChange} isInvalid={!!errors.guests} />
                  <Form.Control.Feedback type="invalid">{errors.guests}</Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Check-in</Form.Label>
                      <Form.Control type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} isInvalid={!!errors.checkIn} min={today} />
                      <Form.Control.Feedback type="invalid">{errors.checkIn}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Check-out</Form.Label>
                      <Form.Control type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} isInvalid={!!errors.checkOut} min={formData.checkIn || today} />
                      <Form.Control.Feedback type="invalid">{errors.checkOut}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <p className="fw-semibold">Total Price: ₹{totalPrice}</p>
                <Button type="submit" variant="primary" className="w-100">{existingBooking ? "Update Booking" : "Pay Now"}</Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BookNow;
