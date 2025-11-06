import React, { useState, useEffect } from 'react';
import './MyBookings.css';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <div className="mybookings-page">
      <div className="mybookings-wrapper">
        <Title
          title="My Bookings"
          subTitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
          align="left"
        />

        {bookings.length === 0 ? (
          <div className="text-center mt-5">
            <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>
              You have <strong>0 bookings</strong> yet.
            </p>
            <p
              style={{ color: '#2563EB', cursor: 'pointer', fontWeight: '500' }}
              onClick={() => navigate('/hotels')}
            >
              Book your first stay now!
            </p>
          </div>
        ) : (
          <div className="booking-table mt-5">
            {/* Table Header */}
            <div className="table-header">
              <div>Hotels</div>
              <div>Guests</div>
              <div>Check-In</div>
              <div>Check-Out</div>
              <div>Total Price</div>
            </div>

            {/* Table Rows */}
            {bookings.map((booking) => (
              <div key={booking.id} className="table-row">
                {/* Hotel Column */}
                <div className="hotel-info">
                  <img
                    src={booking.hotel.images[0]}
                    alt="hotel"
                    className="hotel-img"
                  />
                  <div>
                    <p className="hotel-name">
                      {booking.hotel.name}{' '}
                      <span className="room-type">
                        ({booking.hotel.roomType})
                      </span>
                    </p>
                    <div className="d-flex align-items-center gap-1 small text-secondary">
                      <img
                        src={assets.locationIcon}
                        alt="location"
                        className="location-icon"
                      />
                      <span>{booking.hotel.address}</span>
                    </div>
                  </div>
                </div>

                {/* Guests */}
                <div className="guests-col">{booking.guests}</div>

                {/* Check-In */}
                <div className="date-col">
                  {new Date(booking.checkInDate).toDateString()}
                </div>

                {/* Check-Out */}
                <div className="date-col">
                  {new Date(booking.checkOutDate).toDateString()}
                </div>

                {/* Total Price */}
                <div className="price-col">₹{booking.totalPrice}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
