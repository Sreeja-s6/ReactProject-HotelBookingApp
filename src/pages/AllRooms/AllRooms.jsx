import React, { useState } from 'react';
import './AllRooms.css';
import { assets, facilityIcons, roomsDummyData } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import StarRating from '../../components/StarRating';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="d-flex align-items-center gap-3 mt-2 small" style={{ cursor: 'pointer' }}>
      <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
      <span className="fw-light" style={{ userSelect: 'none' }}>{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="d-flex align-items-center gap-3 mt-2 small" style={{ cursor: 'pointer' }}>
      <input type="radio" name="sortOption" checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
      <span className="fw-light" style={{ userSelect: 'none' }}>{label}</span>
    </label>
  );
};

function AllRooms() {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  const roomTypes = ['Single Bed', 'Double Bed', 'Luxury Room', 'Family Suite'];
  const priceRanges = ['0 to 500', '500 to 1000', '1000 to 2000', '2000 to 3000'];
  const sortOptions = ['Price Low to High', 'Price High to Low', 'Newest First'];

  return (
    <div className="d-flex flex-column-reverse flex-lg-row align-items-start justify-content-between custom-section">

      {/* LEFT SIDE: Rooms Section */}
      <div className="allrooms-section flex-grow-1">
        {/* Heading */}
        <div className="text-start mb-5 ps-md-5">
          <h1 className="font-playfair custom-heading">Hotel Rooms</h1>
          <p className="custom-paragraph">
            Take advantage of our limited-time offers and special packages to enhance your stay
            and create unforgettable memories.
          </p>
        </div>

        {/* Rooms List */}
        <div className="rooms-list ps-md-5 flex-grow-1">
          {roomsDummyData.map((room) => (
            <div
              key={room._id}
              className="room-item border-bottom pb-5 mb-5 d-flex flex-column flex-md-row align-items-start gap-4 w-auto"
              style={{ borderColor: '#E5E7EB', width: 'fit-content' }}
            >
              {/* Left: Room Image */}
              <div
                className="room-image-container"
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={room.images[0]}
                  alt="hotel-img"
                  className="room-image rounded-4"
                  title="View Room Details"
                />
              </div>

              {/* Right: Room Details */}
              <div className="room-details mt-3 mt-md-0">
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

                {/* ⭐ Rating & Reviews */}
                <div className="d-flex align-items-center rating-row">
                  <StarRating rating={room.rating} />
                  <span className="ms-2 fw-semibold text-dark">200+ reviews</span>
                </div>

                {/* 📍 Location */}
                <div className="d-flex align-items-center gap-1 mt-2 text-gray-500">
                  <img src={assets.locationIcon} alt="location-icon" />
                  <span>{room.hotel.address}</span>
                </div>

                {/* Amenities */}
                <div className="d-flex flex-wrap align-items-center mt-3 mb-4 gap-4">
                  {room.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                      style={{ backgroundColor: 'rgba(245, 245, 255, 0.7)' }}
                    >
                      <img
                        src={facilityIcons[item]}
                        alt={item}
                        style={{ width: '20px', height: '20px' }}
                      />
                      <p className="text-xs mb-0">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <p className="fs-6 fw-medium" style={{ color: '#374151' }}>
                  ${room.pricePerNight} /night
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: Filters */}
      <div className="filter-section bg-white border text-secondary me-lg-5 mt-150">
        <div className={`d-flex align-items-center justify-content-between px-4 py-3 ${openFilters ? 'border-bottom' : ''} custom-border`} style={{ backgroundColor: '#fff' }}>
  <h6 className="mb-0 fw-semibold text-dark" style={{ letterSpacing: '0.5px' }}>FILTERS</h6>
  <div className="fw-semibold text-secondary" style={{ fontSize: '0.85rem', cursor: 'pointer' }}>
    <span onClick={() => setOpenFilters(!openFilters)} className="d-lg-none">
      {openFilters ? 'HIDE' : 'SHOW'}
    </span>
    <span className="d-none d-lg-block fw-semibold text-dark">CLEAR</span>
  </div>
</div>


        <div className={`transition-height overflow-hidden ${openFilters ? 'auto-height' : 'collapsed-height'}`}>
          <div className="px-5 pt-5">
            <p style={{ fontWeight: 500, color: '#1F2937', paddingBottom: '0.5rem' }}>Popular Filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox key={index} label={room} />
            ))}
          </div>

          <div className="px-5 pt-5">
            <p style={{ fontWeight: 500, color: '#1F2937', paddingBottom: '0.5rem' }}>Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox key={index} label={`$ ${range}`} />
            ))}
          </div>

          <div className="px-5 pt-5 mb-5">
            <p style={{ fontWeight: 500, color: '#1F2937', paddingBottom: '0.5rem' }}>Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton key={index} label={option} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllRooms;
