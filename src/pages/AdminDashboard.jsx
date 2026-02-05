import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminProducts from "../components/AdminProducts"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBox, 
  faCalendar, 
  faImage, 
  faShoppingBag, 
  faUsers 
} from "@fortawesome/free-solid-svg-icons";
import AdminPackages from "../components/AdminPackages"; 
import AdminSlider from "../components/AdminSlider";
import AdminAppointments from "../components/AdminAppointments"; 
import AdminMembers from "../components/AdminMembers"; 

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  const tabs = [
    {
      id: "products",
      label: "Ürünler",
      icon: faShoppingBag,
      // DÜZELTME: Mavi gölge -> Mor gölge (rgba(124,58,237,0.4))
      activeClass: "bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]",
    },
    {
      id: "packages",
      label: "Paketler",
      icon: faBox,
      activeClass: "bg-[#22c55e] text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]",
    },
    {
      id: "members",
      label: "Üyeler",
      icon: faUsers,
      activeClass: "bg-[#5b5b5b] text-white shadow-[0_0_20px_rgba(91,91,91,0.4)]",
    },
    {
      id: "appointments",
      label: "Randevular", 
      icon: faCalendar,
      activeClass: "bg-[#22c55e] text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]",
    },
    {
      id: "slider",
      label: "Slider", 
      icon: faImage,
      // DÜZELTME: Mavi gölge -> Mor gölge (rgba(124,58,237,0.4))
      activeClass: "bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <AdminProducts />; 
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
      <div className="bg-[#161515] min-h-screen pt-24 md:pt-32 px-4 md:px-10 text-white flex flex-col justify-start pb-20 font-montserrat">
        
        <div className="flex flex-row gap-2 md:gap-3 container mx-auto py-4 items-center">
             <h1 className="text-3xl md:text-5xl font-bold text-white">Admin</h1>
             <h1 className="text-3xl md:text-5xl font-bold text-[#5b5b5b]">Panel</h1>
        </div>
        
        <div className="container mx-auto mb-6">
          <p className="text-[#5b5b5b] text-lg md:text-2xl">Sistem Yönetimi</p>
        </div>

        <div className="container mx-auto my-4 flex flex-wrap gap-3 md:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 sm:flex-none
                rounded-xl py-3 px-4 md:px-8 
                min-w-35 md:min-w-40 
                font-semibold text-sm md:text-base
                transition-all duration-300 
                flex items-center justify-center gap-2 cursor-pointer border border-transparent select-none
                ${
                  activeTab === tab.id
                    ? `${tab.activeClass} scale-105` 
                    : "bg-[#222121] text-[#5b5b5b] hover:bg-[#2a2929] hover:text-[#888] hover:border-[#333]" 
                }
              `}
            >
              <FontAwesomeIcon icon={tab.icon} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="container mx-auto mt-8 animate-fade-in w-full">
           {renderContent()}
        </div>

      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;