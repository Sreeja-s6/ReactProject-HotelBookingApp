import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./NewsLetter.css";
import Title from "../Title";
import { assets } from "../../assets/assets";

function NewsLetter() {
  return (
    <section className="newsletter-section py-5">
      <Container className="d-flex justify-content-center">
        <div className="newsletter-box text-center text-light p-5 rounded-4 shadow-sm">
          <Title title='Stay Inspired' subTitle='Join our newsletter and be the first to discover new destinations,
            exclusive offers, and travel inspiration.' />
          

          <Row className="justify-content-center mb-3">
            <Col xs={10} sm={8} md={7} lg={6}>
              <Form className="d-flex justify-content-center">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input me-2"
                />
                <Button
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
            </Col>
          </Row>

          <p className="small mt-2 text-secondary opacity-75 last">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates.
          </p>
        </div>
      </Container>
    </section>
  );
}

export default NewsLetter; 