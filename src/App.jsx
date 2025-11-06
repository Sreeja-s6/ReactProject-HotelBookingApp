import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar1 from './components/Navbar/Navbar1';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import AllRooms from './pages/AllRooms/AllRooms';
import RoomDetails from './pages/RoomDetails/RoomDetails';
import BookNow from './pages/BookNow/BookNow';
import MyBookings from './pages/MyBookings/MyBookings';
import Wishlist from './pages/Wishlist/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import { HotelsContext } from './context/HotelsContext';
import { WishlistProvider } from './context/WishlistContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5001/hotels')
      .then(res => setHotels(res.data))
      .catch(err => console.error('Error fetching hotels:', err));
  }, []);

  return (
    <HotelsContext.Provider value={hotels}>
      {/* Wrap the whole app inside WishlistProvider */}
      <WishlistProvider>
        <Routes>
          {/* Standalone pages (no Navbar/Footer) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Pages with Navbar and Footer */}
          <Route
            path="/*"
            element={
              <>
                <Navbar1 />
                <div style={{ minHeight: '70vh' }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/rooms" element={<AllRooms />} />
                    <Route path="/rooms/:id" element={<RoomDetails />} />

                    {/* ✅ Protected Pages */}
                    <Route
                      path="/book-now/:id"
                      element={
                        <ProtectedRoute>
                          <BookNow />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/my-bookings"
                      element={
                        <ProtectedRoute>
                          <MyBookings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/wishlist"
                      element={
                        <ProtectedRoute>
                          <Wishlist />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </WishlistProvider>
    </HotelsContext.Provider>
  );
}

export default App;

// npx json-server --watch db.json --port 5001
