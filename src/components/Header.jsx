import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png"; // Logoyu import ettik

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  let logoLink = "/"; 

  if (user) {
    if (user.role === "admin") {
      logoLink = "/admindashboard";
    } else if (user.role === "pt") {
      logoLink = "/ptdashboard";
    } else {
      logoLink = "/memberdashboard";
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex w-full h-20 bg-[#1a1a1a] justify-center fixed top-0 z-50 border-b border-[#303030]">
      <div className="container h-full px-4 flex justify-between items-center relative">
        
        {/* LOGO KISMI GÜNCELLENDİ */}
        <Link to={logoLink} className="logo-part group flex flex-row items-center cursor-pointer z-50">
          <img 
            src={logo} 
            alt="Lumex Consulting" 
            className="h-30 md:h-24 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_5px_rgba(124,58,237,0.5)]" 
          />
        </Link>
        
        <button 
          onClick={toggleMenu}
          className="md:hidden text-white text-2xl focus:outline-none z-50"
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>

        <nav className="hidden md:flex justify-between text-white gap-8 items-center">
          {!user ? (
            <>
              {/* Hover renkleri Mor (#7c3aed) yapıldı */}
              <Link to="/" className="cursor-pointer hover:text-[#7c3aed] transition-all">Ana Sayfa</Link>
              <Link to="/products" className="cursor-pointer hover:text-[#7c3aed] transition-all">Ürünler</Link>
              <Link to="/packages" className="cursor-pointer hover:text-[#7c3aed] transition-all">Paketler</Link>
              <Link to="/contact" className="cursor-pointer hover:text-[#7c3aed] transition-all">İletişim</Link>
              
              {/* Buton Mor Yapıldı */}
              <Link to="/login" className="bg-[#7c3aed] text-white px-6 py-1 rounded-xl cursor-pointer drop-shadow-[0_0_5px_rgba(124,58,237,0.5)] hover:bg-[#6d28d9] transition-colors duration-300">
                Randevu Sistemi
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
               <span className="text-[#5b5b5b] text-sm">Hoşgeldin, {user.name}</span>
               <button 
                onClick={logout}
                className="flex items-center cursor-pointer gap-2 border border-[#383737] bg-[#222121] px-4 py-2 rounded-lg text-white hover:border-red-500 hover:text-red-500 transition-all duration-300"
               >
                 <FontAwesomeIcon icon={faSignOutAlt} />
                 Çıkış
               </button>
            </div>
          )}
        </nav>

        {/* MOBİL MENÜ */}
        <div 
          className={`
            absolute top-0 left-0 w-full bg-[#1a1a1a] border-b border-[#303030] shadow-2xl 
            flex flex-col items-center justify-center gap-6 py-8 
            transition-all duration-300 ease-in-out md:hidden
            ${isMenuOpen ? "translate-y-20 opacity-100 visible" : "-translate-y-full opacity-0 invisible"}
          `}
          style={{ marginTop: '-1px' }} 
        >
           {!user ? (
            <>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white text-lg font-medium hover:text-[#7c3aed]">Ana Sayfa</Link>
              <Link to="/products" onClick={() => setIsMenuOpen(false)} className="text-white text-lg font-medium hover:text-[#7c3aed]">Ürünler</Link>
              <Link to="/packages" onClick={() => setIsMenuOpen(false)} className="text-white text-lg font-medium hover:text-[#7c3aed]">Paketler</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-white text-lg font-medium hover:text-[#7c3aed]">İletişim</Link>
              
              <div className="w-full h-px bg-[#303030]"></div> 
              
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="bg-[#7c3aed] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6d28d9]">
                Randevu Sistemi
              </Link>
            </>
          ) : (
            <div className="flex flex-col items-center gap-6 w-full">
               <span className="text-[#7c3aed] font-bold text-lg">Hoşgeldin, {user.name}</span>
               
               <div className="w-full h-px bg-[#303030]"></div>

               <button 
                onClick={() => { logout(); setIsMenuOpen(false); }}
                className="flex items-center gap-2 text-red-500 font-bold text-lg hover:text-red-400"
               >
                 <FontAwesomeIcon icon={faSignOutAlt} />
                 Çıkış Yap
               </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;