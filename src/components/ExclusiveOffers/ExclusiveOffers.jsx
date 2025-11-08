import React, { useEffect, useState } from 'react';
import Title from '../Title';
import { Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import './ExclusiveOffers.css';

function ExclusiveOffers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Fetch exclusive offers from db.json
    axios
      .get('http://localhost:5001/exclusiveOffers')
      .then((res) => setOffers(res.data))
      .catch((err) => console.error('Error fetching exclusive offers:', err));
  }, []);

  return (
    <div className="d-flex flex-column align-items-center" style={{ padding: "5rem 8rem 7.5rem 8rem" }}>
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between w-100">
        <Title
          align="left"
          title="Exclusive Offers"
          subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
        />
      </div>

      <div>
        <Row className="g-4">
          {offers.map((item) => (
            <Col key={item._id} xs={12} md={6} lg={4}>
              <Card className="text-white position-relative border-0 overflow-hidden shadow-sm exclusiveOffers-card">
                {/* Hotel Image */}
                <Card.Img src={item.image} alt={item.title} />

                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1))" }}
                ></div>

                {/* Discount Badge */}
                <div className="position-absolute top-0 start-0 m-3 bg-light text-dark px-2 py-1 rounded-pill small fw-semibold">
                  {item.priceOff}% OFF
                </div>

                {/* Card Body */}
                <Card.Body className="position-absolute bottom-0 start-0 text-white p-3">
                  <Card.Title className="fw-semibold fs-5">{item.title}</Card.Title>
                  <Card.Text className="mb-1">{item.description}</Card.Text>
                  <Card.Text className="small text-light">Expires {item.expiryDate}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default ExclusiveOffers;
