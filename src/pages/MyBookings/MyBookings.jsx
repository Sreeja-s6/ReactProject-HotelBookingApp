import React, { useState, useEffect } from 'react';
import './MyBookings.css';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    if (!authUser) {
      navigate('/login');
      return;
    }

    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const userBookings = storedBookings.filter(
      (booking) => booking.email === authUser.email
    );

    setBookings(userBookings);
  }, [navigate]);

  const handleCancelClick = (bookingId, checkInDate) => {
    const today = new Date();
    const checkIn = new Date(checkInDate);
    const diffTime = checkIn - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 5) {
      // Show confirmation modal
      setCancelBookingId(bookingId);
      setModalMessage("Are you sure you want to cancel this booking?");
      setShowModal(true);
    } else {
      // Cannot cancel
      setModalMessage(
        "Can't cancel your booking. Bookings can be canceled only 5 days before check-in."
      );
      setCancelBookingId(null);
      setShowModal(true);
    }
  };

  const confirmCancel = () => {
    if (cancelBookingId) {
      const updatedBookings = bookings.filter((b) => b.id !== cancelBookingId);
      setBookings(updatedBookings);

      const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      const newAllBookings = allBookings.filter((b) => b.id !== cancelBookingId);
      localStorage.setItem('bookings', JSON.stringify(newAllBookings));
    }
    setShowModal(false);
    setCancelBookingId(null);
  };

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
            <div className="table-header">
              <div>Hotels</div>
              <div>Guests</div>
              <div>Check-In</div>
              <div>Check-Out</div>
              <div>Total Price</div>
              <div>Action</div>
            </div>

            {bookings.map((booking) => (
              <div key={booking.id} className="table-row">
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

                <div className="guests-col text-center me-5">{booking.guests}</div>
                <div className="date-col">{new Date(booking.checkInDate).toDateString()}</div>
                <div className="date-col">{new Date(booking.checkOutDate).toDateString()}</div>
                <div className="price-col">₹{booking.totalPrice || 0}</div>

                <div className="action-col">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/book-now/${booking.hotel.id}`, { state: { booking } })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelClick(booking.id, booking.checkInDate)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <p>{modalMessage}</p>
              {cancelBookingId ? (
                <div className="modal-actions">
                  <button className="confirm-btn" onClick={confirmCancel}>Yes</button>
                  <button className="close-modal" onClick={() => setShowModal(false)}>No</button>
                </div>
              ) : (
                <button className="close-modal" onClick={() => setShowModal(false)}>Close</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
