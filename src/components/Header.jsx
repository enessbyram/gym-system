import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  // Logo'nun nereye gideceğini belirleyen mantık
  let logoLink = "/"; // Varsayılan: Ana Sayfa

  if (user) {
    if (user.role === "admin") {
      logoLink = "/admindashboard";
    } else if (user.role === "pt") {
      logoLink = "/ptdashboard";
    } else {
      logoLink = "/memberdashboard";
    }
  }

  return (
    <header className="flex w-full h-20 bg-[#1a1a1a] justify-center fixed top-0 z-50 border-b border-[#303030]">
      <div className="container flex justify-between items-center">
        
        {/* Logo Kısmı - Artık Dinamik Link Kullanıyor */}
        <Link to={logoLink} className="logo-part group flex flex-row items-center gap-2 cursor-pointer font-bold">
          <FontAwesomeIcon
            icon={faDumbbell}
            size="2x"
            color="#009fe2"
            className="rotate-135 drop-shadow-[0_0_5px_rgba(0,159,226,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,159,226,0.9)]"
          />
          <h1 className="text-[#009fe2]">EA</h1>
          <h1 className="text-[#535454]">|</h1>
          <h1 className="text-[#ffffff]">WellnessClub</h1>
        </Link>
        
        {/* Sağ Taraf - Dinamik Değişim */}
        <nav className="navbar-part flex justify-between text-white gap-8 items-center">
          
          {!user ? (
            // GİRİŞ YAPILMAMIŞSA MENÜYÜ GÖSTER
            <>
              <Link to="/" className="cursor-pointer hover:text-[#009fe2] transition-all">Ana Sayfa</Link>
              <Link to="/products" className="cursor-pointer hover:text-[#009fe2] transition-all">Ürünler</Link>
              <Link to="/packages" className="cursor-pointer hover:text-[#009fe2] transition-all">Paketler</Link>
              <Link to="/contact" className="cursor-pointer hover:text-[#009fe2] transition-all">İletişim</Link>
              <Link to="/login" className="bg-[#009fe2] text-white px-6 py-1 rounded-xl cursor-pointer drop-shadow-[0_0_5px_rgba(0,159,226,0.5)] hover:bg-[#007bbd] transition-colors duration-300">Randevu Sistemi</Link>
            </>
          ) : (
            // GİRİŞ YAPILMIŞSA ÇIKIŞ BUTONUNU GÖSTER
            <div className="flex items-center gap-4">
               <span className="text-[#5b5b5b] text-sm hidden md:block">Hoşgeldin, {user.name}</span>
               <button 
                onClick={logout}
                className="flex items-center gap-2 border border-[#383737] bg-[#222121] px-4 py-2 rounded-lg text-white hover:border-red-500 hover:text-red-500 transition-all duration-300"
               >
                 <FontAwesomeIcon icon={faSignOutAlt} />
                 Çıkış
               </button>
            </div>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Header;