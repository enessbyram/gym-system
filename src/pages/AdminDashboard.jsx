import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminProducts from "../components/AdminProducts"; // Ürün Yönetim Componenti
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBox, 
  faCalendar, 
  faImage, 
  faShoppingBag, 
  faUsers 
} from "@fortawesome/free-solid-svg-icons";
import AdminPackages from "../components/AdminPackages"; // YENİ EKLENDİ
import AdminSlider from "../components/AdminSlider";
import AdminAppointments from "../components/AdminAppointments"; // Randevu Yönetim Componenti
import AdminMembers from "../components/AdminMembers"; // Üye Yönetim Componenti

const AdminDashboard = () => {
  // Hangi sekmenin aktif olduğunu tutan state (Varsayılan: Ürünler)
  const [activeTab, setActiveTab] = useState("products");

  // Butonların konfigürasyonu (Renkler ve İkonlar)
  const tabs = [
    {
      id: "products",
      label: "Ürünler",
      icon: faShoppingBag,
      // Mavi Stil
      activeClass: "bg-[#009fe2] text-white shadow-[0_0_20px_rgba(0,159,226,0.4)]",
    },
    {
      id: "packages",
      label: "Paketler",
      icon: faBox,
      // Yeşil Stil
      activeClass: "bg-[#22c55e] text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]",
    },
    {
      id: "members",
      label: "Üyeler",
      icon: faUsers,
      // Gri/Beyaz Stil
      activeClass: "bg-[#5b5b5b] text-white shadow-[0_0_20px_rgba(91,91,91,0.4)]",
    },
    {
      id: "appointments",
      label: "Randevular", // İsteğin üzerine YEŞİL
      icon: faCalendar,
      activeClass: "bg-[#22c55e] text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]",
    },
    {
      id: "slider",
      label: "Slider", // İsteğin üzerine MAVİ
      icon: faImage,
      activeClass: "bg-[#009fe2] text-white shadow-[0_0_20px_rgba(0,159,226,0.4)]",
    },
  ];

  // İçeriğin Render Edileceği Alan
  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <AdminProducts />; // Ürünler Componentini Çağırıyoruz
      case "packages":
        return <AdminPackages />
      case "members":
        return <AdminMembers />;
      case "appointments":
        return <AdminAppointments />;
      case "slider":
        return <AdminSlider />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="bg-[#161515] min-h-screen pt-32 px-4 md:px-10 text-white flex flex-col justify-start pb-20">
        
        {/* Başlık Alanı */}
        <div className="flex flex-row gap-3 container mx-auto py-4">
             <h1 className="text-4xl md:text-5xl font-bold text-white">Admin</h1>
             <h1 className="text-4xl md:text-5xl font-bold text-[#5b5b5b]">Panel</h1>
        </div>
        
        <div className="container mx-auto mb-6">
          <p className="text-[#5b5b5b] text-xl md:text-2xl">Sistem Yönetimi</p>
        </div>

        {/* Sekme Butonları (Tabs) */}
        <div className="container mx-auto my-4 flex flex-row gap-4 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                rounded-xl py-3 px-6 md:px-8 min-w-35 md:min-w-40 font-semibold transition-all duration-300 
                flex items-center justify-center gap-2 cursor-pointer border border-transparent select-none
                ${
                  activeTab === tab.id
                    ? `${tab.activeClass} scale-105` // Aktif Durum
                    : "bg-[#222121] text-[#5b5b5b] hover:bg-[#2a2929] hover:text-[#888] hover:border-[#333]" // Pasif Durum
                }
              `}
            >
              <FontAwesomeIcon icon={tab.icon} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dinamik İçerik Alanı */}
        <div className="container mx-auto mt-8 animate-fade-in w-full">
           {renderContent()}
        </div>

      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;