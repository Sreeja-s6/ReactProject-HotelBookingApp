import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar1 from './components/Navbar/Navbar1';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import AllRooms from './pages/AllRooms/AllRooms';
import RoomDetails from './pages/RoomDetails/RoomDetails';
import BookNow from './pages/BookNow/BookNow';
import MyBookings from './pages/MyBookings/MyBookings';
import Wishlist from './pages/Wishlist/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import { HotelsContext } from './context/HotelsContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeContext } from './context/ThemeContext'; // ✅ Import ThemeContext

function App() {
  const [hotels, setHotels] = useState([]);
  const { theme } = useContext(ThemeContext); // ✅ Get current theme from context

  useEffect(() => {
    axios
      .get('http://localhost:5001/hotels')
      .then((res) => setHotels(res.data))
      .catch((err) => console.error('Error fetching hotels:', err));
  }, []);

  return (
    <HotelsContext.Provider value={hotels}>
      <div
        className={`app-container ${
          theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'
        }`}
        style={{ minHeight: '100vh', transition: 'all 0.3s ease' }}
      >
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
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
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
      </div>
    </HotelsContext.Provider>
  );
}

export default App;
