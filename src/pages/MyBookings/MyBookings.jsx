import React, { useState } from 'react'
import './MyBookings.css'
import Title from '../../components/Title'
import { assets, userBookingsDummyData } from '../../assets/assets'
import { Button } from 'react-bootstrap'

function MyBookings() {

    const [bookings, setBookings] = useState(userBookingsDummyData);
    
    return (
        <div className="px-3 px-md-5"
            style={{
                paddingTop: "7rem",
                paddingBottom: "7rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
            }}>
            <Title
                title='My Bookings'
                subTitle='Easily manage yoour past,current, and upcoming hotel reservations in one place. Plan your trips seamlessly
                          with just a few clicks.'
                align="left" />

            <div className="w-100 mt-4"
                style={{
                    maxWidth: '72rem',
                    color: '#1F2937',
                }}>

                <div className="d-none d-md-grid w-100 border-bottom fw-medium py-3"
                    style={{
                        gridTemplateColumns: '3fr 2fr 1fr',
                        borderColor: '#D1D5DB',
                        fontSize: '1rem',
                    }}>
                    <div style={{ width: '33.333%' }}>Hotels</div>
                    <div style={{ width: '33.333%' }}>Date & Timings</div>
                    <div style={{ width: '33.333%' }}>Payment</div>
                </div>

                {bookings.map((booking) => (
                    <div key={booking._id}
                        className="custom-grid d-grid w-100 border-bottom py-4"
                        style={{
                            borderColor: '#D1D5DB',
                            gridTemplateColumns: '3fr 2fr 1fr',
                        }}>


                        {/* ---Hotel Details--- */}
                        <div className="d-flex flex-column flex-md-row">
                            <img src={booking.room.images[0]} alt="hotel-img" className="rounded shadow object-fit-cover w-100 d-md-block"
                                style={{ maxWidth: "11rem" }} />
                            <div className="d-flex flex-column gap-2 mt-md-0 mt-3 ms-md-4">
                                <p className='font-playfair' style={{ fontSize: '24px' }}>{booking.hotel.name}
                                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: "16px" }}> ({booking.room.roomType})</span>
                                </p>
                                <div className="d-flex align-items-center gap-1 small text-secondary">
                                    <img src={assets.locationIcon} alt="location-icon" />
                                    <span>{booking.hotel.address}</span>
                                </div>

                                <div className="d-flex align-items-center gap-1 small text-secondary">
                                    <img src={assets.guestsIcon} alt="guests-icon" />
                                    <span>Guests: {booking.guests}</span>
                                </div>
                                <p style={{ fontSize: '16px' }}>Total: ${booking.totalPrice}</p>
                            </div>
                        </div>

                        {/* ---Date & Timings --- */}
                        <div className="d-flex flex-row  align-items-md-center gap-4 gap-md-5 mt-3">
                            <div>
                                <p>Check-In:</p>
                                <p style={{ color: '#6B7280', fontSize: '14px' }}>
                                    {new Date(booking.checkInDate).toDateString()}
                                </p>
                            </div>

                            <div>
                                <p>Check-Out:</p>
                                <p style={{ color: '#6B7280', fontSize: '14px' }}>
                                    {new Date(booking.checkOutDate).toDateString()}
                                </p>
                            </div>
                        </div>

                        {/* ---Payment Status--- */}
                        <div className='d-flex flex-column align-items-start justify-content-center pt-3'>
                            <div className='d-flex align-items-center gap-2'>
                                <div
                                    className={`rounded-circle ${booking.isPaid ? "bg-success" : "bg-danger"}`}
                                    style={{
                                        width: '0.75rem',
                                        height: '0.75rem',
                                    }}
                                ></div>
                                <p className={`small mb-0 ${booking.isPaid ? "text-success" : "text-danger"}`}>
                                    {booking.isPaid ? "Paid" : "Pending"}
                                </p>
                            </div>

                            {!booking.isPaid && (
                                <Button
                                    variant="outline-secondary"
                                    className="px-3 py-1 mt-3 rounded-pill text-muted border border-secondary-subtle"
                                    style={{ fontSize: '0.75rem', transition: 'all 0.3s', cursor: 'pointer' }}
                                >
                                    Pay Now
                                </Button>

                            )}
                        </div>

                    </div>
                    // </div>
                ))}

            </div>
        </div >
    )
}

export default MyBookings