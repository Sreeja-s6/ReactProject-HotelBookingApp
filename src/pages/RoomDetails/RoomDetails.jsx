import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { Carousel, Button, Spinner, Container, Row, Col, Card } from "react-bootstrap";
import "./RoomDetails.css";

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/hotels/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setHotel(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, [id]);

  const handleBookNow = () => {
    // Navigate to BookNow page with hotel ID
    navigate(`/book-now/${id}`);
  };

  if (loading) {
    return (
      <div className="loading">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!hotel) {
    return <div className="text-center mt-5">Hotel not found!</div>;
  }

  return (
    <div className="room-details-page">
      <Container>
        <h2 className="hotel-name font-playfair">{hotel.name}</h2>
        <p className="hotel-location">{hotel.address}</p>

        <Row className="align-items-center">
          <Col md={7}>
            <Carousel interval={2500} pause={false} className="hotel-carousel rounded-4 shadow-sm">
              {hotel.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={img} alt={`slide-${index}`} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          <Col md={5}>
            <Card className="info-card shadow-sm">
              <Card.Body>
                <div className="info-section">
                  <p><strong>Room Type:</strong> {hotel.roomType}</p>
                  <p><strong>Price per Night:</strong> ₹{hotel.pricePerNight}</p>
                  <p><strong>Rating:</strong> ⭐ {hotel.rating} ({hotel.reviews} reviews)</p>
                </div>

                <div className="amenities">
                  <h5>Amenities</h5>
                  <ul>
                    {hotel.amenities.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="d-flex justify-content-end mt-3">
                  <Button variant="primary" className="book-now-btn" onClick={handleBookNow}>
                    Book Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RoomDetails;