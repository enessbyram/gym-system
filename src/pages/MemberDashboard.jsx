import { useState } from "react"; // useState eklemeyi unutma
import Header from "../components/Header";
import Footer from "../components/Footer";
import MemberDashboardStats from "../components/MemberDashboardStats";
import MemberAppointmentCalendar from "../components/MemberAppointmentCalendar";
import MemberAppointments from "../components/MemberAppointments"; // Yeni componenti import et
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

const MemberDashboard = () => {
  const { user } = useAuth();
  
  // Görünüm Kontrolü: 'dashboard' | 'appointments'
  const [currentView, setCurrentView] = useState("dashboard");

  const memberStats = {
    remainingDays: { current: 65, total: 90 },
    ptSessions: { current: 15, total: 30 },
    activeAppointments: { current: 1, total: 10 },
  };

  return (
    <>
      <Header />
      
      {/* Sayfa İçeriği */}
      <div className="bg-[#161515] min-h-screen pt-32 pb-20 px-4 md:px-10 flex flex-col items-center gap-12">
        
        {/* === DURUM: DASHBOARD (ANA EKRAN) === */}
        {currentView === "dashboard" && (
          <>
            {/* 1. İstatistikler */}
            <MemberDashboardStats user={user} stats={memberStats} />

            {/* 2. Takvim */}
            <div className="w-full max-w-7xl">
              <div className="flex items-center gap-4 mb-6">
                  <div className="w-1 h-8 bg-[#009fe2] rounded-full"></div>
                  <h2 className="text-3xl font-bold text-white">Takvim & Randevu</h2>
              </div>
              <MemberAppointmentCalendar user={user} />
            </div>

            {/* 3. Randevularım Kartı (Tıklanınca View Değişir) */}
            <div className="w-full max-w-7xl">
              <div 
                onClick={() => setCurrentView("appointments")} // TIKLAMA OLAYI BURADA
                className="group w-full bg-[#252422] border border-[#635a4a] rounded-3xl p-6 md:p-8 flex items-center gap-6 transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#635a4a]/20"
              >
                <div className="w-20 h-20 min-w-20 bg-[#4a4436] rounded-2xl flex items-center justify-center text-[#d6cbb6]">
                  <FontAwesomeIcon icon={faHistory} className="text-4xl" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-bold text-[#d6cbb6]">
                    Randevularım
                  </h3>
                  <p className="text-[#a8a293] text-base md:text-lg group-hover:text-[#d6cbb6] transition-colors">
                    Geçmiş ve gelecek tüm randevularınızı görüntüleyin
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* === DURUM: APPOINTMENTS (RANDEVU LİSTESİ) === */}
        {currentView === "appointments" && (
          // onBack fonksiyonu ile dashboard'a geri dönüyoruz
          <MemberAppointments onBack={() => setCurrentView("dashboard")} />
        )}

      </div>

      <Footer />
    </>
  );
};

export default MemberDashboard;