import React, { useContext } from "react";
import "./AllRooms.css";
import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegHeart, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import Filter from "../../components/Filter/Filter";
import { HotelsContext } from "../../context/HotelsContext";

function AllRooms({ favorites, setFavorites }) {
  const rooms = useContext(HotelsContext); // Get hotels from context
  const [filters, setFilters] = React.useState({
    type: "",
    price: "",
    sort: "",
    place: "",
  });

  const navigate = useNavigate();

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleCardClick = (id) => {
    navigate(`/rooms/${id}`);
  };

  const filteredRooms = rooms
    .filter((room) => {
      if (filters.type && room.roomType !== filters.type) return false;

      if (filters.price) {
        const [min, max] = filters.price.split("-").map(Number);
        if (room.pricePerNight < min || room.pricePerNight > max) return false;
      }

      if (filters.place && room.place !== filters.place) return false;

      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "low") return a.pricePerNight - b.pricePerNight;
      if (filters.sort === "high") return b.pricePerNight - a.pricePerNight;
      return 0;
    });

  const clearFilters = () => {
    setFilters({ type: "", price: "", sort: "", place: "" });
  };

  return (
    <div className="allrooms-wrapper">
      {/* LEFT SIDE – ROOMS */}
      <div className="rooms-container">
        <div className="title-wrapper">
          <Title
            title="Hotel Rooms"
            subTitle="Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories."
            align="left"
          />
        </div>

        <div className="rooms-grid">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <div
                key={room.id}
                className="room-card shadow-sm border-0 rounded-4"
                onClick={() => handleCardClick(room.id)}
              >
                <div className="room-image-wrapper">
                  <img
                    src={
                      Array.isArray(room.images) && room.images.length > 0
                        ? room.images[0]
                        : "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt={room.name}
                    className="room-image rounded-4"
                  />
                  <div
                    className="heart-icon"
                    onClick={(e) => toggleFavorite(room.id, e)}
                  >
                    {favorites.includes(room.id) ? (
                      <FaHeart color="red" size={20} />
                    ) : (
                      <FaRegHeart color="red" size={20} />
                    )}
                  </div>
                </div>

                <div className="room-details p-3">
                  <p className="text-muted mb-1">{room.place}</p>
                  <h5 className="fw-semibold text-dark">
                    {room.name}{" "}
                    <span className="text-secondary">({room.roomType})</span>
                  </h5>

                  <div className="d-flex align-items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={16}
                        color={
                          i < Math.round(room.rating) ? "#F97316" : "#E5E7EB"
                        }
                      />
                    ))}
                    <span className="ms-2 text-dark fw-semibold small">
                      {room.reviews}+ reviews
                    </span>
                  </div>

                  <p className="text-muted small mb-2 d-flex align-items-center">
                    <FaMapMarkerAlt className="me-2" />
                    {room.address}
                  </p>

                  <p className="fw-semibold mb-0 price-text">
                    ₹{room.pricePerNight} /night
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-rooms-text">No rooms available for your search</p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE – FILTER SECTION */}
      <Filter
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
      />
    </div>
  );
}

export default AllRooms;
