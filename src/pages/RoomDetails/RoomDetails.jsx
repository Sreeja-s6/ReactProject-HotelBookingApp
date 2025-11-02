import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomsDummyData } from '../../assets/assets';
import './RoomDetails.css'
import StarRating from '../../components/StarRating';

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
                className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between bg-white shadow p-4 rounded-4 mx-auto mt-5"
                style={{
                    boxShadow: '0px 0px 20px rgba(0,0,0,0.15)',
                    maxWidth: '72rem', 
                }}>
                    <div></div>
                    <button type='submit'>Book Now</button>
            </form>

        </div>
    )
}

export default RoomDetails