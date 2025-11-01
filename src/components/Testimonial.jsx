import React from 'react'
import Title from './Title'
import { Row, Col, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { testimonials } from '../assets/assets';

function Testimonial() {
  return (
    <div className="d-flex flex-column align-items-center px-3 px-md-5 px-lg-6 bg-light pt-5 pb-5">
      <Title
        title='What Our Guests Say'
        subTitle='Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accomodations around the world.'
      />

      {/* Testimonials Cards */}
      <Row className="g-4 mt-4 w-100 justify-content-center">
        {testimonials.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-3 rounded-4" style={{ height: "300px" }}>
              <Card.Img
                variant="top"
                src={item.image}
                alt={item.name}
                className="rounded-circle mx-auto mt-3"
                style={{ width: "70px", height: "70px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="fw-semibold mt-2 mb-0">{item.name}</Card.Title>
                <Card.Text className="text-muted small">{item.address}</Card.Text>

                {/* Rating stars */}
                <div className="d-flex justify-content-center mb-3">
                  {[...Array(item.rating)].map((_, index) => (
                    <FaStar key={index} className="text-warning me-1" />
                  ))}
                </div>

                {/* Review text */}
                <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
                  “{item.review}”
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Testimonial