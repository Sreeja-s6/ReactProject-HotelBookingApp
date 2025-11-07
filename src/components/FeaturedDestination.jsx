import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import HotelCard from "./HotelCard/HotelCard";
import Title from "./Title";
import { HotelsContext } from "../context/HotelsContext";
import { Button } from "react-bootstrap";
import "./FeaturedDestination.css";

function FeaturedDestination() {
  const hotels = useContext(HotelsContext);
  const navigate = useNavigate();

  return (
    <section className="featured-section py-5">
      <div className="container text-center">
        <Title
          title="Featured Destination"
          subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        />

        <div className="row justify-content-center g-4 mt-4">
          {hotels.slice(0, 4).map((room, index) => (
            <div
              key={room.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <HotelCard room={room} index={index} />
            </div>
          ))}
        </div>

        <Button
          onClick={() => {
            navigate("/rooms");
            window.scrollTo(0, 0);
          }}
          className="view-all-btn mt-5"
        >
          View All Rooms
        </Button>
      </div>
    </section>
  );
}

export default FeaturedDestination;
