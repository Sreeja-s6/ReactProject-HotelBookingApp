import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Modal } from "react-bootstrap";
import "./NewsLetter.css";
import Title from "../Title";
import { assets } from "../../assets/assets";

function NewsLetter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); // clear error
    setShowModal(true); // show thank you modal
    setEmail(""); // clear input
  };

  return (
    <section className="newsletter-section py-5">
      <Container className="d-flex justify-content-center">
        <div className="newsletter-box text-center text-light p-5 rounded-4 shadow-sm">
          <Title
            title="Stay Inspired"
            subTitle="Join our newsletter and be the first to discover new destinations,
            exclusive offers, and travel inspiration."
          />

          <Row className="justify-content-center mb-3">
            <Col xs={10} sm={8} md={7} lg={6}>
              <Form className="d-flex justify-content-center" onSubmit={handleSubscribe}>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input me-2"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(e.target.value)) {
                      setError("Please enter a valid email address.");
                    } else {
                      setError("");
                    }
                  }}
                  style={{
                    outline: "none",
                    boxShadow: "none",
                    border: error ? "1px solid red" : "1px solid #ccc", // red border on error
                  }}
                  required
                />

                <Button
                  type="submit"
                  variant="light"
                  className="d-flex align-items-center gap-2 fw-medium px-4 newsletter-btn"
                >
                  Subscribe
                  <img
                    src={assets.arrowIcon}
                    alt="arrow-icon"
                    className="newsletter-arrow"
                  />
                </Button>
              </Form>
              {error && <p className="text-danger small mt-2">{error}</p>}
            </Col>
          </Row>

          <p className="small mt-2 text-secondary opacity-75 last">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates.
          </p>
        </div>
      </Container>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thank You!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thank you for subscribing to our newsletter!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default NewsLetter;
