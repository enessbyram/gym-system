import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faDumbbell,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Membership = () => {
  const [gymPackages, setGymPackages] = useState([]);
  const [ptPackages, setPtPackages] = useState([]);

  useEffect(() => {
    fetch("http://localhost/gym-system/api/packages.php")
      .then((res) => res.json())
      .then((data) => {
        setGymPackages(data.filter((pkg) => pkg.type === "gym"));
        setPtPackages(data.filter((pkg) => pkg.type === "pt"));
      })
      .catch((err) => console.error("Paket verisi çekilemedi:", err));
  }, []);

  const formatPrice = (price) => {
    return Number(price).toLocaleString("tr-TR");
  };

  return (
    <div className="bg-[#161515] w-full h-auto py-10 md:py-20 flex flex-col items-center font-montserrat">
      <div className="container px-4 flex flex-col gap-4 justify-start mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-white">Üyelik Paketleri</h1>
        <p className="text-[#414141] text-base md:text-lg">
          Size en uygun üyelik paketini seçin ve fitness yolculuğunuza başlayın.
        </p>
      </div>

      <div className="container px-4 flex flex-col md:flex-row flex-wrap gap-8 justify-center items-start">
        
        {/* =======================
            1. KUTU: SPOR SALONU (MAVİ)
           ======================= */}
        <div className="relative group w-full md:w-[45%] bg-[#1e1e1e] rounded-2xl border border-[#333] overflow-hidden transition-all duration-500 hover:border-[#555] hover:shadow-[0_0_40px_rgba(0,158,225,0.4)]">
          
          <div className="h-24 md:h-32 flex items-center px-6 relative z-10">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#009ee1]/20 rounded-xl flex items-center justify-center mr-5 shrink-0 transition-transform duration-500 group-hover:scale-110">
              <FontAwesomeIcon
                icon={faDumbbell}
                className="text-2xl md:text-3xl text-[#009ee1] rotate-135"
              />
            </div>
            <h3 className="text-white text-xl md:text-2xl font-bold">Spor Salonu</h3>
          </div>

          {/* MOBİL İÇİN DÜZENLEME:
            - max-h-full opacity-100: Mobilde varsayılan açık.
            - md:max-h-0 md:opacity-0: Masaüstünde varsayılan kapalı.
            - md:group-hover:...: Masaüstünde hover ile açılır.
          */}
          <div className="max-h-full opacity-100 md:max-h-0 md:opacity-0 md:group-hover:max-h-150 md:group-hover:opacity-100 transition-all duration-700 ease-in-out px-6 pb-6">
            <div className="flex flex-col gap-3 pt-2">
              
              {gymPackages.length > 0 ? (
                gymPackages.map((pkg) => (
                  <div 
                    key={pkg.id} 
                    className="flex justify-between items-center p-3 md:p-4 rounded-xl bg-[#252525] border border-[#333] hover:border-[#009ee1] transition-colors cursor-pointer group/item"
                  >
                    <div className="flex flex-col">
                      <span className="text-white font-semibold text-sm md:text-base">{pkg.title}</span>
                      <span className="text-[#666] text-xs">
                        {pkg.duration_days} gün geçerli
                      </span>
                    </div>
                    <span className="text-[#009ee1] font-bold text-base md:text-lg">
                      {formatPrice(pkg.price)}₺
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[#555] text-sm italic">Şu an aktif paket bulunmuyor.</p>
              )}

            </div>
          </div>

          <div className="absolute right-12 top-0 h-full w-40 bg-[#009ee1] rounded-full blur-[60px] opacity-20 pointer-events-none transition-all duration-500 group-hover:opacity-20"></div>
        </div>


        {/* =======================
            2. KUTU: PT DERSLERİ (YEŞİL)
           ======================= */}
        <div className="relative group w-full md:w-[45%] bg-[#1e1e1e] rounded-2xl border border-[#333] overflow-hidden transition-all duration-500 hover:border-[#555] hover:shadow-[0_0_20px_rgba(76,169,87,0.4)]">
          
          <div className="h-24 md:h-32 flex items-center px-6 relative z-10">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#4ca957]/20 rounded-xl flex items-center justify-center mr-5 shrink-0 transition-transform duration-500 group-hover:scale-110">
              <FontAwesomeIcon
                icon={faBagShopping}
                className="text-2xl md:text-3xl text-[#4ca957]"
              />
            </div>
            <h3 className="text-white text-xl md:text-2xl font-bold">PT Dersleri</h3>
          </div>

          {/* MOBİL UYUMLU LİSTE */}
          <div className="max-h-full opacity-100 md:max-h-0 md:opacity-0 md:group-hover:max-h-150 md:group-hover:opacity-100 transition-all duration-700 ease-in-out px-6 pb-6">
            <div className="flex flex-col gap-3 pt-2 md:border-t md:border-[#333]">
              
              {ptPackages.length > 0 ? (
                ptPackages.map((pkg) => (
                  <div 
                    key={pkg.id} 
                    className="flex justify-between items-center p-3 md:p-4 rounded-xl bg-[#252525] border border-[#333] hover:border-[#4ca957] transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="text-white font-semibold text-sm md:text-base">{pkg.title}</span>
                      <span className="text-[#666] text-xs">
                        {pkg.session_count} ders • {pkg.duration_days} gün
                      </span>
                    </div>
                    <span className="text-[#4ca957] font-bold text-base md:text-lg">
                      {formatPrice(pkg.price)}₺
                    </span>
                  </div>
                ))
              ) : (
                 <p className="text-[#555] text-sm italic">Şu an aktif PT paketi bulunmuyor.</p>
              )}

            </div>
          </div>

          <div className="absolute right-15 top-0 h-full w-40 bg-[#4ca957] rounded-full blur-[60px] opacity-10 pointer-events-none transition-all duration-500 group-hover:opacity-20"></div>
        </div>
      </div>
      
      <div className="w-full mt-10 md:mt-16 flex justify-center items-center px-4">
        <Link 
          to="/packages" 
          className="bg-[#009ee1] cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-[#007bbd] transition duration-300 shadow-[0_0_20px_rgba(0,158,225,0.7)] hover:shadow-[0_0_30px_rgba(0,158,225,0.9)] flex items-center justify-center text-base md:text-lg w-full md:w-auto"
        >
          <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] flex items-center">
            Tüm Paketleri Görüntüle
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Membership;