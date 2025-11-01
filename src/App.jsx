import React from 'react'
import Navbar1 from './components/Navbar/Navbar1'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <div>
      <Navbar1 />
      <div style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App