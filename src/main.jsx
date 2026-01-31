import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./pages/App";
import Products from "./pages/Products";
import Packages from "./pages/Packages";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import PTDashboard from "./pages/PTDashboard";
import MemberDashboard from "./pages/MemberDashboard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/products" element={<Products isPage={true} />} />
          <Route path="/packages" element={<Packages isPage={true} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/ptdashboard" element={<PTDashboard />} />
          <Route path="/memberdashboard" element={<MemberDashboard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
