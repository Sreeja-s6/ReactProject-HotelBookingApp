import React from "react";
import { useNavigate } from "react-router-dom";
import HotelCard from "./HotelCard/HotelCard";
import Title from "./Title";
import { useContext } from "react";
import { HotelsContext } from "../context/HotelsContext";
import { Button } from "react-bootstrap";

function FeaturedDestination() {
  const sectionPadding = { paddingTop: "5rem", paddingBottom: "5rem" };
  const hotels = useContext(HotelsContext);
  const navigate = useNavigate();

  return (
    <div className="bg-light" style={sectionPadding}>
      <div className="container">
        <Title
          title="Featured Destination"
          subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        />

        <div className="row justify-content-center g-4">
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
          variant="light"
          onClick={() => {
            navigate("/rooms");
            window.scrollTo(0, 0);
          }}
          className="my-4 mx-auto d-block px-4 py-2 text-sm fw-medium border rounded bg-white hover-bg-light transition-all cursor-pointer"
        >
          View All Rooms
        </Button>
      </div>
    </div>
  );
}

export default FeaturedDestination;
