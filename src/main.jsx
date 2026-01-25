import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './pages/App'
import Products from './pages/Products'
import Packages from './pages/Packages'
import Contact from './pages/Contact'
import Login from './pages/Login'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ÖNEMLİ: basename kısmına repo adını '/repo-adi' şeklinde ekliyoruz.
        Böylece Router, tüm linklerin başına bunu otomatik ekliyor.
    */}
    <BrowserRouter basename="/gym-system"> 
      <Routes>
        {/* Artık başına /gym-system yazmana gerek yok, sadece / yeterli */}
        <Route path="/" element={<App />} />
        
        <Route path="/products" element={<Products isPage={true} />} />
        <Route path="/packages" element={<Packages isPage={true} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)