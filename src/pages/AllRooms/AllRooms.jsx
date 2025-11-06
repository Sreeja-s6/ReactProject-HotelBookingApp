import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HotelsContext } from "../../context/HotelsContext";
import { WishlistContext } from "../../context/WishlistContext";
import Filter from "../../components/Filter/Filter";
import Title from "../../components/Title";
import { FaStar, FaRegHeart, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import './AllRooms.css'

function AllRooms() {
  const rooms = useContext(HotelsContext);
  const { wishlist, addToWishlist, removeFromWishlist, isFavorite } = useContext(WishlistContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Get query params
  const query = new URLSearchParams(location.search);
  const initialDestination = query.get("destination") || "";

  // Initialize filters
  const [filters, setFilters] = useState({ type: "", price: "", sort: "", place: initialDestination });

  useEffect(() => {
    // Reset filters if user navigates to /rooms directly
    if (!location.search) {
      setFilters({ type: "", price: "", sort: "", place: "" });
    }
  }, [location.search]);

  const toggleFavorite = (room) => {
    if (isFavorite(room.id)) removeFromWishlist(room.id);
    else addToWishlist(room);
  };

  const handleCardClick = (id) => navigate(`/rooms/${id}`);

  const filteredRooms = rooms
    .filter((room) => {
      if (filters.type && room.roomType !== filters.type) return false;
      if (filters.price) {
        const [min, max] = filters.price.split("-").map(Number);
        if (room.pricePerNight < min || room.pricePerNight > max) return false;
      }
      if (filters.place && room.place !== filters.place) return false; // filter by place
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "low") return a.pricePerNight - b.pricePerNight;
      if (filters.sort === "high") return b.pricePerNight - a.pricePerNight;
      return 0;
    });

  const clearFilters = () => setFilters({ type: "", price: "", sort: "", place: "" });

  return (
    <div className="allrooms-wrapper">
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
              <div key={room.id} className="room-card shadow-sm border-0 rounded-4" onClick={() => handleCardClick(room.id)}>
                <div className="room-image-wrapper">
                  <img src={room.images?.[0] || "https://via.placeholder.com/400x250?text=No+Image"} alt={room.name} className="room-image rounded-4" />
                  <div className="heart-icon" onClick={(e) => { e.stopPropagation(); toggleFavorite(room); }}>
                    {isFavorite(room.id) ? <FaHeart color="red" size={20} /> : <FaRegHeart color="red" size={20} />}
                  </div>
                </div>

                <div className="room-details p-3">
                  <p className="text-muted mb-1">{room.place}</p>
                  <h5 className="fw-semibold text-dark">{room.name} <span className="text-secondary">({room.roomType})</span></h5>
                  <div className="d-flex align-items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={16} color={i < Math.round(room.rating) ? "#F97316" : "#E5E7EB"} />
                    ))}
                    <span className="ms-2 text-dark fw-semibold small">{room.reviews}+ reviews</span>
                  </div>
                  <p className="text-muted small mb-2 d-flex align-items-center">
                    <FaMapMarkerAlt className="me-2" /> {room.address}
                  </p>
                  <p className="fw-semibold mb-0 price-text">₹{room.pricePerNight} /night</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-rooms-text">No rooms available for your search</p>
          )}
        </div>
      </div>

      <Filter filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
    </div>
  );
}

export default AllRooms;
