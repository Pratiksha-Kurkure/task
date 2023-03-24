import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Details from './pages/Details'
import Home from './pages/Home'
import "./index.css"

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/details' element={<Details />} />

    </Routes>
  </BrowserRouter>
}
