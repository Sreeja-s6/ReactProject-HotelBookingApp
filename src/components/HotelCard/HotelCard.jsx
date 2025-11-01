import React from "react";
import { Card, Button } from "react-bootstrap";
import { assets } from "../../assets/assets";

function HotelCard({ room, index }) {
  return (
    <Card
      className="border-0 rounded-4 overflow-hidden position-relative mt-4"
      style={{
        width: "20rem",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
      }}
    >
      {/* Best Seller Badge */}
      {index % 2 === 0 && (
        <span
          className="position-absolute top-0 start-0 bg-danger text-white px-3 py-1 rounded-end"
          style={{
            fontSize: "0.8rem",
            fontWeight: "500",
          }}
        >
          Best Seller
        </span>
      )}

      {/* Hotel Image */}
      <Card.Img
        variant="top"
        src={room.images[0]}
        alt={room.hotel.name}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <Card.Body>
        {/* Hotel Name + Rating */}
        <Card.Title
          className="d-flex justify-content-between align-items-center fw-semibold mb-2"
          style={{ fontSize: "1rem" }}
        >
          <span>{room.hotel.name}</span>
          <div className="d-flex align-items-center gap-1 text-warning">
            <img
              src={assets.starIconFilled}
              alt="star"
              style={{ width: "14px", height: "14px" }}
            />
            <span className="text-dark fw-normal" style={{ fontSize: "0.9rem" }}>
              4.5
            </span>
          </div>
        </Card.Title>

        {/* Address */}
        <div className="d-flex align-items-center text-muted gap-2 mb-3">
          <img
            src={assets.locationIcon}
            alt="location"
            style={{ width: "14px", height: "14px", marginTop: "-1px" }}
          />
          <p className="mb-0" style={{ fontSize: "0.9rem" }}>
            {room.hotel.address}
          </p>
        </div>

        {/* Price + Book Now */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Card.Text className="mb-0" style={{ fontWeight: "500" }}>
            ${room.pricePerNight} / night
          </Card.Text>

          <Button
            variant="light"
            className="border rounded fw-medium px-3 py-1"
            style={{
              fontSize: "0.9rem",
              color: "#374151",
              borderColor: "#d1d5db",
            }}
          >
            Book Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default HotelCard;
