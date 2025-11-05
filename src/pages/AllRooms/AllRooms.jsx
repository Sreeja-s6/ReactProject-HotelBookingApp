import React, { useEffect, useState } from "react";
import "./AllRooms.css";
import Title from "../../components/Title";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegHeart, FaHeart, FaMapMarkerAlt } from "react-icons/fa";

function AllRooms() {
  const [rooms, setRooms] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    price: "",
    sort: "",
  });

  const navigate = useNavigate();

  // ✅ Fetch data from db.json
  useEffect(() => {
    axios
      .get("http://localhost:5001/hotels")
      .then((res) => {
        console.log("Fetched Data:", res.data); // 👀 check data structure
        setRooms(res.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // ✅ Toggle favorite
  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // ✅ Navigate to RoomDetails
  const handleCardClick = (id) => {
    navigate(`/rooms/${id}`);
  };

  // ✅ Filter logic
  const filteredRooms = rooms
    .filter((room) => {
      if (filters.type && room.roomType !== filters.type) return false;
      if (filters.price) {
        const [min, max] = filters.price.split("-").map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "low") return a.pricePerNight - b.pricePerNight;
      if (filters.sort === "high") return b.pricePerNight - a.pricePerNight;
      return 0;
    });

  // ✅ Clear filters
  const clearFilters = () => {
    setFilters({ type: "", price: "", sort: "" });
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
                        ? room.images[0] // ✅ correct field
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

      {/* RIGHT SIDE – FILTERS */}
      <div className="filter-section bg-white rounded-3 shadow-sm">
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
          <h6 className="mb-0 fw-semibold text-dark">FILTERS</h6>
          <span
            className="fw-semibold text-dark"
            style={{ fontSize: "0.85rem", cursor: "pointer" }}
            onClick={clearFilters}
          >
            CLEAR
          </span>
        </div>

        <div className="px-4 py-4">
          <p className="fw-semibold text-dark">Popular Filters</p>
          {["Single Bed", "Double Bed", "Luxury Room", "Family Suite"].map(
            (type) => (
              <div key={type} className="form-check small">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  checked={filters.type === type}
                  onChange={() => setFilters({ ...filters, type })}
                />
                <label className="form-check-label text-muted ms-2">
                  {type}
                </label>
              </div>
            )
          )}

          <p className="fw-semibold text-dark mt-4">Price Range</p>
          {["0-5000", "5000-6000", "6000-8000", "8000-9000"].map((range) => (
            <div key={range} className="form-check small">
              <input
                className="form-check-input"
                type="radio"
                name="price"
                checked={filters.price === range}
                onChange={() => setFilters({ ...filters, price: range })}
              />
              <label className="form-check-label text-muted ms-2">
                ₹{range.replace("-", " to ₹")}
              </label>
            </div>
          ))}

          <p className="fw-semibold text-dark mt-4">Sort By</p>
          {[{ label: "Price Low to High", value: "low" }, { label: "Price High to Low", value: "high" }].map((sort) => (
            <div key={sort.value} className="form-check small">
              <input
                className="form-check-input"
                type="radio"
                name="sort"
                checked={filters.sort === sort.value}
                onChange={() => setFilters({ ...filters, sort: sort.value })}
              />
              <label className="form-check-label text-muted ms-2">
                {sort.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllRooms;
