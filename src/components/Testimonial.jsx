import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Title from "./Title";
import StarRating from "./StarRating";
import { Row, Col, Card } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";
import "./Testimonial.css"; // ✅ make sure CSS is imported

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const { theme } = useContext(ThemeContext); // ✅ access theme context

  useEffect(() => {
    axios
      .get("http://localhost:5001/testimonials")
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  return (
    <div
      className={`testimonial-section ${
        theme === "dark" ? "testimonial-dark" : "testimonial-light"
      } d-flex flex-column align-items-center px-3 px-md-5 px-lg-6 pt-5 pb-5`}
    >
      <Title
        title="What Our Guests Say"
        subTitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world."
      />

      <Row className="g-4 mt-4 w-100 justify-content-center">
        {testimonials.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={4}>
            <Card
              className={`testimonial-card ${
                theme === "dark" ? "card-dark" : "card-light"
              } h-100 border-0 shadow-sm text-center p-3 rounded-4`}
            >
              <Card.Img
                variant="top"
                src={item.image}
                alt={item.name}
                className="rounded-circle mx-auto mt-3"
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title className="fw-semibold mt-2 mb-0">
                  {item.name}
                </Card.Title>
                <Card.Text
                  className="testimonial-address small"
                  style={{
                    color: theme === "dark" ? "#ccc" : "#6c757d",
                  }}
                >
                  {item.address}
                </Card.Text>

                <StarRating rating={item.rating} />

                <Card.Text
                  className="testimonial-review"
                  style={{
                    fontSize: "0.9rem",
                    color: theme === "dark" ? "#ddd" : "#555",
                  }}
                >
                  “{item.review}”
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Testimonial;
