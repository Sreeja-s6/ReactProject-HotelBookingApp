import React, { useState, useEffect } from 'react';
import './MyBookings.css';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get logged-in user from localStorage
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    if (!authUser) {
      navigate('/login'); // redirect if not logged in
      return;
    }

    // Get all bookings
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // Filter only bookings of the logged-in user
    const userBookings = storedBookings.filter(
      (booking) => booking.email === authUser.email
    );

    setBookings(userBookings);
  }, [navigate]);

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
            <p style={{ fontSize: '1.3rem', color: '#6B7280', fontWeight: '500' }}>
              You didn't book anything yet.
            </p>
            <p
              style={{
                fontSize: '1.25rem',
                color: '#2563EB',
                cursor: 'pointer',
                fontWeight: '600',
                marginTop: '10px',
              }}
              onClick={() => navigate('/rooms')}
            >
              Book your stay now!
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
                    src={booking.hotel?.images ? booking.hotel.images[0] : ''}
                    alt={booking.hotel?.name || 'Hotel'}
                    className="hotel-img"
                  />
                  <div>
                    <p className="hotel-name">
                      {booking.hotel?.name || 'N/A'}{' '}
                      <span className="room-type">
                        ({booking.hotel?.roomType || 'N/A'})
                      </span>
                    </p>
                    <div className="d-flex align-items-center gap-1 small text-secondary">
                      <img
                        src={assets.locationIcon}
                        alt="location"
                        className="location-icon"
                      />
                      <span>{booking.hotel?.address || 'N/A'}</span>
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
                <div className="price-col">₹{booking.totalPrice || 0}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
