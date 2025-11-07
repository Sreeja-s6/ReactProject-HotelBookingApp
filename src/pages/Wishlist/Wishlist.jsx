import React, { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import { HotelsContext } from "../../context/HotelsContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const hotels = useContext(HotelsContext);
  const navigate = useNavigate();

  const wishlistHotels = hotels.filter((hotel) => wishlist.some((item) => item.id === hotel.id));

  return (
    <div className="wishlist-page">
      <div className="wishlist-wrapper">
        <h2 className="wishlist-title">My Wishlist</h2>

        {wishlistHotels.length === 0 ? (
          <div className="text-center mt-5">
            <p style={{ fontSize: "1.3rem", color: "#6B7280", fontWeight: "500" }}>
              Your wishlist is empty.
            </p>
            <p
              style={{
                fontSize: "1.25rem",
                color: "#2563EB",
                cursor: "pointer",
                fontWeight: "600",
                marginTop: "10px",
              }}
              onClick={() => navigate("/rooms")}
            >
              Browse hotels now!
            </p>
          </div>
        ) : (
          <div className="wishlist-table mt-4">
            {/* Table Header */}
            <div className="table-header">
              <div>Hotels</div>
              <div>Rating</div>
              <div>Price / Night</div>
              <div>Actions</div>
            </div>

            {/* Table Rows */}
            {wishlistHotels.map((hotel) => (
              <div key={hotel.id} className="table-row">
                {/* Hotels Column */}
                <div className="hotel-info" data-label="Hotels">
                  <img
                    src={hotel.images && hotel.images.length ? hotel.images[0] : ""}
                    alt={hotel.name}
                    className="hotel-img"
                  />
                  <div>
                    <p className="hotel-name">{hotel.name}</p>
                    <p className="hotel-address">{hotel.address || hotel.place}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="rating-col" data-label="Rating">{hotel.rating} ★</div>

                {/* Price */}
                <div className="price-col" data-label="Price / Night">₹{hotel.pricePerNight}</div>

                {/* Actions */}
                <div className="action-col" data-label="Actions">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(hotel.id)}
                  >
                    ✕
                  </button>
                  <button
                    className="book-btn"
                    onClick={() => navigate(`/book-now/${hotel.id}`)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
