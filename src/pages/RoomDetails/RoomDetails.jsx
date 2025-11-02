import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, roomsDummyData } from '../../assets/assets';
import './RoomDetails.css'
import StarRating from '../../components/StarRating';

function RoomDetails() {
    const {id} = useParams();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        const room = roomsDummyData.find(room => room._id === id)
        room && setRoom(room)
        room && setMainImage(room.images[0])
    },[])

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

    </div>
  )
}

export default RoomDetails