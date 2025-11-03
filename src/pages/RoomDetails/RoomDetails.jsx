import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../../assets/assets';
import './RoomDetails.css'
import StarRating from '../../components/StarRating';
import { Button } from 'react-bootstrap';

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const room = roomsDummyData.find(room => room._id === id)
    room && setRoom(room)
    room && setMainImage(room.images[0])
  }, [])

  return room && (
    <div className="custom-padding">
      {/* Room Details */}
      <div className='d-flex align-items-start flex-column flex-md-row align-items-md-center gap-2'>
        <h1 className="text-heading">
          {room.hotel.name} <span className="text-small">({room.roomType})</span></h1>
        <p className="badge-orange">20% OFF</p>
      </div>

      {/* Room Rating */}
      <div className='d-flex align-items-center gap-1 mt-2'>
        <StarRating />
        <p className='ms-2'>200+ reviews</p>
      </div>

      {/* Room Address */}
      <div className='d-flex align-items-center gap-1 mt-2' style={{ color: "#6B7280" }}>
        <img src={assets.locationIcon} alt="location-icon" />
        <span>{room.hotel.address}</span>
      </div>

      {/* Room Images */}
      <div className="d-flex flex-column flex-lg-row mt-4 gap-4">
        <div className="w-100 w-lg-50">
          <img src={mainImage} alt="Room Image" className="w-100 rounded-4 shadow-lg"
            style={{ objectFit: 'cover' }} />
        </div>
        <div className="d-grid gap-4 w-100 w-lg-50" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {room?.images.length > 1 && room.images.map((image, index) => (
            <img
              onClick={() => setMainImage(image)}
              key={index}
              src={image}
              alt="Room-Image"
              className="w-100 rounded-4 shadow object-fit-cover cursor-pointer"
              style={
                mainImage === image
                  ? {
                    outline: '3px solid #F97316', // orange-500
                    outlineOffset: '2px',
                  }
                  : {}
              }
            />

          ))}
        </div>
      </div>

      {/* Room Highlights */}
      <div className="d-flex flex-column flex-md-row justify-content-md-between mt-5">
        <div>
          <h1 className="responsive-heading fw-normal">Experience Luxury Like Never Before</h1>
          <div className='d-flex flex-wrap align-items-center mt-3 mb-4 gap-4'>
            {room.amenities.map((item, index) => (
              <div key={index} className="d-flex align-items-center gap-2 px-3 py-2rounded-3" style={{ backgroundColor: '#F3F4F6' }}>
                <img src={facilityIcons[item]} alt={item} style={{ width: '1.25rem', height: '1.25rem' }} />
                <p style={{ fontSize: '0.875rem' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Room Price */}
        <p className="fs-6 fw-medium" style={{ color: '#374151' }}>${room.pricePerNight} /night</p>

      </div>

      {/* CheckIn CheckOut Form */}

      <form
        className="d-flex flex-column flex-md-row align-items-center justify-content-between bg-white shadow p-4 rounded-4 mx-auto mt-5"
        style={{
          boxShadow: '0px 0px 20px rgba(0,0,0,0.15)',
          maxWidth: '72rem',
          gap: '0.8rem', // smaller overall gap
        }}
      >
        {/* Left side: inputs */}
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-start gap-3 flex-grow-1">
          {/* Check-In */}
          <div className="d-flex flex-column">
            <label htmlFor="checkInDate" className="fw-medium mb-1">
              Check-In
            </label>
            <input
              type="date"
              id="checkInDate"
              className="rounded border border-secondary-subtle px-3 py-2 shadow-none"
              required
            />
          </div>

          <div className="d-none d-md-block bg-secondary" style={{ width: '1px', height: '60px', opacity: 0.7 }}></div>

          {/* Check-Out */}
          <div className="d-flex flex-column">
            <label htmlFor="checkOutDate" className="fw-medium mb-1">
              Check-Out
            </label>
            <input
              type="date"
              id="checkOutDate"
              className="rounded border border-secondary-subtle px-3 py-2 shadow-none"
              required
            />
          </div>

          <div className="d-none d-md-block bg-secondary" style={{ width: '1px', height: '60px', opacity: 0.7 }}></div>

          {/* Guests */}
          <div className="d-flex flex-column me-md-2">
            <label htmlFor="guests" className="fw-medium mb-1">
              Guests
            </label>
            <input
              type="number"
              id="guests"
              placeholder="0"
              className="rounded border border-secondary-subtle px-3 py-2 shadow-none"
              style={{ maxWidth: '5rem' }}
              required
            />
          </div>
        </div>

        {/* Book Now button */}
        <Button
          variant="primary"
          className="rounded-md text-white fw-medium py-2 px-4 mt-3 mt-md-0 flex-shrink-0"
          style={{ width: '22rem' }} // ✅ increased button width
        >
          Check Availability
        </Button>
      </form>

      {/* Common Specifications */}
      <div style={{ marginTop: "6.25rem" }}>
        {roomCommonData.map((spec, index) => (
          <div key={index} className='d-flex align-items-start gap-2'>
            <img src={spec.icon} alt={`${spec.title}-icon`} style={{ width: "1.625rem" }} />
            <div>
              <p style={{ fontSize: "1rem", lineHeight: "1.5rem" }}>{spec.title}</p>
              <p style={{ color: "#6b7280" }}>{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="custom-box">
        <p>Guest will be allocated on the ground floor according to availability. You get a comfortable Two Bedroom Apartment and has a true city feeling.
          The price quoted is for two guest, at the guest slot, please amrk the number of guests to get the exact price for groups.
        </p>
      </div>

      {/* Hosted By */}
      <div className='d-flex flex-column align-items-start gap-4'>
        <div className='d-flex gap-4'>
          <img src={room.hotel.owner.image} alt="Host" className="circle-box" />
          <div>
            <p className="text-lg-md-xl">Hosted By {room.hotel.name}</p>
            <div className='d-flex align-items-center mt-1'>
              <StarRating />
              <p className='ms-2'>200+ reviews</p>
            </div>
          </div>
        </div>
        <button className="custom-btn">Contact Now</button>
      </div>

    </div>
  )
}

export default RoomDetails