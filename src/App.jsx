import React, { useState, useEffect } from 'react'
import Navbar1 from './components/Navbar/Navbar1'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import AllRooms from './pages/AllRooms/AllRooms'
import RoomDetails from './pages/RoomDetails/RoomDetails'
import MyBookings from './pages/MyBookings/MyBookings'
import Login from './pages/Login'
import Register from './pages/Register'
import { HotelsContext } from './context/HotelsContext'
import axios from 'axios'

function App() {
  const [hotels, setHotels] = useState([])

  // Fetch hotels data
  useEffect(() => {
    axios
      .get('http://localhost:5001/hotels')
      .then(res => setHotels(res.data))
      .catch(err => console.error('Error fetching hotels:', err))
  }, [])

  return (
    <div>
      <Navbar1 />
      {/* Provide hotels data via context */}
      <HotelsContext.Provider value={hotels}>
        <div style={{ minHeight: '70vh' }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/rooms' element={<AllRooms />} />
            <Route path='/rooms/:id' element={<RoomDetails />} />
            <Route path='/my-bookings' element={<MyBookings />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </HotelsContext.Provider>
      <Footer />
    </div>
  )
}

export default App
