import React from 'react'
import './AllRooms.css'
import { assets, roomsDummyData } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../../components/StarRating'

function AllRooms() {
  const navigate = useNavigate();

  return (
    <div className="allrooms-section">
      {/* Heading */}
      <div className="text-start mb-5">
        <h1 className="font-playfair custom-heading">Hotel Rooms</h1>
        <p className="custom-paragraph">
          Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
        </p>
      </div>

      {/* Rooms Grid */}
      <div className="rooms-grid">
        {roomsDummyData.map((room) => (
          <div key={room._id} className="room-card">
            <div
              className="room-image-container"
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                scrollTo(0, 0);
              }}
            >
              <img
                src={room.images[0]}
                alt="hotel-img"
                className="room-image"
                title="View Room Details"
              />
            </div>

            <div className="room-details mt-2">
              <p className="text-gray-500 mb-1">{room.hotel.city}</p>

              <h3
                className="font-playfair room-title mb-1"
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
              >
                {room.hotel.name}
              </h3>

              <div className="d-flex align-items-center rating-row">
                <StarRating rating={room.rating} />
                <span className="ms-2">200+ reviews</span>
              </div>


              <div className="d-flex align-items-center gap-1 mt-2 text-gray-500">
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllRooms
