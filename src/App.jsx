import React, { useState, useEffect } from 'react';
import Navbar1 from './components/Navbar/Navbar1';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AllRooms from './pages/AllRooms/AllRooms';
import RoomDetails from './pages/RoomDetails/RoomDetails';
import BookNow from './pages/BookNow/BookNow';
import MyBookings from './pages/MyBookings/MyBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import { HotelsContext } from './context/HotelsContext';
import axios from 'axios';

function App() {
  const [hotels, setHotels] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5001/hotels')
      .then(res => setHotels(res.data))
      .catch(err => console.error('Error fetching hotels:', err));
  }, []);

  return (
    <HotelsContext.Provider value={hotels}>
      <Routes>
        {/* Standalone pages without Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Pages with Navbar and Footer */}
        <Route
          path="/*"
          element={
            <>
              <Navbar1 favorites={favorites} />
              <div style={{ minHeight: '70vh' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/rooms" element={<AllRooms favorites={favorites} setFavorites={setFavorites} />} />
                  <Route path="/rooms/:id" element={<RoomDetails />} />
                  <Route path="/book-now/:id" element={<BookNow />} />
                  <Route path="/my-bookings" element={<MyBookings />} />
                </Routes>
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </HotelsContext.Provider>
  );
}

export default App;
