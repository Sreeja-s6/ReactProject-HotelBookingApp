import React from 'react'
import Navbar1 from './components/Navbar/Navbar1'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import AllRooms from './pages/AllRooms/AllRooms'
import RoomDetails from './pages/RoomDetails/RoomDetails'

function App() {
  return (
    <div>
      <Navbar1 />
      <div style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} /> 
          <Route path='/rooms/:id' element={<RoomDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App