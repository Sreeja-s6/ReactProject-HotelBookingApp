import React, { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import { HotelsContext } from "../../context/HotelsContext";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const hotels = useContext(HotelsContext);
  const navigate = useNavigate();

  const wishlistHotels = hotels.filter((hotel) => wishlist.some((item) => item.id === hotel.id));

  return (
    <div className="wishlist-container container my-5">
      <h2 className="fw-bold mb-4 text-center">My Wishlist</h2>

      {wishlistHotels.length === 0 ? (
        <p className="text-center text-muted fs-5">Your wishlist is empty.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle shadow-sm border">
            <thead className="table-dark text-center">
              <tr>
                <th>Hotel</th>
                <th>Location</th>
                <th>Rating</th>
                <th>Price / Night</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {wishlistHotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td className="fw-semibold">{hotel.name}</td>
                  <td>{hotel.place}</td>
                  <td>{hotel.rating} ★</td>
                  <td>₹{hotel.pricePerNight}</td>
                  <td>
                    <button className="btn btn-danger btn-sm me-2" onClick={() => removeFromWishlist(hotel.id)}>✕</button>
                    <button className="btn btn-success btn-sm" onClick={() => navigate(`/book-now/${hotel.id}`)}>Book Now</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
