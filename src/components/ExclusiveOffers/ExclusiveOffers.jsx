import React from 'react'
import Title from '../Title'
import { assets, exclusiveOffers } from '../../assets/assets'
import './ExclusiveOffers.css'
import { Button, Row, Col, Card } from 'react-bootstrap'

function ExclusiveOffers() {
    return (
        <div className="d-flex flex-column align-items-center" style={{ padding: "5rem 8rem 7.5rem 8rem" }}>
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between w-100">
                <Title
                    align='left'
                    title='Exclusive Offers'
                    subTitle='Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.' />
                <Button
                    variant="outline-light"
                    className="text-dark bg-white d-flex align-items-center justify-content-center gap-2 arrow-btn"
                >
                    View All Offers
                    <img src={assets.arrowIcon} alt="arrow-icon" className="arrow-icon" />
                </Button>
            </div>

            <div>
                {/* exclusiveOfferssRow */}
                <Row className="g-4">
                    {exclusiveOffers.map((item) => (
                        <Col key={item._id} xs={12} md={6} lg={4}>
                            <Card className="text-white position-relative border-0 overflow-hidden shadow-sm exclusiveOffers-card">
                                <Card.Img src={item.image} alt={item.title} />
                                <div className="position-absolute top-0 start-0 w-100 h-100"
                                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1))" }}>
                                </div>

                                <div className="position-absolute top-0 start-0 m-3 bg-light text-dark px-2 py-1 rounded-pill small fw-semibold">
                                    {item.priceOff}% OFF
                                </div>

                                <Card.Body className="position-absolute bottom-0 start-0 text-white p-3">
                                    <Card.Title className="fw-semibold fs-5">{item.title}</Card.Title>
                                    <Card.Text className="mb-1">{item.description}</Card.Text>
                                    <Card.Text className="small text-light">Expires  {item.expiryDate}</Card.Text>
                                    <Button variant="light" 
                                        size="sm" 
                                        className="mt-2 d-flex align-items-center gap-1 text-dark fw-semibold">
                                         View Offers 
                                         <img 
                                            src={assets.arrowIcon} 
                                            alt="arrow-icon" 
                                            className="arrow-icon" 
                                            style={{ width: "14px", height: "14px" }} 
                                        /> 
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default ExclusiveOffers