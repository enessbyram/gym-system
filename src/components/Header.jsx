import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="flex w-full h-20 bg-[#1a1a1a] justify-center fixed top-0 z-50">
      <div className="container flex justify-between items-center">
        <div className="logo-part group flex flex-row items-center gap-2 cursor-pointer font-bold">
          <FontAwesomeIcon
            icon={faDumbbell}
            size="2x"
            color="#009fe2"
            className="rotate-135 drop-shadow-[0_0_5px_rgba(0,159,226,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,159,226,0.9)]"
          />
          <h1 className="text-[#009fe2]">EA</h1>
          <h1 className="text-[#535454]">|</h1>
          <h1 className="text-[#ffffff]">WellnessClub</h1>
        </div>
        <nav className="navbar-part flex justify-between text-white gap-8 items-center">
          <h3 className="cursor-pointer hover:text-[#009fe2] transition-all">Ana Sayfa</h3>
          <h3 className="cursor-pointer hover:text-[#009fe2] transition-all">Ürünler</h3>
          <h3 className="cursor-pointer hover:text-[#009fe2] transition-all">Paketler</h3>
          <h3 className="cursor-pointer hover:text-[#009fe2] transition-all">İletişim</h3>
          <button className="bg-[#009fe2] text-white px-6 py-1 rounded-xl cursor-pointer drop-shadow-[0_0_5px_rgba(0,159,226,0.5)] hover:bg-[#007bbd] transition-colors duration-300">Randevu Sistemi</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
